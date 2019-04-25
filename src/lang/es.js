export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introdução',
    documentation: 'Documentação',
    guide: 'Guia',
    permission: 'Permissão',
    pagePermission: 'Permissão de página',
    rolePermission: 'Permissão da Função',
    directivePermission: 'Autorização Directiva',
    icons: 'Ícones',
    components: 'Componentes',
    componentIndex: 'Introdução',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Editor JSON',
    dndList: 'Lista Dnd',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Gráfico do teclado',
    lineChart: 'Gráfico de linhas',
    mixChart: 'Mix Chart',
    example: 'Exemplo',
    nested: 'Rotas Aninhadas',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Tabela',
    dynamicTable: 'Tablea Dinâmica',
    dragTable: 'Tabela de Arrastar',
    inlineEditTable: 'Edição inline',
    complexTable: 'Tabela complexa',
    tab: 'Tab',
    form: 'Formulário',
    createArticle: 'Criar Artigo',
    editArticle: 'Editar Artigo',
    articleList: 'Lista de artigos',
    errorPages: 'Paginas de Erro',
    page401: '401',
    page404: '404',
    errorLog: 'Log de Erro',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Tema',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'Link Externo'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Painel',
    github: 'Github',
    theme: 'Tema',
    size: 'Tamanho Global'
  },
  login: {
    title: 'Formulário de Login',
    logIn: 'Log in',
    username: 'Usuário',
    password: 'Senha',
    any: 'any',
    thirdparty: 'ou conectar-se a',
    thirdpartyTips: ''Não pode ser simulado no local, então, por favor, combine sua própria simulação de negócios! ! !''
  },
  documentation: {
    documentation: 'Documentação',
    github: 'Repositório Github'
  },
  permission: {
    addRole: 'Nova Regra',
    editPermission: 'Editar Permissão',
    roles: 'Suas Regras',
    switchRoles: 'Alterar Regras',
    tips: 'Em alguns casos, não é adequado usar v-permission, como o componente Tab do elemento ou o el-table-column e outros casos dom de renderização assíncrona, que só podem ser alcançados definindo manualmente o v-if',
    delete: 'Excluir',
    confirm: 'Confirme',
    cancel: 'Cancelar'
  },
  users: {
    addUser: 'Novo Usuário',
    editUser: 'Editar Usuário',
    roles: 'Suas Regras',
    switchRoles: 'Alterar Regras',
    tips: '''Em alguns casos, não é adequado usar v-permission, como o componente Tab do elemento ou o el-table-column e outros casos dom de renderização assíncrona, que só podem ser alcançados definindo manualmente o v-if,
    delete: 'Excluir',
    confirm: 'Confirme',
    cancel: 'Cancelar'
  },
  software: {
    addSoftware: 'Novo Software',
    edit: 'Editar Software',
    tips: 'Em alguns casos, não é adequado usar v-permission, como o componente Tab do elemento ou o el-table-column e outros casos dom de renderização assíncrona, que só podem ser alcançados definindo manualmente o v-if',
    delete: 'Excluir',
    confirm: 'Confirme',
    cancel: 'Cancelar'
  },
  guide: {
    description: 'A página de orientação é útil para algumas pessoas que entraram no projeto pela primeira vez. Você pode apresentar brevemente os recursos do projeto. A demonstração é baseada em ',
    button: 'Mostrar Guia'
  },
  components: {
    documentation: 'Documentação',
    tinymceTips: '''O editor de texto rich é uma parte fundamental do sistema de gerenciamento, mas ao mesmo tempo é um local com muitos problemas. No processo de seleção de textos ricos, eu também fiz muitos desvios. Os editores de rich text comuns no mercado são usados ​​basicamente, e o finalmente escolheu Tinymce. Veja a documentação para comparações e introduções mais detalhadas do editor de rich text.',
    dropzoneTips: 'Porque o meu negócio tem necessidades especiais, e tem que fazer upload de imagens para o qiniu, então ao invés de um terceiro, eu escolhi encapsulá-lo sozinho. É muito simples, você pode ver o código de detalhes em @ / components / Dropzone.',
    stickyTips: 'quando a página é rolada para a posição pré-definida será pegajosa no topo.',
    backToTopTips1: '''Quando a página é rolada para a posição especificada, o botão Voltar ao Início aparece no canto inferior direito,'
    backToTopTips2: 'Você pode personalizar o estilo do botão, mostrar / ocultar, altura da aparência, altura do retorno. Se você precisar de um prompt de texto, você pode usar elementos element-ui el-tooltip externamente',
    imageUploadTips: 'Como eu estava usando apenas a versão vue @ 1, e não é compatível com mockjs no momento, eu mesmo a modifiquei e, se você for usá-la, é melhor usar a versão oficial'
  },
  table: {
    dynamicTips1: 'Cabeçalho fixo, ordenado por ordem de cabeçalho',
    dynamicTips2: 'cabeçalho não fixo, classificado por ordem de clique',
    dragTips1: 'A ordem padrão',
    dragTips2: 'A ordem de arrastar depois',
    title: 'Título',
    importance: 'Importância',
    type: 'Tipo',
    remark: 'Observação',
    search: 'Pesquisar',
    add: 'Adicionar',
    export: 'Exportar',
    reviewer: 'revisor',
    id: 'ID',
    date: 'Data',
    author: 'Autor',
    readings: 'Leituras',
    status: 'Status',
    actions: 'Ações',
    edit: 'Editar',
    publish: 'Publicar',
    draft: 'Rascunho',
    delete: 'Excluir',
    cancel: 'Cancelar',
    confirm: 'Confirme'
  },
  errorLog: {
    tips: 'Por favor, clique no ícone do bug no canto superior direito',
    description: 'Agora o sistema de gestão é basicamente a forma do spa, aumenta a experiência do usuário, mas também aumenta a possibilidade de problemas de página, uma pequena negligência pode levar a todo o impasse da página. Felizmente, o Vue fornece uma maneira de capturar exceções, onde você pode manipular erros ou reportar exceções.',
    documentation: 'Documento de Introdução'
  },
  excel: {
    export: 'Exportar',
    selectedExport: 'Exportar Items Selecionados',
    placeholder: 'Por favor, digite o nome do arquivo (lista de excel padrão)'
  },
  zip: {
    export: 'Exportar',
    placeholder: 'Por favor, digite o nome do arquivo (lista de excel padrão)'
  },
  pdf: {
    tips: 'Aqui nós usamos window.print () para implementar o recurso de baixar pdf.'
  },
  theme: {
    change: 'Mudar Tema',
    documentation: 'Documentação do Tema',
    tips: 'Dicas: É diferente do tema-pick na barra de navegação é dois métodos diferentes de pele, cada um com diferentes cenários de aplicação. Consulte a documentação para detalhes.'
  },
  tagsView: {
    refresh: 'Atualizar',
    close: 'Fechar',
    closeOthers: 'Fechar os outros',
    closeAll: 'Fechar Tudo'
  },
  settings: {
    title: 'Configuração de Estilo de Página',
    theme: 'Cor do Tema',
    tagsView: 'Abrir tags-view',
    fixedHeader: 'Cabeçalho fixo',
    sidebarLogo: 'Logotipo da barra lateral'
  }
}
