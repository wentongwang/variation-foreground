export default {
  register:{
    username:'username',
    title: "If you don't already have an account, please ",
    toRegister: ' account application',
    email: 'Please fill in the email address for receiving application results',
    validateEmail: 'Email format error, please re-enter',
    principalType: 'Please enter the entity type',
    IDCardName: 'ID card name',
    IDCardNo: 'ID card No',
    emailCode: 'Please enter the email verification code',
    sendCode: 'Send code',
    validateUsername: 'Username must be 6-12 chars',
    validateIDCardNo: 'ID card No format error, please re-enter',
    applicationPurpose: 'Please explain the purpose of applying for an account',
    // successMessage: 'The application request has been successfully sent. After approval is completed, we will contact you via email',
    successMessage: 'registered successfully',
    sendCodeSuccessMessage: 'The verification code was successfully sent. Please check your email address',
    warnMessage: 'Your verification code has expired',
    usernameWarnMessage: 'The username has been registered',
    errorMessage: 'Request to send failed',
    sendCodeErrorMessage: 'Verification code sending failed',
    isReregistedMessage: 'Your email has been registered. Please change your email to register.',
    loginTitle: 'Existing database account？',
    toLogin: 'Log in now',
    password: 'Please enter password',
    checkPass: 'Confirm password'
  },
  login: {
    title: 'Genome Aggregation Database',
    name: 'Username',
    pass: 'Password',
    login: 'Login',
    validatePassword: 'The password cannot be less than 6 digits',
    forgotPassword: 'Forgot password?'
  },
  forgotPassword: {
    title: 'genome aggregation database reset password ',
    email: 'email',
    sendCode: 'Send code',
    password: 'Please enter password',
    checkPass: 'Confirm password',
    handleForgot: 'Confirm',
    loginTitle: 'Genome Aggregation Database ',
    toLogin: 'TO Login',
    successMessage: 'Modified successfully',
    sendCodeSuccessMessage: 'Verification code sent successfully, please check your email',
    isReregistedMessage: 'The email you entered is not registered',
    sendCodeErrorMessage: 'Verification code sending failed',
    warnMessage: 'Your verification code has expired',
    errorMessage: 'Modification failed',
  },
  adminlogin: {
    toAdminLogin: 'account review',
    loginTitle: 'Genome Aggregation Database ',
    title: 'genome aggregation database account review',
    name: 'Username',
    pass: 'Password',
    login: 'Login',
    loginTitle: 'Genome Aggregation Database ',
    toLogin: 'TO Login',
    validatePassword: 'The password cannot be less than 6 digits',
  },
  index: {
    name: 'Genome Aggregation Database',
    search: 'search',
    logout: 'logout',
    gotoabout: 'About',
    gotohelp: 'Help',
  },
  home: {
    name: 'Genome Aggregation Database (GRCh38)',
    search: 'Search by gene, region, or variant (GRCh38)',
    chart1: 'Number of variations per chromosome',
    chart2: 'Number of variations in each AF interval',
    chart3: 'Sample size of population in different regions',
    chart4: 'Number of variants for each functional type',
    chart5: 'Number of SNV/Index/SV',
    chart6: 'Number of clinical feature related variants',
    Central: 'Central(3,551)',
    East: 'East(10,261)',
    North: 'North(4,041)',
    NorthWest: 'NorthWest(876)',
    NorthEast: 'NorthEast(5,311)',
    SouthWest: 'SouthWest(1,309)',
    South: 'South(379)',
    reference: 'reference',
    accessRecords: 'Access records',
    content: {
      con1:
        'The database provides online query and visualization of all the genomic variation data and related annotation information.'
    },
    help: 'guide',
    nextBtnText: 'Next',
    prevBtnText: 'Previous',
    closeBtnText: 'close',
    doneBtnText: 'close',
    logoTitle: 'To index',
    logoDescription: 'Click on the logo to return to the database homepage',
    imputationTitle: 'Imputation system link',
    imputationDescription: 'Click the button to jump to the Imputation system',
    internationalTitle: 'International',
    internationalDescription: 'Switch internationalization language',
    headerSearchTitle: 'Header Search',
    headerSearchDescription: 'It can be searched according to gene name, region or variant ID, e.g：<br/>'+
    'Gene: <span style="color: #409EFF">ALDH2</span><br/>'+
    'Region: <span style="color: #409EFF">12-111766932-111817533</span> or <span style="color: #409EFF">chr12:111766932-111817533</span><br/>'+
    'Variant：<span style="color: #409EFF">chr1-10439-AC-A</span> or <span style="color: #409EFF">chr1-3873532-3873964-DEL</span>',
    searchTitle: 'Search',
    searchDescription: 'It can be searched according to gene name, region or variant ID, e.g：<br/>'+
    'Gene: <span style="color: #409EFF">ALDH2</span><br/>'+
    'Region: <span style="color: #409EFF">12-111766932-111817533</span> or <span style="color: #409EFF">chr12:111766932-111817533</span><br/>'+
    'Variant：<span style="color: #409EFF">chr1-10439-AC-A</span> or <span style="color: #409EFF">chr1-3873532-3873964-DEL</span>',
    copyright: 'Copyright © 2024 HARBIN INSTITUTE OF TECHNOLOGY Center for Bioinformatics. All right reserved.',
    contact: 'contact us: ydwang@hit.edu.cn'
  },
  gene: {
    filter: 'FilterOption',
    functionType: 'function type',
    geneId: 'Ensembl gene ID：',
    geneName: 'Ensembl gene Name：',
    source: 'Source：',
    chrom: 'Chrom：',
    region: 'Region：',
    search: 'search',
    zoom: 'Zoom:',
    move: 'Move:',
    init: 'reset',
    select: {
      transcripts: 'transcripts',
      include: 'Include',
      cds: 'CDS',
      utr: 'UTR',
      Non_coding_transcript: 'Non-coding transcript'
    },
    table: {
      variatiId: 'Vatriat ID',
      start: 'start',
      end: 'end',
      rsid: 'RSID',
      source: 'Source',
      exonicFunc: 'Exonic Function',
      variation_type: 'Variation Type',
      dbsnp: 'dbSNP',
      chn100k_ALL: 'CHN100K ALL',
      gene: 'gene',
      geneDetail: 'geneDetail',
      empty: 'The data is empty or the range is too large. Please adjust the search range',
      AC: 'AC',
    }
  },
  variat: {
    snv: 'Single nucleotide variant',
    InDel: 'InDel',
    vep: 'Variant Effect Predictor',
    Exonic_function: 'Exonic function：',
    SIFT: 'SIFT：',
    ClinvarId: 'Clinvar id：',
    polyPhenVal: 'poly phen val：',
    DiseaseName: 'Disease name：',
    GERP: 'GERP：',
    Significance: 'Significance：',
    CADD: 'CADD：',
    OMIMId: 'OMIM id：',
    Population_frequencies: 'Population Frequencies',
    Include: 'Include',
    population: 'Population',
    frequency: 'Allel Frequency',
    All: 'All',
    African: 'African',
    Amish: 'Amish',
    AshkenaziJewish: 'Ashkenazi Jewish',
    EastAsian: 'East Asian',
    European: 'European',
    EuropeanFinnish: 'European(Finnish)',
    EuropeanNonFinnish: 'European(non-Finnish)',
    Other: 'Other',
    SouthAsian: 'South Asian',
    AfricanAF: 'African',
    AmishAF: 'Amish',
    AshkenaziJewishAF: 'Ashkenazi Jewish',
    EastAsianAF: 'East Asian',
    EuropeanAF: 'European',
    EuropeanFinnishAF: 'European(Finnish)',
    EuropeanNonFinnishAF: 'European(non-Finnish)',
    SouthAsianAF: 'South Asian',
    CHN100K:'CHN100K：',
    VariationPosition: 'Variation Position：',
    dbSNPRsID: 'dbSNP rsID：',
    VariationType: 'Variation Type：',
    HGVS: 'HGVS：',
    VariationDetails: 'Variation Details：',
    RelatedGene: 'Related Gene：',
    VariationEffect: 'Variation Effect：',
    SIFT: 'SIFT：',
    PolyPhen: 'PolyPhen：',
    GERP: 'GERP：',
    CADD: 'CADD：',
    VertebratePhastCons: 'Vertebrate PhastCons：',
    VertebratePhyloP: 'Vertebrate PhyloP：',
    MammalsPhastCons: 'Mammals PhastCons：',
    MammalsPhyloP: 'Mammals PhyloP：',
    PrimatesPhastCons: 'Primates PhastCons：',
    PrimatesPhyloP: 'Primates PhyloP：',
    GCContent:'GC Content：',
    CpGRatio:'CpG Ratio：',
    RepeatMasker:'RepeatMasker：',
    TiTv:'Ti/Tv：',
    ClinVarID: 'ClinVar ID：',
    OMIMID: 'OMIM ID：',
    ClinVar: 'ClinVar：',
    DiseaseName: 'Disease Name：',
    GWASCatalog: 'GWAS Catalog：',
    GRASP2: 'GRASP 2.0：',
    COSMIC: 'COSMIC：',
    TFBS: 'TFBS：',
    TargetScan: 'TargetScan：',
    CAGEPromoters: 'CAGE promoters：',
    CAGEEnhancers: 'CAGE Enhancers：',
    BasicInformationOfVariation: 'Basic Information Of Variation',
    VariationFunctionAnnotation: 'Variation Function Annotation',
    AlleleFrequency: 'Allele Frequency In chn100k Population',
    InternationalPublicDatabasePopulationAlleleFrequency: 'International Public Database Population Allele Frequency',
    ConservationOfVariationSites: 'Conservation Of Variation Sites',
    vertebrateLable: 'Vertebrate',
    mammalsLable: 'Mammals',
    primatesLable: 'Primates',
    SequenceCharacteristicsOfVariationSites: 'Sequence Characteristics Of Variation Sites', 
    VariationClinicalInformation: 'Variation Clinical Information',
    RegulatoryInformationOfVariationSites: 'Regulatory Information Of Variation Sites',
    EpigeneticCharacteristicsOfVariationSites: 'Epigenetic Characteristics Of Variation Sites',
    HistoneModificationCharacteristicsOfVariantSites: 'Histone Modification Characteristics Of VariantSites',
    ChromatinOpeningCharacteristicsOfVariationSites: 'Chromatin Opening Characteristics Of Variation Sites',
    region: 'Region',
    WholeCountry: 'Whole Country',
    NorthEast: 'North East',
    NorthChina: 'North China',
    EastChina: 'East China',
    CentralChina: 'Central China',
    NorthWest: 'North West',
    SouthWest: 'South West',
    SouthChina: 'South China',
    AllAF: 'All',
    NorthEastAF: 'North East',
    NorthChinaAF: 'North China',
    EastChinaAF: 'East China',
    CentralChinaAF: 'Central China',
    NorthWestAF: 'North West',
    SouthWestAF: 'South West',
    SouthChinaAF: 'South China',
    ReferenceGenome: 'Reference Genome',
    ExonicFunction: 'Exonic Function',
  },
  help: {
    title1:'Genome Aggregation Database Guide',
    title2:'Genome Aggregation Database Search Guide',
    words1:'About',
    words2:'What is genome aggregation database?',
    words3:'We have established a dedicated database archiving all genetic variants discovered in this study and implemented a user-friendly visualization system (http://bioinformatics.hit.edu.cn/chnpop/) to facilitate public access. The home page contains summary statistics of all genetic variants. Users can use gene symbols and genomic regionsto inquire about variants. The database curates extensive information for each variant, including variant type and genomic region, allele frequency in our study and in other genome projects (e.g., 1KGP3, GnomAD), functional and clinical annotations, conservative characteristics, regulation and epigenetic characteristics.',
    words4:'To facilitate genotype imputation in the Chinese population, we also developed an imputation web server with a user-friendly interface (http://bioinformatics.hit.edu.cn/imputation/).',
    words5:'Quick Start',
    words6:'1.For the first time use, refer to the "Guide" for a quick start.',
    words8:'2.Enter search terms in the search box on the homepage of the genome aggregation database, then press the enter key to start the search. Example search terms: DEFB125, 12-111766932-111817533, chr1-10426-A-C.',
    words9:'3.The "Search Results" page displays three sections of information. The top shows complete genome location information and gene structure information; the left map shows the variant frequency information for different regions of China; the right side displays detailed gene variant information, including variant ID, RSID, population variant frequency, variant type, and gene details. You can quickly filter the variant information within the selected gene region at the top. When you select variant information on the right, the left population variant map will show different regional variant frequencies based on the selected variant. Conversely, selecting a region on the left will display variant information on the right with different colors based on the corresponding variant frequencies.',
    words10:'4.You can quickly filter variants by functional type and variant type using the "Filter Options" button on the right side of the page.',
    words11:'5.You can adjust the search area using the "Zoom" and "Move" buttons at the top.',
    words12:'6.To explore a variant further, click its variant ID link. Detailed information will be displayed, including basic variant information, variant functional information, population variant frequency, variant conservation , variant site sequence characteristics, clinical information of the variant, regulatory information, and epigenetic information.',
    words13:'Search Function',
    words14:'Enter search terms (such as gene names, genomic regions, or variant information) into the search box on the homepage of the Genome Aggregation Database, and then press the enter key to start the search.',
    words15:'Notes:',
    words16:'1.The search is case-insensitive.',
    words17:'2.During the search process, a list of matching results will be displayed, from which you can directly select the appropriate search result.',
    words18:'3.Specifying an appropriate search region can effectively improve search speed.',
    words19:'Search Example (Gene DEFB125)',
    words20:'Enter the Gene of Interest:',
    words21:'Search Results Page:',
    words22:'Results Filtering Page:',
    words23:'Variant Details Page:',
    words24:'Search Example (Trait:20-80000-100000)',
    words25:'Enter the Trait of Interest：',
    words26:'Search Results Page:',
    words27:'Results Filtering Page:',
    words28:'Variant Details Page:',
    words29:'Search Example (variant ID:chr20-80497-CT-C)',
    words30:'Enter the variant ID of Interest：',
    words31:'Variant Details Page:',
  }
}
