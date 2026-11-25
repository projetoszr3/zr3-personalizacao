(function (root) {
  'use strict';

  const E = {};

  E.ativo = (x) => x && x.ativo !== false;
  E.pad2 = (n) => String(n).padStart(2, '0');
  E.brl = (v) => (v == null ? 'Valor sob consulta' : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  E.soDigitos = (s) => String(s || '').replace(/\D/g, '');

  E.empreendimento = (cfg, id) => cfg.empreendimentos.find((e) => e.id === id && E.ativo(e)) || null;

  E.etapas = (emp, S) => {
    const g = S ? E.grupo(S, emp) : null;
    const fora = (g && g.naoOferta) || [];

    const oculta = (s) => !!(S && s.ocultarSe && ((S.escolhas || {})[s.ocultarSe.secao] || {}).resposta === s.ocultarSe.resposta);

    const porGrupo = (s) => {
      let r = g && s.valorPorGrupo && s.valorPorGrupo[g.id] != null ? Object.assign({}, s, { valor: s.valorPorGrupo[g.id] }) : s;

      if (g && r.nenhuma && (r.nenhuma.semGrupos || []).includes(g.id)) r = Object.assign({}, r, { nenhuma: null });
      return r;
    };

    const porLinha = (s) => {
      if (!s.linhas) return s;
      const ln = S ? E.linhaEscolhida(S, s) : null;
      if (s.tipo === 'quantidades' && s.linhasMultiplas) {

        const grupos = E.gruposLinha(S, s);
        return Object.assign({}, s, { _grupos: grupos, _linha: (grupos[0] || {}).ln || null, itens: s.itens.map((it) => Object.assign({}, it, { valor: null })) });
      }
      if (s.tipo === 'quantidades') {
        if (!ln) return Object.assign({}, s, { _linha: null, itens: s.itens.map((it) => Object.assign({}, it, { valor: null })) });
        const p = ln.linha.precos || {};
        return Object.assign({}, s, { _linha: ln, itens: s.itens.filter((it) => Object.prototype.hasOwnProperty.call(p, it.id)).map((it) => Object.assign({}, it, { valor: p[it.id], subtitulo: (ln.linha.caixas || {})[it.id] || it.subtitulo, imagem: E.imgPeca(ln, it.id, it.imagem) })) });
      }
      const vi = ln ? (ln.linha.precos || {})[s.pecaLinha || 'persiana'] : null;
      return Object.assign({}, s, { _linha: ln, _valorInterruptor: vi == null ? null : vi });
    };
    return (emp ? emp.etapas : [])
      .filter(E.ativo)
      .map((et) => Object.assign({}, et, { secoes: et.secoes.filter((s) => E.ativo(s) && !fora.includes(s.id) && !oculta(s)).map(porGrupo).map(porLinha) }))
      .filter((et) => et.secoes.length > 0);
  };

  E.acionamento = (S, sec) => {
    const es = ((S && S.escolhas) || {})[sec.id] || {};
    return { sel: Object.keys(es.acion || {}).filter((k) => es.acion[k]), peca: es.peca || null };
  };
  E.acionRequisitoOk = (S, emp, o) => {
    if (!o.requer) return true;
    const alvo = E.secao(emp, o.requer.secao, S);
    return !alvo || E.resposta(S, emp, alvo) === o.requer.resposta;
  };

  E.linhaEmUso = (S, emp, lid) => E.secoes(emp, S).some((x) => {
    if (!x.linhas || (lid && x.linhas.id !== lid)) return false;
    const es = (S.escolhas || {})[x.id] || {};
    if (x.tipo === 'persianas') return (x.ambientes || []).some((a) => E.ambResp(S, emp, x, a.id) === 'sim');
    if (x.tipo === 'quantidades') return Object.values(es.qtd || {}).some((n) => n > 0);
    if (x.acionamento) return E.resposta(S, emp, x) === 'sim' && E.acionamento(S, x).sel.includes('interruptor');
    return false;
  });

  E.dispensado = (S, emp, sec) => {
    const d = sec && sec.dispensadoPor;
    if (!d) return false;
    const es = ((S && S.escolhas) || {})[d.secao] || {};
    return !!E.secao(emp, d.secao, S) && ((es.qtd || {})[d.item] || 0) > 0 && (!d.escolha || (es.itemEscolha || {})[d.item] === d.escolha);
  };
  E.marcasAtivas = (S, emp) => {
    const secs = E.secoes(emp, S);
    const porAcion = secs.filter((x) => x.acionamento && E.resposta(S, emp, x) === 'sim').flatMap((x) => {
      const sel = E.acionamento(S, x).sel;
      return (x.acionamento.opcoes || []).filter((o) => o.marca && sel.includes(o.id)).map((o) => Object.assign({ origem: x, opcao: o, motivo: `${(x.aba || x.titulo).toLowerCase()} ${o.rotulo.toLowerCase()}` }, o.marca));
    });

    const vistos = new Set();
    const porLinha = secs.filter((x) => x.linhas && x._linha && !vistos.has(x.linhas.id) && vistos.add(x.linhas.id)).flatMap((sl) => {
      const ln = sl._linha;
      return ln.linha.exige && E.linhaEmUso(S, emp, sl.linhas.id) ? [Object.assign({ origem: sl, opcao: ln.linha, motivo: `linha ${ln.linha.nome} ${ln.linha.fabricante || ''}`.trim() + ` para ${sl.linhas.uso || 'os interruptores'}` }, ln.linha.exige)] : [];
    });

    const porGrupoLinha = secs.filter((x) => x._grupos).flatMap((sl) => sl._grupos.filter((g) => g.ln && g.ln.linha.exige && Object.values(g.raw.qtd || {}).some((n) => n > 0)).map((g) => Object.assign({ origem: sl, opcao: g.ln.linha, motivo: `linha ${g.ln.linha.nome} ${g.ln.linha.fabricante || ''}`.trim() + ` para ${sl.linhas.uso || 'os interruptores'}` }, g.ln.linha.exige)));

    const valeLinha = (m) => !E.dispensado(S, emp, E.secao(emp, m.secao, S));
    return porAcion.concat(porLinha.filter((m) => !m.origem._grupos && valeLinha(m)), porGrupoLinha.filter(valeLinha));
  };
  E.pecaAcionamento = (sec, id) => ((sec.acionamento && sec.acionamento.pecas && sec.acionamento.pecas.opcoes) || []).find((p) => p.id === id);

  E.linhaResolver = (L, es) => {
    const o = (L.opcoes || []).find((x) => x.id === (es || {}).linha && E.ativo(x));
    if (!o) return null;
    const cores = o.cores || [];
    const cor = cores.find((c) => c.id === es.cor) || null;
    return { linha: o, cor, completa: !!cor || !cores.length };
  };
  E.gruposRaw = (S, sec) => {
    const es = ((S && S.escolhas) || {})[sec.id] || {};
    if (Array.isArray(es.grupos) && es.grupos.length) return es.grupos;
    const ant = ((S && S.escolhas) || {})[sec.linhas.id] || {};
    return [{ linha: ant.linha || null, cor: ant.cor || null, qtd: Object.assign({}, es.qtd || {}) }];
  };
  E.gruposLinha = (S, sec) => E.gruposRaw(S, sec).map((g, i) => {
    const ln = E.linhaResolver(sec.linhas, g);
    const p = ln ? ln.linha.precos || {} : {};
    const itens = ln ? sec.itens.filter((it) => E.ativo(it) && Object.prototype.hasOwnProperty.call(p, it.id)).map((it) => Object.assign({}, it, { valor: p[it.id], subtitulo: (ln.linha.caixas || {})[it.id] || it.subtitulo, imagem: E.imgPeca(ln, it.id, it.imagem) })) : [];
    return { i, raw: g, ln, itens };
  });

  E.qtdItens = (S, sec) => {
    const es = ((S && S.escolhas) || {})[sec.id] || {};
    if (sec._grupos) return sec._grupos.flatMap((g) => g.itens.map((it) => ({ it, n: (g.raw.qtd || {})[it.id] || 0, ln: g.ln })).filter((x) => x.n > 0));
    return (sec.itens || []).filter(E.ativo).map((it) => ({ it, n: (es.qtd || {})[it.id] || 0, ln: sec._linha })).filter((x) => x.n > 0);
  };

  E.imgPeca = (ln, pecaId, reserva) => {
    const porCor = ln && ln.linha.imagens && ln.cor ? ln.linha.imagens[ln.cor.id] || {} : {};
    return porCor[pecaId] || reserva;
  };

  E.imgLinha = (ln) => {
    if (!ln) return '';
    const porCor = ln.linha.imagens && ln.cor ? ln.linha.imagens[ln.cor.id] : null;
    return (porCor && (porCor['tecla-tripla'] || Object.values(porCor)[0])) || ln.linha.imagem;
  };

  E.imgLinhaUso = (L, ln) => (ln ? E.imgPeca(ln, (L && L.pecaFoto) || '', E.imgLinha(ln)) : '');

  E.brindeInterruptor = (S, emp, sec, ambId) => { const b = E.persianaBrinde(S, emp, sec.id, ambId); return b && b.interruptor && sec.linhas ? b.interruptor : null; };

  E.tons = (L) => ((L && L.tons) || []).filter((t) => (L.opcoes || []).some((o) => E.ativo(o) && (o.cores || []).some((c) => t.cores.includes(c.id))));

  E.tomEscolhido = (L, es) => {
    es = es || {};
    if (es.tom && E.tons(L).some((t) => t.id === es.tom)) return es.tom;
    const t = es.cor ? E.tons(L).find((x) => x.cores.includes(es.cor)) : null;
    return t ? t.id : null;
  };

  E.coresNoTom = (L, o, tomId) => { const t = E.tons(L).find((x) => x.id === tomId); return t ? (o.cores || []).filter((c) => t.cores.includes(c.id)) : (o.cores || []); };

  E.fotosLinha = (ln) => {
    const porCor = ln && ln.linha.imagens && ln.cor ? ln.linha.imagens[ln.cor.id] || {} : {};
    const ent = Object.entries(porCor);
    return ent.filter(([, src], i) => !ent.slice(i + 1).some(([, s2]) => s2 === src)).map(([peca, src]) => ({ peca, src }));
  };

  E.linhaEscolhida = (S, sec) => {
    const L = sec && sec.linhas;
    if (!L || !S) return null;
    const es = (S.escolhas || {})[L.id] || {};
    const o = (L.opcoes || []).find((x) => x.id === es.linha && E.ativo(x));
    if (!o) return null;
    const cores = o.cores || [];
    const cor = cores.find((c) => c.id === es.cor) || null;
    return { linha: o, cor, completa: !!cor || !cores.length };
  };

  E.protocoloLinha = (L) => ({ wifi: 'Wi-Fi', zigbee: 'Zigbee' })[(L && (L.linha || L).protocolo) || ''] || '';
  E.nomeLinha = (ln) => (ln ? `${ln.linha.nome}${ln.linha.comercial ? ` (linha ${ln.linha.comercial})` : ''} ${ln.linha.fabricante || ''}`.trim() + (ln.cor ? `, ${ln.cor.nome.toLowerCase()}` : '') : '');

  E.codigoTabela = (cfg) => {
    const K = new Set(['valor', 'precos', 'percentual', 'valorPorGrupo', 'valorPorPorta', 'descontoAVistaPct', 'parcelaMinima', 'parcelasMax', 'sobre', 'porPeca', 'inclusoFinais', 'personalizadoFinais', 'semIntegracao', 'cobranca', 'interruptor']);
    const partes = [];
    const andar = (o, cam) => {
      if (Array.isArray(o)) o.forEach((x, i) => andar(x, cam + '/' + ((x && x.id) || i)));
      else if (o && typeof o === 'object') Object.keys(o).sort().forEach((k) => { if (K.has(k)) partes.push(cam + '.' + k + '=' + JSON.stringify(o[k])); else andar(o[k], cam + '/' + k); });
    };
    andar((cfg && cfg.empreendimentos) || [], '');
    let h = 2166136261; const txt = partes.join('|');
    for (let i = 0; i < txt.length; i++) { h ^= txt.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36).toUpperCase().padStart(7, '0');
  };

  E.hoje = () => new Date();
  const dataIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  E.dataBr = (iso) => (iso ? iso.split('-').reverse().join('/') : '');

  E.pavimento = (unidade) => { const d = E.soDigitos(unidade); return d.length >= 3 ? Number(d.slice(0, -2)) : null; };
  E.prazoUnidade = (unidade, emp) => {
    const g = E.cadastroUnidade(unidade, emp).grupo;
    if (!g) return null;
    const pav = E.pavimento(unidade);
    const p = ((emp && emp.prazosPorPavimento) || {})[pav] || '';
    return { grupo: g, pavimento: pav, prazo: p, vencido: !!p && dataIso(E.hoje()) > p };
  };

  E.secoes = (emp, S) => E.etapas(emp, S).flatMap((et) => et.secoes.map((s) => Object.assign({ _etapa: et }, s)));
  E.secao = (emp, id, S) => E.secoes(emp, S).find((s) => s.id === id) || null;

  E.telas = (emp, S) => ['inicio', 'identificacao'].concat(E.etapas(emp, S).map((e) => e.id), ['resumo']);

  E.novoEstado = (cfg) => {
    const emp = E.empreendimento(cfg, cfg.empreendimentoPadrao) || cfg.empreendimentos.find(E.ativo);
    return {
      v: 1,
      empId: emp ? emp.id : null,
      tela: 'inicio',
      visitadas: {},
      cliente: { nome: '', unidade: '', final: null, contatoTipo: (cfg.identificacao && cfg.identificacao.contatoPadrao) || 'whatsapp', contato: '' },
      escolhas: {},
      confirmado: false,
      pdf: null,
      criadoEm: new Date().toISOString(),
      atualizadoEm: null
    };
  };

  E.cadastroUnidade = (unidade, emp) => {
    const d = E.soDigitos(unidade);
    if (!d || !emp) return { final: null, grupo: null, erro: null };
    const cad = emp.cadastroUnidades || {};
    const grupos = cad.grupos || [];
    if (grupos.length) {
      const g = grupos.find((x) => (x.unidades || []).map(E.soDigitos).includes(d));
      if (!g) return { final: null, grupo: null, erro: `A unidade ${d} não consta no cadastro do ${emp.nome}.` };
      return { final: g.final || null, grupo: g, erro: null };
    }
    if (d.length < 3) return { final: null, grupo: null, erro: 'Informe o número completo da unidade (ex.: 501).' };
    const f = parseInt(d.slice(-2), 10);
    if (!emp.finais.includes(f)) return { final: null, grupo: null, erro: `Não existe final ${E.pad2(f)} no ${emp.nome}.` };
    return { final: f, grupo: null, erro: null };
  };
  E.grupo = (S, emp) => E.cadastroUnidade(S.cliente.unidade, emp).grupo;

  E.unidadesCadastradas = (emp) =>
    ((emp && emp.cadastroUnidades && emp.cadastroUnidades.grupos) || [])
      .flatMap((g) => (g.unidades || []).map((u) => ({ unidade: String(u), grupo: g })))
      .sort((a, b) => Number(a.unidade) - Number(b.unidade));

  E.esc = (S, id) => S.escolhas[id] || (S.escolhas[id] = {});

  const opcaoValida = (sec, id) => (sec.opcoes || []).some((o) => o.id === id && E.ativo(o));

  E.sacada = (S, sec, emp) => {
    const r = sec.regras;
    const f = S.cliente.final;
    const e = S.escolhas[sec.id] || {};
    const out = { modo: 'semFinal', final: f, valor: r.valor, fonte: null, integracao: e.integracao || null, precisaPerguntar: false };
    const g = (S.cliente.unidade && emp) ? E.grupo(S, emp) : null;
    if (!f && g) return r.gruposSemFinal === 'incluso' ? Object.assign(out, { modo: 'incluso', valor: 0, grupoNome: g.nome }) : Object.assign(out, { modo: 'naoConfigurado', grupoNome: g.nome });
    if (!f) return out;
    if (r.inclusoFinais.includes(f)) return Object.assign(out, { modo: 'incluso', valor: 0 });
    if (!r.personalizadoFinais.includes(f)) return Object.assign(out, { modo: 'naoConfigurado' });

    const un = E.soDigitos(S.cliente.unidade);
    const cadastrada = (r.unidadesComIntegracao || []).map(E.soDigitos).includes(un) && un !== '';
    if (cadastrada) return Object.assign(out, { modo: 'obrigatorio', fonte: 'cadastro', integracao: 'sim' });

    out.precisaPerguntar = true;
    if (e.integracao === 'sim') return Object.assign(out, { modo: 'obrigatorio', fonte: 'cliente' });
    if (e.integracao === 'naosei') return Object.assign(out, { modo: 'confirmar' });
    if (e.integracao === 'nao') {
      const regra = r.semIntegracao || 'opcional';
      return Object.assign(out, { modo: regra === 'obrigatorio' ? 'obrigatorio' : regra === 'consulta' ? 'consulta' : 'opcional', fonte: 'cliente' });
    }
    return Object.assign(out, { modo: 'pendente' });
  };

  E.produtoSacada = (S, emp, sec) => {
    const g = emp ? E.grupo(S, emp) : null;
    const m = g && (sec.produtosPorGrupo || []).find((x) => (x.grupos || []).includes(g.id));
    return (m && m.produto) || sec.produto;
  };

  E.galeria = (o) => ((o.galeria && o.galeria.length ? o.galeria : [o.imagem]) || [])
    .filter(Boolean).map((g) => (typeof g === 'string' ? { src: g, legenda: '', nota: '', titulo: '' } : { src: g.src, legenda: g.legenda || '', nota: g.nota || '', titulo: g.titulo || '' })).filter((g) => g.src);

  const temAlgo = (S, emp, secId) => {
    const sec = E.secao(emp, secId, S);
    if (!sec) return false;
    const e = S.escolhas[secId] || {};
    if (sec.tipo === 'quantidades') return Object.values(e.qtd || {}).some((n) => n > 0) || auxAtivo(sec, e);
    if (sec.tipo === 'opcional') return E.resposta(S, emp, sec, true) === 'sim';
    if (sec.tipo === 'persianas') return E.ambientesComPersiana(sec, e).length > 0;
    if (sec.tipo === 'unica') return !!e.opcao && e.opcao !== '__nenhuma';
    return false;
  };

  const condicao = (S, emp, q) => {
    if (!q) return false;
    if (Array.isArray(q.algum)) return q.algum.some((c) => condicao(S, emp, c));
    if (q.item) {
      const es = ((S && S.escolhas) || {})[q.secao] || {};
      return !!E.secao(emp, q.secao, S) && ((es.qtd || {})[q.item] || 0) > 0 && (!q.escolha || (es.itemEscolha || {})[q.item] === q.escolha);
    }
    if (q.qualquerQuantidade) return temAlgo(S, emp, q.secao);
    if (q.resposta) {
      const sec = E.secao(emp, q.secao, S);
      return !!sec && E.resposta(S, emp, sec, true) === q.resposta;
    }
    return false;
  };

  E.brindes = (S, emp) => ((emp && emp.brindes) || []).filter((b) => E.ativo(b) && E.secao(emp, b.secao, S) && condicao(S, emp, b.quando));
  E.persianaBrinde = (S, emp, secId, ambId) => E.brindes(S, emp).find((b) => b.secao === secId && b.ambiente === ambId) || null;

  E.ambResp = (S, emp, sec, ambId) => (E.persianaBrinde(S, emp, sec.id, ambId) ? 'sim' : (((S.escolhas[sec.id] || {}).amb || {})[ambId] || null));

  E.creditos = (S, emp) => {
    const un = E.soDigitos(S.cliente.unidade);
    return ((emp && emp.creditos) || []).filter((c) => E.ativo(c) && ((un && (c.unidades || []).map(E.soDigitos).includes(un)) || (c.quando && condicao(S, emp, c.quando))))

      .map((c) => Object.assign({}, c, { total: c.valorPorPorta == null ? c.valor : null }));
  };

  E.ambientesAuxilio = (S, emp, sec) => {
    const ax = sec.auxilio; if (!ax) return [];
    const g = E.cadastroUnidade(S.cliente.unidade, emp).grupo;
    return (g && (ax.ambientesPorGrupo || {})[g.id]) || ax.ambientes || [];
  };
  const auxAtivo = (sec, e) => !!(sec.auxilio && e.auxilio && (e.auxAmb || []).length);

  E.requisitoOk = (S, emp, sec) => !sec.requer || !E.secao(emp, sec.requer.secao, S) || condicao(S, emp, sec.requer);
  E.dependentes = (S, emp, secId) => E.etapas(emp, S).flatMap((et) => et.secoes).filter((x) => x.requer && x.requer.secao === secId);

  E.exigidos = (S, emp) => {
    const out = {};
    ((emp.regras && emp.regras.exigencias) || []).forEach((r) => {
      if (E.secao(emp, r.exige.secao, S) && condicao(S, emp, r.quando)) out[r.exige.secao] = { resposta: r.exige.resposta, mensagem: r.mensagem, regra: r.id };
    });
    return out;
  };

  E.resposta = (S, emp, sec, semExigencia) => {
    if (!semExigencia) {
      const ex = E.exigidos(S, emp)[sec.id];
      if (ex) return ex.resposta;
    }
    return (S.escolhas[sec.id] || {}).resposta || null;
  };

  E.avisos = (S, emp) =>
    ((emp.regras && emp.regras.avisos) || [])
      .filter((a) => condicao(S, emp, a.quando) && !(a.seNenhum || []).some((id) => temAlgo(S, emp, id)))

      .filter((a) => !(a.ocultarSeExigido && E.marcasAtivas(S, emp).some((m) => m.secao === a.quando.secao)))
      .map((a) => ({ id: a.id, mensagem: a.mensagem, etapa: (E.secao(emp, a.quando.secao, S) || {})._etapa, secao: a.quando.secao, local: a.local || 'etapa' }));

  E.ambientesComPersiana = (sec, e) => (sec.ambientes || []).filter((a) => ((e || {}).amb || {})[a.id] === 'sim').map((a) => a.id);

  E.precisaAceite = (S, emp, sec) => {
    if (!sec.aceite) return false;
    const e = S.escolhas[sec.id] || {};
    if (sec.tipo === 'opcional') return E.resposta(S, emp, sec) === 'sim';
    if (sec.tipo === 'persianas') return E.ambientesComPersiana(sec, e).length > 0;
    return false;
  };

  E.aceites = (S, emp) => E.secoes(emp, S).filter((s) => E.precisaAceite(S, emp, s) && (S.escolhas[s.id] || {}).aceite).map((s) => s.aceite);

  const emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s).trim());

  E.validarContato = (tipo, valor) => {
    const v = String(valor || '').trim();
    if (!v) return 'Informe um contato.';
    if (tipo === 'email') return emailOk(v) ? null : 'E-mail inválido.';
    const n = E.soDigitos(v);
    return n.length >= 10 && n.length <= 13 ? null : 'Telefone inválido. Use DDD + número.';
  };

  E.validarIdentificacao = (S, cfg, emp) => {
    const c = S.cliente;
    const er = [];
    if (String(c.nome).trim().split(/\s+/).filter(Boolean).length < 2) er.push({ campo: 'nome', msg: 'Informe o nome completo.' });
    if (!emp) er.push({ campo: 'empreendimento', msg: 'Selecione o empreendimento.' });
    if (!String(c.unidade).trim()) er.push({ campo: 'unidade', msg: 'Informe o número da unidade.' });
    else if (emp) {
      const cad = E.cadastroUnidade(c.unidade, emp);
      if (cad.erro) er.push({ campo: 'unidade', msg: cad.erro });
      else if (!cad.grupo && cad.final !== c.final) er.push({ campo: 'unidade', msg: 'Não foi possível identificar o final da unidade.' });

    }
    const exige = !(cfg.identificacao && cfg.identificacao.exigirContato === false);
    if (exige || String(c.contato || '').trim()) {
      const m = E.validarContato(c.contatoTipo, c.contato);
      if (m) er.push({ campo: 'contato', msg: m });
    }
    return er;
  };

  E.contatoRotulo = (c) => (c.contatoTipo === 'email' ? 'E-mail' : 'Telefone / WhatsApp');

  E.validarSecao = (S, emp, sec) => {
    const e = S.escolhas[sec.id] || {};
    const er = [];
    if (!E.requisitoOk(S, emp, sec) && temAlgo(S, emp, sec.id)) er.push({ campo: sec.id, msg: sec.requer.mensagem || 'Este item depende de outra escolha.' });
    if (E.precisaAceite(S, emp, sec) && !e.aceite) er.push({ campo: sec.id + '-aceite', msg: sec.aceite.rotulo ? `Confirme: ${sec.aceite.rotulo}` : 'Confirme o aceite.' });
    switch (sec.tipo) {
      case 'sacada': {
        const sc = E.sacada(S, sec, emp);
        if (sc.modo === 'semFinal') er.push({ campo: sec.id, msg: 'Informe o final da unidade na identificação.' });
        else if (sc.modo === 'pendente') er.push({ campo: sec.id + '-integracao', msg: 'Informe se a sua unidade fez a integração da sacada.' });
        else {
          if (sc.modo === 'opcional' || sc.modo === 'consulta') {
            if (!e.adquirir) er.push({ campo: sec.id + '-adquirir', msg: 'Indique se deseja adquirir o fechamento de sacada.' });
          }
          if (!e.ciente) er.push({ campo: sec.id + '-ciente', msg: 'Confirme que está ciente da condição da sua unidade.' });
        }
        break;
      }
      case 'unica':
        if (sec.obrigatoria !== false) {
          const okNenhuma = e.opcao === '__nenhuma' && sec.nenhuma;
          if (!okNenhuma && !opcaoValida(sec, e.opcao)) er.push({ campo: sec.id, msg: sec.nenhuma ? 'Selecione um modelo ou indique que não deseja.' : 'Selecione um modelo.' });
        }
        break;
      case 'opcional': {
        const r = E.resposta(S, emp, sec);
        if (sec.obrigatoria !== false && !r) er.push({ campo: sec.id, msg: `Responda: ${sec.titulo}.` });

        E.marcasAtivas(S, emp).filter((m) => m.secao === sec.id && r && r !== m.resposta).forEach((m) => { const msg = `${m.mensagem} ${m.acao || ''}`.trim(); if (!er.some((x) => x.campo === sec.id)) er.push({ campo: sec.id, msg }); });
        if (r === 'sim' && sec.acionamento) {
          const a = E.acionamento(S, sec);
          const oi = (sec.acionamento.opcoes || []).find((o) => o.id === 'interruptor' && a.sel.includes(o.id));
          if (oi) {
            const pc = sec.acionamento.pecas;
            if (!E.acionRequisitoOk(S, emp, oi)) er.push({ campo: sec.id + '-acion', msg: oi.requer.mensagem });
            else if (sec.linhas && !(sec._linha && sec._linha.completa)) er.push({ campo: sec.id + '-linha', msg: sec._linha ? 'Escolha a cor do interruptor.' : 'Escolha a cor e a linha do interruptor.' });
            else if (pc && !a.peca) er.push({ campo: sec.id + '-peca', msg: `${pc.titulo} Escolha uma opção ou "Não sei".` });
            else if (pc && a.peca !== '__equipe' && sec._linha && !Object.prototype.hasOwnProperty.call(sec._linha.linha.precos || {}, a.peca)) er.push({ campo: sec.id + '-peca', msg: 'Esse interruptor não existe na linha escolhida. Escolha outro.' });
          }
        }
        break;
      }
      case 'persianas': {
        (sec.ambientes || []).forEach((a) => {
          const r = E.ambResp(S, emp, sec, a.id);
          if (r !== 'sim' && r !== 'nao') er.push({ campo: sec.id + '-' + a.id, msg: `Indique se deseja persiana: ${a.nome}.` });
          else if (r === 'sim' && (sec.modelos || []).filter(E.ativo).length > 1 && !opcaoValida({ opcoes: sec.modelos }, (e.modelos || {})[a.id])) er.push({ campo: sec.id + '-' + a.id, msg: `Escolha o modelo de persiana: ${a.nome}.` });
          else if (r === 'sim' && sec.linhas && !(sec._linha && sec._linha.completa)) er.push({ campo: sec.id + '-' + a.id, msg: sec._linha ? 'Escolha a cor do interruptor da persiana.' : 'Escolha a cor e a linha do interruptor da persiana.' });
        });
        break;
      }
      case 'quantidades': {

        const algum = Object.values(e.qtd || {}).some((n) => n > 0) || auxAtivo(sec, e);
        if (sec.auxilio && e.auxilio && !(e.auxAmb || []).length) er.push({ campo: sec.id + '-aux', msg: 'Marque os ambientes em que tem interesse na automação.' });
        else if (!algum && !e.nenhum && E.requisitoOk(S, emp, sec)) er.push({ campo: sec.id, msg: `${sec.titulo}: escolha a quantidade ou marque "Não quero".` });
        (sec.itens || []).filter((it) => E.ativo(it) && it.escolha && ((e.qtd || {})[it.id] || 0) > 0 && !(e.itemEscolha || {})[it.id]).forEach((it) => er.push({ campo: `${sec.id}-esc-${it.id}`, msg: `${it.escolha.titulo}: escolha uma opção.` }));
        if (sec._grupos) sec._grupos.forEach((g) => {
          const temQ = Object.values(g.raw.qtd || {}).some((n) => n > 0);
          if ((temQ || (g.ln && !g.ln.completa) || (sec._grupos.length > 1 && !g.ln)) && !(g.ln && g.ln.completa)) er.push({ campo: `${sec.id}-g${g.i}`, msg: g.ln ? `Linha ${g.i + 1}: escolha a cor.` : `Linha ${g.i + 1}: escolha a linha e a cor.` });
          else if (sec._grupos.length > 1 && g.ln && !temQ) er.push({ campo: `${sec.id}-g${g.i}`, msg: `Linha ${g.i + 1}: informe as peças ou remova esta linha.` });
        });
        else if (sec.linhas && Object.values(e.qtd || {}).some((n) => n > 0) && !(sec._linha && sec._linha.completa)) er.push({ campo: sec.id + '-linha', msg: sec._linha ? 'Escolha a cor dos interruptores.' : 'Escolha a cor e a linha dos interruptores.' });
        break;
      }
      case 'pergunta':
        if (!e.resposta || (sec.opcoes && !sec.opcoes.some((o) => o.id === e.resposta))) er.push({ campo: sec.id, msg: `Responda: ${sec.titulo}.` });
        break;
      case 'texto':
        if (sec.max && String(e.texto || '').length > sec.max) er.push({ campo: sec.id, msg: `Máximo de ${sec.max} caracteres.` });
        break;
      default:
        break;
    }
    return er;
  };

  E.validarTela = (S, cfg, emp, tela) => {
    if (tela === 'inicio') return [];
    if (tela === 'identificacao') return E.validarIdentificacao(S, cfg, emp);
    if (tela === 'resumo') return [];
    const et = E.etapas(emp, S).find((x) => x.id === tela);
    if (!et) return [];
    return et.secoes.flatMap((s) => E.validarSecao(S, emp, s));
  };

  E.limiteNavegacao = (S, cfg, emp) => {
    const telas = E.telas(emp, S);
    for (let i = 1; i < telas.length - 1; i++) if (E.validarTela(S, cfg, emp, telas[i]).length) return i;
    return telas.length - 1;
  };

  E.calcular = (S, emp) => {
    const linhas = [];
    const push = (l) => linhas.push(Object.assign({ qtd: 1, unit: null, total: null, imagem: '', specs: [], detalhe: '' }, l));
    const exig = E.exigidos(S, emp);

    E.etapas(emp, S).forEach((et) => {
      et.secoes.forEach((sec) => {
        const e = S.escolhas[sec.id] || {};
        const base = { etapa: et, secao: sec };
        switch (sec.tipo) {
          case 'sacada': {
            const sc = E.sacada(S, sec, emp);
            const p = E.produtoSacada(S, emp, sec);
            const specs = p.demo ? [] : (p.specs || []).slice(0, 4).map((x) => x.join(': '));
            const b = Object.assign({}, base, { item: sec.titulo, imagem: p.imagem, specs });
            if (sc.modo === 'incluso') push(Object.assign(b, { detalhe: `${p.nome}. Incluso no padrão de entrega – ${sc.grupoNome && !sc.final ? sc.grupoNome : 'final ' + E.pad2(sc.final)}.`, unit: 0, total: 0, status: 'incluso' }));
            else if (sc.modo === 'obrigatorio') push(Object.assign(b, { detalhe: `${p.nome}. Obrigatório: unidade com integração da sacada${sc.fonte === 'cadastro' ? ' (cadastro ZR3)' : ' (informado pelo cliente)'}.`, unit: sc.valor, total: sc.valor, status: 'obrigatorio' }));
            else if (sc.modo === 'confirmar') push(Object.assign(b, { detalhe: `${p.nome}. Cliente não soube informar a integração: a ZR3 confirmará. Se houver integração, o item é obrigatório (${E.brl(sc.valor)}).`, unit: null, total: null, status: 'confirmar' }));
            else if (sc.modo === 'opcional') {
              if (e.adquirir === 'sim') push(Object.assign(b, { detalhe: `${p.nome}. Item opcional (sem integração da sacada).`, unit: sc.valor, total: sc.valor, status: 'opcional' }));
              else if (e.adquirir === 'nao') push(Object.assign(b, { detalhe: 'Cliente optou por não adquirir o fechamento de sacada.', status: 'nao' }));
            } else if (sc.modo === 'consulta') {
              if (e.adquirir === 'sim') push(Object.assign(b, { detalhe: `${p.nome}. Interesse registrado; condição comercial a definir pela ZR3.`, status: 'consulta' }));
              else if (e.adquirir === 'nao') push(Object.assign(b, { detalhe: 'Cliente não tem interesse no fechamento de sacada.', status: 'nao' }));
            } else if (sc.modo === 'naoConfigurado') push(Object.assign(b, { detalhe: 'Final sem regra cadastrada: a equipe ZR3 informará a condição.', status: 'consulta' }));
            break;
          }
          case 'unica': {
            if (e.opcao === '__nenhuma' && sec.nenhuma) { push(Object.assign({}, base, { item: sec.titulo, detalhe: sec.nenhuma.rotulo, status: 'nao', imagem: sec.imagem || ((sec.opcoes || []).find((o) => o.imagem) || {}).imagem })); break; }
            const o = (sec.opcoes || []).find((x) => x.id === e.opcao && E.ativo(x));
            if (!o) break;
            const q = sec.quantidade || 1;
            const st = o.valor == null ? 'consulta' : o.padrao || o.valor === 0 ? 'incluso' : 'opcional';
            push(Object.assign({}, base, {
              item: sec.titulo,
              detalhe: [o.nome, o.subtitulo].filter(Boolean).join(' – ') + (o.fabricante && !/A DEFINIR/.test(o.fabricante) && !String(o.subtitulo || '').includes(o.fabricante) ? ` (${o.fabricante})` : ''),
              qtd: q, unit: o.valor, total: o.valor == null ? null : o.valor * q, status: st, imagem: o.imagem,
              specs: (o.specs || []).slice(0, 3).map((x) => x.join(': ')), demo: !!o.demo
            }));
            break;
          }
          case 'quantidades':
            if (auxAtivo(sec, e)) push(Object.assign({}, base, { item: `${sec.aba || sec.titulo} – auxílio na quantificação`, detalhe: `Cliente tem interesse e solicita auxílio da ZR3 para a contagem dos circuitos e peças. Ambientes: ${(e.auxAmb || []).join(', ')}.`, status: 'consulta' }));
            if (e.nenhum && !Object.values(e.qtd || {}).some((n) => n > 0)) { push(Object.assign({}, base, { item: sec.titulo, detalhe: 'Não contratado.', status: 'nao', imagem: sec.imagem || ((sec.itens || []).find((it) => E.ativo(it) && it.imagem) || {}).imagem })); break; }
            E.qtdItens(S, sec).forEach(({ it, n, ln }) => {
              const escI = it.escolha && (it.escolha.opcoes || []).find((o) => o.id === (e.itemEscolha || {})[it.id]);
              push(Object.assign({}, base, { item: it.nome, detalhe: [sec.titulo, ln ? 'Linha ' + E.nomeLinha(ln) + (E.protocoloLinha(ln) ? ' (' + E.protocoloLinha(ln) + ')' : '') : '', it.subtitulo, escI ? `${it.escolha.titulo}: ${escI.rotulo}` : ''].filter(Boolean).join(' · '), qtd: n, unit: it.valor, total: it.valor == null ? null : it.valor * n, status: it.valor == null ? 'consulta' : 'opcional', imagem: it.imagem }));
            });
            break;
          case 'pergunta': {
            const r = e.resposta;
            const op = (sec.opcoes || []).find((o) => o.id === r);
            if (r) push(Object.assign({}, base, { item: sec.titulo, detalhe: op ? op.rotulo : r === 'sim' ? sec.rotuloSim || 'Sim' : sec.rotuloNao || 'Não', status: 'info' }));
            break;
          }
          case 'opcional': {
            const r = E.resposta(S, emp, sec);
            const ex = exig[sec.id];
            const ac = r === 'sim' && sec.acionamento ? E.acionamento(S, sec) : null;
            const acTxt = ac ? ' · Acionamento: ' + ['aplicativo'].concat((sec.acionamento.opcoes || []).filter((o) => ac.sel.includes(o.id)).map((o) => o.id === 'voz' ? 'voz' : o.id === 'interruptor' ? 'interruptor' : o.rotulo.toLowerCase())).join(', ') : '';
            const avisoSem = ac && sec.acionamento.avisoSem && !ac.sel.includes(sec.acionamento.avisoSem.opcao) ? ' · ' + sec.acionamento.avisoSem.texto : '';
            if (r === 'sim') push(Object.assign({}, base, { item: sec.titulo, detalhe: sec.nome + acTxt + avisoSem + (ex ? ' — incluído por exigência técnica.' : ''), unit: sec.valor, total: sec.valor, status: sec.valor == null ? 'consulta' : ex ? 'obrigatorio' : sec.valor === 0 ? 'incluso' : 'opcional', imagem: sec.imagem }));

            if (ac && ac.sel.includes('interruptor')) {
              const eq = ac.peca === '__equipe', pc = E.pecaAcionamento(sec, ac.peca);
              const v = !eq && sec._linha ? (sec._linha.linha.precos || {})[ac.peca] : null;
              push(Object.assign({}, base, { parte: 'interruptor', item: sec.linhaRotulo || 'Interruptor', detalhe: [sec._linha ? 'Linha ' + E.nomeLinha(sec._linha) + (E.protocoloLinha(sec._linha) ? ' (' + E.protocoloLinha(sec._linha) + ')' : '') : '', eq ? 'Modelo a definir pela equipe da ZR3' : pc ? pc.nome : ''].filter(Boolean).join(' · '), unit: v == null ? null : v, total: v == null ? null : v, status: v == null ? 'consulta' : 'opcional', imagem: sec._linha ? (eq ? E.imgLinha(sec._linha) : E.imgPeca(sec._linha, ac.peca, E.imgLinha(sec._linha))) : '' }));
            }
            else if (r === 'nao') push(Object.assign({}, base, { item: sec.titulo, detalhe: 'Não contratado.' + (sec.avisoNao ? ' ' + sec.avisoNao.texto : ''), status: 'nao', imagem: sec.imagem }));
            break;
          }
          case 'persianas': {
            const respondidos = (sec.ambientes || []).filter((a) => ['sim', 'nao'].includes(E.ambResp(S, emp, sec, a.id)));
            if (!respondidos.length) break;
            const modelos = (sec.modelos || []).filter(E.ativo);

            (sec.ambientes || []).forEach((amb) => {
              const r = E.ambResp(S, emp, sec, amb.id);
              const brinde = E.persianaBrinde(S, emp, sec.id, amb.id);
              if (r === 'nao') { push(Object.assign({}, base, { item: `Persiana – ${amb.nome}`, detalhe: 'Não desejo persiana neste ambiente.', status: 'nao', imagem: (modelos[0] || {}).imagem })); return; }
              if (r !== 'sim') return;
              const m = modelos.find((x) => x.id === (e.modelos || {})[amb.id]) || (modelos.length === 1 ? modelos[0] : null);
              if (!m) return;

              const bi = brinde && brinde.interruptor && sec.linhas ? brinde.interruptor : null;
              const padrao = !!(bi && sec._linha && sec._linha.linha.id === bi.linha);
              const semAcr = !!(bi && padrao);
              push(Object.assign({}, base, { peca: true, semAcrescimo: semAcr, item: `Persiana – ${amb.nome}`, detalhe: m.nome + (brinde && (e.amb || {})[amb.id] !== 'sim' ? ' (incluída pelo brinde)' : ''), unit: m.valor, total: m.valor, status: m.valor == null ? 'consulta' : 'opcional', imagem: m.imagem, specs: (m.specs || []).slice(0, 2).map((x) => x.join(': ')) }));

              const vi = sec.linhas ? sec._valorInterruptor : undefined;
              const nomeLn = sec._linha ? 'Linha ' + E.nomeLinha(sec._linha) + (E.protocoloLinha(sec._linha) ? ' (' + E.protocoloLinha(sec._linha) + ')' : '') : 'Linha a escolher';
              const imgInt = sec._linha ? E.imgLinhaUso(sec.linhas, sec._linha) : '';
              if (bi) {
                if (padrao || !sec._linha) push(Object.assign({}, base, { parte: 'interruptor', semAcrescimo: semAcr, item: `Interruptor da persiana – ${amb.nome}`, detalhe: nomeLn + (padrao ? ' · interruptor padrão do brinde' : ''), unit: padrao ? 0 : null, total: padrao ? 0 : null, status: padrao ? 'incluso' : 'consulta', imagem: imgInt }));
                else {
                  const pp = ((sec.linhas.opcoes.find((o) => o.id === bi.linha) || {}).precos || {})[sec.pecaLinha || 'persiana'];
                  const va = bi.cobranca === 'integral' ? (vi == null ? null : vi) : (vi == null || pp == null ? null : Math.max(0, vi - pp));
                  push(Object.assign({}, base, { parte: 'interruptor', item: `Interruptor da persiana – ${amb.nome}`, detalhe: nomeLn + (bi.cobranca === 'integral' ? ' · interruptor diferente do padrão do brinde' : ' · valor adicional em relação ao interruptor padrão do brinde'), unit: va, total: va, status: va == null ? 'consulta' : va === 0 ? 'incluso' : 'opcional', imagem: imgInt }));
                }
              } else if (sec.linhas) {
                const ib = brinde && vi == null;
                push(Object.assign({}, base, { parte: 'interruptor', item: `Interruptor da persiana – ${amb.nome}`, detalhe: nomeLn + (brinde ? ' · incluído no brinde' : ''), unit: ib ? 0 : vi, total: ib ? 0 : vi, status: ib ? 'incluso' : vi == null ? 'consulta' : 'opcional', imagem: imgInt }));
              }
              const vBrinde = bi ? (m.valor || 0) : (m.valor || 0) + (vi || 0);
              if (brinde && vBrinde) push(Object.assign({}, base, { item: brinde.titulo, detalhe: `${brinde.detalhe} Abatimento do valor da persiana${sec.linhas && !bi ? ' e do interruptor' : ''} – ${amb.nome}.`, unit: -vBrinde, total: -vBrinde, status: 'credito', credito: true, brinde: true, imagem: m.imagem }));
              (sec.adicionais || []).filter(E.ativo).forEach((ad) => {
                if (((e.adicionais || {})[ad.id] || {})[amb.id]) push(Object.assign({}, base, { item: `${ad.nome} – ${amb.nome}`, detalhe: 'Adicional da persiana', unit: ad.valor, total: ad.valor, status: ad.valor == null ? 'consulta' : 'opcional', imagem: ad.imagem }));
              });
            });
            break;
          }
          default:
            break;
        }
      });
    });

    ((emp.regras && emp.regras.acrescimos) || []).forEach((a) => {
      if (!condicao(S, emp, a.quando)) return;

      const entra = (l) => a.sobre.some((x) => { const [sid, parte] = x.split(':'); return l.secao.id === sid && (!parte || l.parte === parte); });
      const baseVal = linhas.filter((l) => entra(l) && l.total != null && l.status !== 'nao' && !l.credito && !l.semAcrescimo).reduce((s, l) => s + l.total, 0);

      const pecas = (a.porPeca || []).map((pp) => ({ pp, n: linhas.filter((l) => l.secao.id === pp.secao && l.peca && l.status !== 'nao').length })).filter((x) => x.n);
      const vPct = Math.round(baseVal * a.percentual) / 100;
      const vPeca = pecas.reduce((s, x) => s + x.n * x.pp.valor, 0);
      if (vPct + vPeca <= 0) return;

      const cand = [a.secao, a.quando.secao].concat((a.quando.algum || []).map((c) => c.secao)).filter(Boolean);
      const sec = cand.map((id) => E.secao(emp, id, S)).find(Boolean);
      if (!sec) return;
      const partes = [];
      if (vPct) partes.push(`${a.percentual}% sobre ${E.brl(baseVal)}`);
      pecas.forEach((x) => partes.push(`${x.n} × ${E.brl(x.pp.valor)} (${x.pp.rotulo || x.pp.secao})`));
      push({ etapa: sec._etapa, secao: sec, item: a.titulo || 'Acréscimo', detalhe: `${a.rotulo} — ${partes.join(' + ')}`, unit: vPct + vPeca, total: vPct + vPeca, status: 'opcional', acrescimo: true });
    });

    const ETAPA_CREDITOS = { id: 'creditos', titulo: 'Créditos', curto: 'Créditos', icone: 'mais', secoes: [] };
    const creditos = E.creditos(S, emp);
    const compras = linhas.filter((l) => l.status !== 'nao').reduce((s, l) => s + (l.total || 0), 0);
    creditos.forEach((c) => {
      const porPorta = c.valorPorPorta != null;
      const det = porPorta ? `${c.detalhe} ${E.brl(-c.valorPorPorta)} por porta de quarto; a quantidade é conferida pela ZR3 na revisão do orçamento.` : c.detalhe || '';
      push({ etapa: ETAPA_CREDITOS, secao: { id: c.id }, item: c.titulo, detalhe: det, unit: porPorta ? c.valorPorPorta : c.total, total: c.total, status: c.total == null ? 'confirmar' : 'credito', credito: true, valTexto: porPorta ? `- ${E.brl(-c.valorPorPorta)} / porta` : null });
    });
    const somaCred = creditos.reduce((s, c) => s + (c.total || 0), 0);
    const avisoCredito = creditos.length && (somaCred ? compras < -somaCred : compras <= 0) ? creditos.map((c) => c.aviso).filter(Boolean).join(' ') : '';

    const contaveis = linhas.filter((l) => l.status !== 'nao');
    const total = Math.max(0, contaveis.reduce((s, l) => s + (l.total || 0), 0));
    const consulta = contaveis.filter((l) => l.status === 'consulta' || l.status === 'confirmar');
    const pg = emp.pagamento || {};
    return {
      linhas,
      total,
      consulta,
      aVista: pg.descontoAVistaPct ? Math.round(total * (100 - pg.descontoAVistaPct)) / 100 : null,
      observacoes: (S.escolhas.observacoes || {}).texto || '',
      etapaCreditos: creditos.length ? ETAPA_CREDITOS : null,
      avisoCredito
    };
  };

  E.STATUS = {
    incluso: { rotulo: 'Incluso', classe: 'ok' },
    obrigatorio: { rotulo: 'Obrigatório', classe: 'warn' },
    opcional: { rotulo: 'Opcional', classe: 'info' },
    consulta: { rotulo: 'Sob consulta', classe: 'muted' },
    confirmar: { rotulo: 'A confirmar', classe: 'warn' },
    nao: { rotulo: 'Não contratado', classe: 'muted' },
    credito: { rotulo: 'Crédito', classe: 'ok' },
    info: { rotulo: 'Informado', classe: 'muted' }
  };

  root.ZR3Engine = E;
  if (typeof module !== 'undefined') module.exports = E;
})(typeof window !== 'undefined' ? window : globalThis);
