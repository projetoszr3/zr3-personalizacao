(function () {
  'use strict';

  const LEG_MONTGOLFIER = 'Fachada do Residencial Montgolfier, apenas ilustrativa. No Residencial Artus, a fachada não terá vidro do chão ao teto: o fechamento será instalado acima do peitoril de alvenaria.';

  const NOTA_DIM = 'Dimensões de projeto; sujeito a alterações in-loco.';

  const VIDRO_SACADA = [
    'Vidro de segurança laminado: mais conforto acústico, alta resistência a impactos e, em caso de quebra, os fragmentos permanecem presos à película, evitando estilhaços.',
    'Vidro espelhado com isolamento térmico: mais privacidade, menos calor por radiação solar e bloqueio de raios ultravioleta.'
  ];
  const LINHA_SOLUTA = [
    'Linha Soluta: sistema de fachada contínua em vidro e alumínio, com aparência moderna e uniforme e juntas mínimas entre os vidros.',
    'Três níveis de vedação contra vento, ar e água.',
    'Vidros substituíveis pelo lado de dentro, o que facilita a manutenção ao longo da vida do prédio.'
  ];

  const SACADA_CORRER_MAXIMAR = {
    nome: 'Janela de correr frontal + folha maxim-ar lateral',
    subtitulo: 'Linha Nova Gold + maxim-ar Soluta · pintado preto fosco',
    descricao: 'Fechamento instalado acima do peitoril de alvenaria: janela de correr de 2 folhas na frente da sacada e uma folha maxim-ar na lateral, com abertura na direção da área técnica.',
    imagem: 'assets/img/sacada-interna.jpg',

    galeria: [
      { src: 'assets/img/sacada-interna.jpg', legenda: 'Vista interna do fechamento: janela de correr frontal e folha maxim-ar lateral, instaladas acima do peitoril de alvenaria.' },
      { src: 'assets/img/sacada-fachada.jpg', legenda: LEG_MONTGOLFIER },
      { src: 'assets/img/sacada-fachada-2.jpg', legenda: LEG_MONTGOLFIER },
      { src: 'assets/img/sacada-tecnico-frontal.png', legenda: 'Desenho técnico do fechamento frontal: janela de correr de 2 folhas, com fecho concha sem chave. Dimensões: 1,98 m × 1,20 m (largura × altura). Cor: pintado preto fosco.', nota: NOTA_DIM },
      { src: 'assets/img/sacada-tecnico-maximar.png', legenda: 'Desenho técnico do fechamento lateral: 1 folha maxim-ar com fecho punho, com abertura na direção da área técnica. Dimensões: 0,90 m × 1,20 m (largura × altura). Cor: pintado preto fosco.', nota: NOTA_DIM }
    ],
    legendaGaleria: 'Toque nas imagens para ampliar e ver os detalhes.',
    specs: [
      ['Frontal', 'Janela de correr 2 folhas, fecho concha sem chave'],
      ['Linha (frontal)', 'Nova Gold Tradicional – vidro colado'],
      ['Dimensões (frontal)', '1,98 m × 1,20 m (L × A)'],
      ['Lateral', '1 folha maxim-ar, fecho punho, abertura na direção da área técnica'],
      ['Linha (lateral)', 'Soluta'],
      ['Dimensões (lateral)', '0,90 m × 1,20 m (L × A)'],
      ['Vidro', 'Laminado de segurança 4+4 mm, espelhado'],
      ['Cor', 'Pintado preto fosco'],
      ['Instalação', 'Acima do peitoril de alvenaria']
    ],
    diferenciais: [
      'Nova Gold: linha de esquadrias de alumínio para residências de alto padrão, com design contemporâneo e conforto acústico.',
      'Vedação reforçada, que reduz a entrada de ruídos externos e deixa os ambientes mais silenciosos e reservados.',
      'Deslizamento suave das folhas e acabamento com poucas marcações aparentes.',
      'Testada conforme as normas técnicas brasileiras de vento, chuva e uso diário.',
      ...VIDRO_SACADA
    ]
  };

  const sacadaMaximar = (larg, desenho) => ({
    nome: 'Fechamento com 5 folhas maxim-ar',
    subtitulo: 'Linha Soluta · pintado preto fosco',
    descricao: 'O fechamento é composto por 5 folhas maxim-ar com fecho punho.',
    imagem: 'assets/img/loft-render.jpg',
    galeria: [
      { src: 'assets/img/loft-render.jpg', legenda: 'Imagem renderizada de um loft do 2º pavimento (201 a 206), com fechamento em folhas maxim-ar como o desta unidade. Elementos meramente ilustrativos.' },
      { src: desenho, legenda: `Desenho técnico do fechamento: 5 folhas maxim-ar com fecho punho. Dimensões: ${larg} × 1,20 m (largura × altura). Cor: pintado preto fosco.`, nota: NOTA_DIM }
    ],
    legendaGaleria: 'Toque nas imagens para ampliar e ver os detalhes.',
    specs: [
      ['Sistema', '5 folhas maxim-ar, fecho punho'],
      ['Linha', 'Soluta'],
      ['Dimensões', `${larg} × 1,20 m (L × A)`],
      ['Vidro', 'Laminado de segurança 4+4 mm, espelhado'],
      ['Cor', 'Pintado preto fosco']
    ],
    diferenciais: [...VIDRO_SACADA, ...LINHA_SOLUTA]
  });
  const SACADA_FINAL_02 = sacadaMaximar('4,05 m', 'assets/img/sacada-tecnico-final02.png');
  const SACADA_FINAL_07 = sacadaMaximar('4,65 m', 'assets/img/sacada-tecnico-final07.png');

  const SACADA_LOFTS = {
    nome: 'Fechamento com 4 folhas maxim-ar',
    subtitulo: 'Linha Soluta · pintado preto fosco',
    descricao: 'O fechamento é composto por 4 folhas maxim-ar com fecho punho.',
    imagem: 'assets/img/loft-render.jpg',
    galeria: [
      { src: 'assets/img/loft-render.jpg', legenda: 'Imagem renderizada do loft final 02. Elementos meramente ilustrativos.' },
      { src: 'assets/img/sacada-tecnico-loft.png', legenda: 'Desenho técnico do fechamento: 4 folhas maxim-ar com fecho punho. Dimensões: 4,40 a 4,80 m × 1,70 m (largura × altura). Cor: pintado preto fosco.', nota: 'Dimensões de projeto variam de acordo com a unidade; sujeito a alterações in-loco.' }
    ],
    legendaGaleria: 'Toque nas imagens para ampliar e ver os detalhes.',
    specs: [
      ['Sistema', '4 folhas maxim-ar, fecho punho'],
      ['Linha', 'Soluta'],
      ['Dimensões', '4,40 a 4,80 m × 1,70 m (L × A), conforme a unidade'],
      ['Vidro', 'Laminado de segurança 4+4 mm, espelhado'],
      ['Cor', 'Pintado preto fosco']
    ],
    diferenciais: [
      'Vidro de segurança laminado: mais conforto acústico, alta resistência a impactos e, em caso de quebra, os fragmentos permanecem presos à película, evitando estilhaços.',
      'Vidro espelhado com isolamento térmico: mais privacidade, menos calor por radiação solar e bloqueio de raios ultravioleta.',
      'Fachada sofisticada e moderna, que valoriza o imóvel, sem perfis aparentes como em janelas convencionais.'
    ].concat(LINHA_SOLUTA)
  };

  const SACADA = {
    tipo: 'sacada',
    id: 'sacada',
    video: { arquivo: 'assets/video/video-sacada.mp4', capa: 'assets/video/video-sacada.jpg', titulo: 'Fechamento de sacada', inicio: 0 },
    titulo: 'Fechamento de sacada',
    regras: {

      inclusoFinais: [1, 2, 3, 6, 7, 8],

      personalizadoFinais: [4, 5],

      valor: 7500,

      gruposSemFinal: 'incluso',

      unidadesComIntegracao: [],

      semIntegracao: 'opcional',

      permitirNaoSei: true
    },
    cheki: { inclusa: '1.1.2', semFechamento: '1.1.1', comFechamento: '1.1.3' },

    produtosPorGrupo: [
      { grupos: ['final-02'], produto: SACADA_FINAL_02 },
      { grupos: ['final-07'], produto: SACADA_FINAL_07 },
      { grupos: ['loft-201', 'loft-206', 'lofts-202-205'], produto: SACADA_LOFTS }
    ],

    produto: SACADA_CORRER_MAXIMAR
  };

  const opcoesVaso = (pref, cod) => [
    {
      id: pref + '-padrao', cheki: cod[0],
      nome: 'Padrão', subtitulo: 'Icasa · Linha Sabará · sem tampa e sem assento', fabricante: 'Icasa', modelo: 'Linha Sabará (padrão)',
      imagem: 'assets/img/vaso-padrao-sabara.jpg', resumo: 'Modelo de entrega, sem tampa e sem assento.',
      galeria: [
        { src: 'assets/img/vaso-padrao-sabara.jpg', legenda: 'Vaso sanitário Icasa, linha Sabará, com caixa acoplada. Modelo de entrega, sem tampa e sem assento.' },
        { src: 'assets/img/vaso-sabara-frontal.png', legenda: 'Vista frontal: largura de 410 mm e altura total de 765 mm.', nota: 'Dimensões do fabricante.' },
        { src: 'assets/img/vaso-sabara-lateral.png', legenda: 'Vista lateral: profundidade de 640 mm e altura da bacia de 390 mm.', nota: 'Dimensões do fabricante.' }
      ],
      specs: [['Fabricante', 'Icasa'], ['Linha', 'Sabará'], ['Bacia', 'IP36 · bacia para caixa acoplada Pop'], ['Caixa', 'IC46 · caixa para bacia acoplada, com mecanismo'], ['Dimensões', '410 × 640 × 765 mm (largura × profundidade × altura)'], ['Tampa e assento', 'Não inclusos'], ['Instalação', 'Inclusa (padrão de entrega)']],
      valor: 0, padrao: true
    },
    {
      id: pref + '-basico', cheki: cod[1],
      nome: 'Básico', subtitulo: 'Icasa · Linha Sabará · com acessórios', fabricante: 'Icasa', modelo: 'Linha Sabará (kit)',
      imagem: 'assets/img/vaso-basico-sabara.jpg', resumo: 'Vaso padrão em kit, já com tampa e assento.',
      galeria: [
        { src: 'assets/img/vaso-basico-sabara.jpg', legenda: 'Vaso sanitário Icasa, linha Sabará, com caixa acoplada, tampa e assento.' },
        { src: 'assets/img/vaso-sabara-kit.jpg', legenda: 'Combo Sabará: vaso com caixa acoplada, tampa e assento, entregue instalado com os acessórios (anel de vedação, engate flexível e fixadores).' },
        { src: 'assets/img/vaso-sabara-frontal.png', legenda: 'Vista frontal: largura de 410 mm e altura total de 765 mm.', nota: 'Dimensões do fabricante.' },
        { src: 'assets/img/vaso-sabara-lateral.png', legenda: 'Vista lateral: profundidade de 640 mm e altura da bacia de 390 mm.', nota: 'Dimensões do fabricante.' }
      ],
      specs: [['Fabricante', 'Icasa'], ['Linha', 'Sabará'], ['Bacia', 'IP36 · bacia para caixa acoplada Pop'], ['Caixa', 'IC46 · caixa para bacia acoplada, com mecanismo'], ['Dimensões', '410 × 640 × 765 mm (largura × profundidade × altura)'], ['Acessórios', 'Tampa, assento, anel de vedação, fixadores e engates'], ['Instalação', 'Completa']],
      valor: 300
    },
    {
      id: pref + '-intermediario', cheki: cod[2],
      nome: 'Intermediário', subtitulo: 'Icasa · Linha Etna · com acessórios', fabricante: 'Icasa', modelo: 'Linha Etna (kit)',
      imagem: 'assets/img/vaso-intermediario-etna.jpg', resumo: 'Desenho moderno e esbelto, com tampa e assento.',
      galeria: [
        { src: 'assets/img/vaso-intermediario-etna.jpg', legenda: 'Vaso sanitário Icasa, linha Etna, com caixa acoplada, tampa e assento.' },
        { src: 'assets/img/vaso-etna-kit.jpg', legenda: 'Combo Etna: vaso com caixa acoplada, tampa e assento, entregue instalado com os acessórios (anel de vedação, engate flexível e fixadores).' },
        { src: 'assets/img/vaso-etna-frontal.png', legenda: 'Vista frontal: largura de 390 mm e altura total de 770 mm.', nota: 'Dimensões do fabricante.' },
        { src: 'assets/img/vaso-etna-lateral.png', legenda: 'Vista lateral: profundidade de 635 mm e altura da bacia de 400 mm.', nota: 'Dimensões do fabricante.' }
      ],
      specs: [['Fabricante', 'Icasa'], ['Linha', 'Etna'], ['Bacia', 'IP21 · bacia para caixa acoplada'], ['Caixa', 'IC24 · caixa para bacia acoplada, com mecanismo'], ['Dimensões', '390 × 635 × 770 mm (largura × profundidade × altura)'], ['Acessórios', 'Tampa, assento, anel de vedação, fixadores e engates'], ['Instalação', 'Completa']],
      valor: 650
    },
    {
      id: pref + '-bari', cheki: cod[3],
      nome: 'Superior · Bari', subtitulo: 'Icasa · Linha Bari · com acessórios', fabricante: 'Icasa', modelo: 'Linha Bari (kit)',
      imagem: 'assets/img/vaso-bari.jpg',
      resumo: 'Linha superior de formas arredondadas e suaves, com tampa e assento.',
      galeria: [
        { src: 'assets/img/vaso-bari.jpg', legenda: 'Vaso sanitário Icasa, linha Bari, com caixa acoplada, tampa e assento.' },
        { src: 'assets/img/vaso-bari-kit.jpg', legenda: 'Combo Bari: vaso com caixa acoplada, tampa e assento, entregue instalado com os acessórios (anel de vedação, engate flexível e fixadores).' },
        { src: 'assets/img/vaso-bari-frontal.png', legenda: 'Vista frontal: largura de 400 mm e altura total de 750 mm.', nota: 'Dimensões do fabricante.' },
        { src: 'assets/img/vaso-bari-lateral.png', legenda: 'Vista lateral: profundidade de 685 mm e altura da bacia de 395 mm.', nota: 'Dimensões do fabricante.' }
      ],
      specs: [['Fabricante', 'Icasa'], ['Linha', 'Bari'], ['Bacia', 'BAC2 · bacia para caixa acoplada'], ['Caixa', 'CAC2 · caixa para bacia acoplada, com mecanismo'], ['Dimensões', '400 × 685 × 750 mm (largura × profundidade × altura)'], ['Acessórios', 'Tampa, assento, anel de vedação, fixadores e engates'], ['Instalação', 'Completa']],
      valor: 900
    },
    {
      id: pref + '-asti', cheki: cod[4],
      nome: 'Superior · Asti', subtitulo: 'Icasa · Linha Asti · com acessórios', fabricante: 'Icasa', modelo: 'Linha Asti (kit)',
      imagem: 'assets/img/vaso-asti.jpg',
      resumo: 'Linha superior de formas retas e quadradas, com tampa e assento.',
      galeria: [
        { src: 'assets/img/vaso-asti.jpg', legenda: 'Vaso sanitário Icasa, linha Asti, com caixa acoplada, tampa e assento.' },
        { src: 'assets/img/vaso-asti-kit.jpg', legenda: 'Combo Asti: vaso com caixa acoplada, tampa e assento, entregue instalado com os acessórios (anel de vedação, engate flexível e fixadores).' },
        { src: 'assets/img/vaso-asti-frontal.png', legenda: 'Vista frontal: largura de 370 mm e altura total de 750 mm.', nota: 'Dimensões do fabricante.' },
        { src: 'assets/img/vaso-asti-lateral.png', legenda: 'Vista lateral: profundidade de 660 mm e altura da bacia de 390 mm.', nota: 'Dimensões do fabricante.' }
      ],
      specs: [['Fabricante', 'Icasa'], ['Linha', 'Asti'], ['Bacia', 'BAC3 · bacia para caixa acoplada'], ['Caixa', 'CAC3 · caixa para bacia acoplada, com mecanismo'], ['Dimensões', '370 × 660 × 750 mm (largura × profundidade × altura)'], ['Acessórios', 'Tampa, assento, anel de vedação, fixadores e engates'], ['Instalação', 'Completa']],
      valor: 1100
    }
  ];

  const VASO_SUITE = {
    tipo: 'unica',
    id: 'vaso-suite',
    aba: 'Banheiro da suíte',
    titulo: 'Vaso sanitário · banheiro da suíte',
    descricao: 'Modelos pensados em estética, ergonomia e conforto. Os personalizados são entregues com os acessórios necessários para o uso: tampa, assento, anel de vedação, fixadores e engates.',

    nota: 'A linha Vesúvio não está sendo fabricada pelo fornecedor no momento. As linhas Bari e Asti são as opções de linha superior.',
    obrigatoria: true,
    cobranca: 'por vaso',

    ocultarSe: { secao: 'banheiro-removido', resposta: 'suite' },
    opcoes: opcoesVaso('vaso-suite', ['3.1.1', '3.1.2', '3.1.3', '3.1.4', '3.1.5'])
  };

  const VASO_SOCIAL = Object.assign({}, VASO_SUITE, {
    id: 'vaso-social',
    aba: 'Banheiro social',
    copiarDe: 'vaso-suite',
    titulo: 'Vaso sanitário · banheiro social',
    descricao: 'Escolha o modelo do banheiro social.',
    descricaoComOrigem: 'Pode ser diferente do escolhido para a suíte.',
    ocultarSe: { secao: 'banheiro-removido', resposta: 'social' },
    opcoes: opcoesVaso('vaso-social', ['3.1.6', '3.1.7', '3.1.8', '3.1.9', '3.1.10'])
  });

  const ESPELHOS = {
    tipo: 'unica',
    id: 'espelho',
    video: { arquivo: 'assets/video/video-espelhos.mp4', capa: 'assets/video/video-espelhos.jpg', titulo: 'Espelhos de tomada', inicio: 0 },
    titulo: 'Modelo de espelho (acabamento de interruptores e tomadas)',
    descricao: 'Apesar de sutis, os modelos de espelho dos dispositivos elétricos transformam o apartamento. A troca do modelo padrão vale para todos os pontos existentes no projeto.',
    ajuda: 'espelho',
    obrigatoria: true,
    cobranca: 'por apartamento (todos os pontos)',
    nenhuma: null,
    opcoes: [
      {
        id: 'espelho-padrao', cheki: '3.2.1',
        nome: 'Curvo',
        subtitulo: 'WEG · linha Composé · branco',
        imagem: 'assets/img/espelho-padrao.jpg',
        galeria: [
          { src: 'assets/img/espelho-padrao.jpg', legenda: 'Acabamento curvo (padrão de entrega): interruptor de 2 teclas com tomada.' },
          { src: 'assets/img/espelho-padrao-3teclas.jpg', legenda: 'Acabamento curvo (padrão de entrega): interruptor de 3 teclas.' },
          { src: 'assets/img/espelho-padrao-tomadas.jpg', legenda: 'Acabamento curvo (padrão de entrega): tomadas tripla, dupla e simples. A composição de cada ponto segue o projeto elétrico.' }
        ],
        resumo: 'Modelo de entrega do empreendimento.',
        specs: [['Fabricante', 'WEG'], ['Linha', 'Composé'], ['Formato', 'Curvo / teclas arredondadas'], ['Cor', 'Branco'], ['Aplicação', 'Todos os pontos do projeto']],
        valor: 0,
        padrao: true
      },
      {
        id: 'espelho-quadrada-branco', cheki: '3.2.2',
        nome: 'Quadrado (branco)',
        subtitulo: 'WEG · linha Esatta · branco',
        imagem: 'assets/img/espelho-quadrada-branco-capa.jpg',
        galeria: [
          { src: 'assets/img/espelho-quadrada-branco-capa.jpg', legenda: 'Acabamento quadrado branco: interruptor de 2 teclas com tomada.' },
          { src: 'assets/img/espelho-quadrada-branco-3teclas.jpg', legenda: 'Acabamento quadrado branco: interruptor de 3 teclas.' },
          { src: 'assets/img/espelho-quadrada-branco-tomadas.jpg', legenda: 'Acabamento quadrado branco: tomada dupla. A composição de cada ponto segue o projeto elétrico.' }
        ],
        resumo: 'Visual reto e minimalista, em branco.',
        specs: [['Fabricante', 'WEG'], ['Linha', 'Esatta'], ['Formato', 'Quadrado / teclas retas'], ['Cor', 'Branco'], ['Aplicação', 'Todos os pontos do projeto']],
        valor: 350
      },
      {
        id: 'espelho-quadrada-preto', cheki: '3.2.3',
        nome: 'Quadrado (preto grafite)',
        subtitulo: 'WEG · linha Esatta · preto grafite',
        imagem: 'assets/img/espelho-quadrada-preto-capa.jpg',
        galeria: [
          { src: 'assets/img/espelho-quadrada-preto-capa.jpg', legenda: 'Acabamento quadrado preto grafite: interruptor de 2 teclas com tomada.' },
          { src: 'assets/img/espelho-quadrada-preto-3teclas.jpg', legenda: 'Acabamento quadrado preto grafite: interruptor de 3 teclas.' },
          { src: 'assets/img/espelho-quadrada-preto-tomadas.jpg', legenda: 'Acabamento quadrado preto grafite: tomada dupla. A composição de cada ponto segue o projeto elétrico.' }
        ],
        resumo: 'Visual reto e minimalista, em preto grafite.',
        specs: [['Fabricante', 'WEG'], ['Linha', 'Esatta'], ['Formato', 'Quadrado / teclas retas'], ['Cor', 'Preto grafite (fosco)'], ['Aplicação', 'Todos os pontos do projeto']],
        valor: 525
      }
    ]
  };

  const FECHADURA = {
    tipo: 'unica',
    id: 'fechadura',
    video: { arquivo: 'assets/video/video-fechadura.mp4', capa: 'assets/video/video-fechadura.jpg', titulo: 'Fechadura digital', inicio: 0 },
    aba: 'Fechadura',
    titulo: 'Fechadura digital',
    resumoCurto: 'Abre com digital, senha, tag, aplicativo ou chave.', inclui: ['produto', 'instalacao', 'configuracao'],
    descricao: 'Instalada na porta de entrada da unidade. O valor inclui a instalação, configuração, conexão à rede, cadastro de usuários, digitais, tags e senhas.',
    obrigatoria: true,
    cobranca: 'por unidade',
    nenhuma: { rotulo: 'Fechadura comum (padrão)', descricao: 'Padrão de entrega: a porta de entrada recebe a fechadura comum, sem custo.' },
    opcoes: [
      {
        id: 'fechadura-smart-wifi', cheki: '4.9.5',
        nome: 'Fechadura inteligente Wi-Fi Black Shine',
        subtitulo: 'Nova Digital · SL-SHINE · digital, senha, tag, app ou chave',
        imagem: 'assets/img/nd-fechadura-frente-verso.jpg',
        galeria: [
          { src: 'assets/img/nd-fechadura-frente-verso.jpg', legenda: 'Fechadura Black Shine: lado interno (à esquerda) e lado externo, com teclado e leitor de digital (à direita).' },
          { src: 'assets/img/nd-fechadura-caixa.jpg', legenda: 'Fechadura inteligente Wi-Fi Black Shine, Nova Digital, com a embalagem.' },
          { src: 'assets/img/nd-fechadura-ambiente.jpg', legenda: 'Acabamento preto, com leitor de digital na maçaneta.' },
          { src: 'assets/img/nd-fechadura-emergencia.jpg', legenda: 'Abertura de emergência: entrada para powerbank e chave mecânica.' }
        ],
        resumo: 'Mais segurança, conveniência e praticidade, sem fiação.',

        specs: [
          ['Modelo', 'Nova Digital SL-SHINE (Black Shine)'],
          ['Formas de acesso', 'Impressão digital, senha, cartão (tag), aplicativo e chave mecânica'],
          ['Conectividade', 'Wi-Fi 2,4 GHz'],
          ['Usuários', 'Até 9 administradores e 300 usuários'],
          ['Alimentação', '4 pilhas AA (incluídas); entrada para powerbank (5 V) em emergência'],
          ['Porta', 'Espessura de 35 a 65 mm'],
          ['Dimensões', '264 × 151 × 71,5 mm'],
          ['Instalação e configuração', 'Incluídas no valor: instalação, configuração, conexão à rede, cadastro de usuários, digitais, tags e senhas'],
          ['Garantia', '1 ano a partir da data de entrega do empreendimento']
        ],
        valor: 1050
      }

    ]
  };

  const LINHAS_INTERRUPTOR = {
    id: 'linha-interruptor',
    titulo: 'Cor e linha dos interruptores inteligentes',
    descricao: 'Escolha a cor, depois a linha, e informe as peças. Para usar mais de uma linha, toque em “Adicionar outra linha”.',

    fotosEmLoop: true,

    semPeca: { 'tomada-simples': 'Sem tomada', 'tomada-dupla': 'Sem tomada' },
    pecasCurtas: { 'tecla-simples': '1 tecla', 'tecla-dupla': '2 teclas', 'tecla-tripla': '3 teclas', quadruplo: '4 teclas', 'tecla-sextupla': '6 teclas', 'tomada-simples': 'Tomada + 1 tecla', 'tomada-dupla': 'Tomada + 2 teclas' },

    tons: [
      { id: 'branco', nome: 'Branco', amostra: '#f4f5f7', cores: ['branco'] },
      { id: 'preto', nome: 'Preto', amostra: '#1f2024', cores: ['preto', 'preto-fosco'] },
      { id: 'cinza', nome: 'Cinza', amostra: '#7b8088', cores: ['cinza-escuro'] }
    ],
    uso: 'os interruptores da automação',

    opcoes: [
      {
        id: 'touch-wifi', nome: 'Touch - Vidro', fabricante: 'JWCom', protocolo: 'wifi', subtitulo: 'Painel de vidro com toque',
        imagem: 'assets/img/jw-touch-branco-tecla-tripla.jpg',

        imagens: {

          branco: { persiana: 'assets/img/jw-touch-branco-persiana.jpg', 'tecla-simples': 'assets/img/jw-touch-branco-tecla-simples.jpg', 'tecla-dupla': 'assets/img/jw-touch-branco-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/jw-touch-branco-tecla-tripla.jpg', 'quadruplo': 'assets/img/jw-touch-branco-quadruplo.jpg', 'tecla-sextupla': 'assets/img/jw-touch-branco-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/jw-touch-branco-tomada-simples.jpg', 'tomada-dupla': 'assets/img/jw-touch-branco-tomada-dupla.jpg' },
          preto: { persiana: 'assets/img/jw-touch-preto-persiana.jpg', 'tecla-simples': 'assets/img/jw-touch-preto-tecla-simples.jpg', 'tecla-dupla': 'assets/img/jw-touch-preto-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/jw-touch-preto-tecla-tripla.jpg', 'quadruplo': 'assets/img/jw-touch-preto-quadruplo.jpg', 'tecla-sextupla': 'assets/img/jw-touch-preto-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/jw-touch-preto-tomada-simples.jpg', 'tomada-dupla': 'assets/img/jw-touch-preto-tomada-dupla.jpg' }
        },
        resumo: 'Acionamento por toque no painel de vidro, com conexão Wi-Fi.',
        cores: [{ id: 'branco', nome: 'Branco' }, { id: 'preto', nome: 'Preto' }],
        caixas: { quadruplo: 'Caixa 4x4' },
        precos: { 'tecla-simples': 150, 'tecla-dupla': 175, 'tecla-tripla': 200, quadruplo: 250, 'tecla-sextupla': 275, 'tomada-simples': 225, 'tomada-dupla': 250, persiana: 200 }
      },
      {
        id: 'fisico-jw-vidro', nome: 'Físico - Vidro', fabricante: 'JWCom', protocolo: 'zigbee', subtitulo: 'Teclas físicas em vidro',
        imagem: 'assets/img/jw-fisico-branco-tecla-tripla.jpg',
        imagens: {
          branco: { 'tecla-simples': 'assets/img/jw-fisico-branco-tecla-simples.jpg', 'tecla-dupla': 'assets/img/jw-fisico-branco-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/jw-fisico-branco-tecla-tripla.jpg', 'quadruplo': 'assets/img/jw-fisico-branco-quadruplo.jpg', 'tecla-sextupla': 'assets/img/jw-fisico-branco-tecla-sextupla.jpg' },
          preto: { 'tecla-simples': 'assets/img/jw-fisico-preto-tecla-simples.jpg', 'tecla-dupla': 'assets/img/jw-fisico-preto-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/jw-fisico-preto-tecla-tripla.jpg', 'quadruplo': 'assets/img/jw-fisico-preto-quadruplo.jpg', 'tecla-sextupla': 'assets/img/jw-fisico-preto-tecla-sextupla.jpg' }
        },
        resumo: 'Teclas de pressionar com frente de vidro. Não tem modelos com tomada. Funciona com protocolo Zigbee: exige o hub Zigbee, que já fica marcado.',
        cores: [{ id: 'branco', nome: 'Branco' }, { id: 'preto', nome: 'Preto' }],
        caixas: { quadruplo: 'Caixa 4x4' },
        precos: { 'tecla-simples': 250, 'tecla-dupla': 275, 'tecla-tripla': 300, quadruplo: 325, 'tecla-sextupla': 350, persiana: 450 },
        exige: { secao: 'hub-zigbee', resposta: 'sim', mensagem: 'A linha Físico - Vidro JWCom funciona com protocolo Zigbee e exige o hub Zigbee.', acao: 'Mantenha o hub ou troque a linha.' }
      },
      {
        id: 'fisico-jw-fosco', nome: 'Físico - Fosco', fabricante: 'JWCom', protocolo: 'wifi', subtitulo: 'Teclas físicas em preto fosco',
        imagem: 'assets/img/jw-fosco-preto-fosco-tecla-tripla.jpg',
        imagens: { 'preto-fosco': { 'tecla-simples': 'assets/img/jw-fosco-preto-fosco-tecla-simples.jpg', 'tecla-dupla': 'assets/img/jw-fosco-preto-fosco-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/jw-fosco-preto-fosco-tecla-tripla.jpg' } },
        resumo: 'Teclas de pressionar em preto fosco, com conexão Wi-Fi. Só até 3 teclas, sem modelos com tomada.',
        cores: [{ id: 'preto-fosco', nome: 'Preto fosco' }],
        precos: { 'tecla-simples': 200, 'tecla-dupla': 225, 'tecla-tripla': 250, persiana: 400 }
      },
      {
        id: 'fisico-nova-digital', nome: 'Fullpress', comercial: 'Safira', fabricante: 'Nova Digital', protocolo: 'zigbee', subtitulo: 'Linha Safira · teclas físicas',
        imagem: 'assets/img/nd-fullpress-branco-tecla-tripla.jpg',

        imagens: {
          branco: { 'tecla-simples': 'assets/img/nd-fullpress-branco-tecla-simples.jpg', 'tecla-dupla': 'assets/img/nd-fullpress-branco-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/nd-fullpress-branco-tecla-tripla.jpg', 'quadruplo': 'assets/img/nd-fullpress-branco-quadruplo.jpg', 'tecla-sextupla': 'assets/img/nd-fullpress-branco-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/nd-fullpress-branco-tomada-dupla.jpg', 'tomada-dupla': 'assets/img/nd-fullpress-branco-tomada-dupla.jpg' },
          'cinza-escuro': { 'tecla-simples': 'assets/img/nd-fullpress-cinza-escuro-tecla-simples.jpg', 'tecla-dupla': 'assets/img/nd-fullpress-cinza-escuro-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/nd-fullpress-cinza-escuro-tecla-tripla.jpg', 'quadruplo': 'assets/img/nd-fullpress-cinza-escuro-quadruplo.jpg', 'tecla-sextupla': 'assets/img/nd-fullpress-cinza-escuro-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/nd-fullpress-cinza-escuro-tomada-dupla.jpg', 'tomada-dupla': 'assets/img/nd-fullpress-cinza-escuro-tomada-dupla.jpg' }
        },
        resumo: 'Teclas de pressionar, como um interruptor convencional. Funciona com protocolo Zigbee: exige o hub Zigbee, que já fica marcado.',
        cores: [{ id: 'branco', nome: 'Branco' }, { id: 'cinza-escuro', nome: 'Cinza' }],
        caixas: { quadruplo: 'Caixa 4x2' },
        precos: { 'tecla-simples': 275, 'tecla-dupla': 300, 'tecla-tripla': 325, quadruplo: 350, 'tecla-sextupla': 375, 'tomada-simples': 300, 'tomada-dupla': 325, persiana: 475 },
        exige: { secao: 'hub-zigbee', resposta: 'sim', mensagem: 'A linha Fullpress Nova Digital funciona com protocolo Zigbee e exige o hub Zigbee.', acao: 'Mantenha o hub ou troque a linha.' }
      },
      {
        id: 'touch-led-nova-digital', nome: 'Touch LED', comercial: 'Topázio', fabricante: 'Nova Digital', protocolo: 'zigbee', subtitulo: 'Linha Topázio · toque com LED',
        imagem: 'assets/img/nd-touchled-branco-tecla-tripla.jpg',
        imagens: {
          branco: { 'tecla-simples': 'assets/img/nd-touchled-branco-tecla-simples.jpg', 'tecla-dupla': 'assets/img/nd-touchled-branco-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/nd-touchled-branco-tecla-tripla.jpg', 'quadruplo': 'assets/img/nd-touchled-branco-quadruplo.jpg', 'tecla-sextupla': 'assets/img/nd-touchled-branco-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/nd-touchled-branco-tomada-simples.jpg', 'tomada-dupla': 'assets/img/nd-touchled-branco-tomada-dupla.jpg' },
          preto: { 'tecla-simples': 'assets/img/nd-touchled-preto-tecla-simples.jpg', 'tecla-dupla': 'assets/img/nd-touchled-preto-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/nd-touchled-preto-tecla-tripla.jpg', 'quadruplo': 'assets/img/nd-touchled-preto-quadruplo.jpg', 'tecla-sextupla': 'assets/img/nd-touchled-preto-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/nd-touchled-preto-tomada-simples.jpg', 'tomada-dupla': 'assets/img/nd-touchled-preto-tomada-dupla.jpg' }
        },
        resumo: 'Painel liso com toque e indicação luminosa em LED. Funciona com protocolo Zigbee: exige o hub Zigbee, que já fica marcado.',
        cores: [{ id: 'branco', nome: 'Branco' }, { id: 'preto', nome: 'Preto' }],
        caixas: { quadruplo: 'Caixa 4x2' },
        precos: { 'tecla-simples': 250, 'tecla-dupla': 275, 'tecla-tripla': 300, quadruplo: 325, 'tecla-sextupla': 400, 'tomada-simples': 300, 'tomada-dupla': 325, persiana: 450 },
        exige: { secao: 'hub-zigbee', resposta: 'sim', mensagem: 'A linha Touch LED Nova Digital funciona com protocolo Zigbee e exige o hub Zigbee.', acao: 'Mantenha o hub ou troque a linha.' }
      },
      {
        id: 'soft-touch-nova-digital', nome: 'Soft touch', comercial: 'Quartzo', fabricante: 'Nova Digital', protocolo: 'zigbee', subtitulo: 'Linha Quartzo · toque suave',
        imagem: 'assets/img/nd-softtouch-branco-tecla-tripla.jpg',
        imagens: {
          branco: { 'tecla-simples': 'assets/img/nd-softtouch-branco-tecla-simples.jpg', 'tecla-dupla': 'assets/img/nd-softtouch-branco-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/nd-softtouch-branco-tecla-tripla.jpg', 'tecla-sextupla': 'assets/img/nd-softtouch-branco-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/nd-softtouch-branco-tomada-simples.jpg', 'tomada-dupla': 'assets/img/nd-softtouch-branco-tomada-dupla.jpg' },
          preto: { 'tecla-simples': 'assets/img/nd-softtouch-preto-tecla-simples.jpg', 'tecla-dupla': 'assets/img/nd-softtouch-preto-tecla-dupla.jpg', 'tecla-tripla': 'assets/img/nd-softtouch-preto-tecla-tripla.jpg', 'tecla-sextupla': 'assets/img/nd-softtouch-preto-tecla-sextupla.jpg', 'tomada-simples': 'assets/img/nd-softtouch-preto-tomada-simples.jpg', 'tomada-dupla': 'assets/img/nd-softtouch-preto-tomada-dupla.jpg' }
        },
        resumo: 'Painel de toque suave. Funciona com protocolo Zigbee: exige o hub Zigbee, que já fica marcado.',
        cores: [{ id: 'branco', nome: 'Branco' }, { id: 'preto', nome: 'Preto' }],
        precos: { 'tecla-simples': 200, 'tecla-dupla': 225, 'tecla-tripla': 250, 'tecla-sextupla': 325, 'tomada-simples': 275, 'tomada-dupla': 300, persiana: 400 },
        exige: { secao: 'hub-zigbee', resposta: 'sim', mensagem: 'A linha Soft touch Nova Digital funciona com protocolo Zigbee e exige o hub Zigbee.', acao: 'Mantenha o hub ou troque a linha.' }
      }

    ]
  };

  const LINHAS_EXAUSTOR = Object.assign({}, LINHAS_INTERRUPTOR, {
    id: 'linha-exaustor',
    titulo: 'Cor e linha do interruptor da churrasqueira',
    descricao: 'Pode ser diferente dos outros interruptores da unidade.',
    uso: 'o interruptor da churrasqueira',
    resumoEscolha: 'Pode ser diferente dos outros interruptores da unidade.'
  });

  const LINHAS_PERSIANA = Object.assign({}, LINHAS_INTERRUPTOR, {
    id: 'linha-persiana',
    titulo: 'Cor e linha do interruptor da persiana',
    descricao: 'Pode ser diferente em cada ambiente e dos interruptores da automação. Na linha Touch - Vidro, a persiana tem interruptor próprio; nas demais, usa o interruptor de 3 teclas da linha.',
    uso: 'o interruptor da persiana',
    fotosEmLoop: false,
    pecaFoto: 'persiana',
    resumoEscolha: 'Vale para a persiana deste ambiente.'
  });

  const AUTO_INTERRUPTORES = {
    tipo: 'quantidades',
    id: 'auto-interruptores',
    aba: 'Interruptores',
    titulo: 'Interruptores e tomadas inteligentes',
    capa: 'assets/img/nd-touchled-branco-tecla-tripla.jpg',
    resumoCurto: 'Luzes e tomadas pelo interruptor, pelo aplicativo ou por voz.', inclui: ['produto', 'instalacao', 'configuracao'],

    requer: { secao: 'preparacao', resposta: 'sim', mensagem: 'Os interruptores inteligentes só podem ser escolhidos com a preparação elétrica para automação.' },
    descricao: 'Ligue luzes e tomadas pelo interruptor, pelo celular ou por voz, nos pontos já previstos no projeto da 1ª etapa.',
    linhas: LINHAS_INTERRUPTOR,
    linhasMultiplas: true,

    ajuda: 'interruptores',

    auxilio: {
      rotulo: 'Tenho interesse, mas preciso de ajuda para quantificar',
      descricao: 'Marque os ambientes e a ZR3 faz a contagem das peças e inclui no orçamento.',
      ambientes: ['Living', 'Quarto de solteiro', 'Suíte', 'Banheiro social', 'Banheiro suíte', 'Sacada'],

      ambientesPorGrupo: {
        'loft-201': ['Loft', 'Banheiro suíte'],
        'loft-206': ['Loft', 'Banheiro suíte'],
        'lofts-202-205': ['Loft', 'Banheiro suíte'],

        'final-02': ['Living', 'Banheiro suíte'],
        'final-07': ['Living', 'Banheiro suíte']
      }
    },
    itens: [

      { id: 'tecla-simples', cheki: '4.1', nome: 'Interruptor de tecla simples', subtitulo: 'Caixa 4x2', imagem: 'assets/img/auto-interruptor-4x2.jpg', max: 20 },
      { id: 'tecla-dupla', cheki: '4.2', nome: 'Interruptor de tecla dupla', subtitulo: 'Caixa 4x2', imagem: 'assets/img/auto-interruptor-4x2.jpg', max: 20 },
      { id: 'tecla-tripla', cheki: '4.3', nome: 'Interruptor de tecla tripla', subtitulo: 'Caixa 4x2', imagem: 'assets/img/auto-interruptor-4x2.jpg', max: 20 },
      { id: 'quadruplo', cheki: '4.4', nome: 'Interruptor de tecla quádrupla', subtitulo: 'Caixa 4x2 ou 4x4, conforme a linha', imagem: 'assets/img/auto-interruptor-4x4.jpg', max: 10 },
      { id: 'tecla-sextupla', cheki: '4.5', nome: 'Interruptor de tecla sêxtupla', subtitulo: 'Caixa 4x4', imagem: 'assets/img/auto-interruptor-4x4.jpg', max: 10 },

      { id: 'tomada-simples', cheki: '4.6', nome: 'Tomada 10 A + interruptor simples', subtitulo: 'Caixa 4x2', imagem: 'assets/img/auto-interruptor-tomada.jpg', max: 20 },
      { id: 'tomada-dupla', cheki: '4.7', nome: 'Tomada 10 A + interruptor duplo', subtitulo: 'Caixa 4x2', imagem: 'assets/img/auto-interruptor-tomada.jpg', max: 20 }
    ]
  };

  const PREPARACAO = {
    tipo: 'opcional',
    id: 'preparacao',
    aba: 'Preparação elétrica',
    titulo: 'Preparação elétrica para automação',
    resumoCurto: 'Deixa a fiação pronta para automatizar a iluminação.', inclui: ['fiacao'], naoInclui: 'produtos, instalação e configuração de dispositivos',
    nome: 'Passagem de fiação: neutro',
    descricao: 'Passagem do fio neutro nas caixas de interruptor dos pontos de iluminação, feita pela ZR3 durante a obra. É necessária para os interruptores e tomadas inteligentes desta etapa e também para quem quiser automatizar por conta própria depois da entrega. Não inclui produtos nem instalação de dispositivos.',
    imagem: 'assets/img/preparacao-fiacao.jpg',
    valor: 425,
    valorPorGrupo: { 'final-02': 350, 'final-07': 350, 'loft-201': 350, 'loft-206': 350, 'lofts-202-205': 350 },
    rotuloSim: 'Quero a preparação',
    rotuloNao: 'Não quero',
    blocos: [
      { titulo: 'O que é o neutro e para que serve', texto: 'O neutro é o fio que fecha o circuito elétrico junto com a fase. Interruptores inteligentes sem fio precisam dele na caixa para ficarem sempre energizados e conectados à rede (Wi-Fi ou Zigbee), mesmo com a luz apagada.' }
    ],

    aceite: {
      titulo: 'Escopo da preparação elétrica para automação',
      texto: 'Inclui somente a passagem do neutro nas caixas de interruptor dos pontos de iluminação. Não inclui produtos, cabeamento de rede, hubs nem automação cabeada. Dispositivos comprados por conta própria são de sua responsabilidade.',
      rotulo: 'Li e aceito o escopo da preparação elétrica para automação.'
    }
  };

  const EXAUSTOR = {
    tipo: 'opcional',
    id: 'exaustor',
    video: { arquivo: 'assets/video/video-exaustor.mp4', capa: 'assets/video/video-exaustor.jpg', titulo: 'Exaustor da churrasqueira', inicio: 0 },
    aba: 'Exaustor',
    ocultarSe: { secao: 'churrasqueira-removida', resposta: 'sim' },
    cheki: '4.9.7',
    titulo: 'Automação do exaustor central da churrasqueira',
    resumoCurto: 'Aciona o exaustor central pelo aplicativo, por voz ou por interruptor.', inclui: ['produto', 'instalacao', 'configuracao'],
    nome: 'Acionamento automatizado do exaustor central',
    descricao: 'O exaustor central puxa a fumaça de todas as churrasqueiras da prumada e deve ficar ligado sempre que você usar a churrasqueira, para a fumaça não voltar para os apartamentos. A operação dele fica na caixa de comando no pavimento da cobertura; com a automação, você liga de dentro da sua unidade.',
    avisoNao: { titulo: 'Tem certeza?', texto: 'Sem a automação, para usar a churrasqueira você vai precisar subir até a cobertura para ligar o exaustor central. Sem ele ligado, a fumaça pode voltar para dentro dos apartamentos.' },
    imagem: 'assets/img/exaustor-app.jpg',
    valor: 75,
    rotuloSim: 'Quero automatizar',
    rotuloNao: 'Não quero',

    linhas: LINHAS_EXAUSTOR,
    linhaRotulo: 'Interruptor da churrasqueira',
    acionamento: {
      titulo: 'Formas possíveis de acionar',
      padrao: { rotulo: 'Aplicativo no celular', descricao: 'Sempre incluído: liga e desliga o exaustor central de onde você estiver.' },
      opcoes: [
        { id: 'voz', rotulo: 'Voz', descricao: 'Exige a criação de cenas e rotinas, que já fica marcada na aba Assistente de voz.',
          marca: { secao: 'alexa', resposta: 'sim', mensagem: 'Para acionar o exaustor por voz, é necessária a programação da assistente de voz.', acao: 'Mantenha a programação ou mude a forma de acionamento na aba Exaustor.' } },
        { id: 'interruptor', rotulo: 'Interruptor na churrasqueira', descricao: 'O interruptor ao lado da churrasqueira é trocado por um inteligente, na linha e na cor escolhidas, com uma tecla para os exaustores.',
          destaque: 'Vantagem: apenas uma tecla liga os dois exaustores juntos, o central e o da sua churrasqueira.' }
      ],
      pecas: {
        titulo: 'Qual é o interruptor da churrasqueira?',
        descricao: 'Escolha como fica a caixa ao lado da churrasqueira, já contando a tecla do exaustor.',
        opcoes: [
          { id: 'tecla-simples', nome: '1 tecla' },
          { id: 'tecla-dupla', nome: '2 teclas' },
          { id: 'tecla-tripla', nome: '3 teclas' },
          { id: 'tomada-simples', nome: 'Tomada + 1 tecla' },
          { id: 'tomada-dupla', nome: 'Tomada + 2 teclas' }
        ],
        equipe: { rotulo: 'Não sei: a equipe da ZR3 seleciona', descricao: 'Conferimos no projeto e informamos o modelo e o valor na revisão do orçamento.' }
      },

      avisoSem: { opcao: 'interruptor', texto: 'Atenção: sem o interruptor, o aplicativo e a voz ligam só o exaustor central. O exaustor da sua churrasqueira continua ligando pela luz interna dela, então acenda a luz sempre que usar a churrasqueira.' }
    },
    blocos: [
      { titulo: 'Exaustores: central e da churrasqueira', texto: 'São dois equipamentos: o exaustor central, na cobertura, atende todas as churrasqueiras do mesmo final de apartamento; o exaustor da sua churrasqueira fica na coifa e hoje liga junto com a luz interna dela. Os dois precisam estar ligados para a tiragem funcionar bem.' },
      { titulo: 'O que a automação faz', itens: ['Instala um módulo inteligente no comando do exaustor central, na caixa de comando da cobertura', 'O aplicativo liga e desliga o exaustor central de qualquer lugar (incluído em todas as formas)', 'Com o interruptor na churrasqueira, uma tecla liga os dois exaustores juntos', 'Por voz, é preciso a programação da assistente de voz e um aparelho da assistente, adquirido por você'] }
    ]
  };

  const ALEXA = {
    tipo: 'opcional',
    id: 'alexa',
    aba: 'Assistente de voz',
    cheki: '4.9.1',
    titulo: 'Assistente de voz: criação de cenas e rotinas',
    resumoCurto: 'Cenas e rotinas por voz, como “boa noite” apaga tudo.', inclui: ['cenas'], naoInclui: 'o aparelho da assistente de voz, o qual deve ser adquirido por você',
    nome: 'Criação de cenas e rotinas',
    descricao: 'Programar comandos combinados na assistente de voz, como apagar as luzes e fechar as persianas simultaneamente ao falar “boa noite”. Sem essa programação, os dispositivos continuam funcionando normalmente pelo interruptor e pelo aplicativo; apenas os comandos combinados por voz não ficam configurados. O aparelho da assistente de voz deve ser adquirido por você.',
    imagem: 'assets/img/echo-dot.jpg',
    valor: 75,
    ajuda: 'alexa',
    rotuloSim: 'Quero a programação',
    rotuloNao: 'Não quero',
    blocos: [
      { titulo: 'O que está incluído', itens: ['Integração dos dispositivos automatizados da unidade à assistente de voz', 'Criação de cenas e rotinas (ex.: “boa noite” apaga as luzes e fecha as persianas)', 'Comandos de voz para luzes, tomadas e persianas automatizadas'] },
      { titulo: 'O que é necessário', itens: ['Aparelho da assistente de voz, o qual deve ser adquirido por você', 'Energia elétrica ligada na unidade', 'Rede Wi-Fi instalada e funcionando na unidade', 'Conta no aplicativo da assistente de voz, no celular'] },
      { titulo: 'Limites e funcionamento da integração', itens: ['Só são integrados dispositivos compatíveis com a assistente de voz.', 'A programação é feita na visita técnica gratuita.', 'Visitas adicionais podem ser cobradas diretamente pelo fornecedor.'] }
    ]
  };

  const HUB_ZIGBEE = {
    tipo: 'opcional',
    id: 'hub-zigbee',
    aba: 'Hub Zigbee',
    cheki: '4.9.3',
    titulo: 'Hub com protocolo Zigbee',
    resumoCurto: 'Central para dispositivos Zigbee, que não dependem do Wi-Fi.', inclui: ['produto', 'instalacao', 'configuracao'],
    nome: 'Hub Zigbee Dual Band JWCom SA-ZG25',

    dispensadoPor: { secao: 'outros-inteligentes', item: 'minipad', escolha: 'zigbee', texto: 'Você escolheu o minipad com protocolo Zigbee, que já funciona como hub Zigbee. Por isso, o hub não é necessário. O acréscimo de 10% do protocolo Zigbee continua valendo.' },
    descricao: 'Conecta todos os dispositivos inteligentes a um único hub, evitando sobrecarregar o roteador — vantajoso para quem terá muitas automações.',
    imagem: 'assets/img/jw-hub-zg25.jpg',
    galeria: [
      { src: 'assets/img/jw-hub-zg25.jpg', legenda: 'Hub Zigbee Dual Band JWCom (gateway multimodo sem fio), modelo SA-ZG25.' },
      { src: 'assets/img/jw-hub-zg25-medidas.jpg', legenda: 'Dimensões: 66 × 66 × 20,4 mm.', nota: 'Dimensões do fabricante.' },
      { src: 'assets/img/jw-hub-zg25-caixa.jpg', legenda: 'Hub com a embalagem, o cabo USB e o manual.' },
      { src: 'assets/img/jw-hub-zg25-verso.jpg', legenda: 'Verso: modelo SA-ZG25, entrada 5 V / 1 A, com furo para fixar na parede.' }
    ],
    valor: 300,

    avisoAcrescimo: 'com o hub, entra o acréscimo de {pct}% do protocolo Zigbee sobre os dispositivos inteligentes.',
    ajuda: 'zigbee',
    rotuloSim: 'Quero o hub',
    rotuloNao: 'Não quero',
    blocos: [

      { titulo: 'Especificações', itens: ['Modelo: JWCom SA-ZG25 (gateway multimodo sem fio)', 'Zigbee, Bluetooth (BLE, SigMesh e Beacon) e Wi-Fi 2,4 e 5 GHz', 'Alimentação: cabo USB, 5 V / 1 A', 'Dimensões: 66 × 66 × 20,4 mm', 'Inclui cabo USB e manual'] },
      { titulo: 'Atenção ao custo', texto: 'O protocolo Zigbee (com o hub ou com o minipad em Zigbee) acrescenta 10% ao valor dos dispositivos inteligentes, da fechadura digital, do controle universal e dos interruptores da persiana e da churrasqueira, se escolhidos. O acréscimo é calculado automaticamente no resumo.' }
    ]
  };

  const CONTROLE_UNIVERSAL = {
    tipo: 'quantidades',
    id: 'controle-universal',
    aba: 'Controle universal',
    titulo: 'Controle universal Smart Wi-Fi',
    resumoCurto: 'Comanda o ar-condicionado e a TV pelo celular e por voz.', inclui: ['produto', 'instalacao', 'configuracao'],
    descricao: 'Faz a intermediação de dispositivos mais antigos, sem integração nativa à automação (como ar-condicionado e televisão), permitindo controlá-los remotamente. Um por ambiente.',
    itens: [
      { id: 'controle-universal', cheki: '4.9.4', nome: 'Controle universal Smart Wi-Fi', subtitulo: 'Nova Digital · Mini IR · para ar-condicionado e TV · por ambiente', imagem: 'assets/img/nd-controle-mini-ir.jpg', valor: 200, max: 6,
        galeria: [
          { src: 'assets/img/nd-controle-mini-ir.jpg', legenda: 'Controle Universal Mini IR White, Nova Digital, alimentado por USB.' },
          { src: 'assets/img/nd-controle-mini-ir-caixa.jpg', legenda: 'Controle Universal Mini IR White com a embalagem.' },
          { src: 'assets/img/nd-controle-mini-ir-ambiente.jpg', legenda: 'Emite os comandos infravermelhos para os aparelhos do ambiente.' }
        ],
        resumo: 'Comanda pelo celular e por voz os aparelhos com controle remoto infravermelho, como ar-condicionado e TV.',

        specs: [['Modelo', 'Nova Digital SRW-Mini (Controle Universal Mini IR White)'], ['Conectividade', 'Wi-Fi 2,4 GHz'], ['Alcance', 'Infravermelho até 10 m, sem obstáculos'], ['Alimentação', 'USB 5 V (qualquer carregador USB)'], ['Compatibilidade', 'TV, ar-condicionado e outros aparelhos com controle infravermelho; aprende os comandos do controle original'], ['Assistentes de voz', 'Compatível com as principais assistentes de voz'], ['Instalação', 'Um por ambiente, com visão direta dos aparelhos']] }
    ]
  };

  const OUTROS_INTELIGENTES = {
    tipo: 'quantidades',
    id: 'outros-inteligentes',
    aba: 'Minipad',
    titulo: 'Minipad inteligente',
    nomeCurto: 'Minipad inteligente',
    resumoCurto: 'Minipad: painel com assistente de voz integrada para controlar a automação.', inclui: ['produto', 'instalacao', 'configuracao'], naoInclui: 'a passagem de fiação (preparação elétrica), que é obrigatória e cobrada à parte',

    requer: { secao: 'preparacao', resposta: 'sim', mensagem: 'O minipad é ligado com fase e neutro e só pode ser escolhido com a preparação elétrica para automação.' },
    descricao: 'Painel para centralizar o controle da automação. O valor inclui a instalação e a configuração na rede.',
    itens: [
      {
        id: 'minipad', cheki: '4.9.2', nome: 'Minipad inteligente', subtitulo: 'Nova Digital · Painel Central Inteligente PCI01-Z',
        imagem: 'assets/img/nd-painel-central.jpg', valor: 1175, max: 6,
        video: { arquivo: 'assets/video/video-minipad.mp4', capa: 'assets/video/video-minipad.jpg', titulo: 'Minipad inteligente', inicio: 0 },

        escolha: {
          titulo: 'O minipad será usado como hub Zigbee?',
          erro: 'Responda se o minipad será usado como hub Zigbee.',
          opcoes: [
            { id: 'zigbee', rotulo: 'Sim, usar como hub Zigbee', resumo: 'Usado como hub Zigbee', descricao: 'Dispensa o hub separado. Entra o acréscimo de 10% do protocolo Zigbee.' },
            { id: 'wifi', rotulo: 'Não, somente Wi-Fi', resumo: 'Somente Wi-Fi (não usado como hub)', descricao: 'Sem acréscimo. Se houver dispositivos Zigbee, o hub continua necessário.' }
          ]
        },
        galeria: [
          { src: 'assets/img/nd-painel-central.jpg', legenda: 'Painel Central Inteligente PCI01-Z, Nova Digital.' },
          { src: 'assets/img/nd-painel-central-caixa.jpg', legenda: 'Painel Central Inteligente com a embalagem.' }
        ],
        resumo: 'Centraliza a gestão das automações: iluminação, equipamentos e cenas, em um único dispositivo.',

        specs: [['Modelo', 'Nova Digital PCI01-Z (Painel Central Inteligente)'], ['Protocolos', 'Wi-Fi e Zigbee 3.0; também funciona como hub Zigbee (até 128 dispositivos)'], ['Assistente de voz', 'Integrada ao painel (dispensa aparelho adicional)'], ['Alimentação', '100–240 V, ligado à rede elétrica com fase e neutro'], ['Dimensões', '72 × 127,3 × 36,5 mm'], ['Instalação', 'Caixa padrão 4x2 (ex.: próximo à porta de entrada)'], ['Compatibilidade', 'Locais com previsão para até 2 interruptores']]
      }
    ]
  };

  const COMO_FUNCIONA_AUTOMACAO = {
    tipo: 'explicacao',
    id: 'como-funciona-automacao',
    aba: 'Como funciona',
    titulo: 'Como funciona a automação',
    descricao: 'São 4 serviços diferentes. Veja o que é cada um.'
  };

  const PERSIANAS = {
    tipo: 'persianas',
    id: 'persianas',
    video: { arquivo: 'assets/video/video-persianas.mp4', capa: 'assets/video/video-persianas.jpg', titulo: 'Persianas motorizadas', inicio: 0 },
    titulo: 'Persiana automatizada integrada à janela',
    descricao: 'As janelas dos dormitórios são entregues com a caixa para persiana. Como opcional, a construtora oferece a persiana motorizada, que abre e fecha pelo interruptor, pelo aplicativo ou por voz. Ela é adquirida junto com um interruptor inteligente, pago à parte: a tecla mais básica é a Touch - Vidro (Wi-Fi).',

    aviso: 'A persiana é instalada sempre com o interruptor inteligente. A construtora não trabalha com o acionador comum de persiana.',
    linhas: LINHAS_PERSIANA,
    linhasPorAmbiente: true,
    pecaLinha: 'persiana',

    adicionais: [
      { id: 'controle-remoto', nome: 'Controle remoto', descricao: 'Controle remoto da persiana com módulo de cortina Wi-Fi', valor: 300, cheki: '2.3' }
    ],
    ambientes: [
      { id: 'q1', nome: 'Suíte', artigo: 'da', cheki: '2.2' },
      { id: 'q2', nome: 'Quarto', artigo: 'do', cheki: '2.1' }
    ],

    modelos: [
      {
        id: 'persiana-integrada',
        nome: 'Persiana motorizada',
        subtitulo: 'Instalada na caixa da esquadria · com interruptor inteligente pago à parte',
        imagem: 'assets/img/persiana-integrada.jpg',

        galeria: [
          { src: 'assets/img/persiana-integrada.jpg', legenda: 'Persiana motorizada instalada na caixa da esquadria. Imagem ilustrativa.' },
          { src: 'assets/img/persiana-caixa.jpg', legenda: 'Caixa para persiana integrada à esquadria, entregue pela construtora na janela dos dormitórios (padrão de entrega). A persiana motorizada é instalada dentro dessa caixa. Imagem ilustrativa.' },
          { src: 'assets/img/jw-touch-branco-persiana.jpg', legenda: 'Interruptor de persiana da linha Touch - Vidro (JWCom), a tecla mais básica: adquirido junto com a persiana e pago à parte. Nas demais linhas, a persiana usa o interruptor de 3 teclas da linha escolhida. Abre e fecha a persiana pelo interruptor, pelo aplicativo ou por comando de voz.' },
        ],
        resumo: 'Persiana motorizada instalada na caixa da esquadria. Abre e fecha pelo interruptor inteligente (pago à parte), pelo aplicativo ou por voz.',
        specs: [
          ['Padrão de entrega', 'Esquadria com caixa para persiana integrada'],
          ['Persiana', 'Motorizada, oferecida e instalada pela construtora'],
          ['Interruptor', 'Pago à parte e adquirido junto com a persiana, na linha e na cor escolhidas para cada ambiente. Mínimo: Touch - Vidro (Wi-Fi). Interruptor próprio de persiana na Touch - Vidro; de 3 teclas nas demais'],
          ['Acionador comum', 'Não disponível: a persiana é instalada sempre com o interruptor inteligente'],
          ['Instalação e configuração', 'Incluídas no valor (configuração na rede na visita técnica gratuita)'],
          ['Automação', 'Já preparada; a persiana funciona com ou sem automação'],
          ['Acionamento', 'Interruptor, aplicativo ou comando de voz'],
          ['Controle remoto', 'Opcional, R$ 300,00 por ambiente (controle e módulo de cortina Wi-Fi)']
        ],
        observacoes: ['Para controlar a persiana por voz e incluí-la em cenas, veja a programação da assistente de voz na etapa de automação, mais adiante.'],
        valor: 2050,
        cobranca: 'por ambiente'
      }
    ]
  };

  const OBSERVACOES = {
    tipo: 'texto',
    id: 'observacoes',
    titulo: 'Observações para a equipe de personalização',
    descricao: 'Algum detalhe, dúvida ou pedido que não foi contemplado nas etapas anteriores? Escreva aqui. Pedidos especiais dependem de análise técnica e orçamento.',
    placeholder: 'Ex.: prefiro o minipad ao lado da porta de entrada; quero confirmar se o controle universal atende o ar-condicionado do quarto…',
    max: 1200
  };

  const CONTRAPISO = {
    tipo: 'pergunta',
    id: 'contrapiso',
    titulo: 'Contrapiso na 2ª etapa de personalização',
    pergunta: 'Na 2ª etapa de personalização, você optou por deixar o apartamento no contrapiso?',
    rotuloSim: 'Sim, deixei no contrapiso',
    rotuloNao: 'Não',
    info: [
      'Padrão da construtora: revestimento no piso e nas paredes dos banheiros; os demais ambientes ficam no contrapiso.',
      'Como os banheiros recebem revestimento, as portas desses ambientes são instaladas normalmente.',
      'Nos quartos, a instalação não pode ser feita sem o piso acabado, pois a porta precisa da referência de nível do piso.',
      'Por isso, você recebe um crédito de R$ 100,00 de mão de obra por porta de quarto que deixa de ser instalada.',
      'A instalação posterior das portas dos quartos fica por sua conta.'
    ]
  };

  const BANHEIRO_REMOVIDO = {
    tipo: 'pergunta',
    id: 'banheiro-removido',
    titulo: 'Remoção de banheiro',
    pergunta: 'Na 1ª etapa de personalização, você optou por remover um dos banheiros?',
    opcoes: [
      { id: 'nao', rotulo: 'Não, mantive os dois banheiros' },
      { id: 'suite', rotulo: 'Sim, removi o banheiro da suíte' },
      { id: 'social', rotulo: 'Sim, removi o banheiro social' }
    ],
    info: ['A etapa de vasos sanitários mostra só o banheiro que continua no projeto.']
  };

  const SACADA_INTEGRACAO = {
    tipo: 'sacada-integracao',
    id: 'sacada-integracao',
    titulo: 'Integração da sacada',
    pergunta: 'Na 1ª etapa de personalização, você fez a integração da sacada ao living?',
    info: [
      'Integração da sacada: retirada da esquadria entre a sacada e o living.',
      'Com a integração, o fechamento da sacada é obrigatório; sem ela, o fechamento é opcional.',
      'Se não lembrar, consulte o seu termo da 1ª etapa ou marque “Não tenho certeza”: a ZR3 confirma no cadastro.'
    ]
  };

  const CHURRASQUEIRA_REMOVIDA = {
    tipo: 'pergunta',
    id: 'churrasqueira-removida',
    titulo: 'Remoção da churrasqueira',
    pergunta: 'Na 1ª etapa de personalização, você optou por remover a churrasqueira?',
    rotuloSim: 'Sim, removi a churrasqueira',
    rotuloNao: 'Não',
    info: [
      'Sem a churrasqueira, a automação do exaustor central não é ofertada.',
      'Brinde: quem removeu a churrasqueira ganha a persiana da suíte com o interruptor padrão.',
      'Se preferir outra linha de interruptor, você paga só a diferença de valor entre as linhas.'
    ]
  };

  const GLOSSARIO = {
    final: { titulo: 'Final da unidade', texto: 'Posição do apartamento na torre (ex.: 501 → final 01). É identificado automaticamente pelo cadastro do empreendimento e define os itens disponíveis e as regras desta etapa.' },
    integracao: { titulo: 'Integração da sacada', texto: 'Retirada da esquadria entre a sacada e o living, feita na 1ª etapa de personalização. Para essas unidades, o fechamento da sacada é obrigatório. Se não lembrar, consulte o seu termo da 1ª etapa.' },
    espelho: { titulo: 'Espelho', texto: 'É a placa de acabamento que fica sobre os interruptores e tomadas. Trocar o modelo muda o visual de todos os pontos elétricos do apartamento.' },
    neutro: { titulo: 'Condutor neutro', texto: 'É o fio que fecha o circuito elétrico junto com a fase. Interruptores inteligentes precisam dele na caixa para ficarem sempre energizados e conectados à rede.' },
    zigbee: { titulo: 'Zigbee', texto: 'Protocolo sem fio de baixo consumo, próprio para automação. Os dispositivos se conectam a um hub em vez de ao roteador, o que melhora a estabilidade em casas com muitas automações.' },
    wifi: { titulo: 'Wi-Fi', texto: 'Os dispositivos se conectam diretamente ao roteador da casa. Não precisam de hub, mas cada um ocupa uma conexão da rede.' },

    interruptores: {
      titulo: 'Interruptores inteligentes', pergunta: 'Como funcionam os interruptores inteligentes?',

      texto: [
        ['O que fazem', 'Ligam luzes e tomadas pelo próprio interruptor, pelo aplicativo no celular ou por voz (com a assistente de voz).'],
        ['Como escolher', 'Primeiro a cor, depois a linha e, por fim, quantas peças de cada tipo. O valor de cada peça já inclui a instalação e a configuração na rede.'],
        ['Mais de uma linha', 'Depois de escolher as peças da primeira linha, toque em “Adicionar outra linha” para mesclar linhas diferentes.'],
        ['Pontos permitidos', 'Somente os pontos que já existem no projeto assinado na 1ª etapa de personalização podem receber automação.'],
        ['Preparação elétrica', 'A passagem de fiação é obrigatória e cobrada à parte, na aba Preparação elétrica.'],
        ['Caixa 4x2 e 4x4', 'Tamanhos das caixas embutidas na parede. A 4x2 é a retangular comum; a 4x4 é quadrada e comporta a tecla sêxtupla.']
      ]
    },
    caixa: { titulo: 'Caixa 4x2 e 4x4', texto: 'São os tamanhos das caixas embutidas na parede (em polegadas). A 4x2 é a retangular comum; a 4x4 é quadrada e comporta a tecla sêxtupla.' },
    alexa: { titulo: 'Assistente de voz', texto: 'Aparelho que obedece a comandos falados e controla os dispositivos inteligentes compatíveis. O aparelho deve ser adquirido por você; a ZR3 oferece a programação das cenas e rotinas.' },
    cub: { titulo: 'CUB', texto: 'Custo Unitário Básico da construção civil. No pagamento parcelado, as parcelas são reajustadas mensalmente pelo CUB.' },
    consulta: { titulo: 'Sob consulta', texto: 'O valor depende de uma definição da ZR3: por exemplo, quando você pediu para a equipe escolher o modelo, pediu ajuda para quantificar ou ainda falta confirmar uma informação da sua unidade. Sua escolha fica registrada e a ZR3 informa o valor na revisão do orçamento, antes da sua aprovação.' }
  };

  const PLANTA_COMPACTA = ['exaustor', 'vaso-social', 'persianas', 'churrasqueira-removida', 'banheiro-removido'];

  const EMPREENDIMENTOS = [
    {
      id: 'artus',
      nome: 'Residencial Artus',
      ativo: true,
      finais: [1, 2, 3, 4, 5, 6, 7, 8],

      prazosPorPavimento: {
        2: '2027-01-08',
        4: '2027-01-08', 5: '2027-01-08', 6: '2027-01-08', 7: '2027-01-08', 8: '2027-01-08',
        9: '2027-01-15', 10: '2027-01-15', 11: '2027-01-15', 12: '2027-01-15', 13: '2027-01-15',
        14: '2027-01-22', 15: '2027-01-22'
      },
      cadastroUnidades: {
        grupos: [
          { id: 'final-01', nome: 'Final 01', final: 1, naoOferta: [], unidades: ['401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '1501'] },
          { id: 'final-02', nome: 'Final 02', final: 2, naoOferta: PLANTA_COMPACTA, unidades: ['402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '1502'] },
          { id: 'final-03', nome: 'Final 03', final: 3, naoOferta: [], unidades: ['403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '1503'] },
          { id: 'final-04', nome: 'Final 04', final: 4, naoOferta: [], unidades: ['404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '1504'] },
          { id: 'final-05', nome: 'Final 05', final: 5, naoOferta: [], unidades: ['405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '1505'] },
          { id: 'final-06', nome: 'Final 06', final: 6, naoOferta: [], unidades: ['406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '1506'] },
          { id: 'final-07', nome: 'Final 07', final: 7, naoOferta: PLANTA_COMPACTA, unidades: ['407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '1507'] },
          { id: 'final-08', nome: 'Final 08', final: 8, naoOferta: [], unidades: ['408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408', '1508'] },
          { id: 'loft-201', nome: 'Loft (201)', final: null, naoOferta: PLANTA_COMPACTA, unidades: ['201'] },
          { id: 'loft-206', nome: 'Loft (206)', final: null, naoOferta: PLANTA_COMPACTA, unidades: ['206'] },
          { id: 'lofts-202-205', nome: 'Lofts (202 ao 205)', final: null, naoOferta: PLANTA_COMPACTA, unidades: ['202', '203', '204', '205'] }
        ]
      },
      capa: 'assets/img/capa-living.jpg',

      videoUrl: 'https://www.youtube.com/watch?v=FJtD48DRqoY',
      manualUrl: '',

      inclusos: {
        produto: { rotulo: 'Produto', icone: 'caixa' },
        fiacao: { rotulo: 'Passagem de fiação', icone: 'fio' },
        instalacao: { rotulo: 'Instalação', icone: 'ferramenta' },
        configuracao: { rotulo: 'Configuração na rede', icone: 'wifi' },
        cenas: { rotulo: 'Cenas e rotinas', icone: 'cena' }
      },
      contato: {
        equipe: 'equipe de personalização da ZR3',
        email: 'projetos@zr3empreendimentos.com.br',
        whatsapp: '554741010499',

        mensagemWhats: 'Olá! Sou {nome}, da unidade {unidade} do {empreendimento}. Segue em anexo o PDF da minha personalização da 3ª etapa (protocolo {protocolo}).',
        telefone: '(47) 4101-0499'
      },

      taxaRevisaoProjeto: 200,
      pagamento: {
        descontoAVistaPct: 5,
        parcelasMax: 12,
        parcelaMinima: 100,
        texto: 'À vista: 5% de desconto sobre o total, sem reajuste mensal do CUB. Parcelado: em até 12x ou até a entrega das chaves, o que vier primeiro (parcela mínima de R$ 100,00), com reajuste mensal do CUB em cada parcela; é possível antecipar parcelas. Outras modalidades, como entrada com mensais ou mensais com balões, podem ser avaliadas.'
      },

      protocolos: {
        titulo: 'Wi-Fi ou Zigbee: os dois protocolos',
        texto: 'Cada linha de interruptor se comunica por um destes dois protocolos sem fio. A tag de cada linha mostra qual é.',

        resumoCurto: 'Cada linha de interruptor usa Wi-Fi (direto no roteador) ou Zigbee (por um hub, com acréscimo de {pct}%).',
        itens: [
          { id: 'wifi', nome: 'Wi-Fi', resumo: 'Cada dispositivo se conecta direto ao roteador da unidade.',
            pros: ['Não precisa de hub.', 'Sem acréscimo de valor, desde que nenhum item escolhido seja Zigbee.'],
            contras: ['Cada dispositivo ocupa uma conexão do roteador: com muitos dispositivos, a rede pode ficar sobrecarregada.', 'Menos opções de interruptor: {linhas}.'] },
          { id: 'zigbee', nome: 'Zigbee', resumo: 'Os dispositivos se conectam a um hub, e só o hub se conecta ao roteador.',
            pros: ['Rede própria para a automação: mais estável com muitos dispositivos e sem sobrecarregar o roteador.', 'Mais opções de interruptor: {linhas}.'],
            contras: ['Exige o hub Zigbee ({hub}) ou o minipad em Zigbee.', 'Acréscimo de {pct}% sobre os dispositivos inteligentes, a fechadura, o controle universal e os interruptores da persiana e da churrasqueira.', 'Basta um item Zigbee para o acréscimo valer para todos esses itens.'] }
        ]
      },

      etapas: [

        { id: 'anteriores', titulo: 'Etapas anteriores', curto: 'Anteriores', icone: 'lista', intro: 'Antes de começar, confirme o que você definiu nas etapas anteriores. As respostas ajustam os itens e os valores desta etapa.', secoes: [BANHEIRO_REMOVIDO, CHURRASQUEIRA_REMOVIDA, CONTRAPISO, SACADA_INTEGRACAO] },
        { id: 'sacada', titulo: 'Fechamento de sacada', curto: 'Sacada', icone: 'sacada', intro: 'O modelo de fechamento de sacada é padronizado e definido pela construtora, para manter o padrão estético do empreendimento. Veja abaixo a condição para a sua unidade.', secoes: [SACADA] },

        { id: 'persianas', titulo: 'Persianas', curto: 'Persianas', icone: 'persiana', intro: 'Escolha, para cada ambiente, se deseja a persiana automatizada.', abas: 'sequencial', abasAmbientes: true, secoes: [PERSIANAS] },
        { id: 'vasos', titulo: 'Vasos sanitários', curto: 'Vasos', icone: 'vaso', intro: 'Escolha o modelo de cada banheiro da sua unidade.', video: { arquivo: 'assets/video/video-vasos.mp4', capa: 'assets/video/video-vasos.jpg', titulo: 'Vasos sanitários', inicio: 0 }, abas: 'sequencial', abaUnidade: 'banheiro', secoes: [VASO_SUITE, VASO_SOCIAL] },
        { id: 'acabamentos', titulo: 'Acabamento de interruptores e tomadas', curto: 'Acabamentos', icone: 'interruptor', intro: 'Escolha o modelo de espelho dos interruptores e tomadas.', secoes: [ESPELHOS] },
        { id: 'automacao', titulo: 'Automação residencial', curto: 'Automação', icone: 'automacao', intro: 'Controle luzes, persianas, fechadura e aparelhos pelo celular, por voz ou por cenas programadas. Monte a automação conforme a sua rotina, do básico ao completo. Cada item mostra o que está incluído e o que é necessário para funcionar.', videoSoIntro: true, video: { arquivo: 'assets/video/video-automacao.mp4', capa: 'assets/video/video-automacao.jpg', titulo: 'Automação residencial', inicio: 0 }, abas: 'sequencial',

          servicos: {
            titulo: 'O que está incluído em cada serviço de automação',
            texto: 'São quatro serviços diferentes. Veja quem faz, quando e como cada um é cobrado:',
            itens: [
              { id: 'fiacao', semNota: true, icone: 'fio', curto: 'ZR3, na obra', titulo: 'Passagem de fiação (preparação elétrica)', texto: 'Deixar o neutro nas caixas de interruptor dos pontos de iluminação.', quem: 'ZR3, durante a obra.', custo: 'Item próprio desta etapa: preparação elétrica.' },
              { id: 'instalacao', semNota: true, icone: 'ferramenta', curto: 'Incluída no produto', titulo: 'Instalação dos produtos', texto: 'Fixar e ligar a fechadura, os interruptores, as persianas e os demais itens contratados.', quem: 'ZR3, durante a obra.', custo: 'Incluída no valor de cada produto.' },
              { id: 'configuracao', icone: 'wifi', curto: 'Incluída no produto', titulo: 'Configuração na rede', texto: 'Conectar cada dispositivo ao Wi-Fi (ou ao hub Zigbee) e ao aplicativo. Na fechadura, inclui o cadastro de usuários, digitais, tags e senhas.', quem: 'Parceiro da ZR3, na visita técnica gratuita.', custo: 'Incluída no valor de cada produto.' },
              { id: 'cenas', icone: 'cena', curto: 'Item à parte', titulo: 'Criação de cenas e rotinas', texto: 'Programar comandos combinados na assistente de voz, como apagar as luzes e fechar as persianas simultaneamente ao falar “boa noite”.', quem: 'Parceiro da ZR3, na visita técnica gratuita.', custo: 'Item próprio desta etapa: programação da assistente de voz.' }
            ],
            nota: 'Visitas adicionais podem ser combinadas diretamente com o fornecedor e podem ter cobrança extra.'
          },

          secoes: [COMO_FUNCIONA_AUTOMACAO, PREPARACAO, FECHADURA, EXAUSTOR, AUTO_INTERRUPTORES, ALEXA, OUTROS_INTELIGENTES, HUB_ZIGBEE, CONTROLE_UNIVERSAL] },
        { id: 'complementares', titulo: 'Observações', curto: 'Observações', icone: 'edit', intro: 'Último passo antes da revisão.', foraDaVisaoGeral: true, secoes: [OBSERVACOES] }
      ],

      creditos: [
        {
          id: 'credito-porta', cheki: '5.2',
          titulo: 'Crédito – portas dos quartos (contrapiso)',
          detalhe: 'Mão de obra de instalação das portas dos quartos, que não são instaladas no contrapiso.',
          quando: { secao: 'contrapiso', resposta: 'sim' },
          valorPorPorta: -100,
          aviso: 'Se nenhum item for personalizado nesta etapa, o crédito não é devolvido em dinheiro: ele é convertido em um insumo de mesmo valor por conta da construtora.'
        }
      ],

      brindes: [
        {
          id: 'brinde-persiana-suite',
          titulo: 'Brinde: persiana da suíte',
          detalhe: 'Remoção da churrasqueira na 1ª etapa.',
          quando: { secao: 'churrasqueira-removida', resposta: 'sim' },
          secao: 'persianas', ambiente: 'q1',

          interruptor: { linha: 'touch-wifi', cor: 'branco', cobranca: 'diferenca' }
        }
      ],
      regras: {

        exigencias: [

        ],

        acrescimos: [
          {
            id: 'zigbee',
            titulo: 'Acréscimo protocolo Zigbee',

            quando: { algum: [{ secao: 'hub-zigbee', resposta: 'sim' }, { secao: 'outros-inteligentes', item: 'minipad', escolha: 'zigbee' }] },
            percentual: 10,

            sobre: ['auto-interruptores', 'controle-universal', 'outros-inteligentes', 'fechadura', 'persianas:interruptor', 'exaustor:interruptor'],
            rotulo: 'Acréscimo do protocolo Zigbee (10% sobre os dispositivos inteligentes, a fechadura, o controle universal e os interruptores da persiana e da churrasqueira)'
          }
        ],

        avisos: [
          {
            id: 'alexa-sem-dispositivos',
            quando: { secao: 'alexa', resposta: 'sim' },
            seNenhum: ['auto-interruptores', 'controle-universal', 'outros-inteligentes', 'exaustor', 'persianas'],
            mensagem: 'Você escolheu a programação da assistente de voz, mas nenhum dispositivo automatizado. A assistente poderá tocar música e responder perguntas, mas não terá o que comandar na unidade.'
          },
          {
            id: 'zigbee-sem-dispositivos',
            quando: { secao: 'hub-zigbee', resposta: 'sim' },
            seNenhum: ['auto-interruptores', 'controle-universal', 'outros-inteligentes'],
            mensagem: 'O hub Zigbee só faz sentido com dispositivos inteligentes. Revise se ele é necessário.',
            ocultarSeExigido: true,
            local: 'secao'
          }
        ]
      }
    }
  ];

  window.ZR3_CONFIG = {

    versao: '1.6.3',
    empresa: {
      nome: 'ZR3 Empreendimentos',
      endereco: 'Rua José de Alencar, 36 – América, Joinville/SC',
      telefone: '(47) 4101-0499',
      email: 'projetos@zr3empreendimentos.com.br',
      site: 'www.zr3empreendimentos.com.br',

      enderecoPlataforma: 'https://projetoszr3.github.io/zr3-personalizacao-3/',
      instagram: '@zr3empreendimentos',
      logo: 'assets/img/logo-zr3.png',
      logoBranco: 'assets/img/logo-zr3-branco.png'
    },

    empreendimentoPadrao: 'artus',
    identificacao: {
      exigirContato: true,
      contatoPadrao: 'whatsapp'
    },
    textos: {
      boasVindasTitulo: 'Bem-vindo à terceira etapa da personalização!',
      boasVindasTexto: 'Nesta etapa você define o fechamento de sacada, os acabamentos e os recursos de automação do seu apartamento. Conheça cada opção, veja fotos e especificações e registre as suas preferências.',
      avisoPdf: 'Este documento é um PRÉ-ORÇAMENTO e registra as preferências que você indicou. O orçamento definitivo será enviado junto com o projeto para aprovação; somente após essa aprovação a personalização é validada e a ZR3 envia o aditivo contratual para assinatura. Itens sob consulta dependem de orçamento e análise técnica.',
    },

    regrasGerais: [

      'Pré-orçamento: esta plataforma gera um pré-orçamento com as suas preferências. O orçamento definitivo será enviado a você junto com o projeto, para aprovação. Somente após essa aprovação a personalização é validada e a ZR3 envia o aditivo contratual para assinatura.',
      'Unidade: confirme qual é a unidade que está sendo personalizada, pois os itens são disponibilizados de acordo com o final da unidade. Em caso de dúvida, consulte o seu contrato de compra e venda ou fale com a ZR3.',
      'Envio: para que a ZR3 receba as suas escolhas, é necessário enviar o PDF gerado ao final à equipe de personalização. Sem esse envio, as escolhas ficam salvas apenas neste dispositivo.',
      'Prazo: se você não retornar dentro do prazo, o projeto no padrão da construtora é enviado à obra e não é possível garantir que as escolhas ainda possam ser atendidas.',
      'Alterações após o aditivo: estão sujeitas à taxa de revisão de projeto ({taxaRevisao}) e à análise de viabilidade da obra; se forem possíveis, podem gerar custos de retrabalho.',
      'Atendimento: é feito online, pelo WhatsApp. Em caso de dúvidas, fale conosco.'
    ],

    pesquisa: {
      titulo: 'Pesquisa de satisfação',
      texto: 'Opcional. Leva poucos segundos e nos ajuda a melhorar as próximas etapas.',
      perguntas: [
        { id: 'geral', texto: 'De modo geral, como você avalia o funcionamento desta plataforma de personalização?' },

        { id: 'etapa1', tipo: 'comparativa', texto: 'Comparado à 1ª etapa de personalização, o funcionamento desta etapa foi:', rotulos: ['Muito pior', 'Pior', 'Igual', 'Melhor', 'Muito melhor'], naoSei: 'Não lembro / não participei' },
        { id: 'etapa2', tipo: 'comparativa', texto: 'Comparado à 2ª etapa de personalização, o funcionamento desta etapa foi:', rotulos: ['Muito pior', 'Pior', 'Igual', 'Melhor', 'Muito melhor'], naoSei: 'Não lembro / não participei' }
      ],
      rotulos: ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Muito bom']
    },
    glossario: GLOSSARIO,
    empreendimentos: EMPREENDIMENTOS
  };
})();
