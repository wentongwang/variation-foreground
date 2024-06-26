export default {
  register:{
    username:'用户名',
    title: '如果您还没有账号请先 ',
    toRegister: ' 账号申请',
    email: '请填写邮箱，用于接收申请结果',
    validateEmail: '邮箱格式错误, 请重新输入',
    principalType: '请输入主体类型，如政府、媒体、企业、个人、其他组织',
    IDCardName: '请填写身份证姓名',
    IDCardNo: '请填写身份证号码',
    validateUsername: '用户名不得小于6个或大于12个字符!',
    validateIDCardNo: '身份证号码错误, 请重新输入',
    applicationPurpose: '请说明申请账号的用途',
    emailCode: '请输入邮箱验证码',
    sendCode: '发送验证码',
    // successMessage: '申请请求发送成功，审批完成后我们会通过邮件与您联系',
    successMessage: '注册成功',
    sendCodeSuccessMessage: '验证码发送成功，请查看您的邮箱',
    warnMessage: '您的验证码已过期',
    usernameWarnMessage: '用户名已被注册',
    errorMessage: '申请请求发送失败',
    sendCodeErrorMessage: '验证码发送失败',
    isReregistedMessage: '您的邮箱已注册，请更换邮箱进行注册',
    loginTitle: '已有数据库账号？',
    toLogin: '立即登录',
    password: '密码',
    checkPass: '确认密码'
  },
  login: {
    title: '中国人群多组学参比数据库',
    name: '用户名',
    pass: '密码',
    login: '登录',
    validatePassword: '密码不能少于6位',
    forgotPassword: '忘记密码？'
  },
  forgotPassword: {
    title: '中国人群多组学参比数据库重置密码',
    email: '邮箱',
    sendCode: '发送验证码',
    password: '密码',
    checkPass: '确认密码',
    handleForgot: '确认修改',
    loginTitle: '中国人群多组学参比数据库 ',
    toLogin: '登录入口',
    successMessage: '修改成功',
    sendCodeSuccessMessage: '验证码发送成功，请查看您的邮箱',
    isReregistedMessage: '您输入的邮箱未注册',
    sendCodeErrorMessage: '验证码发送失败',
    warnMessage: '您的验证码已过期',
    errorMessage: '修改失败',
  },
  adminlogin: {
    toAdminLogin: '账号审核',
    loginTitle: '中国人群多组学参比数据库 ',
    title: '中国人群多组学参比数据库账号审核',
    name: '用户名',
    pass: '密码',
    login: '登录',
    loginTitle: '中国人群多组学参比数据库 ',
    toLogin: '登录入口',
    validatePassword: '密码不能少于6位',
  },
  index: {
    name: '中国人群多组学参比数据库',
    search: '搜索',
    logout: '退出登录',
    gotoabout: '关于',
    gotohelp: '帮助',
  },
  home: {
    name: '中国人群多组学参比数据库（GRCh38）',
    search: '搜索基因名，区域如：1-10000-20000，变异名（GRCh38）',
    chart1: '各染色体变异数量统计',
    chart2: '各AF区间变异数量统计',
    chart3: '各地域人群样本数统计',
    chart4: '各功能类型变异数量统计',
    chart5: 'SNV/Indel/SV数量统计',
    chart6: '临床特征相关变异数量统计',
    Central: '华中(3,551)',
    East: '华东(10,261)',
    North: '华北(4,041)',
    NorthWest: '西北(876)',
    NorthEast: '东北(5,311)',
    SouthWest: '西南(1,309)',
    South: '华南(379)',
    reference: '参考文献',
    accessRecords: '访问记录',
    content: {
      con1:
        '本数据库向获得授权的人员提供计划所测得的全部基因组变异数据及相关注释信息的在线查询与可视化。'
    },
    help: '使用引导',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    closeBtnText: '关闭',
    doneBtnText: '关闭',
    logoTitle: '返回首页',
    logoDescription: '点击logo返回数据库首页',
    imputationTitle: 'Imputation系统链接',
    imputationDescription: '点击按钮跳转到Imputation系统',
    internationalTitle: '国际化',
    internationalDescription: '切换国际化语言',
    headerSearchTitle: '导航栏搜索',
    headerSearchDescription: '可根据基因名、区域或变异ID进行搜索例如：<br/>'+
    '基因名: <span style="color: #409EFF">ALDH2</span><br/>'+
    '区域: <span style="color: #409EFF">12-111766932-111817533</span> 或 <span style="color: #409EFF">chr12:111766932-111817533</span><br/>'+
    '变异名：<span style="color: #409EFF">chr1-10439-AC-A</span> 或 <span style="color: #409EFF">chr1-3873532-3873964-DEL</span>',
    searchTitle: '搜索',
    searchDescription: '可根据基因名、区域或变异ID进行搜索例如：<br/>'+
    '基因名: <span style="color: #409EFF">ALDH2</span><br/>'+
    '区域: <span style="color: #409EFF">12-111766932-111817533</span> 或 <span style="color: #409EFF">chr12:111766932-111817533</span><br/>'+
    '变异名：<span style="color: #409EFF">chr1-10439-AC-A</span> 或 <span style="color: #409EFF">chr1-3873532-3873964-DEL</span>',
    copyright: 'Copyright © 2024 哈尔滨工业大学生物信息技术研究院. All right reserved.',
    contact: '如有问题请联系：ydwang@hit.edu.cn'
  },
  gene: {
    filter: '过滤选项',
    functionType: '功能类型',
    geneId: '基因ID：',
    geneName: '基因名：',
    source: '来源：',
    chrom: '染色体名称：',
    region: '范围：',
    search: '请输入内容',
    zoom: '缩放：',
    move: '移动：',
    init: '初始化',
    select: {
      transcripts: '转录组',
      include: '范围',
      cds: '编码蛋白',
      utr: '非翻译区',
      Non_coding_transcript: '非编码转录组'
    },
    table: {
      variatiId: '变异ID',
      start: '起始',
      end: '终点',
      rsid: 'RSID',
      source: '来源',
      exonicFunc: '变异功能',
      variation_type: '变异类型',
      dbsnp: 'dbSNP',
      chn100k_ALL: '中国人群变异频率',
      gene: '基因名',
      geneDetail: '基因详情',
      empty: '数据为空或范围过大，请调整搜索范围',
      AC: 'AC',
    }
  },
  variat: {
    snv: '单核苷酸变异',
    InDel: '插入缺失标记',
    vep: '变异效应',
    Exonic_function: '功能类型：',
    SIFT: 'SIFT：',
    ClinvarId: 'Clinvar：',
    polyPhenVal: 'PolyPhen：',
    DiseaseName: '相关疾病：',
    GERP: 'GERP：',
    Significance: '显著性：',
    CADD: 'CADD：',
    OMIMId: 'OMIM：',
    Population_frequencies: '人种频率',
    Include: '分类',
    population: '人种',
    frequency: '等位基因频率',
    All: '所有',
    African: '非洲人群',
    Amish: '美洲人群',
    AshkenaziJewish: '德系犹太人群',
    EastAsian: '东亚人群',
    European: '欧洲人群',
    EuropeanFinnish: '欧洲人群（芬兰语）',
    EuropeanNonFinnish: '欧洲人群（非芬兰语）',
    Other: '其他',
    SouthAsian: '南亚人群',
    AfricanAF: '非洲人群',
    AmishAF: '美洲人群',
    AshkenaziJewishAF: '德系犹太人群',
    EastAsianAF: '东亚人群',
    EuropeanAF: '欧洲人群',
    EuropeanFinnishAF: '欧洲人群（芬兰语）',
    EuropeanNonFinnishAF: '欧洲人群（非芬兰语）',
    SouthAsianAF: '南亚人群',
    CHN100K:'CHN100K：',
    VariationPosition: '变异位置：',
    dbSNPRsID: 'dbSNP rsID：',
    VariationType: '变异类型：',
    HGVS: 'HGVS：',
    VariationDetails: '变异详情：',
    RelatedGene: '相关基因：',
    VariationEffect: '变异效应：',
    SIFT: 'SIFT得分：',
    PolyPhen: 'PolyPhen得分：',
    GERP: 'GERP得分：',
    CADD: 'CADD得分：',
    VertebratePhastCons: '脊椎动物PhastCons：',
    VertebratePhyloP: '脊椎动物PhyloP：',
    MammalsPhastCons: '哺乳类PhastCons：',
    MammalsPhyloP: '哺乳类PhyloP：',
    PrimatesPhastCons: '灵长目PhastCons：',
    PrimatesPhyloP: '灵长目PhyloP：',
    GCContent:'局部区域GC含量：',
    CpGRatio:'局部区域CpG比例：',
    RepeatMasker:'RepeatMasker：',
    TiTv:'Ti/Tv：',
    ClinVarID: 'ClinVar：',
    OMIMID: 'OMIM：',
    ClinVar: '临床显著性(ClinVar)：',
    DiseaseName: '疾病名称：',
    GWASCatalog: 'GWAS Catalog：',
    GRASP2: 'GRASP 2.0：',
    COSMIC: 'COSMIC：',
    TFBS: 'TFBS：',
    TargetScan: 'TargetScan：',
    CAGEPromoters: 'CAGE promoters：',
    CAGEEnhancers: 'CAGE Enhancers：',
    BasicInformationOfVariation: '变异基本信息',
    VariationFunctionAnnotation: '变异功能信息',
    AlleleFrequency: '变异CHN100KAF',
    ConservationOfVariationSites: '变异位点保守性',
    vertebrateLable: '脊椎动物',
    mammalsLable: '哺乳类',
    primatesLable: '灵长目',
    SequenceCharacteristicsOfVariationSites: '变异位点序列特征', 
    VariationClinicalInformation: '变异临床信息',
    InternationalPublicDatabasePopulationAlleleFrequency: '变异其他计划AF',
    RegulatoryInformationOfVariationSites: '变异调控信息',
    EpigeneticCharacteristicsOfVariationSites: '表观遗传学特征',
    HistoneModificationCharacteristicsOfVariantSites: '变异位点组蛋白修饰特征',
    ChromatinOpeningCharacteristicsOfVariationSites: '变异位点染色质开放特征',
    region: '区域',
    WholeCountry: '全国',
    NorthEast: '东北',
    NorthChina: '华北',
    EastChina: '华东',
    CentralChina: '华中',
    NorthWest: '西北',
    SouthWest: '西南',
    SouthChina: '华南',
    AllAF: '全部',
    NorthEastAF: '东北',
    NorthChinaAF: '华北',
    EastChinaAF: '华东',
    CentralChinaAF: '华中',
    NorthWestAF: '西北',
    SouthWestAF: '西南',
    SouthChinaAF: '华南',
    ReferenceGenome: '参考基因组版本:',
    ExonicFunction: '变异功能:',
  },
  help: {
    title1:'Genome Aggregation Database Guide',
    title2:'中国人群多组学参比数据库搜索指南',
    words1:'关于',
    words2:'什么是中国人群多组学参比数据库？',
    words3:'中国人群多组学参比数据库包含所有基因变异的汇总统计数据。用户可以使用基因名称、基因组区域和变异信息来查询变异。该数据库为每个变体收集了广泛的信息，包括变异类型和基因组区域、我们研究和其他基因组项目（如1KGP3、GnomAD等）中的等位基因频率、功能和临床注释、保守特征、调控和表观遗传学特征等信息。',
    words4:'搜索引擎对这浩瀚的信息进行分类，向用户提供相关且非常详细的信息。',
    words5:'快速入门',
    words6:'1.首次使用可以查看“使用引导”快速入门',
    words8:'2.在中国人群多组学参比数据库主页的搜索框内输入搜索字段；然后单击回车键开始搜索。关键词搜索示例：DEFB125, 12-111766932-111817533, chr1-10426-A-C',
    words9:'3.“搜索结果”页面显示三部分信息，顶端显示完整的基因组位置信息、基因结构信息；左侧地图显示中国各地区人群变异频率信息；右侧显示详细基因变异信息，包括变异ID、RSID、人群变异频率、变异类型和基因详情等变异信息。通过顶端的基因区域的选取可以快速筛选该区域内的变异信息，通过选中右侧的变异信息左侧的人群变异图会随着变异的选取显示不同区域变异频率信息，反之选中区域后右侧的变异信息会根据对应变异频率显示不同颜色',
    words10:'4.可以通过页面右侧“过滤选项”按钮按照功能类型及变异类型快速过滤变异',
    words11:'5.可以通过顶端“缩放”和“移动”按钮对搜索区域进行调整',
    words12:'6.要进一步探索的变异，单击其变异ID链接。显示详细的变异基本信息、变异功能信息、人群变异频率、变异保守性、变异位点序列特征、变异临床信息、变异调控信息及表观遗传学特质信息等。',
    words13:'搜索功能',
    words14:'在中国人群多组学参比数据库主页的搜索框内输入（基因名称、基因组区域和变异信息）搜索字段；然后单击回车键开始搜索。',
    words15:'注：',
    words16:'1.搜索不区分大小写；',
    words17:'2.搜索的过程中会显示匹配的结果列表，可以直接选择符合的搜索结果；',
    words18:'3.合适的区域搜索范围可有效提升搜索速度；',
    words19:'搜索样例(基因:DEFB125)',
    words20:'输入感兴趣的基因：',
    words21:'搜索结果页面：',
    words22:'变异结果过滤：',
    words23:'变异详情页：',
    words24:'搜索样例(范围:20-80000-100000)',
    words25:'输入感兴趣的范围：',
    words26:'搜索结果页面：',
    words27:'变异结果过滤：',
    words28:'变异详情页：',
    words29:'搜索样例(变异ID:chr20-80497-CT-C)',
    words30:'输入感兴趣的变异ID：',
    words31:'变异详情页：',
  }
}
