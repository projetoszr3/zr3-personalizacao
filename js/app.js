(function () {
  'use strict';

  const CFG = window.ZR3_CONFIG;
  const E = window.ZR3Engine;
  const STORE_KEY = 'zr3-personalizacao-etapa3';

  const HOSPEDADO = !!(window.claude && typeof window.claude.use === 'function');
  const downloadsNs = HOSPEDADO ? Promise.resolve().then(() => window.claude.use('downloads')).catch(() => null) : Promise.resolve(null);
  const REVISAO = new URLSearchParams(location.search).has('revisao');
  const $app = document.getElementById('app');
  const $modal = document.getElementById('modal-root');
  const $toast = document.getElementById('toast');

  const P = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    sacada: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/>',
    vaso: '<path d="M10 4 8 6"/><path d="M17 19v2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
    interruptor: '<rect width="20" height="12" x="2" y="6" rx="6" ry="6"/><circle cx="8" cy="12" r="2"/>',
    fechadura: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    automacao: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    persiana: '<path d="M3 3h18"/><path d="M20 7H8"/><path d="M20 11H8"/><path d="M10 19h10"/><path d="M8 15h12"/><path d="M4 3v14"/><circle cx="4" cy="19" r="2"/>',
    mais: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    menos: '<path d="M5 12h14"/>',
    resumo: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pausa: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    externo: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/>',
    alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    msg: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    edit: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
    nuvem: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m9 14 2 2 4-4"/>',
    imagem: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    fio: '<path d="M4 9a2 2 0 0 1-2-2V5h6v2a2 2 0 0 1-2 2Z"/><path d="M3 5V3"/><path d="M7 5V3"/><path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M17 21v-2"/><path d="M21 21v-2"/><path d="M22 19h-6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/>',
    ferramenta: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
    cena: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    caixa: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 8.7 5 8.7-5"/>',
    zigbee: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10"/><path d="m6.1 7.8 4.8 8.4"/><path d="m17.9 7.8-4.8 8.4"/>',
    lista: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>'
  };
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.info}</svg>`;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const brl = E.brl;
  const pad2 = E.pad2;
  const precoTag = (v, padrao) => (v == null ? '<span class="price consult">Valor sob consulta</span>' : v === 0 ? `<span class="price zero">${padrao ? 'Incluso no padrão' : 'Sem custo adicional'}</span>` : v < 0 ? `<span class="price credit">Crédito de ${brl(-v)}</span>` : `<span class="price">+ ${brl(v)}</span>`);

  const tagProtocolo = (L) => { const p = L && (L.linha || L).protocolo; return p ? `<span class="badge b-prot b-${p}">${ic(p === 'wifi' ? 'wifi' : 'zigbee')}${esc(E.protocoloLinha(L))}</span>` : ''; };
  const badges = (o) =>
    [
      tagProtocolo(o),
      o.padrao ? '<span class="badge b-ok">Padrão</span>' : '',
      o.demo ? '<span class="badge b-demo">Exemplo</span>' : '',
      REVISAO && o.aRevisar ? '<span class="badge b-rev">A revisar</span>' : ''
    ].join('');
  const helpBtn = (k) => (k && CFG.glossario[k] ? `<button type="button" class="help" data-act="help" data-k="${k}" aria-label="O que é ${esc(CFG.glossario[k].titulo)}?">${ic('info')}</button>` : '');
  let captura = false;
  const img = (src, alt, cls = '') => (src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="${captura ? 'eager' : 'lazy'}">` : `<div class="${cls} ph" role="img" aria-label="Imagem a definir">${ic('imagem')}<span>Imagem a definir</span></div>`);

  let S = carregar();
  let erros = [];
  let ultimoPdf = null;
  let telaSalva = null;

  function estadoUtil(s) {
    const obj = (x) => !!x && typeof x === 'object' && !Array.isArray(x);
    if (!obj(s) || s.v !== 1 || !E.empreendimento(CFG, s.empId) || !obj(s.cliente) || !obj(s.escolhas)) return false;
    if (!obj(s.visitadas)) s.visitadas = {};
    if (typeof s.tela !== 'string') s.tela = 'inicio';
    ['nome', 'unidade', 'contato', 'contatoTipo'].forEach((k) => { if (s.cliente[k] != null && typeof s.cliente[k] !== 'string') s.cliente[k] = String(s.cliente[k]); });
    Object.keys(s.escolhas).forEach((k) => { if (!obj(s.escolhas[k])) delete s.escolhas[k]; });
    try {
      const e = E.empreendimento(CFG, s.empId);
      E.calcular(s, e); E.avisos(s, e);
      E.telas(e, s).forEach((t) => E.validarTela(s, CFG, e, t));
      return true;
    } catch (err) { console.warn('Escolhas salvas descartadas:', err); return false; }
  }
  function carregar() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (estadoUtil(s)) { if (!s.unidadeBase && s.cliente.unidade) s.unidadeBase = s.cliente.unidade; return s; }
      }
    } catch (e) {   }
    return E.novoEstado(CFG);
  }
  function salvar(alterouEscolha = true) {
    if (alterouEscolha && S.confirmado) S.confirmado = false;
    if (alterouEscolha && S.pdf) { S.pdf = null; ultimoPdf = null; }
    if (alterouEscolha && S.empId) { try { aplicarBrindes(emp()); sincronizarMarcas(emp()); } catch (e) {   } }
    S.atualizadoEm = new Date().toISOString();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {   }
    const el = document.getElementById('save-state');
    if (el) el.innerHTML = saveLabel();
  }
  const temProgresso = () => !!(S.cliente.nome || Object.keys(S.escolhas).length);
  const saveLabel = () => (S.atualizadoEm ? `${ic('nuvem')}<span>Salvo às ${new Date(S.atualizadoEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>` : `${ic('nuvem')}<span>Salvamento automático</span>`);

  const emp = () => E.empreendimento(CFG, S.empId);
  const telas = () => E.telas(emp(), S);
  const etapaAtual = () => E.etapas(emp(), S).find((e) => e.id === S.tela);

  function ir(tela, opts = {}) {
    const ts = telas();
    const alvo = ts.indexOf(tela);
    if (alvo < 0) return;
    const limite = E.limiteNavegacao(S, CFG, emp());

    if (alvo > limite && !S.visitadas[tela] && !opts.forcar) {

      ir(ts[limite], { mostrarErros: true });
      return;
    }
    S.tela = tela;
    S.visitadas[tela] = true;
    if (tela !== 'inicio') armarVoltar();
    const etN = E.etapas(emp(), S).find((x) => x.id === tela);
    if (sequencial(etN)) abaDeEntrada(emp(), etN, !!opts.deTras);
    erros = opts.mostrarErros ? E.validarTela(S, CFG, emp(), tela) : [];
    if (erros.length && etN) abaComErro(etN);
    salvar(false);
    render();
    if (erros.length) {
      const first = document.querySelector('.has-error, .field-error');
      if (first) first.scrollIntoView({ block: 'center' }); else window.scrollTo({ top: 0 });
      toast(`Falta concluir: ${erros[0].msg}`, 'erro');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    const h = document.querySelector('#conteudo h1');
    if (h) h.focus({ preventScroll: true });
  }

  function abaComErro(et) {
    if (!usaAbas(et)) return;
    S.abas = S.abas || {};
    const comErro = et.secoes.find((s) => erros.some((x) => x.campo === s.id || x.campo.startsWith(s.id + '-')));
    if (comErro) S.abas[et.id] = (abaDaSecao(et, comErro.id) || comErro).id;
    if (sequencial(et)) { const tErr = tabsSeq(et).find((t) => erros.some((x) => t.contem(x.campo))); if (tErr) S.abas[et.id] = tErr.id; }
  }
  function avancar() {
    const ts = telas();
    const i = ts.indexOf(S.tela);
    const etS = etapaAtual();
    if (sequencial(etS)) {
      const lista = tabsSeq(etS), atual = abaSeqAtiva(etS), k = lista.findIndex((t) => t.id === atual.id);
      if (k < lista.length - 1) {
        erros = validarAbaSeq(emp(), atual);
        if (erros.length) {
          render();
          const first = document.querySelector('.has-error, .field-error');
          if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
          toast(erros[0].msg, 'erro');
          return;
        }
        if (segurarAvisoNao(atual.membros)) return;
        marcarConcluida(etS, atual.id);
        irAba(etS, lista[k + 1].id);
        toast(`${etS.abaUnidade ? 'Agora: ' : 'Próximo: '}${lista[k + 1].rotulo}`);
        return;
      }
    }
    erros = E.validarTela(S, CFG, emp(), S.tela);
    if (erros.length) {
      const et = etapaAtual();
      abaComErro(et);
      render();
      const first = document.querySelector('.has-error, .field-error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast(erros[0].msg, 'erro');
      return;
    }
    if (etS && segurarAvisoNao(sequencial(etS) ? abaSeqAtiva(etS).membros : etS.secoes)) return;
    if (sequencial(etS)) { const l = tabsSeq(etS); marcarConcluida(etS, l[l.length - 1].id); }
    if (i < ts.length - 1) ir(ts[i + 1]);
  }

  function segurarAvisoNao(secs) {
    const e = emp(), ex = E.exigidos(S, e);
    S.avisosNao = S.avisosNao || {};
    const lista = secs || [];
    const pend = lista.find((s) => s.avisoNao && !ex[s.id] && E.resposta(S, e, s) === 'nao' && !S.avisosNao[s.id]);
    if (pend) {
      S.avisosNao[pend.id] = true;
      salvar(false); render();
      focarAviso('.aviso-nao');
      toast('Confira o aviso. Para seguir sem contratar, toque de novo para avançar.');
      return true;
    }

    const semAc = lista.find((s) => { const A = s.acionamento; return A && A.avisoSem && E.resposta(S, e, s) === 'sim' && !E.acionamento(S, s).sel.includes(A.avisoSem.opcao) && !S.avisosNao[chaveAvisoSem(s)]; });
    if (semAc) {
      S.avisosNao[chaveAvisoSem(semAc)] = true;
      salvar(false); render();
      focarAviso('.acion-op.destacar');
      toast('Confira o aviso. Para seguir sem essa opção, toque de novo para avançar.');
      return true;
    }
    return false;
  }
  const chaveAvisoSem = (s) => `${s.id}:sem-${s.acionamento.avisoSem.opcao}`;
  function focarAviso(sel) {
    const el = document.querySelector(sel);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (el.focus) el.focus({ preventScroll: true }); }
  }
  function voltar() {
    const ts = telas();
    const i = ts.indexOf(S.tela);
    const etS = etapaAtual();
    if (sequencial(etS)) {
      const lista = tabsSeq(etS), k = lista.findIndex((t) => t.id === abaSeqAtiva(etS).id);
      if (k > 0) { irAba(etS, lista[k - 1].id); return; }
    }
    if (i > 0) ir(ts[i - 1], { forcar: true, deTras: true });
  }

  let toastT;
  function toast(msg, tipo = '') {
    $toast.className = 'show ' + tipo;
    $toast.textContent = msg;
    clearTimeout(toastT);
    toastT = setTimeout(() => ($toast.className = ''), Math.min(6000, 2600 + msg.length * 25));
  }
  let modalVoltaFoco = null;
  function abrirModal(html, { titulo = '', largo = false } = {}) {
    modalVoltaFoco = document.activeElement;
    $modal.innerHTML = `<div class="overlay" data-act="fechar-modal"></div>
      <div class="sheet ${largo ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(titulo)}">
        <div class="sheet-head"><h2>${esc(titulo)}</h2><button type="button" class="icon-btn" data-act="fechar-modal" aria-label="Fechar">${ic('x')}</button></div>
        <div class="sheet-body">${html}</div>
      </div>`;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => $modal.classList.add('open'));
    const b = $modal.querySelector('.sheet-head .icon-btn');
    if (b) b.focus();
  }

  function abrirZoom(t) {
    const grupo = t.closest('.gallery, .thumbs, .figs');
    const btns = grupo ? [...grupo.querySelectorAll('[data-act="zoom"][data-src]')].filter((b) => b.dataset.src) : [t];
    const ini = Math.max(0, btns.indexOf(t));
    const slide = (b) => `<figure class="zoom zc-slide">${img(b.dataset.src, b.dataset.legenda || '')}${legendaHtml(b.dataset.legenda, b.dataset.nota, 'figcaption')}</figure>`;
    if (btns.length < 2) { abrirModal(slide(t), { titulo: 'Imagem ampliada', largo: true }); return; }
    abrirModal(`<div class="zc">
        <div class="zc-track" tabindex="0" aria-roledescription="carrossel">${btns.map(slide).join('')}</div>
        <div class="zc-bar">
          <button type="button" class="zc-nav" data-act="zc" data-d="-1" aria-label="Imagem anterior">${ic('left')}</button>
          <div class="zc-info"><span class="zc-count" aria-live="polite">${ini + 1} / ${btns.length}</span><span class="zc-dots">${btns.map((_, i) => `<i class="${i === ini ? 'on' : ''}"></i>`).join('')}</span></div>
          <button type="button" class="zc-nav" data-act="zc" data-d="1" aria-label="Próxima imagem">${ic('right')}</button>
        </div>
        <p class="zc-dica">Deslize para o lado para ver as outras imagens.</p>
      </div>`, { titulo: 'Imagem ampliada', largo: true });
    const tr = $modal.querySelector('.zc-track');
    const posicionar = () => { tr.scrollLeft = ini * tr.clientWidth; zcAtualizar(); };
    requestAnimationFrame(() => requestAnimationFrame(posicionar));
    let tm; tr.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(zcAtualizar, 60); }, { passive: true });
  }
  function zcIndice() { const tr = $modal.querySelector('.zc-track'); return tr ? Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth)) : 0; }
  function zcAtualizar() {
    const z = $modal.querySelector('.zc'); if (!z) return;
    const n = z.querySelectorAll('.zc-slide').length, i = Math.min(n - 1, zcIndice());
    z.querySelector('.zc-count').textContent = `${i + 1} / ${n}`;
    z.querySelectorAll('.zc-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
    const [ant, prox] = z.querySelectorAll('.zc-nav');
    ant.disabled = i === 0; prox.disabled = i === n - 1;
  }
  function zcIr(d) {
    const tr = $modal.querySelector('.zc-track'); if (!tr) return false;
    const n = tr.children.length, i = Math.min(n - 1, Math.max(0, zcIndice() + d));
    tr.scrollTo({ left: i * tr.clientWidth, behavior: 'smooth' });
    return true;
  }

  function smNav(d) {
    const th = [...$modal.querySelectorAll('.sm-gal .thumbs button')]; if (th.length < 2) return false;
    const i = th.findIndex((b) => b.classList.contains('cur'));
    const alvo = th[Math.min(th.length - 1, Math.max(0, i + d))];
    if (alvo && alvo !== th[i]) { alvo.click(); alvo.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    return true;
  }
  let smToque = null;
  document.addEventListener('touchstart', (ev) => {
    if (!ev.target.closest('.sm-main')) return;
    smToque = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
  }, { passive: true });
  document.addEventListener('touchend', (ev) => {
    if (!smToque) return;
    const dx = ev.changedTouches[0].clientX - smToque.x, dy = ev.changedTouches[0].clientY - smToque.y;
    smToque = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) smNav(dx < 0 ? 1 : -1);
  }, { passive: true });

  function fecharModal() {
    if (trocaPendente) { trocaPendente = null; setTimeout(render, 0); }
    $modal.classList.remove('open');
    $modal.innerHTML = '';
    document.body.classList.remove('no-scroll');
    if (modalVoltaFoco && document.body.contains(modalVoltaFoco)) modalVoltaFoco.focus();
  }

  function render() {
    try { renderTela(); } catch (err) {
      console.error(err);
      $app.innerHTML = `<main id="conteudo" class="wrap"><div class="card falha"><h1>Não foi possível abrir esta tela</h1><p>As escolhas salvas neste aparelho parecem incompletas. Toque abaixo para começar de novo.</p><button type="button" class="btn primary" data-act="recomecar-falha">Começar do zero</button></div></main>`;
    }
  }
  function renderTela() {
    const e = emp();
    const tela = S.tela;
    let corpo = '';
    if (tela === 'inicio') corpo = telaInicio(e);
    else if (tela === 'identificacao') corpo = telaIdentificacao(e);
    else if (tela === 'resumo') corpo = telaResumo(e);
    else corpo = telaEtapa(e, etapaAtual());

    const scroll = window.scrollY;
    const foco = chaveFoco(document.activeElement);
    $app.innerHTML = `
      ${cabecalho(e)}
      ${tela !== 'inicio' ? progresso(e) : ''}
      <main id="conteudo" class="wrap ${tela === 'inicio' ? 'inicio' : ''}" tabindex="-1">${corpo}</main>
      ${tela !== 'inicio' ? barraInferior(e) : ''}`;
    window.scrollTo(0, scroll);

    const faixa = document.querySelector('.tabs.seq'), cur = faixa && faixa.querySelector('.tab.cur');
    if (cur) faixa.scrollLeft = Math.max(0, cur.offsetLeft - faixa.offsetLeft - (faixa.clientWidth - cur.offsetWidth) / 2);

    const passos = document.querySelector('.steps'), pAtual = passos && passos.querySelector('.step.cur');
    if (pAtual) passos.scrollLeft = Math.max(0, pAtual.parentElement.offsetLeft - passos.offsetLeft - (passos.clientWidth - pAtual.offsetWidth) / 2);

    if (foco) { const el = $app.querySelector(foco); if (el && !el.disabled) el.focus({ preventScroll: true }); }
    if (!captura) iniciarLoopFotos();
  }

  function chaveFoco(el) {
    if (!el || el === document.body || !$app.contains(el)) return '';
    if (el.id) return '#' + CSS.escape(el.id);
    if (!el.dataset || !el.dataset.act) return '';
    return `[data-act="${CSS.escape(el.dataset.act)}"]` + Object.keys(el.dataset).filter((k) => k !== 'act').map((k) => `[data-${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}="${CSS.escape(el.dataset[k])}"]`).join('');
  }

  function cabecalho(e) {
    return `<header class="topbar">
      <div class="wrap topbar-in">
        <button type="button" class="brand" data-act="goto" data-tela="inicio" aria-label="Personalização 3ª etapa${e ? ' · ' + esc(e.nome) : ''} – página inicial">
          <img src="${esc(CFG.empresa.logo)}" alt="ZR3 Empreendimentos">
          <span class="brand-txt"><strong>Personalização</strong><small>3ª etapa${e ? ' · ' + esc(e.nome) : ''}</small></span>
        </button>
        <span id="save-state" class="save-state">${saveLabel()}</span>
      </div>
    </header>`;
  }

  function progresso(e) {
    const ts = telas().slice(1);
    const etapas = E.etapas(e, S);
    const limite = E.limiteNavegacao(S, CFG, e);
    const todas = telas();
    const atual = ts.indexOf(S.tela);
    const info = (t) => (t === 'identificacao' ? { curto: 'Identificação', icone: 'user' } : t === 'resumo' ? { curto: 'Resumo', icone: 'resumo' } : etapas.find((x) => x.id === t));
    const itens = ts
      .map((t, i) => {
        const inf = info(t);
        const idxGlobal = todas.indexOf(t);
        const ok = t !== 'resumo' && S.visitadas[t] && E.validarTela(S, CFG, e, t).length === 0;
        const bloqueada = idxGlobal > limite && !S.visitadas[t];
        const cls = ['step', t === S.tela ? 'cur' : '', ok ? 'is-done' : '', bloqueada ? 'lock' : ''].join(' ');
        return `<li><button type="button" class="${cls}" data-act="goto" data-tela="${t}" ${bloqueada ? 'aria-disabled="true"' : ''} ${t === S.tela ? 'aria-current="step"' : ''}>
          <span class="dot">${ok && t !== S.tela ? ic('check') : ic(inf.icone)}</span><span class="lbl">${esc(inf.curto)}</span>
        </button></li>`;
      })
      .join('');
    const pct = Math.round(((atual + 1) / ts.length) * 100);
    const inf = info(S.tela);
    return `<nav class="progress" aria-label="Etapas da personalização">
      <div class="wrap">
        <div class="progress-meta"><span>Etapa ${atual + 1} de ${ts.length}</span><strong>${esc(inf.titulo || inf.curto)}</strong></div>
        <div class="bar" role="progressbar" aria-label="Progresso da personalização" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
        <ol class="steps">${itens}</ol>
      </div>
    </nav>`;
  }

  function barraInferior(e) {
    const c = E.calcular(S, e);
    const ts = telas();
    const i = ts.indexOf(S.tela);
    const ultimo = S.tela === 'resumo';
    const totalTxt = `<span class="tot-l">Total parcial</span><strong>${brl(c.total)}</strong>${c.consulta.length ? `<span class="tot-c">+ ${c.consulta.length} sob consulta</span>` : ''}`;
    return `<div class="bottombar"><div class="wrap bottombar-in">
      <button type="button" class="btn ghost bb-btn" data-act="voltar" aria-label="Voltar" ${i <= 0 ? 'disabled' : ''}>${ic('left')}<span class="bb-tx">Voltar</span></button>
      <div class="tot" aria-live="polite">${totalTxt}</div>
      ${ultimo ? '<span class="btn-spacer"></span>' : `<button type="button" class="btn primary bb-btn" data-act="avancar" aria-label="${ts[i + 1] === 'resumo' ? 'Revisar' : 'Continuar'}"><span class="bb-tx">${ts[i + 1] === 'resumo' ? 'Revisar' : 'Continuar'}</span>${ic('right')}</button>`}
    </div></div>`;
  }

  function telaInicio(e) {
    const etapas = E.etapas(e, S);
    const retomar = temProgresso()
      ? `<div class="resume card">
          <div class="resume-tx"><strong>Você tem uma personalização em andamento</strong>
          <span>${S.cliente.nome ? esc(S.cliente.nome) + ' · ' : ''}${S.cliente.unidade ? 'Unidade ' + esc(S.cliente.unidade) + ' · ' : ''}salva neste dispositivo${S.atualizadoEm ? ' em ' + new Date(S.atualizadoEm).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : ''}.</span></div>
          <div class="resume-act"><button type="button" class="btn primary" data-act="retomar">Continuar de onde parei ${ic('right')}</button>
          <button type="button" class="btn ghost" data-act="recomecar">${ic('reset')}<span>Começar do zero</span></button></div>
        </div>`
      : '';
    const video = e.videoUrl
      ? /\.mp4($|\?)/i.test(e.videoUrl)
        ? `<video controls preload="metadata" src="${esc(e.videoUrl)}"></video>`
        : youtubeId(e.videoUrl)

          ? HOSPEDADO
            ? `<a class="yt-facade yt-link" href="https://www.youtube.com/watch?v=${esc(youtubeId(e.videoUrl))}" target="_blank" rel="noopener"><span class="yt-play">${ic('play')}</span><span class="yt-label">Assistir ao vídeo explicativo no YouTube</span></a>`
            : `<button type="button" class="yt-facade" data-act="video-play" aria-label="Assistir ao vídeo explicativo da 3ª etapa">
              <img class="yt-thumb" src="https://i.ytimg.com/vi/${esc(youtubeId(e.videoUrl))}/hqdefault.jpg" alt="" loading="lazy">
              <span class="yt-play">${ic('play')}</span><span class="yt-label">Assistir ao vídeo explicativo</span>
            </button>`
          : `<iframe src="${esc(e.videoUrl)}" title="Vídeo explicativo da 3ª etapa" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
      : `<div class="video-ph">${ic('play')}<strong>Vídeo explicativo</strong><span>Em breve: o vídeo desta etapa será disponibilizado aqui.</span><span class="badge b-demo">Exemplo · inserir vídeo</span></div>`;
    return `
    <section class="hero">${e.capa ? `<div class="hero-bg" style="background-image:url('${esc(e.capa)}')"></div>` : ''}
      <div class="wrap hero-in">
        <img class="hero-logo" src="${esc(CFG.empresa.logoBranco)}" alt="ZR3 Empreendimentos">
        <p class="eyebrow">${esc(e.nome)}</p>
        <h1 tabindex="-1">${esc(CFG.textos.boasVindasTitulo)}</h1>
        <p class="lead">${esc(CFG.textos.boasVindasTexto)}</p>
        ${e.prazo ? `<p class="prazo">Prazo para envio: <strong>${esc(e.prazo)}</strong></p>` : ''}
        <div class="hero-act">
          <button type="button" class="btn primary lg" data-act="iniciar">${temProgresso() ? 'Ir para a personalização' : 'Iniciar personalização'} ${ic('right')}</button>
          <button type="button" class="btn light lg" data-act="prazos">${ic('relogio')}<span>Ver prazos por pavimento</span></button>
          ${e.manualUrl ? `<a class="btn light lg" href="${esc(e.manualUrl)}" target="_blank" rel="noopener">${ic('book')}<span>Consultar manual completo</span></a>` : ''}
        </div>
      </div>
    </section>
    <div class="wrap">
      ${retomar}
      <div class="intro-grid">
        <section class="card video-card" aria-label="Vídeo explicativo"><div class="video" id="video-box">${video}</div>
          ${youtubeId(e.videoUrl) ? `<a class="video-link" href="https://www.youtube.com/watch?v=${esc(youtubeId(e.videoUrl))}" target="_blank" rel="noopener">${ic('play')}<span>Não carregou? Assistir no YouTube</span></a>` : ''}
        </section>
        <section class="card como">
          <h2>Como funciona</h2>
          <ol class="como-list">
            <li><span>1</span><div><strong>Identifique sua unidade</strong><p>Nome, unidade e contato.</p></div></li>
            <li><span>2</span><div><strong>Conheça e escolha</strong><p>Fotos, especificações e valores de cada item. Toque em “Saiba mais” para os detalhes técnicos.</p></div></li>
            <li><span>3</span><div><strong>Revise tudo</strong><p>Volte a qualquer etapa e ajuste antes de finalizar.</p></div></li>
            <li><span>4</span><div><strong>Gere o PDF e envie à ZR3</strong><p>Encaminhe o documento à equipe de personalização. Só assim a ZR3 recebe as suas escolhas.</p></div></li>
          </ol>
          <p class="hint">${ic('nuvem')} Seu progresso é salvo automaticamente neste dispositivo.</p>
        </section>
      </div>
      <section class="card regras-card regras-topo"><h2>${ic('info')} Instruções gerais</h2>${regrasHtml(true)}${linkWhats(e)}</section>
      <section class="card etapas-ov">
        <h2>O que você vai definir</h2>
        <ul class="chips">${etapas.map((et) => `<li>${ic(et.icone)}<span>${esc(et.titulo)}</span></li>`).join('')}</ul>
      </section>
      <footer class="foot">${esc(CFG.empresa.nome)} · ${esc(CFG.empresa.endereco)} · ${esc(CFG.empresa.telefone)}<br><span class="muted">Versão ${esc(CFG.versao || '—')} · Tabela de valores ${esc(E.codigoTabela(CFG))}</span></footer>
    </div>`;
  }

  function linkWhats(e) {
    const n = E.soDigitos((e.contato || {}).whatsapp);
    if (!n) return '';
    const txt = encodeURIComponent(`Olá! Tenho uma dúvida sobre a personalização da 3ª etapa do ${e.nome}.`);
    return `<a class="btn ghost sm whats" href="https://wa.me/${n}?text=${txt}" target="_blank" rel="noopener">${ic('msg')}<span>Falar com a ZR3 no WhatsApp</span></a>`;
  }

  function regrasHtml(semTitulo) {
    const r = E.regrasGerais(CFG, emp());
    if (!r.length) return '';
    const [primeira, ...demais] = r;
    return `${semTitulo ? '' : '<h4 class="regras-t">Instruções gerais</h4>'}<div class="regra-destaque">${ic('alerta')}<p>${esc(primeira)}</p></div>${demais.length ? `<ul class="bul regras">${demais.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`;
  }

  const errDe = (campo) => erros.find((x) => x.campo === campo);
  const fieldErr = (campo) => (errDe(campo) ? `<p class="field-error" id="err-${campo}">${esc(errDe(campo).msg)}</p>` : '');
  const aria = (campo) => (errDe(campo) ? `aria-invalid="true" aria-describedby="err-${campo}"` : '');

  function finalBox(e) {
    const c = S.cliente;
    if (!String(c.unidade || '').trim()) return '<span class="final-empty">Informe o número da unidade</span>';
    const cad = E.cadastroUnidade(c.unidade, e);
    if (cad.erro || (!cad.final && !cad.grupo)) return `<span class="final-empty">${esc(cad.erro || 'Selecione uma unidade da lista')}</span>`;
    const nome = cad.grupo ? cad.grupo.nome : `Final ${pad2(cad.final)}`;
    return `<span class="final-val">${esc(nome)}</span><span class="badge b-ok">${ic('check')} Cadastro</span>`;
  }

  function prazoBox(e) {
    const pz = E.prazoUnidade(S.cliente.unidade, e);
    if (!pz) return '';
    if (!pz.prazo) return `<p class="prazo-un">${ic('relogio')}<span>Prazo para envio: <strong>a definir pela ZR3</strong></span></p>`;
    return pz.vencido
      ? `<p class="prazo-un vencido">${ic('alerta')}<span>O prazo para envio desta unidade terminou em <strong>${E.dataBr(pz.prazo)}</strong>. Você ainda pode enviar, mas a ZR3 vai avaliar se é possível atender as suas escolhas.</span></p>`
      : `<p class="prazo-un">${ic('relogio')}<span>Prazo para envio: <strong>até ${E.dataBr(pz.prazo)}</strong></span></p>`;
  }

  function modalPrazos() {
    const e = emp();
    const pz = e.prazosPorPavimento || {};
    const uns = E.unidadesCadastradas(e).map((x) => x.unidade);
    const pavs = Object.keys(pz).map(Number).sort((x, y) => x - y);
    abrirModal(`<p class="sec-desc">O prazo varia conforme o pavimento da unidade, acompanhando o avanço da obra. Depois do prazo, a ZR3 avalia caso a caso se ainda é possível atender as escolhas.</p>
      <table class="prazos"><thead><tr><th>Pavimento</th><th>Prazo para envio</th></tr></thead><tbody>${pavs.map((n) => {
        const lista = uns.filter((u) => E.pavimento(u) === n);
        const faixa = lista.length ? `${lista[0]} a ${lista[lista.length - 1]}` : '';
        const venc = pz[n] && lista.length && E.prazoUnidade(lista[0], e).vencido;
        return `<tr><td>${n}º pavimento${faixa ? `<small class="muted"> · ${faixa}</small>` : ''}</td><td>${pz[n] ? `<strong>${E.dataBr(pz[n])}</strong>${venc ? ' <span class="badge b-err">Encerrado</span>' : ''}` : '<span class="muted">A definir</span>'}</td></tr>`;
      }).join('')}</tbody></table>`, { titulo: 'Prazos para envio por pavimento' });
  }

  const norm = (x) => String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let comboAtivo = -1;
  function comboFiltrar(texto) {
    const lista = E.unidadesCadastradas(emp());
    const q = norm(texto).trim();
    if (!q || lista.some((x) => x.unidade === q)) return lista;
    const dig = E.soDigitos(q);
    const ini = lista.filter((x) => dig && x.unidade.startsWith(dig));
    const resto = lista.filter((x) => !ini.includes(x) && (norm(x.grupo.nome).includes(q) || (dig && x.unidade.includes(dig))));
    return ini.concat(resto);
  }
  function comboAbrir(texto) {
    const ul = document.getElementById('un-list');
    const inp = document.getElementById('f-un');
    if (!ul || !inp) return;
    const itens = comboFiltrar(texto == null ? inp.value : texto);
    let html = '';
    let andar = null;
    itens.forEach((x, i) => {
      const a = x.unidade.length > 2 ? x.unidade.slice(0, -2) : '';
      if (a !== andar && !itens.__semGrupo) { andar = a; html += `<li role="presentation" class="opt-h">${a ? a + 'º pavimento' : 'Unidades'}</li>`; }
      const sel = x.unidade === S.cliente.unidade;
      html += `<li role="option" id="un-opt-${i}" data-un="${esc(x.unidade)}" aria-selected="${sel}" class="${sel ? 'sel' : ''}"><strong>${esc(x.unidade)}</strong><span>${esc(x.grupo.nome)}</span>${sel ? ic('check') : ''}</li>`;
    });
    ul.innerHTML = html || '<li role="presentation" class="opt-empty">Nenhuma unidade encontrada</li>';
    const estavaFechada = ul.hidden;
    ul.hidden = false;
    inp.setAttribute('aria-expanded', 'true');

    if (estavaFechada) {
      const r = inp.getBoundingClientRect();
      const livre = window.innerHeight - 90 - r.bottom;
      if (livre < Math.min(300, window.innerHeight * 0.45)) window.scrollBy({ top: r.top - 130, behavior: 'smooth' });
    }
    comboAtivo = -1;
    const cur = ul.querySelector('[aria-selected="true"]');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  function comboFechar() {
    const ul = document.getElementById('un-list');
    const inp = document.getElementById('f-un');
    if (ul) ul.hidden = true;
    if (inp) { inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); }
    comboAtivo = -1;
  }
  function comboMover(d) {
    const ops = [...document.querySelectorAll('#un-list [role="option"]')];
    if (!ops.length) return;
    comboAtivo = (comboAtivo + d + ops.length) % ops.length;
    ops.forEach((o, i) => o.classList.toggle('act', i === comboAtivo));
    ops[comboAtivo].scrollIntoView({ block: 'nearest' });
    document.getElementById('f-un').setAttribute('aria-activedescendant', ops[comboAtivo].id);
  }

  let trocaPendente = null;
  const temEscolhas = () => Object.keys(S.escolhas || {}).some((k) => { const v = S.escolhas[k] || {}; return Object.keys(v).some((x) => v[x] && (typeof v[x] !== 'object' || Object.keys(v[x]).length)); });
  function definirUnidade(valor, opts = {}) {
    const g0 = E.cadastroUnidade(valor, emp()).grupo;
    const base = S.unidadeBase;
    if (g0 && base && E.soDigitos(base) !== E.soDigitos(valor) && temEscolhas()) {
      trocaPendente = { valor, opts };
      setTimeout(comboFechar, 0);
      abrirModal(`<p>As escolhas feitas para a unidade <strong>${esc(base)}</strong> serão apagadas, porque os itens disponíveis dependem do final de cada unidade.</p>
        <div class="modal-act"><button type="button" class="btn ghost" data-act="troca-cancelar">Manter a unidade ${esc(base)}</button><button type="button" class="btn danger" data-act="troca-ok">Trocar para ${esc(valor)}</button></div>`, { titulo: 'Trocar de unidade' });
      return;
    }
    aplicarUnidade(valor, opts);
  }
  function aplicarUnidade(valor, { focarProximo = false } = {}) {
    const antes = S.cliente.unidade;
    S.cliente.unidade = valor;
    S.cliente.final = E.cadastroUnidade(valor, emp()).final;
    resetSacadaSeMudou();
    limparErroCampo('unidade');
    salvar(antes !== valor);
    const g = E.grupo(S, emp());
    if (g) S.unidadeBase = valor;
    if (g || !valor) {
      comboFechar();
      render();
      if (focarProximo) { const n = document.getElementById('f-contato'); if (n) n.focus(); }
    } else {
      const box = document.getElementById('final-box'); if (box) box.innerHTML = finalBox(emp());
      const pb = document.getElementById('prazo-box'); if (pb) pb.innerHTML = prazoBox(emp());
    }
  }

  const mascaraTel = (v) => {
    const d = E.soDigitos(v).slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const youtubeId = (url) => {
    const m = String(url || '').match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : null;
  };
  function videoEmbed(url) {
    const id = youtubeId(url);
    const origem = /^https?:$/.test(location.protocol) ? `&origin=${encodeURIComponent(location.origin)}` : '';
    return id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1&playsinline=1${origem}` : url;
  }

  function telaIdentificacao(e) {
    const c = S.cliente;
    const emps = CFG.empreendimentos.filter(E.ativo);
    return `
    <div class="page-head"><h1 tabindex="-1">Identificação do cliente e da unidade</h1>
      <p>Esses dados identificam as suas escolhas no documento final. O final da unidade é identificado automaticamente pelo cadastro do empreendimento.</p></div>
    <form class="card form" novalidate onsubmit="return false">
      <div class="f ${errDe('nome') ? 'has-error' : ''}">
        <label for="f-nome">Nome completo <span class="req" aria-hidden="true">*</span></label>
        <input id="f-nome" data-bind="nome" autocomplete="name" value="${esc(c.nome)}" ${aria('nome')} required>${fieldErr('nome')}
        <p class="f-hint">Basta o nome e o contato de um dos promitentes compradores.</p>
      </div>
      <div class="f ${errDe('empreendimento') ? 'has-error' : ''}">
        <label for="f-emp">Empreendimento <span class="req" aria-hidden="true">*</span></label>
        <select id="f-emp" data-bind="empId">${emps.map((x) => `<option value="${esc(x.id)}" ${x.id === S.empId ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select>${fieldErr('empreendimento')}
      </div>
      <div class="row2 un-row">
        <div class="f ${errDe('unidade') ? 'has-error' : ''}">
          <label for="f-un">Número da unidade <span class="req" aria-hidden="true">*</span></label>
          ${E.unidadesCadastradas(e).length
            ? `<div class="combo-box" id="un-combo">
                <input id="f-un" data-bind="unidade" role="combobox" aria-expanded="false" aria-controls="un-list" aria-autocomplete="list" autocomplete="off" inputmode="numeric" placeholder="Pesquise ou selecione (ex.: 501)" value="${esc(c.unidade)}" ${aria('unidade')}>
                <button type="button" class="combo-toggle" data-act="un-toggle" tabindex="-1" aria-label="Mostrar lista de unidades">${ic('right')}</button>
                <ul id="un-list" role="listbox" tabindex="-1" aria-label="Unidades do ${esc(e.nome)}" hidden></ul>
              </div>`
            : `<input id="f-un" data-bind="unidade" inputmode="numeric" autocomplete="off" placeholder="Ex.: 501" value="${esc(c.unidade)}" ${aria('unidade')}>`}
          ${fieldErr('unidade')}
        </div>
        <div class="f">
          <span class="lbl-static">Final / planta ${helpBtn('final')}</span>
          <div id="final-box" class="final-box" aria-live="polite">${finalBox(e)}</div>
          <div id="prazo-box">${prazoBox(e)}</div>
        </div>
      </div>
      <div class="f ${errDe('contato') ? 'has-error' : ''}">
        <label for="f-contato">Contato <span class="req" aria-hidden="true">*</span> <span class="muted">(telefone ou e-mail)</span></label>
        <div class="contato-row">
          <select id="f-ctipo" data-bind="contatoTipo" aria-label="Tipo de contato">
            <option value="whatsapp" ${c.contatoTipo !== 'email' ? 'selected' : ''}>Telefone / WhatsApp</option>
            <option value="email" ${c.contatoTipo === 'email' ? 'selected' : ''}>E-mail</option>
          </select>
          ${c.contatoTipo === 'email'
            ? `<input id="f-contato" type="email" data-bind="contato" autocomplete="email" inputmode="email" placeholder="seuemail@exemplo.com" value="${esc(c.contato)}" ${aria('contato')}>`
            : `<input id="f-contato" type="tel" data-bind="contato" autocomplete="tel" inputmode="tel" placeholder="(47) 99999-0000" value="${esc(c.contato)}" ${aria('contato')}>`}
        </div>
        ${fieldErr('contato')}
      </div>
      <p class="hint">${ic('cadeado')} Os dados ficam salvos apenas neste dispositivo e só são enviados à ZR3 quando você encaminhar o PDF.</p>
    </form>`;
  }

  function telaEtapa(e, et) {
    if (!et) return '';
    const multi = et.secoes.length > 1;
    const avisos = E.avisos(S, e).filter((a) => a.etapa && a.etapa.id === et.id && a.local !== 'secao');
    return `
    <div class="page-head">
      <span class="eyebrow-dark">${ic(et.icone)} ${esc(et.curto || '')}</span>
      <h1 tabindex="-1">${esc(et.titulo)}</h1>
      ${et.intro ? `<p>${esc(et.intro)}</p>` : ''}
    </div>
    ${et.imagem && primeiraAba(et) ? `<div class="banner">${img(et.imagem, et.titulo)}</div>` : ''}
    ${et.servicos && primeiraAba(et) && !et.secoes.some((x) => x.tipo === 'explicacao') ? servicosHtml(et.servicos, !sequencial(et) || !concluida(et, tabsSeq(et)[0].id)) : ''}
    ${et.passos && primeiraAba(et) ? `<details class="card passos"><summary>${ic('lista')} ${esc(et.passos.titulo)}</summary>${et.passos.texto ? `<p>${esc(et.passos.texto)}</p>` : ''}<ol>${et.passos.itens.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></details>` : ''}
    ${avisos.map((a) => `<div class="callout warn">${ic('alerta')}<p>${esc(a.mensagem)}</p></div>`).join('')}
    ${usaAbas(et) ? abasEtapa(e, et) : et.secoes.filter((s) => !captura || s.tipo !== 'explicacao').map((s, i) => `<section class="sec" id="sec-${s.id}" aria-labelledby="h-${s.id}">${multi ? `<h2 class="sec-title" id="h-${s.id}"><span class="sec-n">${i + 1}</span>${esc(s.titulo)} ${helpBtn(s.ajuda)}</h2>` : `<h2 class="sr-only" id="h-${s.id}">${esc(s.titulo)}</h2>`}${secao(e, s)}</section>`).join('')}`;
  }

  function servicosHtml(sv, aberto) {
    return `<details class="card passos servicos" ${aberto ? 'open' : ''}><summary>${ic('lista')} ${esc(sv.titulo)}</summary>
      ${sv.texto ? `<p>${esc(sv.texto)}</p>` : ''}
      <ol class="serv">${sv.itens.map((x) => `<li><strong>${esc(x.titulo)}</strong><p>${esc(x.texto)}</p><dl><div><dt>Quem e quando</dt><dd>${esc(x.quem)}</dd></div><div><dt>Custo</dt><dd>${esc(x.custo)}</dd></div></dl></li>`).join('')}</ol>
      ${sv.nota ? `<p class="note">${ic('info')} ${esc(sv.nota)}</p>` : ''}
    </details>`;
  }

  function gruposEdit(s) {
    const es = E.esc(S, s.id);
    if (!Array.isArray(es.grupos) || !es.grupos.length) es.grupos = E.gruposRaw(S, s).map((g) => ({ linha: g.linha, cor: g.cor, qtd: Object.assign({}, g.qtd || {}) }));
    return es.grupos;
  }
  function sincronizarQtd(s) {
    const es = E.esc(S, s.id), tot = {};
    (es.grupos || []).forEach((g) => Object.entries(g.qtd || {}).forEach(([k, n]) => { if (n > 0) tot[k] = (tot[k] || 0) + n; }));
    es.qtd = tot;
  }

  function marcarAuto(alvo, resposta) {
    const es = E.esc(S, alvo.id);
    if (!es.auto) es.autoAntes = es.resposta || null;
    es.resposta = resposta; es.auto = true; limparErro(alvo.id);
  }

  function aplicarBrindes(e) {
    E.secoes(e, S).filter((x) => x.tipo === 'persianas' && x.linhas).forEach((sec) => {
      const L = sec.linhas, es = E.esc(S, L.id);
      const bi = (sec.ambientes || []).map((a) => E.brindeInterruptor(S, e, sec, a.id)).find(Boolean);
      if (bi && !es.linha) {
        const o = L.opcoes.find((x) => x.id === bi.linha && E.ativo(x));
        if (o) { es.linha = o.id; es.cor = (o.cores || []).some((c) => c.id === bi.cor) ? bi.cor : ((o.cores || [])[0] || {}).id || null; es.tom = E.tomEscolhido(L, es); es.autoBrinde = true; }
      } else if (!bi && es.autoBrinde) {
        const pediu = (sec.ambientes || []).some((a) => (((S.escolhas[sec.id] || {}).amb || {})[a.id]) === 'sim');
        if (!pediu) { delete es.linha; delete es.cor; delete es.tom; }
        delete es.autoBrinde;
      }
    });
  }
  function sincronizarMarcas(e) {
    const ativas = E.marcasAtivas(S, e);

    ativas.filter((m) => m.opcao && m.opcao.exige).forEach((m) => {
      const alvo = E.secao(e, m.secao, S);
      if (alvo && E.resposta(S, e, alvo) !== m.resposta) { marcarAuto(alvo, m.resposta); toast(`${alvo.aba || alvo.titulo} marcado: ${m.mensagem.charAt(0).toLowerCase() + m.mensagem.slice(1)}`); }
    });

    E.secoes(e, S).forEach((sec) => {
      const es = S.escolhas[sec.id];
      if (!es || !es.auto || ativas.some((m) => m.secao === sec.id)) return;

      const et = sec._etapa, tb = et && sequencial(et) ? tabsSeq(et).find((x) => x.contem(sec.id)) : null;
      const jaPassou = tb ? concluida(et, tb.id) : !!(et && S.visitadas[et.id]);
      const era = es.resposta;
      es.resposta = es.autoAntes || (jaPassou ? 'nao' : null);
      delete es.auto; delete es.autoAntes;
      if (era !== es.resposta) { if (sec.aceite) es.aceite = false; toast(`${sec.aba || sec.titulo} desmarcado: deixou de ser necessário para as suas escolhas.`); }
    });
  }

  const linhasAbertas = new Set();
  const gruposAbertos = new Set();
  const minPreco = (o) => { const v = Object.values(o.precos || {}).filter((x) => x != null); return v.length ? Math.min(...v) : null; };

  let passoFotos = 0;
  function passosLinha(L, o, cor) {
    const seq = Object.keys(L.pecasCurtas || {}), porCor = ((o.imagens || {})[cor.id]) || {}, srcs = [], passos = [];
    let ult = -1;
    seq.forEach((p) => {
      const rot = L.pecasCurtas[p], tem = Object.prototype.hasOwnProperty.call(o.precos || {}, p), src = tem ? porCor[p] : null;
      if (src) { let i = srcs.indexOf(src); if (i < 0) { srcs.push(src); i = srcs.length - 1; } ult = i; passos.push([i, rot, 0]); }
      else passos.push([ult, tem ? `${rot} · sem foto` : ((L.semPeca || {})[p] || `Sem ${rot.toLowerCase()}`), 1]);
    });
    passos.forEach((x) => { if (x[0] < 0) x[0] = 0; });
    return { srcs, passos };
  }
  function fotoCard(L, o, cor, foto) {
    if (!L.fotosEmLoop || !cor || captura) return `<span class="lc-img">${img(foto, o.nome)}</span>`;
    const { srcs, passos } = passosLinha(L, o, cor);
    if (srcs.length < 2) return `<span class="lc-img">${img(foto, o.nome)}</span>`;
    const [ia, ra, fa] = passos[passoFotos % passos.length];
    return `<span class="lc-img loop ${fa ? 'falta' : ''}" data-passos="${esc(JSON.stringify(passos))}">${srcs.map((src, i) => `<span class="lc-sl ${i === ia ? 'on' : ''}">${img(src, o.nome)}</span>`).join('')}<em class="lc-rot">${esc(ra)}</em></span>`;
  }

  let loopFotos = null;
  let fotosPausadas = false;
  function iniciarLoopFotos() {
    if (loopFotos || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    loopFotos = setInterval(() => {
      if (document.hidden || fotosPausadas) return;
      passoFotos++;
      document.querySelectorAll('.lc-img.loop').forEach((b) => {
        let ps; try { ps = JSON.parse(b.dataset.passos); } catch (_) { return; }
        const [i, rot, falta] = ps[passoFotos % ps.length];
        b.querySelectorAll('.lc-sl').forEach((x, k) => x.classList.toggle('on', k === i));
        b.classList.toggle('falta', !!falta);
        const em = b.querySelector('.lc-rot'); if (em) em.textContent = rot;
      });
    }, 1800);
  }

  function linhaEscolha(e, s, compacta, gi, info) {
    const grupo = gi != null && s._grupos ? s._grupos[gi] : null;
    const L = s.linhas, ln = grupo ? grupo.ln : s._linha, es = grupo ? grupo.raw : (S.escolhas[L.id] || {});
    const dg = grupo ? ` data-s="${s.id}" data-g="${gi}"` : '';
    if (grupo && ln && ln.completa && !gruposAbertos.has(`${s.id}-${gi}`)) {
      return `<div class="linha-res" id="linha-${s.id}-g${gi}">${img(E.imgLinha(ln), ln.linha.nome, 'lr-img')}<div class="lr-tx"><small>Linha e cor ${tagProtocolo(ln)}</small><strong>${esc(E.nomeLinha(ln))}</strong><span>${esc(ln.linha.subtitulo || '')}</span></div><button type="button" class="btn ghost sm" data-act="linha-trocar"${dg}>Trocar</button></div>`;
    }
    if (compacta && ln && ln.completa && !linhasAbertas.has(L.id)) {
      const precoLn = info || (s.tipo === 'persianas' ? `<span>${s._valorInterruptor == null ? 'Valor sob consulta' : '+ ' + brl(s._valorInterruptor) + ' por ambiente'}</span>` : `<span>${esc(L.resumoEscolha || 'Pode ser diferente dos outros interruptores da unidade.')}</span>`);
      return `<div class="linha-res">${img(E.imgLinhaUso(L, ln), ln.linha.nome, 'lr-img')}<div class="lr-tx"><small>${esc(s.linhaRotulo || 'Interruptor da persiana')} ${tagProtocolo(ln)}</small><strong>${esc(E.nomeLinha(ln))}</strong>${precoLn}</div><button type="button" class="btn ghost sm" data-act="linha-trocar" data-lid="${L.id}">Trocar</button></div>`;
    }

    const tons = E.tons(L), tom = tons.length ? E.tomEscolhido(L, es) : null;
    const tomHtml = tons.length
      ? `<div class="ltons"><span class="lstep">1. Escolha a cor</span><div class="chips" role="group" aria-label="Cor dos interruptores">${tons.map((t) => { const on = tom === t.id; return `<button type="button" class="chip tom ${on ? 'on' : ''}" aria-pressed="${on}" data-act="linha-tom" data-lid="${L.id}"${dg} data-t="${t.id}"><span class="sw" style="background:${esc(t.amostra || '#ccc')}"></span>${esc(t.nome)}</button>`; }).join('')}</div></div>`
      : '';
    const cards = (L.opcoes || []).filter(E.ativo).filter((o) => !tons.length || (tom && E.coresNoTom(L, o, tom).length)).map((o) => {
      const sel = es.linha === o.id, min = minPreco(o);

      const precoCard = (op, mn) => {
        if (s.pecaLinha) { const v = (op.precos || {})[s.pecaLinha]; return v == null ? '<span class="price consult">Valor sob consulta</span>' : `<span class="price">+ ${brl(v)} <small>por ambiente</small></span>`; }
        return mn == null ? '<span class="price consult">Valores sob consulta</span>' : `<span class="price">a partir de ${brl(mn)}</span>`;
      };
      const cs = tom ? E.coresNoTom(L, o, tom) : [];
      const foto = cs.length ? E.imgLinhaUso(L, { linha: o, cor: cs[0] }) : o.imagem;
      return `<button type="button" class="lcard ${sel ? 'sel' : ''}" data-act="linha" data-lid="${L.id}"${dg} data-l="${o.id}" aria-pressed="${sel}">
        ${fotoCard(L, o, cs[0], foto)}
        <span class="lc-tx"><span class="pcard-badges">${badges(o)}</span><strong>${esc(o.nome)}</strong><small>${esc([o.fabricante, o.subtitulo].filter(Boolean).join(' · '))}</small>${o.resumo ? `<span class="lc-desc">${esc(o.resumo)}</span>` : ''}${precoCard(o, min)}</span>
        <span class="sel-mark" aria-hidden="true">${sel ? ic('check') : ''}</span>
      </button>`;
    }).join('');
    const lsel = ln && ln.linha;
    const coresSel = lsel ? (tons.length ? E.coresNoTom(L, lsel, tom) : lsel.cores || []) : [];
    const cores = lsel && (tons.length ? coresSel.length > 1 : coresSel.length)
      ? `<div class="lcores"><span>Cor da linha ${esc(lsel.nome)}:</span><div class="chips" role="group" aria-label="Cor">${coresSel.map((c) => { const on = es.cor === c.id; return `<button type="button" class="chip ${on ? 'on' : ''}" aria-pressed="${on}" data-act="linha-cor" data-lid="${L.id}"${dg} data-c="${c.id}">${on ? ic('check') : ''}${esc(c.nome)}</button>`; }).join('')}</div></div>`
      : '';
    const err = errDe(grupo ? `${s.id}-g${gi}` : s.id + '-linha');
    return `<div class="card linha-box ${err ? 'has-error' : ''}" id="linha-${s.id}${grupo ? '-g' + gi : ''}">
      ${grupo ? '' : `<h4 class="lb-t">${esc(L.titulo)}</h4><p class="muted">${esc(L.descricao)}</p>`}
      ${tomHtml}${tons.length ? `<div class="lstep-row"><span class="lstep">2. Escolha a linha</span><span class="lstep-acts">${emp().protocolos && tom ? `<button type="button" class="icon-btn sm" data-act="protocolos" aria-label="Wi-Fi ou Zigbee? Entenda a diferença" title="Wi-Fi ou Zigbee? Entenda a diferença">${ic('info')}</button>` : ''}${tom && cards.includes('lc-img loop') && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ? `<button type="button" class="icon-btn sm" data-act="loop-pausa" aria-pressed="${fotosPausadas}" aria-label="${fotosPausadas ? 'Retomar as fotos' : 'Pausar as fotos'}" title="${fotosPausadas ? 'Retomar as fotos' : 'Pausar as fotos'}">${ic(fotosPausadas ? 'play' : 'pausa')}</button>` : ''}</span></div>` : ''}
      ${tons.length && !tom ? `<p class="note">${ic('info')} Escolha a cor para ver as linhas disponíveis nela.</p>` : `<div class="lgrid">${cards}</div>`}${cores}
      ${err ? `<p class="field-error">${esc(err.msg)}</p>` : ''}
    </div>`;
  }

  const sequencial = (et) => !!(et && et.abas === 'sequencial' && tabsSeq(et).length > 1);
  const usaAbas = (et) => !captura && !!et && (sequencial(et) || (!!et.abas && et.abas !== 'sequencial' && et.secoes.length > 1));

  const membrosGrupo = (et, id) => ((et && et.grupos) || {})[id] || [];

  const agrupadas = (et) => Object.entries((et && et.grupos) || {}).filter(([cab]) => et.secoes.some((x) => x.id === cab)).flatMap(([, m]) => m);
  const abasDe = (et) => et.secoes.filter((s) => !agrupadas(et).includes(s.id));
  const secoesDaAba = (et, s) => [s, ...membrosGrupo(et, s.id).map((id) => et.secoes.find((x) => x.id === id)).filter(Boolean)];
  const abaDaSecao = (et, id) => abasDe(et).find((s) => secoesDaAba(et, s).some((x) => x.id === id));
  const casa = (id) => (campo) => campo === id || campo.startsWith(id + '-');
  function tabsSeq(et) {
    if (et.abasAmbientes) {
      const s = et.secoes[0];
      return (s.ambientes || []).map((a) => ({ id: s.id + '-' + a.id, rotulo: a.nome, titulo: `${s.abaTitulo || 'Persiana'} ${a.artigo || 'na'} ${a.nome.toLowerCase()}`, sec: s, amb: a, membros: [s], contem: (c) => c === s.id + '-' + a.id }));
    }
    return abasDe(et).map((s) => { const membros = secoesDaAba(et, s); return { id: s.id, rotulo: s.aba || s.titulo, titulo: s.titulo, ajuda: s.ajuda, sec: s, membros, contem: (c) => membros.some((m) => casa(m.id)(c)) }; });
  }
  function abaSeqAtiva(et) {
    S.abas = S.abas || {};
    const id = S.abas[et.id], lista = tabsSeq(et);
    return lista.find((t) => t.id === id) || (id && lista.find((t) => t.contem(id))) || lista[0];
  }
  const validarAbaSeq = (e, t) => (t.amb ? E.validarSecao(S, e, t.sec).filter((x) => t.contem(x.campo)) : t.membros.flatMap((m) => E.validarSecao(S, e, m)));
  const primeiraAba = (et) => !captura && (!sequencial(et) || abaSeqAtiva(et).id === tabsSeq(et)[0].id);

  const concluida = (et, id) => !!(((S.abasConcluidas || {})[et.id] || {})[id]);
  function marcarConcluida(et, id) { S.abasConcluidas = S.abasConcluidas || {}; (S.abasConcluidas[et.id] = S.abasConcluidas[et.id] || {})[id] = true; }
  function limiteAba(e, et) {
    const l = tabsSeq(et);
    for (let i = 0; i < l.length; i++) if (!concluida(et, l[i].id) || validarAbaSeq(e, l[i]).length) return i;
    return l.length - 1;
  }

  function abaDeEntrada(e, et, deTras) {
    const l = tabsSeq(et);
    const tudo = l.every((t) => concluida(et, t.id) && !validarAbaSeq(e, t).length);
    S.abas = S.abas || {};
    S.abas[et.id] = deTras && tudo ? l[l.length - 1].id : tudo ? l[0].id : l[limiteAba(e, et)].id;
  }
  function irAba(et, id, rolar = true) {
    S.abas = S.abas || {};
    const mudou = S.abas[et.id] !== id;
    S.abas[et.id] = id; erros = []; salvar(false);
    abaAnimar = mudou; render(); abaAnimar = false;
    if (rolar) {
      const tabs = document.querySelector('.sub-prog') || document.querySelector('.tabs');
      if (tabs) window.scrollTo({ top: Math.max(0, tabs.getBoundingClientRect().top + window.scrollY - 140), behavior: 'smooth' });
    }
  }
  let abaAnimar = false;
  function abaAtiva(et) {
    S.abas = S.abas || {};
    const id = S.abas[et.id];
    return abaDaSecao(et, id) || abasDe(et)[0];
  }
  function resumoAba(e, s, visto) {
    const r = resumoAbaBase(e, s, visto);
    if (r.ok && E.validarSecao(S, e, s).length) return { ok: false, txt: 'Falta confirmar' };
    return r;
  }
  function resumoAbaBase(e, s, visto) {
    const es = S.escolhas[s.id] || {};
    if (s.tipo === 'explicacao') return { ok: true, txt: 'Leitura rápida' };
    if (s.tipo === 'opcional') {
      const r = E.resposta(S, e, s);
      if (r === 'sim') return { ok: true, txt: s.valor == null ? 'Sim · sob consulta' : s.valor ? 'Sim · + ' + brl(s.valor) : 'Sim' };
      if (r === 'nao') return { ok: true, txt: 'Não' };
      return { ok: false, txt: 'Responder' };
    }
    if (s.tipo === 'quantidades') {
      let n = 0, v = 0, consulta = false;
      E.qtdItens(S, s).forEach(({ it, n: q }) => { n += q; if (it.valor == null) consulta = true; else v += q * it.valor; });
      const nAux = s.auxilio && es.auxilio ? (es.auxAmb || []).length : 0;
      if (n) return { ok: true, txt: `${n} ${n > 1 ? 'itens' : 'item'} · ${v ? '+ ' + brl(v) : 'sob consulta'}${v && consulta ? ' + consulta' : ''}${nAux ? ' + auxílio' : ''}` };
      if (nAux) return { ok: true, txt: `Auxílio ZR3 · ${nAux} ${nAux > 1 ? 'ambientes' : 'ambiente'}` };
      if (es.nenhum) return { ok: true, txt: 'Não' };
      if (!E.requisitoOk(S, e, s)) return { ok: !!visto, txt: 'Requer ' + ((E.secao(e, s.requer.secao, S) || {}).aba || 'outra escolha').toLowerCase() };
      return { ok: false, txt: 'Escolher' };
    }
    if (es.opcao === '__nenhuma' && s.nenhuma) return { ok: true, txt: s.nenhuma.rotulo };
    const o = (s.opcoes || []).find((x) => x.id === es.opcao && E.ativo(x));
    if (!o) return { ok: false, txt: s.nenhuma ? 'Escolher' : 'Escolher modelo' };
    return { ok: true, txt: `${o.nome} · ${o.valor == null ? 'sob consulta' : o.valor ? '+ ' + brl(o.valor) : 'sem custo'}` };
  }
  function resumoAbaSeq(e, et, t) {
    const r = resumoAbaSeqBase(e, et, t);
    const ok = concluida(et, t.id) && !validarAbaSeq(e, t).length;
    return { ok, txt: r.txt };
  }
  function resumoAbaSeqBase(e, et, t) {
    if (t.amb) {
      const s = t.sec, es = S.escolhas[s.id] || {}, r = E.ambResp(S, e, s, t.amb.id);
      if (E.persianaBrinde(S, e, s.id, t.amb.id)) { const bi = E.brindeInterruptor(S, e, s, t.amb.id); return { ok: true, txt: bi && s._linha && s._linha.linha.id !== bi.linha ? 'Brinde · interruptor à parte' : 'Brinde · sem custo' }; }
      if (r === 'nao') return { ok: true, txt: 'Não' };
      if (r !== 'sim') return { ok: false, txt: 'Responder' };
      const ms = (s.modelos || []).filter(E.ativo), m = ms.find((x) => x.id === (es.modelos || {})[t.amb.id]) || (ms.length === 1 ? ms[0] : null);
      if (!m) return { ok: false, txt: 'Escolher modelo' };
      let v = m.valor || 0;
      (s.adicionais || []).filter(E.ativo).forEach((ad) => { if (((es.adicionais || {})[ad.id] || {})[t.amb.id]) v += ad.valor || 0; });
      const viC = s.linhas && s._valorInterruptor == null;
      if (s.linhas) v += s._valorInterruptor || 0;
      return { ok: !validarAbaSeq(e, t).length, txt: m.valor == null ? 'Sim · sob consulta' : 'Sim · + ' + brl(v) + (viC ? ' + consulta' : '') };
    }
    const membros = t.membros;
    if (membros.length === 1) return resumoAba(e, membros[0], concluida(et, t.id));
    let n = 0, v = 0, consulta = false;
    membros.forEach((m) => {
      const es = S.escolhas[m.id] || {};
      if (m.tipo === 'quantidades') E.qtdItens(S, m).forEach(({ it, n: q }) => { n += q; if (it.valor == null) consulta = true; else v += q * it.valor; });
      else if (m.tipo === 'opcional' && E.resposta(S, e, m) === 'sim') { n += 1; if (m.valor == null) consulta = true; else v += m.valor; }
    });
    const visto = concluida(et, t.id);
    const ok = visto;
    if (n) return { ok, txt: `${n} ${n > 1 ? 'itens' : 'item'} · ${v ? '+ ' + brl(v) : 'sob consulta'}${v && consulta ? ' + consulta' : ''}` };
    const pend = membros.some((m) => E.validarSecao(S, e, m).length);
    return { ok, txt: pend ? 'Escolher' : 'Não' };
  }
  function copiarHtml(et, s) {
    const origem = s.copiarDe && et.secoes.find((x) => x.id === s.copiarDe);
    const origemEsc = origem && (S.escolhas[origem.id] || {}).opcao;
    return origem && origemEsc && origemEsc !== '__nenhuma'
      ? `<button type="button" class="btn ghost sm copiar" data-act="copiar-aba" data-de="${origem.id}" data-para="${s.id}">${ic('check')}<span>Usar o mesmo modelo do ${esc((origem.aba || origem.titulo).toLowerCase())}</span></button>`
      : '';
  }
  function abasSequenciais(e, et) {
    const lista = tabsSeq(et);
    const atual = abaSeqAtiva(et);
    const idx = lista.findIndex((t) => t.id === atual.id);
    const lim = Math.max(limiteAba(e, et), idx);
    const prox = lista[idx + 1];
    const tabs = lista.map((t, i) => {
      const r = resumoAbaSeq(e, et, t);
      const err = erros.some((x) => t.contem(x.campo));
      const bloq = i > lim && !concluida(et, t.id);
      return `<button type="button" role="tab" class="tab ${t.id === atual.id ? 'cur' : ''} ${r.ok && t.id !== atual.id ? 'ok' : ''} ${err ? 'err' : ''} ${bloq ? 'lock' : ''}" aria-selected="${t.id === atual.id}" aria-disabled="${bloq}" aria-controls="sec-${t.id}" data-act="aba" data-e="${et.id}" data-s="${t.id}">
        <span class="tab-ic">${r.ok && t.id !== atual.id ? ic('check') : bloq ? ic('cadeado') : i + 1}</span>
        <span class="tab-tx"><strong>${esc(t.rotulo)}</strong><small>${esc(r.txt)}</small></span>
      </button>`;
    }).join('');
    const rodape = prox
      ? `<button type="button" class="btn primary block next-aba" data-act="aba-prox"><span>Próximo: ${esc(prox.rotulo)}</span>${ic('right')}</button>`
      : `<button type="button" class="btn primary block next-aba" data-act="avancar"><span>Concluir ${esc((et.curto || et.titulo).toLowerCase())} e continuar</span>${ic('right')}</button>`;
    const corpo = atual.amb
      ? `${persianaAmb(e, atual.sec, atual.amb, true)}${blocoAceite(atual.sec)}`
      : `${copiarHtml(et, atual.sec)}${secao(e, atual.sec)}${atual.membros.slice(1).map((m) => `<div class="sub-sec" id="sec-${m.id}"><h3 class="sub-title">${esc(m.titulo)} ${helpBtn(m.ajuda)}</h3>${secao(e, m)}</div>`).join('')}`;
    const topo = et.abasAmbientes ? videoBar(et.secoes[0]) + persianasTopo(e, et.secoes[0]) : '';
    return `${topo}<div class="sub-prog"><span>${esc(et.curto || et.titulo)} · ${esc(et.abaUnidade || (et.abasAmbientes ? 'ambiente' : 'item'))} ${idx + 1} de ${lista.length}</span><span class="sub-bar"><i style="width:${((idx + 1) / lista.length) * 100}%"></i></span></div>
      <div class="tabs seq" role="tablist" aria-label="${esc(et.titulo)}">${tabs}</div>
      <section class="sec ${abaAnimar ? 'aba-in' : ''}" id="sec-${atual.id}" role="tabpanel" aria-labelledby="h-${atual.id}">
        ${et.abaUnidade || et.abasAmbientes ? `<div class="amb-head">${ic(et.icone)}<div><small>${esc(et.abaUnidade || 'ambiente')} ${idx + 1} de ${lista.length}</small><strong>${esc(atual.rotulo)}</strong></div></div>` : ''}
        <h2 class="sec-title" id="h-${atual.id}"><span class="sec-n">${idx + 1}</span>${esc(atual.titulo)} ${helpBtn(atual.ajuda)}</h2>
        ${corpo}
        ${rodape}
        ${idx > 0 ? `<button type="button" class="btn ghost block prev-aba" data-act="aba-ant">${ic('left')}<span>Voltar para ${esc(lista[idx - 1].rotulo)}</span></button>` : ''}
      </section>`;
  }
  function abasEtapa(e, et) {
    if (sequencial(et)) return abasSequenciais(e, et);
    const atual = abaAtiva(et);
    const tabs = et.secoes.map((s) => {
      const r = resumoAba(e, s);
      const err = erros.some((x) => x.campo === s.id || x.campo.startsWith(s.id + '-'));
      const pend = !r.ok && s.id !== atual.id && resumoAba(e, atual).ok;
      return `<button type="button" role="tab" class="tab ${s.id === atual.id ? 'cur' : ''} ${r.ok ? 'ok' : ''} ${err ? 'err' : ''} ${pend ? 'pend' : ''}" aria-selected="${s.id === atual.id}" aria-controls="sec-${s.id}" data-act="aba" data-e="${et.id}" data-s="${s.id}">
        <span class="tab-ic">${r.ok ? ic('check') : ic(et.icone)}</span>
        <span class="tab-tx"><strong>${esc(s.aba || s.titulo)}</strong><small>${esc(r.txt)}</small></span>
      </button>`;
    }).join('');
    const origem = atual.copiarDe && et.secoes.find((x) => x.id === atual.copiarDe);
    const origemEsc = origem && (S.escolhas[origem.id] || {}).opcao;
    const copiar = origem && origemEsc && origemEsc !== '__nenhuma'
      ? `<button type="button" class="btn ghost sm copiar" data-act="copiar-aba" data-de="${origem.id}" data-para="${atual.id}">${ic('check')}<span>Usar o mesmo modelo do ${esc((origem.aba || origem.titulo).toLowerCase())}</span></button>`
      : '';
    const prox = resumoAba(e, atual).ok && et.secoes.find((x) => x.id !== atual.id && !resumoAba(e, x).ok);
    const aviso = prox
      ? `<div class="aba-aviso" role="status">${ic('check')}<span><strong>${esc(atual.aba || atual.titulo)}:</strong> ${esc(resumoAba(e, atual).txt)}. Falta escolher o ${esc((prox.aba || prox.titulo).toLowerCase())}.</span></div>`
      : '';
    const botaoProx = prox
      ? `<button type="button" class="btn primary block next-aba" data-act="aba" data-e="${et.id}" data-s="${prox.id}"><span>Escolher o vaso do ${esc((prox.aba || prox.titulo).toLowerCase())}</span>${ic('right')}</button>`
      : '';
    return `<div class="tabs" role="tablist" aria-label="${esc(et.titulo)}">${tabs}</div>
      ${aviso}
      <section class="sec ${abaAnimar ? 'aba-in' : ''}" id="sec-${atual.id}" role="tabpanel" aria-labelledby="h-${atual.id}">
        <h2 class="sec-title" id="h-${atual.id}">${esc(atual.titulo)} ${helpBtn(atual.ajuda)}</h2>
        ${copiar}
        ${secao(e, atual)}
        ${botaoProx}
      </section>`;
  }

  const avisosSecao = (e, s) => E.avisos(S, e).filter((a) => a.local === 'secao' && a.secao === s.id).map((a) => `<div class="callout warn aviso-sec">${ic('alerta')}<p>${esc(a.mensagem)}</p></div>`).join('');

  const VIDEOS = [];
  function videoBtn(v, cls = '') {
    if (!v || !v.arquivo || captura) return '';
    let i = VIDEOS.indexOf(v); if (i < 0) { VIDEOS.push(v); i = VIDEOS.length - 1; }
    return `<button type="button" class="vid-btn ${cls}" data-act="video" data-v="${i}" aria-label="Ver vídeo ${esc(v.titulo || '')}"><span class="vid-th">${v.capa ? `<img src="${esc(v.capa)}" alt="" loading="lazy">` : ''}<span class="vid-play">${ic('play')}</span></span><span class="vid-tx"><strong>Ver vídeo</strong><small>${esc(v.titulo || '')}</small></span></button>`;
  }
  function abrirVideo(i) {
    const v = VIDEOS[i]; if (!v) return;

    const base = v.youtube || emp().videoUrl || '', id = youtubeId(base), t = Math.max(0, Math.round(+v.inicio || 0));
    const yt = id ? `https://www.youtube.com/watch?v=${id}${t ? `&t=${t}s` : ''}` : /^https?:\/\//i.test(base) ? base : '';
    abrirModal(`<figure class="vid-modal"><video src="${esc(v.arquivo)}"${v.capa ? ` poster="${esc(v.capa)}"` : ''} autoplay muted loop playsinline preload="auto" aria-label="${esc(v.titulo || 'Vídeo')}"></video></figure>
      ${yt ? `<a class="btn primary vid-yt" href="${esc(yt)}" target="_blank" rel="noopener noreferrer">${ic('externo')}<span>${t ? 'Assistir este trecho no YouTube' : 'Assistir o vídeo completo no YouTube'}</span></a>`
        : ''}`,
    { titulo: v.titulo || 'Vídeo', largo: true });
    const el = $modal.querySelector('video'); if (el) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
  }

  const videoBar = (s) => (s && s.video && !captura ? `<div class="vid-bar">${videoBtn(s.video)}</div>` : '');
  function secao(e, s) { return videoBar(s) + incluiHtml(e, s) + secaoBase(e, s) + avisosSecao(e, s); }

  function incluiHtml(e, s) {
    if (!s.inclui || !s.inclui.length) return '';
    return `<div class="inc-bar"><div class="selos inc"><span class="selos-t">Inclui</span>${selosInclui(e, s.inclui)}</div>${s.naoInclui ? `<p class="nao-inc">${ic('x')} Não inclui ${esc(s.naoInclui)}.</p>` : ''}</div>`;
  }
  function secaoBase(e, s) {
    switch (s.tipo) {
      case 'sacada': return secSacada(e, s);
      case 'unica': return secUnica(e, s);
      case 'quantidades': return secQuantidades(e, s);
      case 'opcional': return secOpcional(e, s);
      case 'persianas': return secPersianas(e, s);
      case 'texto': return secTexto(e, s);
      case 'pergunta': return secPergunta(e, s);
      case 'explicacao': return secExplicacao(e, s);
      default: return '';
    }
  }

  const erroSecao = (id) => {
    const er = erros.filter((x) => x.campo === id || x.campo.startsWith(id + '-'));
    return er.length ? `<p class="field-error sec-error" role="alert">${ic('alerta')} ${esc(er[0].msg)}</p>` : '';
  };

  const opcaoRadio = (act, attrs, sel, titulo, sub, extra = '') =>
    `<button type="button" class="choice ${sel ? 'sel' : ''}" data-act="${act}" ${attrs} aria-pressed="${sel}">
      <span class="radio" aria-hidden="true">${sel ? ic('check') : ''}</span>
      <span class="choice-tx"><strong>${titulo}</strong>${sub ? `<small>${sub}</small>` : ''}</span>${extra}
    </button>`;

  function secSacada(e, s) {
    const sc = E.sacada(S, s, e);
    const es = S.escolhas[s.id] || {};
    const r = s.regras;
    const f = sc.final ? pad2(sc.final) : '--';
    const lista = (arr) => arr.map(pad2).join(', ').replace(/, ([^,]*)$/, ' e $1');
    let cond = '';
    const ciente = (txt) => `<label class="check ${errDe(s.id + '-ciente') ? 'has-error' : ''}"><input type="checkbox" data-act="sacada-ciente" ${es.ciente ? 'checked' : ''}><span>${txt}</span></label>`;

    if (sc.modo === 'semFinal') {
      cond = `<div class="callout">${ic('info')}<p>Informe o final da unidade na etapa de identificação para ver a condição da sua sacada.</p><button type="button" class="btn ghost sm" data-act="goto" data-tela="identificacao">Ir para identificação</button></div>`;
    } else if (sc.modo === 'incluso') {
      cond = `<div class="cond ok">
        <div class="cond-ic">${ic('check')}</div>
        <div><span class="badge b-ok">Incluso na sua unidade</span>
        <h3>${sc.grupoNome && !sc.final ? 'O fechamento já está incluso' : 'O fechamento de sacada já está incluso'}</h3>
        <p>${sc.grupoNome && !sc.final ? `Para a sua unidade, o fechamento` : `Para os finais ${lista(r.inclusoFinais)}, o fechamento de sacada`} faz parte do padrão de entrega e está contemplado no valor do imóvel. <strong>Não há custo adicional</strong> e você não precisa adquiri-lo separadamente.</p></div>
      </div>${ciente(sc.grupoNome && !sc.final ? 'Estou ciente de que o fechamento já está incluso na minha unidade.' : `Estou ciente de que o fechamento de sacada já está incluso na minha unidade (final ${f}).`)}`;
    } else if (sc.modo === 'naoConfigurado') {
      cond = `<div class="callout warn">${ic('alerta')}<p>Não há regra de fechamento de sacada cadastrada para ${sc.grupoNome ? esc(sc.grupoNome) : 'o final ' + f}. A equipe da ZR3 informará a condição da sua unidade.</p></div>${ciente('Estou ciente de que a condição será informada pela equipe da ZR3.')}`;
    } else {

      const pergunta = sc.fonte === 'cadastro'
        ? `<div class="callout info">${ic('info')}<p>Consta no cadastro da ZR3 que a unidade ${esc(S.cliente.unidade)} realizou a <strong>integração da sacada</strong> na 1ª etapa.</p></div>`
        : `<div class="q ${errDe(s.id + '-integracao') ? 'has-error' : ''}">
            <p class="q-t">Na 1ª etapa de personalização, você fez a <strong>integração da sacada</strong> ao living? ${helpBtn('integracao')}</p>
            <div class="choices c3">
              ${opcaoRadio('sacada-int', 'data-v="sim"', es.integracao === 'sim', 'Sim, fiz a integração')}
              ${opcaoRadio('sacada-int', 'data-v="nao"', es.integracao === 'nao', 'Não fiz')}
              ${r.permitirNaoSei ? opcaoRadio('sacada-int', 'data-v="naosei"', es.integracao === 'naosei', 'Não tenho certeza', 'A ZR3 confirma no cadastro') : ''}
            </div></div>`;
      let res = '';
      if (sc.modo === 'obrigatorio') {
        res = `<div class="cond warn"><div class="cond-ic">${ic('alerta')}</div><div>
          <span class="badge b-warn">Aquisição obrigatória</span>
          <h3>Fechamento de sacada: ${brl(sc.valor)}</h3>
          <p>Unidades que realizaram a integração da sacada devem adquirir o fechamento, conforme as condições estabelecidas nos manuais de personalização. O item foi <strong>incluído automaticamente</strong> no seu resumo.</p></div></div>
          ${ciente(`Estou ciente da obrigatoriedade e do valor de ${brl(sc.valor)} para o fechamento de sacada.`)}`;
      } else if (sc.modo === 'confirmar') {
        res = `<div class="cond info"><div class="cond-ic">${ic('info')}</div><div>
          <span class="badge b-warn">A confirmar pela ZR3</span>
          <h3>Vamos verificar no seu cadastro</h3>
          <p>Se a integração da sacada for confirmada, o fechamento é obrigatório (${brl(sc.valor)}). Caso contrário, a equipe apresentará as opções para a sua unidade.</p></div></div>
          ${ciente('Estou ciente de que a ZR3 confirmará a condição da minha sacada e de que, havendo integração, o fechamento é obrigatório.')}`;
      } else if (sc.modo === 'opcional' || sc.modo === 'consulta') {
        const v = sc.modo === 'opcional' ? brl(sc.valor) : 'condição a definir pela ZR3';
        res = `<div class="q ${errDe(s.id + '-adquirir') ? 'has-error' : ''}">
          <p class="q-t">Sem integração da sacada, o fechamento é <strong>opcional</strong> para o final ${f}. Deseja adquirir?</p>
          <div class="choices c2">
            ${opcaoRadio('sacada-adq', 'data-v="sim"', es.adquirir === 'sim', sc.modo === 'opcional' ? 'Quero adquirir' : 'Tenho interesse', v)}
            ${opcaoRadio('sacada-adq', 'data-v="nao"', es.adquirir === 'nao', 'Não quero adquirir')}
          </div></div>
          ${es.adquirir ? ciente('Estou ciente da condição do fechamento de sacada para a minha unidade.') : ''}`;
      }
      cond = `<div class="cond-head"><span class="badge b-info">Final ${f} · item personalizado</span></div>${pergunta}${res}`;
    }

    const p = E.produtoSacada(S, e, s);
    return `${cond}${erroSecao(s.id)}
    <div class="card spec-card">
      <div class="gallery">${E.galeria(p).map((g, i) => `<button type="button" class="g-item ${i === 0 ? 'big' : ''}" data-act="zoom" data-src="${esc(g.src)}" data-legenda="${esc(g.legenda)}" data-nota="${esc(g.nota)}" aria-label="Ampliar imagem ${i + 1}">${img(g.src, p.nome)}</button>`).join('')}</div>
      ${p.legendaGaleria ? `<p class="caption">${esc(p.legendaGaleria)}</p>` : ''}
      <div class="spec-body">
        <h3>${esc(p.nome)}</h3>${p.subtitulo ? `<p class="muted">${esc(p.subtitulo)}</p>` : ''}${p.descricao ? `<p class="spec-desc">${esc(p.descricao)}</p>` : ''}
        ${specsTabela(p.specs)}
        ${(p.diferenciais || []).length || (p.observacoes || []).length ? `<details class="more"><summary>Características e diferenciais</summary>${listaHtml(p.diferenciais)}${(p.observacoes || []).map((o) => `<div class="callout warn sm">${ic('alerta')}<p>${esc(o)}</p></div>`).join('')}</details>` : ''}
      </div>
    </div>`;
  }

  function blocoAceite(sec) {
    if (!E.precisaAceite(S, emp(), sec)) return '';
    const ok = !!(S.escolhas[sec.id] || {}).aceite;
    return `<div class="termo ${errDe(sec.id + '-aceite') ? 'has-error' : ''}">
      <h4>${ic('resumo')} ${esc(sec.aceite.titulo)}</h4>
      <p>${esc(sec.aceite.texto)}</p>
      <label class="check"><input type="checkbox" data-act="aceite" data-s="${sec.id}" ${ok ? 'checked' : ''}><span>${esc(sec.aceite.rotulo)}</span></label>
    </div>`;
  }

  function legendaHtml(legenda, nota, tag) {
    if (!legenda && !nota) return '';
    const corpo = `${esc(legenda || '')}${nota ? `${legenda ? ' ' : ''}<em>${esc(nota)}</em>` : ''}`;
    return tag ? `<${tag}>${corpo}</${tag}>` : corpo;
  }

  const specsTabela = (specs) => (specs && specs.length ? `<dl class="specs">${specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '');
  const listaHtml = (arr) => (arr && arr.length ? `<ul class="bul">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');

  function secUnica(e, s) {
    const es = S.escolhas[s.id] || {};
    const ops = (s.opcoes || []).filter(E.ativo);
    const cards = ops
      .map((o) => {
        const sel = es.opcao === o.id;
        return `<article class="pcard ${sel ? 'sel' : ''} ${o.padrao ? 'is-std' : ''}">
          <button type="button" class="pcard-main" data-act="pick" data-s="${s.id}" data-o="${o.id}" aria-pressed="${sel}">
            <span class="pcard-img">${img(o.imagem, o.nome)}</span>
            <span class="pcard-tx">
              <span class="pcard-badges">${badges(o)}</span>
              <strong class="pcard-name">${esc(o.nome)}</strong>
              ${o.subtitulo ? `<span class="pcard-sub">${esc(o.subtitulo)}</span>` : ''}
              ${o.resumo ? `<span class="pcard-desc">${esc(o.resumo)}</span>` : ''}
              ${precoTag(o.valor, o.padrao)}
            </span>
            <span class="sel-mark" aria-hidden="true">${sel ? ic('check') : ''}</span>
          </button>
          <button type="button" class="pcard-more" data-act="saiba" data-s="${s.id}" data-o="${o.id}">${ic('zoom')}<span>Saiba mais</span></button>
        </article>`;
      })
      .join('');
    const nenhuma = s.nenhuma
      ? `<div class="none-opt">${opcaoRadio('pick', `data-s="${s.id}" data-o="__nenhuma"`, es.opcao === '__nenhuma', esc(s.nenhuma.rotulo), esc(s.nenhuma.descricao || ''))}</div>`
      : '';
    return `${s.descricao ? `<p class="sec-desc">${esc(s.descricao)} ${helpBtn(s.ajuda)}</p>` : ''}
      ${s.nota ? `<div class="callout info">${ic('info')}<p>${esc(s.nota)}</p></div>` : ''}
      <div class="legend"><span class="badge b-ok">Padrão</span> sem custo · <span class="price inline">+ R$</span> valor adicional${s.cobranca ? ` (${esc(s.cobranca)})` : ''}</div>
      ${erroSecao(s.id)}
      ${s.nenhuma && s.nenhuma.noTopo ? `<div class="none-top">${nenhuma}</div>` : ''}
      <div class="pgrid ${s.nenhuma && s.nenhuma.noTopo && es.opcao === '__nenhuma' ? 'is-dim' : ''}">${cards}</div>${s.nenhuma && s.nenhuma.noTopo ? '' : nenhuma}`;
  }

  function precoSecao(x) {
    if (x.tipo === 'opcional') return x.valor == null ? 'Valor sob consulta' : '+ ' + brl(x.valor);
    if (x.tipo === 'unica') { const v = (x.opcoes || []).filter(E.ativo).map((p) => p.valor).filter((v) => v != null); return v.length ? (v.length > 1 ? 'a partir de ' : '+ ') + brl(Math.min(...v)) : 'Valor sob consulta'; }
    if (x.tipo === 'quantidades') { if (x.linhas) return 'Valor por peça, conforme a linha'; const v = (x.itens || []).filter(E.ativo).map((it) => it.valor).filter((v) => v != null); return v.length ? (v.length > 1 ? 'a partir de ' : '') + brl(Math.min(...v)) + (v.length > 1 ? '' : ' cada') : 'Valor sob consulta'; }
    return '';
  }
  function capaSecao(x) {
    if (x.linhas) return ((x.linhas.opcoes || []).find(E.ativo) || {}).imagem;
    if (x.imagem) return x.imagem;
    if (x.tipo === 'unica') { const o = (x.opcoes || []).find(E.ativo) || {}; return o.imagem || ((o.galeria || [])[0] || {}).src; }
    if (x.tipo === 'quantidades') return ((x.itens || []).find((it) => E.ativo(it) && it.imagem) || {}).imagem;
    return ((x.galeria || [])[0] || {}).src;
  }
  const selosInclui = (e, ids) => (ids || []).map((k) => { const d = (e.inclusos || {})[k]; return d ? `<span class="selo">${ic(d.icone)}${esc(d.rotulo)}</span>` : ''; }).join('');
  function modalServico(i) {
    const e = emp(), et = etapaAtual(), sv = et && et.servicos, x = sv && sv.itens[i];
    if (!x) return;
    const secs = et.secoes.filter((y) => (y.inclui || []).includes(x.id));
    abrirModal(`<div class="serv-modal">
      <div class="sm-head"><span class="st-ic lg">${ic(x.icone || 'info')}</span><p>${esc(x.texto)}</p></div>
      <dl class="tri-dl"><div><dt>Quem faz e quando</dt><dd>${esc(x.quem)}</dd></div><div><dt>Custo</dt><dd>${esc(x.custo)}</dd></div></dl>
      ${secs.length ? `<h4>Itens em que este serviço se aplica</h4><p class="serv-aviso">${secs.length > 1 ? 'Cada item é contratado à parte, na própria aba. O serviço só vale para os itens que você contratar.' : 'Vale só se você contratar este item, na própria aba.'}</p><div class="serv-ops">${secs.map((y) => `<span class="serv-op">${img(capaSecao(y), y.nomeCurto || y.titulo)}<span>${esc(y.nomeCurto || y.titulo)}</span></span>`).join('')}</div>` : ''}
      ${sv.nota && !x.semNota ? `<p class="note">${ic('info')} ${esc(sv.nota)}</p>` : ''}
    </div>`, { titulo: `${i + 1}. ${x.titulo}` });
  }
  function secExplicacao(e, s) {
    const et = etapaAtual(), sv = et && et.servicos;
    const servicos = sv ? `<ol class="exp-serv">${sv.itens.map((x, i) => `<li><button type="button" class="exp-s" data-act="servico" data-i="${i}">
        <span class="st-ic">${ic(x.icone || 'info')}</span>
        <span class="exp-tx"><strong>${i + 1}. ${esc(x.titulo.replace(/ \(.*\)$/, ''))}</strong><small>${esc(x.texto)}</small><span class="exp-tag">${esc(x.curto || '')}</span></span>
        <span class="exp-go" aria-hidden="true">${ic('right')}</span>
      </button></li>`).join('')}</ol>` : '';
    return `${s.descricao ? `<p class="sec-desc">${esc(s.descricao)}</p>` : ''}${servicos}${protocolosHtml(e)}`;
  }

  function protocolosHtml(e, semTitulo) {
    const P = e.protocolos; if (!P) return '';
    const hub = E.secao(e, 'hub-zigbee', S) || E.secao(e, 'hub-zigbee');
    const acr = ((e.regras && e.regras.acrescimos) || []).find((a) => a.id === 'zigbee');
    const linhas = (id) => { const ls = ((E.secoes(e).find((x) => x.linhas) || {}).linhas || { opcoes: [] }).opcoes.filter((o) => E.ativo(o) && o.protocolo === id).map((o) => o.nome); return `${ls.length} ${ls.length === 1 ? 'linha' : 'linhas'} (${ls.join(', ')})`; };
    const tx = (t, id) => esc(t.replace('{hub}', hub && hub.valor != null ? brl(hub.valor) : 'valor sob consulta').replace('{pct}', acr ? acr.percentual : '').replace('{linhas}', linhas(id)));
    const col = (x) => `<div class="prot-card"><div class="prot-h"><span class="badge b-prot b-${x.id}">${ic(x.id === 'wifi' ? 'wifi' : 'zigbee')}${esc(x.nome)}</span></div><p class="prot-r">${tx(x.resumo, x.id)}</p>
        <h5>Vantagens</h5><ul class="prot-l pro">${(x.pros || []).map((t) => `<li>${ic('check')}<span>${tx(t, x.id)}</span></li>`).join('')}</ul>
        <h5>Pontos de atenção</h5><ul class="prot-l con">${(x.contras || []).map((t) => `<li>${ic('alerta')}<span>${tx(t, x.id)}</span></li>`).join('')}</ul></div>`;
    return `<div class="prot">${semTitulo ? '' : `<h3 class="prot-t">${esc(P.titulo)}</h3>`}${P.texto ? `<p class="sec-desc">${esc(P.texto)}</p>` : ''}<div class="prot-grid">${P.itens.map(col).join('')}</div></div>`;
  }

  function linhasQtd(e, s, itens, q, bloqueado, gi) {
    const dg = gi != null ? ` data-g="${gi}"` : '';
    return itens.filter(E.ativo).map((it) => {
      const n = q[it.id] || 0;
      return `<li class="qrow ${n ? 'on' : ''}">
          <button type="button" class="qimg" data-act="zoom" data-src="${esc(it.imagem)}" aria-label="Ampliar imagem de ${esc(it.nome)}">${img(it.imagem, it.nome)}</button>
          <div class="qtx"><strong>${esc(it.nome)}</strong>${it.subtitulo ? `<small>${esc(it.subtitulo)}</small>` : ''}${it.resumo ? `<span class="qdesc">${esc(it.resumo)}</span>` : ''}<span class="qprice">${it.valor == null ? 'Valor sob consulta' : brl(it.valor) + ' / un.'} ${badges(it)}</span>${it.aviso ? `<span class="qaviso">${ic('alerta')} ${esc(it.aviso)}</span>` : ''}${it.specs ? `<button type="button" class="link qmais" data-act="saiba-q" data-s="${s.id}" data-o="${it.id}">Saiba mais</button>` : ''}${videoBtn(it.video, 'sm')}</div>
          <div class="stepper" role="group" aria-label="Quantidade de ${esc(it.nome)}">
            <button type="button" data-act="qty" data-s="${s.id}" data-i="${it.id}"${dg} data-d="-1" aria-label="Diminuir" ${n <= 0 ? 'disabled' : ''}>${ic('menos')}</button>
            <output aria-live="polite">${n}</output>
            <button type="button" data-act="qty" data-s="${s.id}" data-i="${it.id}"${dg} data-d="1" aria-label="Aumentar" ${n >= (it.max || 99) || bloqueado ? 'disabled' : ''}>${ic('mais')}</button>
          </div>
          ${it.escolha && n > 0 ? itemEscolhaHtml(s, it) : ''}
        </li>`;
    }).join('');
  }

  function itemEscolhaHtml(s, it) {
    const atual = ((S.escolhas[s.id] || {}).itemEscolha || {})[it.id];
    const err = errDe(`${s.id}-esc-${it.id}`);
    return `<div class="q-esc ${err ? 'has-error' : ''}"><h5>${esc(it.escolha.titulo)}</h5><div class="choices">${it.escolha.opcoes.map((o) => opcaoRadio('item-escolha', `data-s="${s.id}" data-i="${it.id}" data-v="${o.id}"`, atual === o.id, esc(o.rotulo), esc(o.descricao || ''))).join('')}</div>${err ? `<p class="field-error">${esc(err.msg)}</p>` : ''}</div>`;
  }

  function linhasTravadas(s) {
    const L = s.linhas;
    const cards = (L.opcoes || []).filter(E.ativo).map((o) => {
      const cor = (o.cores || [])[0], foto = cor ? E.imgLinha({ linha: o, cor }) : o.imagem;
      return `<div class="lcard"><span class="lc-img">${img(foto, o.nome)}</span><span class="lc-tx"><span class="pcard-badges">${badges(o)}</span><strong>${esc(o.nome)}</strong><small>${esc([o.fabricante, o.subtitulo].filter(Boolean).join(' · '))}</small></span></div>`;
    }).join('');
    return `<div class="card linha-box is-off" aria-disabled="true"><h4 class="lb-t">${esc(L.titulo)}</h4><p class="muted">As linhas ficam disponíveis depois de marcar a ${esc(((E.secao(emp(), s.requer.secao, S) || {}).titulo || 'seção exigida').toLowerCase())}.</p><div class="lgrid">${cards}</div></div>`;
  }
  function gruposHtml(e, s, bloqueado) {
    if (bloqueado) return linhasTravadas(s);
    const gs = s._grupos, multi = gs.length > 1;
    const blocos = gs.map((g) => {
      const ok = g.ln && g.ln.completa;
      return `<div class="lgrupo ${multi ? 'multi' : ''}">
        ${multi ? `<div class="lg-head"><strong>Linha ${g.i + 1}${g.ln ? ' · ' + esc(E.nomeLinha(g.ln)) : ''}</strong><button type="button" class="btn ghost sm" data-act="grupo-del" data-s="${s.id}" data-g="${g.i}">${ic('x')}<span>Remover</span></button></div>` : ''}
        ${linhaEscolha(e, s, false, g.i)}
        ${ok ? `<h4 class="q-t">Peças da linha ${esc(E.nomeLinha(g.ln))}</h4><ul class="qlist card">${linhasQtd(e, s, g.itens, g.raw.qtd || {}, false, g.i)}</ul>` : `<p class="note">${ic('info')} Escolha a cor e a linha para ver as peças e os valores.</p>`}
      </div>`;
    }).join('');
    const ultimo = gs[gs.length - 1];
    const podeAdd = ultimo.ln && ultimo.ln.completa && Object.values(ultimo.raw.qtd || {}).some((n) => n > 0);
    return `<div class="card linha-box lb-intro"><h4 class="lb-t">${esc(s.linhas.titulo)}</h4><p class="muted">${esc(s.linhas.descricao)}</p></div>
      ${blocos}
      <button type="button" class="btn ghost block add-linha" data-act="grupo-add" data-s="${s.id}" ${podeAdd ? '' : 'disabled'}>${ic('mais')}<span>Adicionar outra linha</span></button>
      ${podeAdd ? '' : `<p class="muted add-linha-dica">Para mesclar linhas, escolha as peças desta linha e depois adicione outra.</p>`}`;
  }

  function secQuantidades(e, s) {
    const es = S.escolhas[s.id] || {};
    const q = es.qtd || {};
    const bloqueado = !E.requisitoOk(S, e, s);
    const req = bloqueado && E.secao(e, s.requer.secao, S);
    const aviso = bloqueado
      ? `<div class="locked req">${ic('cadeado')}<div><strong>Disponível com a ${esc((req.titulo || '').toLowerCase())}</strong><p>${esc(s.requer.mensagem)}</p><button type="button" class="btn ghost sm" data-act="ir-secao" data-s="${req.id}">${ic('left')}<span>Ir para ${esc(req.aba || req.titulo)}</span></button></div></div>`
      : '';
    let sub = 0;
    let consulta = false;
    E.qtdItens(S, s).forEach(({ it, n }) => { if (it.valor == null) consulta = true; sub += n * (it.valor || 0); });
    const rows = s._grupos ? '' : (s.itens || [])
      .filter(E.ativo)
      .map((it) => {
        const n = q[it.id] || 0;
        return `<li class="qrow ${n ? 'on' : ''}">
          <button type="button" class="qimg" data-act="zoom" data-src="${esc(it.imagem)}" aria-label="Ampliar imagem de ${esc(it.nome)}">${img(it.imagem, it.nome)}</button>
          <div class="qtx"><strong>${esc(it.nome)}</strong>${it.subtitulo ? `<small>${esc(it.subtitulo)}</small>` : ''}${it.resumo ? `<span class="qdesc">${esc(it.resumo)}</span>` : ''}<span class="qprice">${it.valor == null ? 'Valor sob consulta' : brl(it.valor) + ' / un.'} ${badges(it)}</span>${it.aviso ? `<span class="qaviso">${ic('alerta')} ${esc(it.aviso)}</span>` : ''}${it.specs ? `<button type="button" class="link qmais" data-act="saiba-q" data-s="${s.id}" data-o="${it.id}">Saiba mais</button>` : ''}${videoBtn(it.video, 'sm')}</div>
          <div class="stepper" role="group" aria-label="Quantidade de ${esc(it.nome)}">
            <button type="button" data-act="qty" data-s="${s.id}" data-i="${it.id}" data-d="-1" aria-label="Diminuir" ${n <= 0 ? 'disabled' : ''}>${ic('menos')}</button>
            <output aria-live="polite">${n}</output>
            <button type="button" data-act="qty" data-s="${s.id}" data-i="${it.id}" data-d="1" aria-label="Aumentar" ${n >= (it.max || 99) || bloqueado ? 'disabled' : ''}>${ic('mais')}</button>
          </div>
          ${it.escolha && n > 0 ? itemEscolhaHtml(s, it) : ''}
        </li>`;
      })
      .join('');
    const algum = Object.values(q).some((n) => n > 0);

    const comLinha = !!s.linhas && !bloqueado;
    const linhaOk = !s.linhas || (s._linha && s._linha.completa);
    const ambAux = E.ambientesAuxilio(S, e, s);
    const errAux = errDe(s.id + '-aux');
    const aux = s.auxilio && !bloqueado && ambAux.length ? `<div class="card aux ${es.auxilio ? 'on' : ''} ${errAux ? 'has-error' : ''}">
        <label class="check"><input type="checkbox" data-act="aux" data-s="${s.id}" ${es.auxilio ? 'checked' : ''}><span><strong>${esc(s.auxilio.rotulo)}</strong><small>${esc(s.auxilio.descricao)}</small></span></label>
        ${es.auxilio ? `<div class="chips" role="group" aria-label="Ambientes de interesse">${ambAux.map((x) => { const on = (es.auxAmb || []).includes(x); return `<button type="button" class="chip ${on ? 'on' : ''}" aria-pressed="${on}" data-act="aux-amb" data-s="${s.id}" data-a="${esc(x)}">${on ? ic('check') : ''}${esc(x)}</button>`; }).join('')}</div>` : ''}
        ${errAux ? `<p class="field-error">${esc(errAux.msg)}</p>` : ''}
      </div>` : '';
    const nao = bloqueado ? '' : `<div class="choices qnao ${errDe(s.id) ? 'has-error' : ''}">${opcaoRadio('qty-nenhum', `data-s="${s.id}"`, !!es.nenhum && !algum && !es.auxilio, esc(s.rotuloNenhum || 'Não quero'), 'Nenhum item desta seção')}</div>${errDe(s.id) ? `<p class="field-error">${esc(errDe(s.id).msg)}</p>` : ''}`;
    return `${s.descricao ? `<p class="sec-desc">${esc(s.descricao)}</p>` : ''}
      ${aviso}
      ${s._grupos ? gruposHtml(e, s, bloqueado) : `${comLinha ? linhaEscolha(e, s) : ''}
      ${linhaOk || bloqueado ? `${comLinha ? `<h4 class="q-t">Peças da linha ${esc(E.nomeLinha(s._linha))}</h4>` : ''}<ul class="qlist card ${bloqueado ? 'is-locked' : ''}">${rows}</ul>` : `<p class="note">${ic('info')} Escolha a cor e a linha para ver as peças e os valores.</p>`}`}
      ${aux}
      ${nao}
      ${s.nota ? `<p class="note">${ic('info')} ${esc(s.nota)}</p>` : ''}
      <p class="subtotal">Subtotal: <strong>${brl(sub)}</strong>${consulta ? ' + itens sob consulta' : ''}</p>`;
  }

  function acrescimoDoSim(e, s) {
    try {
      const sim = JSON.parse(JSON.stringify(S)), nao = JSON.parse(JSON.stringify(S));
      sim.escolhas[s.id] = Object.assign({}, sim.escolhas[s.id], { resposta: 'sim' }); delete sim.escolhas[s.id].auto;
      nao.escolhas[s.id] = Object.assign({}, nao.escolhas[s.id], { resposta: 'nao' }); delete nao.escolhas[s.id].auto;
      return Math.max(0, Math.round((E.calcular(sim, e).total - E.calcular(nao, e).total - (s.valor || 0)) * 100) / 100);
    } catch (err) { return 0; }
  }
  function avisoAcrescimo(e, s) {
    if (!s.avisoAcrescimo || E.dispensado(S, e, s)) return '';
    const v = acrescimoDoSim(e, s);
    const pct = ((e.regras.acrescimos || [])[0] || {}).percentual || 0;
    return `<div class="callout warn">${ic('alerta')}<p><strong>Atenção ao custo:</strong> ${esc(s.avisoAcrescimo.replace('{pct}', pct))}${v > 0 ? ` Com o que você já escolheu: <strong>+ ${brl(v)}</strong> (hub e acréscimo: + ${brl(v + (s.valor || 0))}).` : ''}</p></div>`;
  }
  function secOpcional(e, s) {
    const ex = E.exigidos(S, e)[s.id];
    const r = E.resposta(S, e, s);
    const acr = s.avisoAcrescimo && !E.dispensado(S, e, s) ? acrescimoDoSim(e, s) : 0;
    const temDet = (s.blocos && s.blocos.length) || (s.galeria && s.galeria.length);
    const botoes = ex
      ? `<div class="locked">${ic('cadeado')}<div><strong>Incluído automaticamente</strong><p>${esc(ex.mensagem)}</p></div></div>`
      : `<div class="choices c2 ${errDe(s.id) ? 'has-error' : ''}">
          ${opcaoRadio('resp', `data-s="${s.id}" data-v="sim"`, r === 'sim', esc(s.rotuloSim || 'Sim, quero'), s.valor == null ? 'Valor sob consulta' : s.valor ? '+ ' + brl(s.valor) + (acr > 0 ? ` + ${brl(acr)} (acréscimo Zigbee)` : '') : 'Sem custo')}
          ${opcaoRadio('resp', `data-s="${s.id}" data-v="nao"`, r === 'nao', esc(s.rotuloNao || 'Não quero'))}
        </div>`;
    return `<div class="card opt ${r === 'sim' ? 'on' : ''}">
      <div class="opt-top">
        <button type="button" class="opt-img" data-act="zoom" data-src="${esc(s.imagem || '')}" aria-label="Ampliar imagem">${img(s.imagem, s.nome)}</button>
        <div class="opt-tx">
          <span class="pcard-badges">${badges(s)}</span>
          <h3>${esc(s.nome)}</h3>
          <p>${esc(s.descricao)}</p>
          ${precoTag(s.valor)}
        </div>
      </div>
      ${temDet ? `<details class="more" ${s.id === 'preparacao' ? 'open' : ''}><summary>Saiba mais</summary>
        <div class="blocos">${(s.blocos || []).map((b) => `<div class="bloco"><h4>${esc(b.titulo)}</h4>${b.texto ? `<p>${esc(b.texto)}</p>` : ''}${listaHtml(b.itens)}</div>`).join('')}</div>
        ${s.galeria ? `<div class="thumbs">${E.galeria(s).map((g) => `<button type="button" data-act="zoom" data-src="${esc(g.src)}" data-legenda="${esc(g.legenda)}" data-nota="${esc(g.nota)}" aria-label="Ampliar">${img(g.src, s.nome)}</button>`).join('')}</div>` : ''}
      </details>` : ''}
      ${E.dispensado(S, e, s) ? `<div class="callout info">${ic('info')}<p>${esc(s.dispensadoPor.texto)}</p></div>` : ''}
      ${avisoAcrescimo(e, s)}
      ${botoes}
      ${marcaInfo(e, s, r)}
      ${r === 'nao' && s.avisoNao && !ex && (S.avisosNao || {})[s.id] ? `<div class="callout warn aviso-nao" role="alert" tabindex="-1">${ic('alerta')}<p><strong>${esc(s.avisoNao.titulo || 'Tem certeza?')}</strong> ${esc(s.avisoNao.texto)}</p></div>` : ''}
      ${r === 'sim' && s.acionamento ? acionamentoHtml(e, s) : ''}
      ${blocoAceite(s)}
      ${s.acionamento ? (errDe(s.id) ? `<p class="field-error sec-error" role="alert">${ic('alerta')} ${esc(errDe(s.id).msg)}</p>` : '') : erroSecao(s.id)}
    </div>`;
  }

  function marcaInfo(e, s, r) {
    const m = E.marcasAtivas(S, e).filter((x) => x.secao === s.id);
    if (!m.length || r !== m[0].resposta) return '';
    return `<div class="callout info">${ic('info')}<p>Marcada porque você escolheu: ${esc(m.map((x) => x.motivo).join('; '))}.</p></div>`;
  }

  function acionamentoHtml(e, s) {
    const A = s.acionamento, ac = E.acionamento(S, s), es = S.escolhas[s.id] || {};
    const avisoSemVisto = A.avisoSem && !ac.sel.includes(A.avisoSem.opcao) && (S.avisosNao || {})[chaveAvisoSem(s)];
    const ops = (A.opcoes || []).map((o) => {
      const on = ac.sel.includes(o.id), ok = E.acionRequisitoOk(S, e, o);
      const destacar = avisoSemVisto && o.id === A.avisoSem.opcao;
      return `<label class="check acion-op ${on ? 'on' : ''} ${!ok && !on ? 'is-locked' : ''} ${destacar ? 'destacar' : ''}" ${destacar ? 'tabindex="-1"' : ''}><input type="checkbox" data-act="acion" data-s="${s.id}" data-o="${o.id}" ${on ? 'checked' : ''} ${!ok && !on ? 'disabled' : ''}><span><strong>${esc(o.rotulo)}</strong><small>${esc(o.descricao || '')}</small>${o.destaque ? `<span class="acion-destaque">${ic('info')}<span>${esc(o.destaque).replace(/^([^:]{1,20}:)/, '<strong>$1</strong>')}</span></span>` : ''}${!ok ? `<small class="acion-lock">${ic('cadeado')} ${esc(o.requer.mensagem)}</small>` : ''}</span></label>`;
    }).join('');
    let pecas = '';
    if (ac.sel.includes('interruptor') && A.pecas) {
      const ln = s._linha, P = A.pecas;
      const disp = (P.opcoes || []).filter((p) => !ln || Object.prototype.hasOwnProperty.call(ln.linha.precos || {}, p.id));
      const errP = errDe(s.id + '-peca');
      pecas = `${linhaEscolha(e, s, true)}
        ${ln && ln.completa ? `<div class="acion-pecas ${errP ? 'has-error' : ''}"><h5>${esc(P.titulo)}</h5>${P.descricao ? `<p class="muted">${esc(P.descricao)}</p>` : ''}
          <div class="chips" role="radiogroup" aria-label="${esc(P.titulo)}">${disp.map((p) => { const on = ac.peca === p.id, v = (ln.linha.precos || {})[p.id]; return `<button type="button" class="chip ${on ? 'on' : ''}" role="radio" aria-checked="${on}" data-act="acion-peca" data-s="${s.id}" data-p="${p.id}">${on ? ic('check') : ''}${esc(p.nome)}${v != null ? ` · ${brl(v)}` : ''}</button>`; }).join('')}</div>
          ${P.equipe ? `<div class="choices">${opcaoRadio('acion-peca', `data-s="${s.id}" data-p="__equipe"`, ac.peca === '__equipe', esc(P.equipe.rotulo), esc(P.equipe.descricao || ''))}</div>` : ''}
          ${disp.some((p) => (ln.linha.precos || {})[p.id] == null) ? `<p class="muted acion-obs">Valor do interruptor conforme a linha: sob consulta.</p>` : ''}
          ${errP ? `<p class="field-error">${esc(errP.msg)}</p>` : ''}
        </div>` : ''}`;
    }
    const errA = errDe(s.id + '-acion');
    return `<div class="acion">
      <h4>${esc(A.titulo)}</h4>
      <div class="acion-ops">${A.padrao ? `<div class="check acion-op on is-fixo" role="checkbox" aria-checked="true" aria-disabled="true"><span class="fixo-box" aria-hidden="true">${ic('check')}</span><span><strong>${esc(A.padrao.rotulo || A.padrao)}</strong>${A.padrao.descricao ? `<small>${esc(A.padrao.descricao)}</small>` : ''}</span></div>` : ''}${ops}</div>
      ${errA ? `<p class="field-error">${esc(errA.msg)}</p>` : ''}
      ${pecas}
      ${avisoSemVisto ? `<div class="callout warn acion-aviso" role="alert">${ic('alerta')}<p>${esc(A.avisoSem.texto)}</p></div>` : ''}
    </div>`;
  }

  function persianaAmb(e, s, a, semTitulo) {
    const es = S.escolhas[s.id] || {};
    const modelos = (s.modelos || []).filter(E.ativo);
    const m0 = modelos[0];
    const brinde = E.persianaBrinde(S, e, s.id, a.id);
    const r = E.ambResp(S, e, s, a.id);
    const selM = (es.modelos || {})[a.id] || (modelos.length === 1 ? m0.id : '');
    const mSel = modelos.find((m) => m.id === selM) || m0;
    const valor = mSel && mSel.valor;
    const vi = s.linhas ? s._valorInterruptor : 0;
    const precoTxt = valor == null ? 'Valor sob consulta' : '+ ' + brl(valor + (vi || 0)) + (s.linhas && vi == null ? ' + interruptor (conforme a linha)' : '');

    const bInt = brinde ? E.brindeInterruptor(S, e, s, a.id) : null;
    const bLinha = bInt ? s.linhas.opcoes.find((x) => x.id === bInt.linha) : null;
    const ehPadrao = !!(bInt && s._linha && s._linha.linha.id === bInt.linha);
    const infoLinha = bInt ? (ehPadrao ? '<span>Interruptor padrão do brinde: sem custo</span>' : '<span>Linha diferente da padrão do brinde: valor adicional sob consulta</span>') : null;
    const temErro = errDe(s.id + '-' + a.id);

    const ia = (s.ambientes || []).findIndex((x) => x.id === a.id), ant = ia > 0 ? s.ambientes[ia - 1] : null;
    const rAnt = ant && E.ambResp(S, e, s, ant.id);
    const adsAnt = ant ? (s.adicionais || []).filter((ad) => E.ativo(ad) && ((es.adicionais || {})[ad.id] || {})[ant.id]).map((ad) => ad.nome.toLowerCase()) : [];
    const repetir = rAnt && !brinde
      ? `<button type="button" class="btn ghost sm copiar" data-act="pers-repetir" data-s="${s.id}" data-de="${ant.id}" data-para="${a.id}">${ic('check')}<span>Repetir a escolha ${ant.artigo === 'no' ? 'do' : 'da'} ${esc(ant.nome.toLowerCase())}: ${rAnt === 'sim' ? 'quero persiana' + (adsAnt.length ? ' + ' + esc(adsAnt.join(', ')) : '') : 'não quero'}</span></button>`
      : '';
    const modelo = r === 'sim' && modelos.length > 1
      ? `<div class="f"><label for="pm-${a.id}">Modelo</label><select id="pm-${a.id}" data-act="pers-modelo" data-s="${s.id}" data-a="${a.id}"><option value="">Selecione</option>${modelos.map((m) => `<option value="${m.id}" ${selM === m.id ? 'selected' : ''}>${esc(m.nome)} – ${m.valor == null ? 'sob consulta' : brl(m.valor)}</option>`).join('')}</select></div>`
      : '';
    const ads = r === 'sim'
      ? (s.adicionais || []).filter(E.ativo).map((ad) => `<label class="check"><input type="checkbox" data-act="pers-add" data-s="${s.id}" data-ad="${ad.id}" data-a="${a.id}" ${((es.adicionais || {})[ad.id] || {})[a.id] ? 'checked' : ''}><span>${esc(ad.nome)} <span class="muted">(${ad.valor == null ? 'sob consulta' : '+ ' + brl(ad.valor)})</span></span></label>`).join('')
      : '';
    return `<div class="card amb ${r === 'sim' ? 'on' : ''} ${temErro ? 'has-error' : ''}" id="amb-${a.id}">
        ${semTitulo ? '' : `<h4>${ic('persiana')} ${esc(a.nome)}</h4>`}
        ${repetir}
        ${brinde
          ? `<div class="locked">${ic('check')}<div><strong>Persiana ${a.artigo || 'na'} ${esc(a.nome.toLowerCase())} incluída como brinde</strong><p>${esc(brinde.detalhe)} ${(es.amb || {})[a.id] === 'sim' ? 'Como você já tinha escolhido esta persiana, o valor dela será abatido no resumo.' : 'Ela foi incluída automaticamente, sem custo.'}${bInt ? ` Vem com o interruptor padrão${bLinha ? ` (${esc(bLinha.nome)} ${esc(bLinha.fabricante || '')})` : ''}. Se você trocar a linha do interruptor, paga só o valor adicional dele.` : ''}</p></div></div>`
          : `<div class="choices c2">
          ${opcaoRadio('pers-amb', `data-s="${s.id}" data-a="${a.id}" data-v="sim"`, r === 'sim', `Quero persiana ${a.artigo || 'na'} ${esc(a.nome.toLowerCase())}`, precoTxt)}
          ${opcaoRadio('pers-amb', `data-s="${s.id}" data-a="${a.id}" data-v="nao"`, r === 'nao', 'Não quero', 'Sem custo')}
        </div>`}
        ${modelo}
        ${r === 'sim' && s.linhas ? linhaEscolha(e, s, true, null, infoLinha) : ''}
        ${ads}
        ${temErro ? `<p class="field-error">${esc(temErro.msg)}</p>` : ''}
      </div>`;
  }
  function persianasTopo(e, s) {
    const modelos = (s.modelos || []).filter(E.ativo);
    return `<p class="sec-desc">${esc(s.descricao)}</p>
      <div class="pgrid single">${modelos
        .map((m) => `<article class="pcard static">
          <div class="pcard-main">${capaGaleria(m)}
          <span class="pcard-tx"><span class="pcard-badges">${badges(m)}</span><strong class="pcard-name">${esc(m.nome)}</strong>${m.subtitulo ? `<span class="pcard-sub">${esc(m.subtitulo)}</span>` : ''}<span class="pcard-desc">${esc(m.resumo || '')}</span>${m.valor == null ? precoTag(null) : `<span class="price">${brl(m.valor)} <small>${esc(m.cobranca || 'por ambiente')}${s.linhas ? ' + interruptor conforme a linha' : ''}</small></span>`}</span></div>
          <button type="button" class="pcard-more" data-act="saiba-m" data-s="${s.id}" data-o="${m.id}">${ic('zoom')}<span>Saiba mais</span></button>
        </article>`)
        .join('')}</div>`;
  }
  function secPersianas(e, s) {
    return `${persianasTopo(e, s)}
      <h3 class="q-t">Escolha para cada ambiente</h3>
      <div class="amb-grid">${(s.ambientes || []).map((a) => persianaAmb(e, s, a)).join('')}</div>
      ${blocoAceite(s)}`;
  }

  function capaGaleria(o) {
    const gal = E.galeria(o);
    if (gal.length < 2) return `<span class="pcard-img">${img(o.imagem, o.nome)}</span>`;
    const bt = (g, i) => `<button type="button" class="${i ? '' : 'pcard-img figs-capa'}" ${i ? 'hidden' : ''} data-act="zoom" data-src="${esc(g.src)}" data-legenda="${esc(g.legenda)}" data-nota="${esc(g.nota)}" aria-label="${i ? 'Imagem ' + (i + 1) : 'Ver as ' + gal.length + ' fotos'}">${i ? '' : img(g.src, o.nome) + `<span class="figs-chip">${ic('imagem')}${gal.length} fotos</span>`}</button>`;
    return `<span class="figs">${gal.map(bt).join('')}</span>`;
  }

  function secPergunta(e, s) {
    const r = (S.escolhas[s.id] || {}).resposta || null;
    const cred = (e.creditos || []).find((c) => c.quando && c.quando.secao === s.id);
    const brinde = (e.brindes || []).find((b) => b.quando && b.quando.secao === s.id);
    let efeito = '';
    if (r === 'sim' && cred) {
      efeito = `<div class="callout info">${ic('check')}<p><strong>Crédito de ${brl(-cred.valorPorPorta)} por porta.</strong></p></div>`;
    }
    if (r === 'sim' && brinde) {
      const ps = E.secao(e, brinde.secao, S);
      const amb = ps && (ps.ambientes || []).find((x) => x.id === brinde.ambiente);
      const jaTinha = ((S.escolhas[brinde.secao] || {}).amb || {})[brinde.ambiente] === 'sim';
      const visitou = ps && ps._etapa && S.visitadas[ps._etapa.id];
      efeito = ps && amb ? `<div class="callout info">${ic('check')}<p><strong>${esc(brinde.titulo)}.</strong> ${jaTinha ? `Você já tinha escolhido a persiana ${amb.artigo || 'na'} ${esc(amb.nome.toLowerCase())}: o valor dela será abatido no resumo.` : `A persiana ${amb.artigo || 'na'} ${esc(amb.nome.toLowerCase())} já fica incluída na etapa Persianas, sem custo${brinde.interruptor ? ', com o interruptor padrão' : ''}.`}</p>${visitou ? `<button type="button" class="btn ghost sm" data-act="goto" data-tela="${ps._etapa.id}">${ic('persiana')}<span>Ver persianas</span></button>` : ''}</div>` : '';
    }
    return `<div class="card perg ${errDe(s.id) ? 'has-error' : ''}">
        <p class="perg-q">${esc(s.pergunta || s.titulo)}</p>
        <div class="choices ${s.opcoes ? '' : 'c2'}">
          ${(s.opcoes || [{ id: 'sim', rotulo: s.rotuloSim || 'Sim' }, { id: 'nao', rotulo: s.rotuloNao || 'Não' }]).map((o) => opcaoRadio('resp', `data-s="${s.id}" data-v="${o.id}"`, r === o.id, esc(o.rotulo))).join('')}
        </div>
        ${(s.info || []).length ? `<ul class="perg-info">${s.info.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${errDe(s.id) ? `<p class="field-error">${esc(errDe(s.id).msg)}</p>` : ''}
      </div>
      ${efeito}`;
  }

  function secTexto(e, s) {
    const t = (S.escolhas[s.id] || {}).texto || '';
    return `<p class="sec-desc">${esc(s.descricao)}</p>
      <div class="f ${errDe(s.id) ? 'has-error' : ''}"><label for="t-${s.id}" class="sr-only">${esc(s.titulo)}</label>
      <textarea id="t-${s.id}" data-bind-texto="${s.id}" rows="5" maxlength="${s.max || 2000}" placeholder="${esc(s.placeholder || '')}">${esc(t)}</textarea>
      <p class="field-hint"><span id="cnt-${s.id}">${t.length}</span> / ${s.max || 2000} caracteres</p>${erroSecao(s.id)}</div>`;
  }

  function telaResumo(e) {
    const c = S.cliente;
    const calc = E.calcular(S, e);
    const avisos = E.avisos(S, e);
    const pend = telas().slice(1, -1).filter((t) => E.validarTela(S, CFG, e, t).length);
    const etapas = E.etapas(e, S);
    const etapasResumo = calc.etapaCreditos ? etapas.concat([calc.etapaCreditos]) : etapas;
    const grupos = etapasResumo
      .filter((et) => calc.linhas.some((l) => l.etapa.id === et.id) || !et.secoes.every((s) => s.tipo === 'texto'))
      .map((et) => {
        const ls = calc.linhas.filter((l) => l.etapa.id === et.id);
        const linhas = ls.length
          ? ls.map((l) => {
              const st = E.STATUS[l.status];
              const val = l.status === 'nao' || l.status === 'info' ? '—' : l.valTexto ? esc(l.valTexto) : l.total == null ? 'Sob consulta' : l.total < 0 ? '− ' + brl(-l.total) : brl(l.total);
              return `<li class="rline ${l.status}">
                <span class="r-img">${l.imagem ? `<img src="${esc(l.imagem)}" alt="" loading="lazy">` : ic(l.acrescimo ? 'mais' : et.icone)}</span>
                <span class="r-tx"><strong>${esc(l.item)}${l.qtd > 1 ? ` <span class="qtd">× ${l.qtd}</span>` : ''}</strong><small>${esc(l.detalhe)}</small></span>
                <span class="r-st"><span class="badge b-${st.classe}">${st.rotulo}</span></span>
                <span class="r-val">${val}${l.qtd > 1 && l.unit != null ? `<small>${brl(l.unit)} un.</small>` : ''}</span>
              </li>`;
            }).join('')
          : '<li class="rline empty"><span class="muted">Nenhuma escolha registrada nesta etapa.</span></li>';
        const alterar = et.id === 'creditos' ? '' : `<button type="button" class="btn ghost sm" data-act="goto" data-tela="${et.id}">${ic('edit')}<span>Alterar</span></button>`;
        return `<section class="card rgroup"><div class="rgroup-h"><h2>${ic(et.icone)} ${esc(et.titulo)}</h2>${alterar}</div><ul>${linhas}</ul>${et.id === 'creditos' && calc.avisoCredito ? `<p class="hint">${ic('info')} ${esc(calc.avisoCredito)}</p>` : ''}</section>`;
      })
      .join('');
    const pg = e.pagamento || {};
    const podeGerar = pend.length === 0;
    return `
    <div class="page-head"><h1 tabindex="-1">Resumo da sua personalização</h1><p>Confira todas as escolhas. Você pode alterar qualquer etapa antes de gerar o documento.</p></div>
    ${pend.length ? `<div class="callout warn">${ic('alerta')}<div><p><strong>Há etapas com informações pendentes:</strong></p><p>${pend.map((t) => `<button type="button" class="link" data-act="goto" data-tela="${t}">${esc(t === 'identificacao' ? 'Identificação' : (etapas.find((x) => x.id === t) || {}).titulo)}</button>`).join(' · ')}</p></div></div>` : ''}
    ${(() => { const pz = E.prazoUnidade(c.unidade, e); return pz && pz.vencido ? `<div class="callout warn">${ic('alerta')}<p>O prazo de envio da unidade ${esc(c.unidade)} terminou em <strong>${E.dataBr(pz.prazo)}</strong>. Você ainda pode enviar o PDF, mas a ZR3 vai avaliar se é possível atender as suas escolhas.</p></div>` : ''; })()}
    ${avisos.map((a) => `<div class="callout warn">${ic('alerta')}<p>${esc(a.mensagem)}</p></div>`).join('')}
    <section class="card rcliente">
      <div class="rgroup-h"><h2>${ic('user')} Identificação</h2><button type="button" class="btn ghost sm" data-act="goto" data-tela="identificacao">${ic('edit')}<span>Alterar</span></button></div>
      <dl class="specs cols">
        <div><dt>Cliente</dt><dd>${esc(c.nome) || '—'}</dd></div>
        <div><dt>Empreendimento</dt><dd>${esc(e.nome)}</dd></div>
        <div><dt>Unidade</dt><dd>${esc(c.unidade) || '—'}</dd></div>
        <div><dt>Final / planta</dt><dd>${esc((E.grupo(S, e) || {}).nome || (c.final ? 'Final ' + pad2(c.final) : '—'))}</dd></div>
        <div><dt>${E.contatoRotulo(c)}</dt><dd>${esc(c.contato) || '—'}</dd></div>
      </dl>
    </section>
    <div class="legend status-legend">
      <span class="badge b-ok">Incluso</span> no imóvel · <span class="badge b-warn">Obrigatório</span> · <span class="badge b-info">Opcional</span> · <span class="badge b-muted">Sob consulta</span> depende de orçamento
    </div>
    ${grupos}
    ${calc.observacoes ? `<section class="card rgroup"><div class="rgroup-h"><h2>${ic('lista')} Observações</h2></div><p class="obs">${esc(calc.observacoes)}</p></section>` : ''}
    ${E.aceites(S, e).length ? `<section class="card rgroup"><div class="rgroup-h"><h2>${ic('resumo')} Termos aceitos</h2></div>${E.aceites(S, e).map((a) => `<div class="termo ok"><h4>${ic('check')} ${esc(a.titulo)}</h4><p>${esc(a.texto)}</p></div>`).join('')}</section>` : ''}
    <section class="card totals">
      <div class="t-row big"><span>Total estimado (pré-orçamento)</span><strong>${brl(calc.total)}</strong></div>
      ${calc.aVista != null && calc.total > 0 ? `<div class="t-row"><span>Estimativa à vista (${pg.descontoAVistaPct}% de desconto)</span><strong>${brl(calc.aVista)}</strong></div>` : ''}
      ${calc.consulta.length ? `<div class="t-row"><span>Itens que dependem de orçamento ou confirmação ${helpBtn('consulta')}</span><strong>${calc.consulta.length}</strong></div><ul class="t-list">${calc.consulta.map((l) => `<li>${esc(l.item)}</li>`).join('')}</ul>` : ''}
      ${pg.texto && calc.total > 0 ? `<p class="hint">${esc(pg.texto)} ${helpBtn('cub')}</p>` : ''}
    </section>
    <section class="card finalize">
      <label class="check big"><input type="checkbox" data-act="confirmar" ${S.confirmado ? 'checked' : ''}>
        <span>Revisei todas as opções e confirmo que este resumo representa as minhas preferências para a 3ª etapa de personalização.</span></label>
      <div class="callout warn">${ic('alerta')}<p><strong>Importante:</strong> depois de gerar o PDF, envie-o à equipe de personalização. A ZR3 só recebe as suas escolhas por meio desse envio.</p></div>
      ${podeGerar ? '' : `<p class="field-error">${ic('alerta')} Há informações pendentes. Ao tocar em "Gerar PDF", você vai até elas.</p>`}
      <button type="button" class="btn primary lg block" data-act="gerar" ${S.confirmado ? '' : 'disabled'}>${ic('download')}<span>Gerar PDF da minha personalização</span></button>
      ${regrasHtml()}
      <div id="pos-pdf">${S.pdf ? posPdf(e) : ''}</div>
    </section>`;
  }

  function msgWhats(e) {
    const m = (e.contato || {}).mensagemWhats || 'Olá! Sou {nome}, unidade {unidade} do {empreendimento}. Segue o PDF da minha personalização da 3ª etapa (protocolo {protocolo}).';
    return m.replace('{nome}', S.cliente.nome || '').replace('{unidade}', S.cliente.unidade || '').replace('{empreendimento}', e.nome).replace('{protocolo}', (S.pdf || {}).protocolo || '');
  }
  function posPdf(e) {
    const ct = e.contato || {};
    const msg = encodeURIComponent(msgWhats(e));
    const podeShare = !!(ultimoPdf && navigator.canShare && navigator.canShare({ files: [ultimoPdf.file] }));
    return `<div class="done">
      <div class="done-h">${ic('check')}<div><strong>PDF gerado com sucesso</strong><span>Protocolo ${esc(S.pdf.protocolo)} · ${new Date(S.pdf.em).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span></div></div>
      <div class="callout warn">${ic('alerta')}<p><strong>Falta um passo:</strong> envie este PDF à ${esc(ct.equipe || 'equipe de personalização')} por WhatsApp ou e-mail. Sem o envio, a ZR3 não recebe as suas escolhas.</p></div>
      ${ct.whatsapp ? `<div class="zap">
        <a class="btn zap-btn block" target="_blank" rel="noopener" href="https://wa.me/${esc(E.soDigitos(ct.whatsapp))}?text=${msg}">${ic('msg')}<span>Enviar pelo WhatsApp da ZR3</span></a>
        <ol class="zap-passos"><li>O PDF já foi baixado para este aparelho. Se precisar de outra cópia, use “Gerar novamente”: ela sai com a data de hoje e os valores atuais.</li><li>O botão abre a conversa com a ZR3, com a mensagem pronta.</li><li>Toque no clipe 📎, escolha <strong>Documento</strong>, anexe o PDF e envie.</li></ol>
      </div>` : ''}
      <div class="done-act">
        <button type="button" class="btn ghost" data-act="gerar">${ic('download')}<span>Gerar novamente</span></button>
        ${podeShare ? `<button type="button" class="btn primary" data-act="compartilhar">${ic('share')}<span>Compartilhar o PDF</span></button>` : ''}
        ${ct.email ? `<a class="btn ghost" href="mailto:${esc(ct.email)}?subject=${encodeURIComponent('Personalização 3ª etapa – ' + e.nome + ' – Unidade ' + S.cliente.unidade)}&body=${msg}%0A%0A(anexe o PDF baixado)">${ic('mail')}<span>Enviar por e-mail</span></a>` : ''}
      </div>
      <p class="hint">O WhatsApp não permite anexar o arquivo automaticamente: é preciso <strong>anexar o PDF baixado</strong> na conversa.</p>
      <div class="proximos"><h3>Depois do envio</h3>
        <ol>
          <li>A equipe de personalização confere as suas escolhas e prepara o orçamento definitivo e o projeto atualizado.</li>
          <li>Você recebe esse material para revisar dentro do prazo informado. Revise com atenção: ele será seguido na obra.</li>
          <li>Com a sua aprovação, o setor de contratos envia o aditivo para assinatura digital pela Clicksign, por e-mail ou WhatsApp.</li>
          <li>As automações são configuradas após a entrega das chaves, em visita técnica agendada com o fornecedor, com energia e Wi-Fi já disponíveis.</li>
        </ol>
      </div>
      <p class="hint limpar-dados">Comprou mais de uma unidade? Depois de enviar este PDF, <button type="button" class="link" data-act="outra-unidade">personalize a próxima unidade</button>. Seu nome e contato são mantidos; as escolhas começam do zero.</p>
    </div>`;
  }

  function saibaMais(o, sec) {
    const gal = E.galeria(o);
    const html = `<div class="saiba">
      <div class="sm-gal">${gal.length ? `<div class="sm-wrap"><div class="sm-main">${img(gal[0].src, o.nome)}</div>${gal.length > 1 ? `<button type="button" class="sm-nav prev" data-act="sm-nav" data-d="-1" aria-label="Imagem anterior">${ic('left')}</button><button type="button" class="sm-nav next" data-act="sm-nav" data-d="1" aria-label="Próxima imagem">${ic('right')}</button>` : ''}</div><p class="sm-cap" ${gal[0].legenda || gal[0].nota ? '' : 'hidden'}>${legendaHtml(gal[0].legenda, gal[0].nota)}</p>${gal.length > 1 ? `<div class="thumbs">${gal.map((g, i) => `<button type="button" data-act="sm-thumb" data-src="${esc(g.src)}" data-legenda="${esc(g.legenda)}" data-nota="${esc(g.nota)}" class="${i === 0 ? 'cur' : ''}" aria-label="Ver imagem ${i + 1}">${img(g.src, '')}</button>`).join('')}</div>` : ''}` : img('', o.nome, 'sm-main')}</div>
      <div class="sm-tx">
        <span class="pcard-badges">${badges(o)}</span>
        ${o.subtitulo ? `<p class="muted">${esc(o.subtitulo)}</p>` : ''}
        ${precoTag(o.valor, o.padrao)}${o.valor ? ` <small class="muted">${esc(o.cobranca || sec.cobranca || '')}</small>` : ''}
        ${(o.fabricante || o.modelo) && !o.specs ? specsTabela([['Fabricante', o.fabricante || '—'], ['Modelo', o.modelo || '—']].filter((x) => x[1] !== '—')) : ''}
        ${o.specs ? `<h4>Ficha técnica</h4>${specsTabela(o.specs)}` : ''}
        ${o.diferenciais ? `<h4>Diferenciais</h4>${listaHtml(o.diferenciais)}` : ''}
        ${(o.observacoes || []).map((x) => `<div class="callout warn sm">${ic('alerta')}<p>${esc(x)}</p></div>`).join('')}
        ${sec.tipo === 'unica' ? `<button type="button" class="btn primary block" data-act="pick" data-s="${sec.id}" data-o="${o.id}" data-close="1">${(S.escolhas[sec.id] || {}).opcao === o.id ? ic('check') + '<span>Selecionado</span>' : '<span>Selecionar este modelo</span>'}</button>` : ''}
      </div></div>`;
    abrirModal(html, { titulo: o.nome, largo: true });
  }

  document.addEventListener('pointerdown', (ev) => { if ($toast.className && !$toast.contains(ev.target)) { clearTimeout(toastT); $toast.className = ''; } }, true);
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-act]');
    if (!t) return;
    const a = t.dataset.act;
    if (a === 'recomecar-falha') { try { localStorage.removeItem(STORE_KEY); } catch (err) {   } S = E.novoEstado(CFG); S.tela = 'inicio'; render(); return; }
    const e = emp();

    if (t.tagName === 'INPUT' || t.tagName === 'SELECT') return;
    switch (a) {
      case 'goto': {
        if (t.getAttribute('aria-disabled') === 'true') { toast('Conclua as etapas anteriores para chegar aqui.'); return; }
        ir(t.dataset.tela);
        break;
      }
      case 'iniciar': ir(temProgresso() ? telas()[Math.min(E.limiteNavegacao(S, CFG, e), telas().length - 1)] : 'identificacao'); break;
      case 'retomar': {
        const ts = telas();
        const lim = E.limiteNavegacao(S, CFG, e);
        const i = ts.indexOf(telaSalva);
        ir(i > 0 && (i <= lim || S.visitadas[telaSalva]) ? telaSalva : ts[Math.max(1, lim)]);
        break;
      }
      case 'recomecar':
        abrirModal(`<p>Todos os dados salvos neste dispositivo (nome, contato, unidade e escolhas) serão apagados. Deseja começar do zero?</p><div class="modal-act"><button type="button" class="btn ghost" data-act="fechar-modal">Cancelar</button><button type="button" class="btn danger" data-act="recomecar-ok">Apagar e começar do zero</button></div>`, { titulo: 'Começar do zero' });
        break;
      case 'prazos': modalPrazos(); break;
      case 'outra-unidade':
        abrirModal(`<p>Você já enviou o PDF da unidade <strong>${esc(S.cliente.unidade)}</strong>? As escolhas dela serão apagadas deste aparelho para você começar a próxima unidade. Seu nome e contato continuam preenchidos.</p><div class="modal-act"><button type="button" class="btn ghost" data-act="fechar-modal">Ainda não</button><button type="button" class="btn primary" data-act="outra-unidade-ok">Personalizar outra unidade</button></div>`, { titulo: 'Personalizar outra unidade' });
        break;
      case 'outra-unidade-ok':
        S.escolhas = {}; S.abas = {}; S.abasConcluidas = {}; S.pdf = null; ultimoPdf = null; S.confirmado = false;
        S.cliente.unidade = ''; S.cliente.final = null; S.unidadeBase = '';
        S.visitadas = { inicio: true, identificacao: true };
        fecharModal(); salvar(false); ir('identificacao', { forcar: true });
        toast('Informe a próxima unidade.');
        break;
      case 'troca-ok': {
        const tp = trocaPendente; trocaPendente = null;
        S.escolhas = {}; S.abas = {}; S.abasConcluidas = {}; S.pdf = null; ultimoPdf = null; S.confirmado = false;
        S.visitadas = { inicio: true, identificacao: true };
        fecharModal();
        if (tp) aplicarUnidade(tp.valor, tp.opts);
        toast('Unidade trocada. As escolhas anteriores foram apagadas.');
        break;
      }
      case 'troca-cancelar':
        trocaPendente = null; S.cliente.unidade = S.unidadeBase; S.cliente.final = E.cadastroUnidade(S.unidadeBase, emp()).final;
        fecharModal(); salvar(false); render();
        break;
      case 'recomecar-ok':
        S = E.novoEstado(CFG); ultimoPdf = null;
        try { localStorage.removeItem(STORE_KEY); } catch (x) {   }
        fecharModal(); ir('identificacao'); toast('Escolhas apagadas.');
        break;
      case 'avancar': avancar(); break;
      case 'aba-prox': avancar(); break;
      case 'aba-ant': voltar(); break;
      case 'voltar': voltar(); break;
      case 'help': {
        ev.preventDefault(); ev.stopPropagation();
        const g = CFG.glossario[t.dataset.k];
        if (g) abrirModal(`<p>${esc(g.texto)}</p>`, { titulo: g.titulo });
        break;
      }
      case 'fechar-modal': fecharModal(); break;
      case 'zoom': if (t.dataset.src) abrirZoom(t); break;
      case 'zc': zcIr(+t.dataset.d); break;
      case 'sm-nav': smNav(+t.dataset.d); break;
      case 'sm-thumb': {
        const main = $modal.querySelector('.sm-main');
        if (main) main.innerHTML = img(t.dataset.src, '');
        const cap = $modal.querySelector('.sm-cap');
        if (cap) { cap.innerHTML = legendaHtml(t.dataset.legenda, t.dataset.nota); cap.hidden = !(t.dataset.legenda || t.dataset.nota); }
        $modal.querySelectorAll('.thumbs button').forEach((b) => b.classList.toggle('cur', b === t));
        break;
      }
      case 'saiba': {
        const s = E.secao(e, t.dataset.s);
        const o = s && s.opcoes.find((x) => x.id === t.dataset.o);
        if (o) saibaMais(o, s);
        break;
      }
      case 'saiba-q': {
        const s = E.secao(e, t.dataset.s);
        const o = s && (s.itens || []).find((x) => x.id === t.dataset.o);
        if (o) saibaMais(o, s);
        break;
      }
      case 'saiba-m': {
        const s = E.secao(e, t.dataset.s);
        const o = s && s.modelos.find((x) => x.id === t.dataset.o);
        if (o) saibaMais(o, s);
        break;
      }
      case 'pick': {
        E.esc(S, t.dataset.s).opcao = t.dataset.o;
        limparErro(t.dataset.s);
        salvar();
        if (t.dataset.close) fecharModal();
        render();
        break;
      }
      case 'aba': {
        const etC = etapaAtual();
        if (sequencial(etC)) {
          const l = tabsSeq(etC), alvo = l.findIndex((x) => x.id === t.dataset.s), atualI = l.findIndex((x) => x.id === abaSeqAtiva(etC).id);
          if (alvo > Math.max(limiteAba(e, etC), atualI) && !concluida(etC, t.dataset.s)) { toast('Conclua o item atual para avançar.'); break; }
          irAba(etC, t.dataset.s);
          break;
        }
        S.abas = S.abas || {};
        const mudou = S.abas[t.dataset.e] !== t.dataset.s;
        S.abas[t.dataset.e] = t.dataset.s; salvar(false);
        if (sequencial(etapaAtual())) erros = [];
        abaAnimar = mudou; render(); abaAnimar = false;
        const tabs = document.querySelector('.tabs');
        if (tabs && (tabs.getBoundingClientRect().top < 0 || t.classList.contains('next-aba'))) tabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case 'copiar-aba': {
        const de = E.secao(e, t.dataset.de, S); const para = E.secao(e, t.dataset.para, S);
        const op = (S.escolhas[de.id] || {}).opcao;
        const alvo = op && (para.opcoes || []).find((o) => o.id === op.replace(de.id, para.id) && E.ativo(o));
        if (alvo) { E.esc(S, para.id).opcao = alvo.id; limparErro(para.id); salvar(); render(); toast(`Mesmo modelo aplicado: ${alvo.nome}`); }
        break;
      }
      case 'linha': {
        if (t.dataset.g != null) {
          const sg = E.secao(e, t.dataset.s, S), gs = gruposEdit(sg), g = gs[+t.dataset.g], o = sg.linhas.opcoes.find((x) => x.id === t.dataset.l);
          if (g.linha !== o.id) {
            g.linha = o.id; g.tom = E.tomEscolhido(sg.linhas, g);
            const csg = E.coresNoTom(sg.linhas, o, g.tom);
            if (!csg.some((c) => c.id === g.cor)) g.cor = csg.length === 1 ? csg[0].id : null;
            const fora = Object.keys(g.qtd || {}).filter((k) => g.qtd[k] > 0 && !Object.prototype.hasOwnProperty.call(o.precos || {}, k));
            fora.forEach((k) => delete g.qtd[k]);
            if (fora.length) toast(`Não disponível na linha ${o.nome}: ${fora.map((k) => (sg.itens.find((it) => it.id === k) || {}).nome || k).join(', ')}. Quantidade zerada.`);
            sincronizarQtd(sg);
          }
          if (g.cor) gruposAbertos.delete(`${sg.id}-${t.dataset.g}`);
          limparErro(`${sg.id}-g${t.dataset.g}`); salvar(); render();
          break;
        }
        const sl = E.secoes(e, S).find((x) => x.linhas && x.linhas.id === t.dataset.lid); if (!sl) break;
        const usam = (x) => x.linhas && x.linhas.id === sl.linhas.id;
        const L = sl.linhas, es = E.esc(S, L.id), o = L.opcoes.find((x) => x.id === t.dataset.l);
        if (es.linha !== o.id) {
          es.linha = o.id; es.tom = E.tomEscolhido(L, es); delete es.autoBrinde;
          const cores = E.coresNoTom(L, o, es.tom);
          if (!cores.some((c) => c.id === es.cor)) es.cor = cores.length === 1 ? cores[0].id : null;

          const removidas = [];
          E.secoes(e, S).filter((x) => usam(x) && x.tipo === 'quantidades').forEach((x) => {
            const qd = (S.escolhas[x.id] || {}).qtd || {};
            Object.keys(qd).forEach((k) => { if (qd[k] > 0 && !x.itens.some((it) => it.id === k)) { removidas.push(((E.secao(e, x.id) || x).itens.find((it) => it.id === k) || {}).nome || k); delete qd[k]; } });
          });

          E.secoes(e, S).filter((x) => usam(x) && x.acionamento).forEach((x) => { const ex = S.escolhas[x.id] || {}; if (ex.peca && ex.peca !== '__equipe' && !Object.prototype.hasOwnProperty.call(o.precos || {}, ex.peca)) { removidas.push(((E.pecaAcionamento(x, ex.peca) || {}).nome || ex.peca) + ` (${(x.aba || x.titulo).toLowerCase()})`); ex.peca = null; } });
          if (removidas.length) toast(`Não disponível na linha ${o.nome}: ${removidas.join(', ')}. Escolha de novo.`);
        }
        sincronizarMarcas(e);
        if (es.cor || !(o.cores || []).length) linhasAbertas.delete(L.id);
        erros = erros.filter((x) => !(x.campo.endsWith('-linha') || /interruptor/i.test(x.msg)));
        salvar(); render();
        break;
      }
      case 'item-escolha': {
        const es = E.esc(S, t.dataset.s); es.itemEscolha = es.itemEscolha || {}; es.itemEscolha[t.dataset.i] = t.dataset.v;
        limparErro(`${t.dataset.s}-esc-${t.dataset.i}`); salvar(); render();
        break;
      }
      case 'grupo-add': {
        const sg = E.secao(e, t.dataset.s, S); gruposEdit(sg).push({ linha: null, cor: null, qtd: {} });
        salvar(); render();
        const novo = document.getElementById(`linha-${sg.id}-g${gruposEdit(sg).length - 1}`); if (novo) novo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case 'grupo-del': {
        const sg = E.secao(e, t.dataset.s, S), gs = gruposEdit(sg);
        gs.splice(+t.dataset.g, 1); if (!gs.length) gs.push({ linha: null, cor: null, qtd: {} });
        gruposAbertos.clear();
        sincronizarQtd(sg); erros = erros.filter((x) => !x.campo.startsWith(sg.id + '-g'));
        salvar(); render(); toast('Linha removida.');
        break;
      }
      case 'video': abrirVideo(+t.dataset.v); break;
      case 'loop-pausa': fotosPausadas = !fotosPausadas; render(); break;
      case 'protocolos': abrirModal(protocolosHtml(e, true), { titulo: e.protocolos.titulo, largo: true }); break;
      case 'linha-tom': {
        let es, L, sg = null;
        if (t.dataset.g != null) { sg = E.secao(e, t.dataset.s, S); es = gruposEdit(sg)[+t.dataset.g]; L = sg.linhas; }
        else { const sl = E.secoes(e, S).find((x) => x.linhas && x.linhas.id === t.dataset.lid); if (!sl) break; L = sl.linhas; es = E.esc(S, L.id); }
        es.tom = t.dataset.t; delete es.autoBrinde;
        const o = es.linha ? L.opcoes.find((x) => x.id === es.linha) : null;
        const cs = o ? E.coresNoTom(L, o, es.tom) : [];
        if (cs.length) { if (!cs.some((c) => c.id === es.cor)) es.cor = cs[0].id; }
        else {
          if (o) toast(`A linha ${o.nome} não tem essa cor. Escolha a linha de novo.`);
          es.linha = null; es.cor = null;
        }
        if (sg) sincronizarQtd(sg); else sincronizarMarcas(e);
        salvar(); render();
        break;
      }
      case 'linha-cor': {
        if (t.dataset.g != null) { const sg = E.secao(e, t.dataset.s, S); gruposEdit(sg)[+t.dataset.g].cor = t.dataset.c; gruposAbertos.delete(`${sg.id}-${t.dataset.g}`); limparErro(`${sg.id}-g${t.dataset.g}`); salvar(); render(); break; }
        const sl = E.secoes(e, S).find((x) => x.linhas && x.linhas.id === t.dataset.lid); if (!sl) break;
        E.esc(S, sl.linhas.id).cor = t.dataset.c; linhasAbertas.delete(sl.linhas.id);
        erros = erros.filter((x) => !(x.campo.endsWith('-linha') || /interruptor/i.test(x.msg)));
        salvar(); render();
        break;
      }
      case 'linha-trocar':
        if (t.dataset.g != null) gruposAbertos.add(`${t.dataset.s}-${t.dataset.g}`); else linhasAbertas.add(t.dataset.lid);
        render(); break;
      case 'acion-peca': {
        E.esc(S, t.dataset.s).peca = t.dataset.p;
        erros = erros.filter((x) => x.campo !== t.dataset.s + '-peca');
        salvar(); render();
        break;
      }
      case 'servico': modalServico(+t.dataset.i); break;
      case 'pers-repetir': {
        const s = E.secao(e, t.dataset.s, S), es = E.esc(S, s.id), de = t.dataset.de, para = t.dataset.para;
        es.amb = es.amb || {}; const novo = E.ambResp(S, e, s, de);
        if (novo === 'sim' && es.amb[para] !== 'sim') es.aceite = false;
        es.amb[para] = novo;
        if ((es.modelos || {})[de]) es.modelos[para] = es.modelos[de];
        Object.keys(es.adicionais || {}).forEach((ad) => { es.adicionais[ad][para] = !!es.adicionais[ad][de]; });
        erros = erros.filter((x) => x.campo !== s.id + '-' + para);
        salvar(); render();
        toast(`Mesma escolha aplicada: ${es.amb[para] === 'sim' ? 'quero persiana' : 'não quero persiana'}.`);
        break;
      }
      case 'aux-amb': {
        const es = E.esc(S, t.dataset.s); es.auxAmb = es.auxAmb || [];
        const i = es.auxAmb.indexOf(t.dataset.a);
        if (i >= 0) es.auxAmb.splice(i, 1); else es.auxAmb.push(t.dataset.a);
        limparErro(t.dataset.s + '-aux'); limparErro(t.dataset.s); salvar(); render();
        break;
      }
      case 'qty-nenhum': {
        const es = E.esc(S, t.dataset.s);
        const tinha = Object.values(es.qtd || {}).some((n) => n > 0);
        es.nenhum = true; es.qtd = {}; es.auxilio = false; es.auxAmb = [];
        if (Array.isArray(es.grupos)) es.grupos = [{ linha: (es.grupos[0] || {}).linha || null, cor: (es.grupos[0] || {}).cor || null, qtd: {} }]; limparErro(t.dataset.s); limparErro(t.dataset.s + '-aux');
        salvar(); render();
        if (tinha) toast('Quantidades zeradas: nenhum item desta seção.');
        break;
      }
      case 'qty': {
        const s = E.secao(e, t.dataset.s);
        const it = s.itens.find((x) => x.id === t.dataset.i);
        const es = E.esc(S, s.id);
        if (t.dataset.g != null && s.linhasMultiplas) {
          const g = gruposEdit(s)[+t.dataset.g]; g.qtd = g.qtd || {};
          g.qtd[it.id] = Math.max(0, Math.min(it.max || 99, (g.qtd[it.id] || 0) + Number(t.dataset.d)));
          sincronizarQtd(s); limparErro(`${s.id}-g${t.dataset.g}`);
        } else {
          es.qtd = es.qtd || {};
          es.qtd[it.id] = Math.max(0, Math.min(it.max || 99, (es.qtd[it.id] || 0) + Number(t.dataset.d)));
        }
        if (Number(t.dataset.d) > 0) { es.nenhum = false; limparErro(s.id); }
        const antes = E.exigidos(S, e);
        salvar(); render();
        if (Number(t.dataset.d) > 0 && Object.keys(antes).length) {
          const ex = Object.values(antes)[0];
          if (ex && (S.escolhas[Object.keys(antes)[0]] || {}).resposta !== 'sim' && !avisouExig[ex.regra]) { avisouExig[ex.regra] = 1; toast(ex.mensagem); }
        }
        break;
      }
      case 'resp': {
        const ofertadas = E.secoes(e, S).map((x) => x.id);
        if (E.esc(S, t.dataset.s).resposta !== t.dataset.v) S.escolhas[t.dataset.s].aceite = false;
        E.esc(S, t.dataset.s).resposta = t.dataset.v; limparErro(t.dataset.s);
        if (S.avisosNao) Object.keys(S.avisosNao).filter((k) => k === t.dataset.s || k.startsWith(t.dataset.s + ':')).forEach((k) => delete S.avisosNao[k]);
        delete S.escolhas[t.dataset.s].auto; delete S.escolhas[t.dataset.s].autoAntes;

        const zerados = E.dependentes(S, e, t.dataset.s).filter((d) => !E.requisitoOk(S, e, d) && (Object.values((S.escolhas[d.id] || {}).qtd || {}).some((n) => n > 0) || (S.escolhas[d.id] || {}).auxilio));
        zerados.forEach((d) => { const x = S.escolhas[d.id]; x.qtd = {}; (x.grupos || []).forEach((g) => { g.qtd = {}; }); x.auxilio = false; x.auxAmb = []; limparErro(d.id); });

        E.secoes(e, S).filter((x) => x.acionamento).forEach((x) => (x.acionamento.opcoes || []).forEach((o) => {
          const ex = S.escolhas[x.id] || {};
          if (o.requer && o.requer.secao === t.dataset.s && (ex.acion || {})[o.id] && !E.acionRequisitoOk(S, e, o)) { ex.acion[o.id] = false; zerados.push({ aba: `${x.aba || x.titulo} (${o.rotulo.toLowerCase()})`, id: x.id }); }
        }));
        const brindeSim = t.dataset.v === 'sim' && (e.brindes || []).some((b) => b.quando && b.quando.secao === t.dataset.s && E.persianaBrinde(S, e, b.secao, b.ambiente));
        salvar(); render();
        if (brindeSim) toast('Brinde aplicado: persiana da suíte sem custo.');
        const sumiram = ofertadas.filter((id) => !E.secao(e, id, S) && ((S.escolhas[id] || {}).resposta === 'sim' || Object.values((S.escolhas[id] || {}).qtd || {}).some((n) => n > 0)));
        if (sumiram.length) toast(`${sumiram.map((id) => (E.secoes(e).find((x) => x.id === id) || {}).aba || id).join(', ')}: retirado do orçamento, pois deixou de se aplicar à sua unidade.`);
        if (zerados.length) toast(`${zerados.map((d) => d.aba || d.titulo).join(', ')}: escolhas zeradas, pois dependem da ${(E.secao(e, t.dataset.s, S).titulo || '').toLowerCase()}.`);
        break;
      }
      case 'ir-secao': {
        const et = etapaAtual();
        if (sequencial(et)) { const tb = tabsSeq(et).find((x) => x.contem(t.dataset.s)); if (tb) irAba(et, tb.id); }
        else { const el = document.getElementById('sec-' + t.dataset.s); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        break;
      }
      case 'sacada-int': {
        const es = E.esc(S, 'sacada');
        if (es.integracao !== t.dataset.v) { es.integracao = t.dataset.v; es.ciente = false; es.adquirir = null; }
        limparErro('sacada'); salvar(); render();
        break;
      }
      case 'sacada-adq': { const es = E.esc(S, 'sacada'); es.adquirir = t.dataset.v; es.ciente = false; limparErro('sacada'); salvar(); render(); break; }
      case 'pers-amb': {
        const es = E.esc(S, t.dataset.s); es.amb = es.amb || {};
        if (es.amb[t.dataset.a] !== t.dataset.v && t.dataset.v === 'sim') es.aceite = false;
        es.amb[t.dataset.a] = t.dataset.v;
        erros = erros.filter((x) => x.campo !== t.dataset.s + '-' + t.dataset.a && x.campo !== t.dataset.s + '-aceite');
        salvar(); render();
        break;
      }
      case 'video-play': {
        const id = youtubeId(emp().videoUrl);

        const semOrigem = !/^https?:$/.test(location.protocol) || location.origin === 'null';
        if (id && semOrigem) { window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener'); break; }
        const box = document.getElementById('video-box');
        if (box) box.innerHTML = `<iframe src="${esc(videoEmbed(emp().videoUrl))}" title="Vídeo explicativo da 3ª etapa" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
        break;
      }
      case 'gerar': gerarPdf(); break;
      case 'compartilhar': compartilhar(); break;
      case 'link': break;
      default: break;
    }
  });
  const avisouExig = {};

  function limparErroCampo(campo) {
    if (!erros.some((x) => x.campo === campo)) return;
    erros = erros.filter((x) => x.campo !== campo);
    const m = document.getElementById('err-' + campo); if (m) m.remove();
    document.querySelectorAll(`[aria-describedby="err-${campo}"]`).forEach((el) => { el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); const f = el.closest('.f'); if (f) f.classList.remove('has-error'); });
  }
  function limparErro(id) { erros = erros.filter((x) => !(x.campo === id || x.campo.startsWith(id + '-'))); }

  document.addEventListener('change', (ev) => {
    const t = ev.target;
    const e = emp();
    if (t.dataset.act === 'sacada-ciente') { E.esc(S, 'sacada').ciente = t.checked; limparErro('sacada'); salvar(); render(); return; }
    if (t.dataset.act === 'aceite') { E.esc(S, t.dataset.s).aceite = t.checked; limparErro(t.dataset.s); salvar(); render(); return; }
    if (t.dataset.act === 'confirmar') { S.confirmado = t.checked; salvar(false); render(); return; }
    if (t.dataset.act === 'pers-modelo') { const es = E.esc(S, t.dataset.s); es.modelos = es.modelos || {}; es.modelos[t.dataset.a] = t.value; limparErro(t.dataset.s); salvar(); render(); return; }
    if (t.dataset.act === 'aux') {
      const es = E.esc(S, t.dataset.s); es.auxilio = t.checked;
      if (t.checked) es.nenhum = false; else es.auxAmb = [];
      limparErro(t.dataset.s); limparErro(t.dataset.s + '-aux'); salvar(); render(); return;
    }
    if (t.dataset.act === 'acion') {
      const s = E.secao(e, t.dataset.s, S), es = E.esc(S, s.id); es.acion = es.acion || {};
      const o = (s.acionamento.opcoes || []).find((x) => x.id === t.dataset.o);
      es.acion[o.id] = t.checked;
      if (S.avisosNao && s.acionamento.avisoSem && o.id === s.acionamento.avisoSem.opcao) delete S.avisosNao[chaveAvisoSem(s)];
      if (t.checked && o.marca) {
        const alvo = E.secao(e, o.marca.secao, S);
        if (alvo && E.resposta(S, e, alvo) !== o.marca.resposta) { marcarAuto(alvo, o.marca.resposta); toast(`${alvo.aba || alvo.titulo} marcada: ${o.marca.mensagem.charAt(0).toLowerCase() + o.marca.mensagem.slice(1)}`); }
      }
      erros = erros.filter((x) => !x.campo.startsWith(s.id + '-'));
      salvar(); render(); return;
    }
    if (t.dataset.act === 'pers-add') {
      const es = E.esc(S, t.dataset.s); es.adicionais = es.adicionais || {}; es.adicionais[t.dataset.ad] = es.adicionais[t.dataset.ad] || {};
      es.adicionais[t.dataset.ad][t.dataset.a] = t.checked; salvar(); render(); return;
    }
    if (t.dataset.bind === 'empId') {
      if (t.value !== S.empId) { S.empId = t.value; S.escolhas = {}; S.cliente.final = E.cadastroUnidade(S.cliente.unidade, emp()).final; salvar(); render(); toast('Empreendimento alterado: as escolhas foram reiniciadas.'); }
      return;
    }
    if (t.dataset.bind === 'contatoTipo') {
      S.cliente.contatoTipo = t.value;
      if (t.value !== 'email' && /@/.test(S.cliente.contato)) S.cliente.contato = '';
      if (t.value === 'email' && !/@/.test(S.cliente.contato)) S.cliente.contato = '';
      erros = erros.filter((x) => x.campo !== 'contato'); salvar(); render();
      const i = document.getElementById('f-contato'); if (i) i.focus();
      return;
    }
    if (t.dataset.bind) { salvar(); }
    void e;
  });

  let ultimoFinal = S.cliente.final;
  function resetSacadaSeMudou() {
    if (S.cliente.final !== ultimoFinal) { const es = S.escolhas.sacada; if (es) { es.ciente = false; } ultimoFinal = S.cliente.final; }
  }

  document.addEventListener('input', (ev) => {
    const t = ev.target;
    const b = t.dataset.bind;
    if (b && b !== 'empId' && b !== 'contatoTipo') {
      if (b === 'contato' && S.cliente.contatoTipo !== 'email') {
        const m = mascaraTel(t.value);
        if (m !== t.value) t.value = m;
      }
      if (b === 'unidade' && t.getAttribute('role') === 'combobox') {
        comboAbrir(t.value);
        const exato = E.unidadesCadastradas(emp()).find((x) => x.unidade === E.soDigitos(t.value));
        if (exato && E.soDigitos(t.value) === t.value.trim()) { comboSilencio = true; definirUnidade(exato.unidade); const i = document.getElementById('f-un'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } comboSilencio = false; comboFechar(); return; }
        S.cliente.unidade = t.value; S.cliente.final = null;
        const box = document.getElementById('final-box'); if (box) box.innerHTML = finalBox(emp());
        salvar();
        return;
      }
      S.cliente[b] = t.value;
      limparErroCampo(b);
      if (b === 'unidade') {
        S.cliente.final = E.cadastroUnidade(t.value, emp()).final;
        resetSacadaSeMudou();
        const box = document.getElementById('final-box'); if (box) box.innerHTML = finalBox(emp());
      }
      salvar();
      return;
    }
    if (t.dataset.bindTexto) {
      E.esc(S, t.dataset.bindTexto).texto = t.value;
      const c = document.getElementById('cnt-' + t.dataset.bindTexto); if (c) c.textContent = t.value.length;
      salvar();
    }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && $modal.classList.contains('open')) fecharModal();

    if (ev.key === 'Tab' && $modal.classList.contains('open')) {
      const f = [...$modal.querySelectorAll('.sheet button, .sheet a[href], .sheet input, .sheet select, .sheet textarea, .sheet video[controls], .sheet [tabindex]:not([tabindex="-1"])')].filter((x) => !x.disabled && !x.hidden && x.offsetParent !== null);
      if (f.length) {
        const i = f.indexOf(document.activeElement);
        if (ev.shiftKey && (i <= 0)) { ev.preventDefault(); f[f.length - 1].focus(); }
        else if (!ev.shiftKey && (i === -1 || i === f.length - 1)) { ev.preventDefault(); f[0].focus(); }
      }
    }
    if ((ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') && $modal.classList.contains('open')) {
      const d = ev.key === 'ArrowLeft' ? -1 : 1;
      if (zcIr(d) || smNav(d)) ev.preventDefault();
    }
    if (ev.target.id === 'f-un' && ev.target.getAttribute('role') === 'combobox') {
      const aberto = !document.getElementById('un-list').hidden;
      if (ev.key === 'ArrowDown') { ev.preventDefault(); if (!aberto) comboAbrir(''); comboMover(1); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); if (!aberto) comboAbrir(''); comboMover(-1); }
      else if (ev.key === 'Enter') {
        ev.preventDefault();
        const ops = [...document.querySelectorAll('#un-list [role="option"]')];
        const o = ops[comboAtivo] || (ops.length === 1 ? ops[0] : null);
        if (o) definirUnidade(o.dataset.un, { focarProximo: true });
      } else if (ev.key === 'Escape') comboFechar();
    }
  });

  document.addEventListener('error', (ev) => { if (ev.target.classList && ev.target.classList.contains('yt-thumb')) ev.target.remove(); }, true);
  let comboSilencio = false;
  document.addEventListener('focusin', (ev) => {
    if (ev.target.id === 'f-un' && ev.target.getAttribute('role') === 'combobox' && !comboSilencio) comboAbrir(E.grupo(S, emp()) ? '' : ev.target.value);
    else if (!ev.target.closest('#un-combo')) comboFechar();
  });

  document.addEventListener('mousedown', (ev) => {
    const o = ev.target.closest('#un-list [role="option"]');
    if (o) { ev.preventDefault(); definirUnidade(o.dataset.un, { focarProximo: true }); return; }
    if (ev.target.closest('.combo-toggle')) { ev.preventDefault(); const ul = document.getElementById('un-list'); if (ul && ul.hidden) { comboAbrir(''); document.getElementById('f-un').focus(); } else comboFechar(); return; }
    if (ev.target.id === 'f-un' && document.activeElement === ev.target && document.getElementById('un-list').hidden) { setTimeout(() => comboAbrir(''), 0); return; }
    if (!ev.target.closest('#un-combo')) comboFechar();
  });

  function registroHtml(e, protocolo, agora, codigoTabela) {
    const antes = { erros, abertas: [...linhasAbertas] };
    captura = true; erros = []; linhasAbertas.clear();
    try {
      const C0 = '<' + '!--', C1 = '--' + '>', SC = 'scr' + 'ipt';
      const partes = E.etapas(e, S).map((et) => `${C0} etapa: ${et.id} ${C1}${telaEtapa(e, et)}`);
      const cab = `${C0} registro ${protocolo} · ${agora.toISOString()} · versão ${CFG.versao || '—'} · tabela ${codigoTabela} · ${S.cliente.nome} · unidade ${S.cliente.unidade} ${C1}`;
      const dados = `<${SC} type="application/json" id="escolhas">${JSON.stringify({ empId: S.empId, cliente: S.cliente, escolhas: S.escolhas }).replace(/</g, '\\u003c')}</${SC}>`;

      const nomes = new Map(Object.entries(window.ZR3_ASSETS || {}).map(([k, v]) => [v, k]));
      const semEmbutidos = (h) => h.replace(/data:[a-z0-9.+\/-]+;base64,[A-Za-z0-9+\/=]+/gi, (m) => nomes.get(m) || 'data:(arquivo embutido)');
      return semEmbutidos(cab + partes.join('') + dados).replace(/[ \t]*\n[ \t]*/g, ' ').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ');
    } catch (err) {
      console.warn('Registro do preenchimento não gerado:', err);
      return '';
    } finally {
      captura = false; erros = antes.erros; antes.abertas.forEach((x) => linhasAbertas.add(x));
    }
  }

  const SRC_CONFIG = (() => { const sc = document.querySelector('script[src*="config.js"]'); return sc && /^https?:$/.test(location.protocol) ? sc.getAttribute('src') : null; })();
  let tabelaConferidaEm = null;

  function assinaturaOrcamento() {
    try {
      const e = emp(); if (!e || !S.cliente.unidade) return '';
      const c = E.calcular(S, e);
      const pend = telas().slice(1, -1).map((t) => E.validarTela(S, CFG, e, t).length).join(',');
      return JSON.stringify([c.total, c.consulta.length, c.linhas.map((l) => [l.secao && l.secao.id, l.item, l.qtd, l.total, l.status]), pend]);
    } catch (err) { return 'erro'; }
  }
  async function conferirTabela() {
    if (!SRC_CONFIG) return { status: 'sem-servidor' };
    try {
      const r = await fetch(SRC_CONFIG + (SRC_CONFIG.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const w = {}; new Function('window', await r.text())(w);
      const novo = w.ZR3_CONFIG;
      if (!novo || !Array.isArray(novo.empreendimentos)) throw new Error('config inválido');
      const precoMudou = E.codigoTabela(novo) !== E.codigoTabela(CFG);
      const mudou = JSON.stringify(novo) !== JSON.stringify(CFG);

      const antes = mudou ? assinaturaOrcamento() : '';
      if (mudou) { Object.keys(CFG).forEach((k) => delete CFG[k]); Object.assign(CFG, novo); }
      const orcamentoMudou = mudou && assinaturaOrcamento() !== antes;
      tabelaConferidaEm = new Date();
      return { status: precoMudou || orcamentoMudou ? 'valores' : mudou ? 'textos' : 'ok' };
    } catch (err) {
      console.warn('Tabela de valores não conferida:', err);
      return { status: 'sem-conexao' };
    }
  }
  async function gerarPdf() {
    const e = emp();
    { const ts = telas(), pend = ts.slice(1, -1).find((t) => E.validarTela(S, CFG, e, t).length); if (pend) { ir(pend, { forcar: true, mostrarErros: true }); return; } }
    if (!S.confirmado) { toast('Confirme que revisou as opções.', 'erro'); return; }
    const btn = document.querySelector('[data-act="gerar"]');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin" aria-hidden="true"></span><span>Conferindo a tabela de valores…</span>'; }
    const conf = await conferirTabela();
    if (conf.status === 'valores') {
      S.confirmado = false; salvar(false); render();
      abrirModal(`<p>A ZR3 atualizou valores ou regras desde que você abriu esta página, e isso mudou o seu orçamento. O resumo já mostra a versão atual.</p><p>Confira o resumo, marque de novo a confirmação e gere o PDF.</p><div class="modal-act"><button type="button" class="btn primary" data-act="fechar-modal">Conferir o resumo</button></div>`, { titulo: 'Valores atualizados' });
      return;
    }
    if (conf.status === 'textos') render();
    { const ts = telas(), pend = ts.slice(1, -1).find((t) => E.validarTela(S, CFG, emp(), t).length); if (pend) { S.confirmado = false; salvar(false); ir(pend, { forcar: true, mostrarErros: true }); return; } }
    const btn2 = document.querySelector('[data-act="gerar"]');
    if (btn2) { btn2.disabled = true; btn2.innerHTML = '<span class="spin" aria-hidden="true"></span><span>Gerando PDF…</span>'; }
    try {
      const agora = new Date();
      const protocolo = `P3-${E.soDigitos(S.cliente.unidade) || 'UN'}-${agora.getFullYear()}${pad2(agora.getMonth() + 1)}${pad2(agora.getDate())}-${pad2(agora.getHours())}${pad2(agora.getMinutes())}`;
      const tabela = { codigo: E.codigoTabela(CFG), conferida: conf.status === 'ok' || conf.status === 'textos' ? tabelaConferidaEm : null, arquivoUnico: conf.status === 'sem-servidor' };
      const res = await window.ZR3PDF.gerar({ cfg: CFG, emp: emp(), S, calc: E.calcular(S, emp()), avisos: E.avisos(S, emp()), protocolo, data: agora, E, tabela, registro: registroHtml(emp(), protocolo, agora, E.codigoTabela(CFG)) });
      ultimoPdf = res;
      S.pdf = { protocolo, em: agora.toISOString(), arquivo: res.nome, tabela: tabela.codigo };
      salvar(false);
      baixar(res);
      render();
      const d = document.getElementById('pos-pdf'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('PDF gerado. Agora envie à equipe de personalização.');
    } catch (err) {
      console.error(err);
      toast('Não foi possível gerar o PDF. Tente novamente.', 'erro');
      render();
    }
  }
  async function baixar(res) {
    const dl = await downloadsNs;
    if (dl) {
      try { await dl.save({ filename: res.nome, data: res.blob }); return; } catch (err) {
        if (err && err.code === 'declined') { toast('Download cancelado. Use “Baixar novamente” quando quiser.'); return; }
        if (err && err.code === 'host_unavailable') { toast('Este aplicativo não salva arquivos. Abra o link no navegador para baixar o PDF.', 'erro'); return; }
      }
    }
    const a = document.createElement('a');
    a.href = res.url; a.download = res.nome; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }
  async function compartilhar() {
    if (!ultimoPdf) return;
    try {
      await navigator.share({ files: [ultimoPdf.file], title: 'Personalização 3ª etapa', text: msgWhats(emp()) });
    } catch (e) { if (e && e.name !== 'AbortError') toast('Compartilhamento indisponível. Use “Baixar novamente”.'); }
  }

  function armarVoltar() { try { if (!(history.state && history.state.zr3)) history.pushState({ zr3: 1 }, ''); } catch (e) {   } }
  window.addEventListener('popstate', () => {
    if ($modal.classList.contains('open')) { fecharModal(); armarVoltar(); return; }
    if (S.tela === 'inicio') { try { history.back(); } catch (e) {   } return; }
    voltar(); armarVoltar();
  });

  if (!emp()) { $app.innerHTML = '<main class="wrap"><p>Nenhum empreendimento ativo em js/config.js.</p></main>'; return; }

  if (S.cliente.contato == null) {
    S.cliente.contatoTipo = S.cliente.telefone ? 'whatsapp' : S.cliente.email ? 'email' : (CFG.identificacao.contatoPadrao || 'whatsapp');
    S.cliente.contato = S.cliente.telefone || S.cliente.email || '';
    delete S.cliente.telefone; delete S.cliente.email;
  }
  S.cliente.final = E.cadastroUnidade(S.cliente.unidade, emp()).final;
  ultimoFinal = S.cliente.final;

  E.secoes(emp()).filter((x) => x.tipo === 'persianas').forEach((sec) => {
    const es = S.escolhas[sec.id];
    if (es && es.combinacao && !es.amb) {
      const comb = { q1: ['q1'], q2: ['q2'], ambos: ['q1', 'q2'], nenhuma: [] }[es.combinacao] || [];
      es.amb = {}; (sec.ambientes || []).forEach((a) => (es.amb[a.id] = comb.includes(a.id) ? 'sim' : 'nao'));
      delete es.combinacao;
    }
  });
  conferirTabela().then((r) => { if (r.status === 'valores' || r.status === 'textos') { render(); if (r.status === 'valores' && temProgresso()) toast('A tabela de valores foi atualizada. Os valores na tela já são os atuais.'); } });

  [['vaso-suite', 'suite'], ['vaso-social', 'social']].forEach(([id, r]) => {
    const v = S.escolhas[id];
    if (v && v.opcao === '__nenhuma') { delete v.opcao; if (!(S.escolhas['banheiro-removido'] || {}).resposta) S.escolhas['banheiro-removido'] = { resposta: r }; }
  });
  telaSalva = S.tela;
  S.tela = 'inicio';
  try { if (!(history.state && history.state.zr3)) history.replaceState({ base: 1 }, ''); } catch (e) {   }
  render();
  window.__ZR3 = {
    get S() { return S; }, E, CFG,
    api: {
      ir, render, toast, abrirModal, fecharModal,
      salvar: () => { salvar(); },
      substituir: (novo) => { S = novo; S.unidadeBase = S.cliente.unidade; ultimoPdf = null; ultimoFinal = S.cliente.final; erros = []; salvar(); }
    }
  };
})();
