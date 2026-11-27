(function () {
  'use strict';

  const NAVY = [27, 42, 78];
  const BLUE = [46, 117, 182];
  const TXT = [16, 24, 40];
  const MUTED = [102, 112, 133];
  const LINE = [228, 231, 236];
  const SOFT = [244, 246, 250];
  const ST = {
    incluso: { fg: [6, 118, 71], bg: [236, 253, 243] },
    obrigatorio: { fg: [181, 71, 8], bg: [255, 250, 235] },
    confirmar: { fg: [181, 71, 8], bg: [255, 250, 235] },
    opcional: { fg: [23, 92, 211], bg: [239, 248, 255] },
    consulta: { fg: [71, 84, 103], bg: [242, 244, 247] },
    nao: { fg: [102, 112, 133], bg: [242, 244, 247] },
    credito: { fg: [6, 118, 71], bg: [236, 253, 243] },
    info: { fg: [71, 84, 103], bg: [242, 244, 247] }
  };

  const t = (s) => String(s == null ? '' : s).replace(/→/g, '->').replace(/[‐-‒]/g, '-').replace(/ /g, ' ');

  const cache = {};
  function carregarImg(src, max = 360, png = false) {
    if (!src) return Promise.resolve(null);
    const k = src + '|' + max + '|' + png;
    if (cache[k]) return cache[k];
    cache[k] = new Promise((resolve) => {
      const im = new Image();
      im.onload = () => {
        try {
          const r = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
          const w = Math.max(1, Math.round(im.naturalWidth * r));
          const h = Math.max(1, Math.round(im.naturalHeight * r));
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          const g = c.getContext('2d');
          if (!png) { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); }
          g.drawImage(im, 0, 0, w, h);
          resolve({ data: c.toDataURL(png ? 'image/png' : 'image/jpeg', 0.85), w, h, fmt: png ? 'PNG' : 'JPEG' });
        } catch (e) { resolve(null); }
      };
      im.onerror = () => resolve(null);
      im.src = src;
    });
    return cache[k];
  }

  function quebrarSeguro(s, n) {
    const ok = new Uint8Array(s.length);
    let modo = 'html', aspas = null;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (modo === 'html') {
        if (c === '<' && s.startsWith('<style', i)) modo = 'css';
        else if (c === '<' && s.startsWith('<script', i)) modo = 'json';
        else if (c === ' ') ok[i] = 1;
        else if (c === '>' && s[i + 1] === '<') ok[i] = 2;
      } else if (aspas) {
        if (c === '\\') i++; else if (c === aspas) aspas = null;
      } else if (modo === 'css') {
        if (c === '"' || c === "'") aspas = c;
        else if (s.startsWith('</style', i)) { modo = 'html'; i += 7; ok[i] = 1; }
        else if (' ;,{}'.includes(c)) ok[i] = 1;
      } else {
        if (c === '"') aspas = c;
        else if (s.startsWith('</script', i)) { modo = 'html'; i += 8; ok[i] = 1; }
        else if (',:{['.includes(c)) ok[i] = 1;
      }
    }
    const linhas = []; let ini = 0, duras = 0;
    while (ini < s.length) {
      let fim = Math.min(s.length, ini + n);
      if (fim < s.length) {
        let j = fim; while (j > ini + n / 2 && ok[j - 1] !== 1) j--;
        if (j <= ini + n / 2) { j = fim; while (j > ini + n / 2 && !ok[j - 1]) j--; }
        if (j > ini + n / 2) fim = j; else duras++;
      }
      linhas.push(s.slice(ini, fim)); ini = fim;
    }
    quebrarSeguro.duras = duras;
    return linhas;
  }

  function anexarArquivo(doc, nome, conteudo, descricao) {
    const it = doc.internal; let arvore = 0;
    it.events.subscribe('postPutResources', () => {
      const ef = it.newObject();
      it.putStream({ data: conteudo, filters: ['FlateEncode'], additionalKeyValues: [{ key: 'Type', value: '/EmbeddedFile' }, { key: 'Subtype', value: '/text#2Fhtml' }, { key: 'Params', value: `<< /Size ${conteudo.length} >>` }] });
      it.write('endobj');
      const fs = it.newObject();
      it.write(`<< /Type /Filespec /F (${nome}) /UF (${nome}) /Desc (${descricao}) /AFRelationship /Supplement /EF << /F ${ef} 0 R /UF ${ef} 0 R >> >>`);
      it.write('endobj');
      arvore = it.newObject();
      it.write(`<< /Names [(${nome}) ${fs} 0 R] >>`);
      it.write('endobj');
    });
    it.events.subscribe('putCatalog', () => { if (arvore) it.write(`/Names << /EmbeddedFiles ${arvore} 0 R >>`); });
  }

  async function gerar({ cfg, emp, S, calc, avisos, protocolo, data, E, tabela, registro }) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    const W = 210, H = 297, M = 14, CW = W - 2 * M;
    const brl = E.brl;
    let y = 0;

    const imgs = {};
    const fontes = new Set(calc.linhas.map((l) => l.imagem).filter(Boolean));
    await Promise.all([...fontes].map(async (s) => (imgs[s] = await carregarImg(s, 240))));
    const logo = await carregarImg(cfg.empresa.logoBranco, 300, true);

    const cor = (c, tipo = 'text') => (tipo === 'text' ? doc.setTextColor(...c) : tipo === 'fill' ? doc.setFillColor(...c) : doc.setDrawColor(...c));
    const fonte = (tam, estilo = 'normal', c = TXT) => { doc.setFont('helvetica', estilo); doc.setFontSize(tam); cor(c); };
    const quebra = (alt) => { if (y + alt > H - 20) { doc.addPage(); cabecalhoPequeno(); } };

    function cabecalhoPequeno() {
      cor(NAVY, 'fill'); doc.rect(0, 0, W, 14, 'F');
      if (logo) doc.addImage(logo.data, 'PNG', M, 2.5, (9 * logo.w) / logo.h, 9);
      fonte(9, 'bold', [255, 255, 255]); doc.text(t('Personalização – 3ª etapa'), M + 12, 8.8);
      fonte(8, 'normal', [200, 210, 230]); doc.text(t(`${S.cliente.nome} · Unidade ${S.cliente.unidade} · ${protocolo}`), W - M, 8.8, { align: 'right' });
      y = 22;
    }

    cor(NAVY, 'fill'); doc.rect(0, 0, W, 44, 'F');
    cor(BLUE, 'fill'); doc.rect(0, 44, W, 1.6, 'F');
    if (logo) doc.addImage(logo.data, 'PNG', M, 8, (28 * logo.w) / logo.h, 28);
    const tx = M + (logo ? (28 * logo.w) / logo.h + 7 : 0);
    fonte(8.5, 'normal', [190, 202, 225]); doc.text(t(cfg.empresa.nome.toUpperCase()), tx, 15);
    fonte(17, 'bold', [255, 255, 255]); doc.text(t('Personalização – 3ª etapa'), tx, 23.5);
    fonte(10, 'normal', [220, 228, 242]); doc.text(t('Pré-orçamento · registro de preferências do cliente'), tx, 30);
    fonte(8, 'normal', [190, 202, 225]);
    doc.text(t('Protocolo'), W - M, 15, { align: 'right' });
    fonte(10, 'bold', [255, 255, 255]); doc.text(t(protocolo), W - M, 20.5, { align: 'right' });
    fonte(8, 'normal', [190, 202, 225]); doc.text(t('Preenchido em ' + data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })), W - M, 26, { align: 'right' });
    y = 53;

    const campos = [
      ['Cliente', S.cliente.nome],
      ['Empreendimento', emp.nome],
      ['Unidade', S.cliente.unidade],
      ['Final / planta', (E.grupo(S, emp) || {}).nome || 'Final ' + E.pad2(S.cliente.final)],
      [E.contatoRotulo(S.cliente), S.cliente.contato || '—'],
      (() => { const pz = E.prazoUnidade(S.cliente.unidade, emp); return ['Prazo de envio', !pz || !pz.prazo ? 'A definir' : E.dataBr(pz.prazo) + (pz.vencido ? ' (enviado fora do prazo)' : '')]; })()
    ];
    cor(SOFT, 'fill'); cor(LINE, 'draw'); doc.roundedRect(M, y, CW, 27, 2, 2, 'FD');
    campos.forEach(([k, v], i) => {
      const cx = M + 5 + (i % 3) * (CW / 3);
      const cy = y + 7 + Math.floor(i / 3) * 11;
      if (!k) return;
      fonte(7, 'normal', MUTED); doc.text(t(k.toUpperCase()), cx, cy);
      fonte(9.5, 'bold', TXT); doc.text(doc.splitTextToSize(t(v), CW / 3 - 6)[0], cx, cy + 4.6);
    });
    y += 34;

    if (avisos.length) {
      avisos.forEach((a) => {
        fonte(8.5, 'normal');
        const ls = doc.splitTextToSize(t(a.mensagem), CW - 10);
        const h = ls.length * 4 + 6;
        quebra(h + 3);
        cor([255, 250, 235], 'fill'); cor([254, 223, 137], 'draw'); doc.roundedRect(M, y, CW, h, 1.5, 1.5, 'FD');
        fonte(8.5, 'normal', [147, 55, 13]); doc.text(ls, M + 5, y + 5);
        y += h + 3;
      });
      y += 2;
    }

    const etapas = E.etapas(emp, S).concat(calc.etapaCreditos ? [calc.etapaCreditos] : []);
    const colVal = W - M - 2;
    const colTx = M + 19;
    const larTx = colVal - 34 - colTx;

    etapas.forEach((et) => {
      const ls = calc.linhas.filter((l) => l.etapa.id === et.id);
      if (!ls.length && et.secoes.every((s) => s.tipo === 'texto')) return;
      quebra(38);
      cor(NAVY); fonte(11, 'bold', NAVY); doc.text(t(et.titulo), M, y + 4);
      cor(BLUE, 'draw'); doc.setLineWidth(0.5); doc.line(M, y + 6.5, M + CW, y + 6.5); doc.setLineWidth(0.2);
      y += 10;
      if (!ls.length) { fonte(8.5, 'italic', MUTED); doc.text(t('Nenhuma escolha registrada.'), M, y + 3); y += 8; return; }
      ls.forEach((l) => {
        const tit = t(l.item + (l.qtd > 1 ? `  × ${l.qtd}` : ''));
        fonte(8.3, 'normal');
        const det = doc.splitTextToSize(t(l.detalhe), larTx);
        fonte(7.3, 'normal');
        const specs = (l.specs || []).length && l.status !== 'nao' ? doc.splitTextToSize(t(l.specs.join(' · ')), larTx) : [];
        const h = Math.max(16, 5 + 4.6 + det.length * 3.8 + specs.length * 3.4 + 2);
        quebra(h + 2);
        const im = imgs[l.imagem];
        if (im) {
          const s = Math.min(14 / im.w, 14 / im.h);
          cor(LINE, 'draw'); doc.roundedRect(M, y + 1, 15, 15, 1.2, 1.2, 'S');
          doc.addImage(im.data, im.fmt, M + 0.5 + (14 - im.w * s) / 2, y + 1.5 + (14 - im.h * s) / 2, im.w * s, im.h * s);
        }
        fonte(9.5, 'bold', TXT); doc.text(doc.splitTextToSize(tit, larTx)[0], colTx, y + 5);
        fonte(8.3, 'normal', [52, 64, 84]); doc.text(det, colTx, y + 9.4);
        if (specs.length) { fonte(7.3, 'normal', MUTED); doc.text(specs, colTx, y + 9.4 + det.length * 3.8); }

        const st = ST[l.status] || ST.consulta;
        const rot = t(E.STATUS[l.status].rotulo);

        const val = l.status === 'nao' || l.status === 'info' ? '—' : l.valTexto ? l.valTexto : l.total == null ? 'Sob consulta' : l.total < 0 ? '- ' + brl(-l.total) : brl(l.total);
        fonte(9.5, 'bold', l.total == null ? MUTED : TXT); doc.text(t(val), colVal, y + 5, { align: 'right' });
        fonte(7, 'bold', st.fg);
        const tw = doc.getTextWidth(rot) + 4;
        cor(st.bg, 'fill'); doc.roundedRect(colVal - tw, y + 7, tw, 5, 2.5, 2.5, 'F'); doc.text(rot, colVal - tw + 2, y + 10.4);
        if (l.qtd > 1 && l.unit != null) { fonte(7, 'normal', MUTED); doc.text(t(brl(l.unit) + ' un.'), colVal, y + 15, { align: 'right' }); }
        cor(LINE, 'draw'); doc.line(colTx, y + h, M + CW, y + h);
        y += h + 2;
      });
      y += 4;
    });

    if (calc.observacoes) {
      fonte(8.8, 'normal');
      const ls = doc.splitTextToSize(t(calc.observacoes), CW - 10);
      quebra(ls.length * 4 + 16);
      fonte(11, 'bold', NAVY); doc.text(t('Observações do cliente'), M, y + 4); y += 8;
      cor(SOFT, 'fill'); doc.roundedRect(M, y, CW, ls.length * 4 + 6, 1.5, 1.5, 'F');
      fonte(8.8, 'normal', TXT); doc.text(ls, M + 5, y + 5); y += ls.length * 4 + 10;
    }

    const pend = calc.consulta;
    const pg = emp.pagamento || {};
    fonte(7.5, 'normal');
    const pgLs = pg.texto && calc.total > 0 ? doc.splitTextToSize(t('Condições de pagamento: ' + pg.texto), CW - 10) : [];
    fonte(8, 'bold');
    const pendLs = pend.length ? doc.splitTextToSize(t('Dependem de orçamento/confirmação: ' + pend.map((l) => l.item).join('; ') + '.'), CW - 10) : [];
    const hT = 18 + (calc.aVista != null && calc.total > 0 ? 6 : 0) + pendLs.length * 3.8 + pgLs.length * 3.6 + 4;
    quebra(hT + 4);
    cor(NAVY, 'fill'); doc.roundedRect(M, y, CW, hT, 2, 2, 'F');
    fonte(9, 'normal', [200, 210, 230]); doc.text(t('Total estimado (pré-orçamento)'), M + 5, y + 8);
    fonte(16, 'bold', [255, 255, 255]); doc.text(t(brl(calc.total)), W - M - 5, y + 9, { align: 'right' });
    let yy = y + 15;
    if (calc.aVista != null && calc.total > 0) { fonte(8.5, 'normal', [220, 228, 242]); doc.text(t(`Estimativa à vista (${pg.descontoAVistaPct}% de desconto): ${brl(calc.aVista)}`), M + 5, yy); yy += 6; }
    if (pendLs.length) { fonte(8, 'bold', [254, 223, 137]); doc.text(pendLs, M + 5, yy); yy += pendLs.length * 3.8 + 1; }
    if (pgLs.length) { fonte(7.5, 'normal', [200, 210, 230]); doc.text(pgLs, M + 5, yy); }
    y += hT + 6;

    const blocoTexto = (titulo, paragrafos, corTitulo) => {
      fonte(8, 'normal');
      const ls = paragrafos.map((p) => doc.splitTextToSize(t(p), CW - 10));
      const h = ls.reduce((a, l) => a + l.length * 3.7 + 2, 0) + 11;
      quebra(h + 4);
      cor(SOFT, 'fill'); doc.roundedRect(M, y, CW, h, 1.5, 1.5, 'F');
      fonte(9.5, 'bold', corTitulo || NAVY); doc.text(t(titulo), M + 5, y + 6.5);
      let yy = y + 11.5;
      ls.forEach((l) => { fonte(8, 'normal', [52, 64, 84]); doc.text(l, M + 5, yy); yy += l.length * 3.7 + 2; });
      y += h + 4;
    };
    if (calc.avisoCredito) blocoTexto('Crédito da instalação de porta', [calc.avisoCredito]);

    (E.etapas(emp, S) || []).filter((et) => et.servicos && calc.linhas.some((l) => l.etapa && l.etapa.id === et.id && l.status !== 'nao' && l.status !== 'info')).forEach((et) => {
      blocoTexto(et.servicos.titulo, et.servicos.itens.map((x, i) => `${i + 1}. ${x.titulo}: ${x.texto} Quem e quando: ${x.quem} Custo: ${x.custo}`).concat(et.servicos.nota ? [et.servicos.nota] : []));
    });
    E.aceites(S, emp).forEach((a) => blocoTexto('Termo aceito pelo cliente: ' + a.titulo, [a.texto, 'Aceito pelo cliente em ' + data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) + '.']));
    if ((cfg.regrasGerais || []).length) blocoTexto('Instruções gerais', E.regrasGerais(cfg, emp).map((r) => '• ' + r));

    fonte(8, 'normal');
    const av = doc.splitTextToSize(t(cfg.textos.avisoPdf), CW - 10);
    fonte(8, 'bold');
    const prox = doc.splitTextToSize(t(`Envie este documento à ${(emp.contato && emp.contato.equipe) || 'equipe de personalização'}${emp.contato && emp.contato.email ? ' (' + emp.contato.email + ')' : ''}.`), CW - 10);
    quebra(av.length * 3.8 + prox.length * 3.8 + 14 + 22);
    cor(LINE, 'draw'); doc.roundedRect(M, y, CW, av.length * 3.8 + prox.length * 3.8 + 9, 1.5, 1.5, 'S');
    fonte(8, 'normal', [52, 64, 84]); doc.text(av, M + 5, y + 5.5);
    fonte(8, 'bold', NAVY); doc.text(prox, M + 5, y + 6 + av.length * 3.8);
    y += av.length * 3.8 + prox.length * 3.8 + 14;

    quebra(22);
    cor(MUTED, 'draw'); doc.line(M, y + 12, M + 80, y + 12); doc.line(W - M - 80, y + 12, W - M, y + 12);
    fonte(7.5, 'normal', MUTED); doc.text(t('Cliente'), M, y + 16); doc.text(t('ZR3 Empreendimentos – recebido em ___/___/______'), W - M - 80, y + 16);

    const reg = String(registro || '').replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '?');
    const nomeReg = `registro-${String(protocolo).replace(/[^A-Za-z0-9-]+/g, '-')}.html`;
    let regIni = 0;
    if (reg) {
      anexarArquivo(doc, nomeReg, reg, 'Registro do preenchimento (replica em HTML)');
      const PT = 25.4 / 72, MIN_PT = 1.6, MAX_PT = 6, LH = 1.12;
      doc.addPage(); regIni = doc.getNumberOfPages();
      fonte(10, 'bold', NAVY); doc.text(t('Anexo · Registro do preenchimento (réplica em HTML)'), M, 12);
      fonte(7.5, 'normal', MUTED);
      const expl = doc.splitTextToSize(t(`Réplica das telas como foram preenchidas, com o estilo da plataforma, para consulta da ZR3. O arquivo ${nomeReg} está anexado a este PDF (painel de anexos do leitor de PDF). Para recuperar pelo texto: copie do início (<!doctype html>) ao fim (</html>) e salve como .html. ${reg.length.toLocaleString('pt-BR')} caracteres.`), CW);
      doc.text(expl, M, 16.5);
      const topo = 16.5 + expl.length * 3.3 + 1, base = H - 8;

      const cwPt = CW / PT, altPt = (base - topo) / PT;

      const POR_PAG = 36000;
      const tam = Math.max(MIN_PT, Math.min(MAX_PT, Math.floor(Math.sqrt((altPt * cwPt) / (0.6 * LH * Math.min(reg.length, POR_PAG) * 1.04)) * 100) / 100));
      const porLinha = Math.floor(cwPt / (0.6 * tam)), passo = tam * LH * PT;
      const linhas = quebrarSeguro(reg, porLinha);
      doc.setFont('courier', 'normal'); doc.setFontSize(tam); cor([150, 158, 170]);
      let i = 0, ry = topo;
      while (i < linhas.length) {
        const cabem = Math.max(1, Math.floor((base - ry) / passo));
        const bloco = linhas.slice(i, i + cabem);

        bloco.forEach((l, k) => doc.text(l, M, ry + tam * PT + k * passo, { baseline: 'alphabetic' }));
        i += bloco.length;
        if (i < linhas.length) { doc.addPage(); ry = 8; doc.setFont('courier', 'normal'); doc.setFontSize(tam); cor([150, 158, 170]); }
      }
    }

    const n = doc.getNumberOfPages();
    for (let i = 1; i <= n; i++) {
      if (regIni && i >= regIni) break;
      doc.setPage(i);
      cor(LINE, 'draw'); doc.line(M, H - 13, W - M, H - 13);
      fonte(7, 'normal', MUTED);
      doc.text(t(`${cfg.empresa.nome} · ${cfg.empresa.endereco} · ${cfg.empresa.telefone} · ${cfg.empresa.email}`), M, H - 8.5);
      doc.text(t(`Página ${i} de ${n}`), W - M, H - 8.5, { align: 'right' });

      if (tabela) { fonte(6.5, 'normal', MUTED); doc.text(t(`${cfg.versao ? 'Versão ' + cfg.versao + ' · ' : ''}Tabela de valores ${tabela.codigo}${tabela.conferida ? ' · conferida com o site' : tabela.arquivoUnico ? '' : ' · sem conferência com o site (sem conexão)'} · gerado em ${data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`), W - M, H - 5, { align: 'right' }); }
    }

    const slug = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const dia = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
    const nome = `Personalizacao-3a-etapa_${slug(emp.nome)}_Un${slug(S.cliente.unidade)}_${slug(S.cliente.nome.split(' ')[0])}_${dia}.pdf`;
    const blob = doc.output('blob');
    const file = new File([blob], nome, { type: 'application/pdf' });
    return { blob, file, nome, url: URL.createObjectURL(blob), paginas: n };
  }

  window.ZR3PDF = { gerar, carregarImg };
})();
