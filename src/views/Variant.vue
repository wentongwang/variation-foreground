<template>
  <div>
    <Nav />
    <el-main v-loading="loading">
      <div class="main-container">
        <div class="sub-content-1">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>{{ $t('variat.BasicInformationOfVariation') }}</div></el-col
            >
          </el-row>
          <el-table
            :data="tableData"
            stripe
            :show-header="false"
            :cell-style="{ textAlign: 'center', fontSize: '16px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"> </el-table-column>
            <el-table-column prop="name2"> </el-table-column>
            <el-table-column prop="value2"> </el-table-column>
          </el-table>
        </div>
        <div class="sub-content-1">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>{{ $t('variat.VariationFunctionAnnotation') }}</div></el-col
            >
          </el-row>
          <el-table
            :data="tableData2"
            stripe
            :show-header="false"
            :cell-style="{ textAlign: 'center', fontSize: '16px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"> </el-table-column>
            <el-table-column prop="name2"> </el-table-column>
            <el-table-column prop="value2"> </el-table-column>
          </el-table>
        </div>
        <div class="sub-content-2">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>{{ $t('variat.AlleleFrequency') }}</div></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="14" :offset="0"
              ><div style="margin-top: 20px">
                <div class="grid-content">
                  <el-table :data="freArr" style="width: 100%">
                    <el-table-column
                      prop="population"
                      :label="$t('variat.region')"
                    />
                    <el-table-column
                      prop="frequency"
                      :label="$t('variat.frequency')"
                    />
                  </el-table>
                </div>
              </div>
            </el-col>
            <el-col :span="10" :offset="0"><div class="pie-container"/></el-col>
          </el-row>
        </div>
        <div class="sub-content-2">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>
                {{
                  $t(
                    'variat.InternationalPublicDatabasePopulationAlleleFrequency'
                  )
                }}
              </div></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="14" :offset="0"
              ><div style="margin-top: 20px">
                {{ $t('variat.Include') }}:
                <el-radio-group
                  v-model="radio2"
                  size="medium"
                  @change="handleChecked"
                >
                  <el-radio-button label="1000G" />
                  <el-radio-button label="ExAC" />
                  <el-radio-button label="gnomAD Exomes" />
                  <el-radio-button label="gnomAD Genomes" />
                </el-radio-group>
                <div class="grid-content">
                  <el-table :data="freArr2" style="width: 100%">
                    <el-table-column
                      prop="population"
                      :label="$t('variat.population')"
                    />
                    <el-table-column
                      prop="frequency"
                      :label="$t('variat.frequency')"
                    />
                  </el-table>
                </div>
              </div>
            </el-col>
            <el-col :span="10" :offset="0"
              ><div class="pie-container2"
            /></el-col>
          </el-row>
        </div>
        <div class="sub-content-1">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>
                {{ $t('variat.ConservationOfVariationSites') }}
              </div></el-col
            >
          </el-row>
          <el-table
            :data="tableData3"
            stripe
            :show-header="false"
            :cell-style="{ textAlign: 'center', fontSize: '16px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"> </el-table-column>
            <el-table-column prop="name2"> </el-table-column>
            <el-table-column prop="value2"> </el-table-column>
          </el-table>
        </div>
        <div class="sub-content-1">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>
                {{ $t('variat.SequenceCharacteristicsOfVariationSites') }}
              </div></el-col
            >
          </el-row>
          <el-table
            :data="tableData4"
            stripe
            :show-header="false"
            :cell-style="{ textAlign: 'center', fontSize: '16px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"> </el-table-column>
            <el-table-column prop="name2"> </el-table-column>
            <el-table-column prop="value2"> </el-table-column>
          </el-table>
        </div>
        <div class="sub-content-1">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>
                {{ $t('variat.VariationClinicalInformation') }}
              </div></el-col
            >
          </el-row>
          <el-table
            :data="tableData5"
            stripe
            :show-header="false"
            :cell-style="{ textAlign: 'center', fontSize: '16px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"> </el-table-column>
            <el-table-column prop="name2"> </el-table-column>
            <el-table-column prop="value2"> </el-table-column>
          </el-table>
        </div>
        <div class="sub-content-1">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>
                {{ $t('variat.RegulatoryInformationOfVariationSites') }}
              </div></el-col
            >
          </el-row>
          <el-table
            :data="tableData6"
            stripe
            :show-header="false"
            :cell-style="{ textAlign: 'center', fontSize: '16px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"> </el-table-column>
            <el-table-column prop="name2"> </el-table-column>
            <el-table-column prop="value2"> </el-table-column>
          </el-table>
        </div>
        <div class="sub-content-2">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>
                {{ $t('variat.EpigeneticCharacteristicsOfVariationSites') }}
              </div></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0"
              ><div class="scheme-container1" />
              <el-row :gutter="0">
                <el-col :span="24" :offset="0"
                  ><div style="text-align: center">
                    {{
                      $t(
                        'variat.HistoneModificationCharacteristicsOfVariantSites'
                      )
                    }}
                  </div></el-col
                >
              </el-row>
            </el-col>
            <el-col :span="12" :offset="0"
              ><div class="scheme-container2" />
              <el-row :gutter="0">
                <el-col :span="24" :offset="0"
                  ><div style="text-align: center">
                    {{
                      $t(
                        'variat.ChromatinOpeningCharacteristicsOfVariationSites'
                      )
                    }}
                  </div></el-col
                >
              </el-row></el-col
            >
          </el-row>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { variantDetail } from '@/api/variation'
import Nav from '@/components/Nav'
export default {
  name: 'Variation',
  components: {
    Nav
  },
  data() {
    let name = window.location.href.split('?')[1].split('=')[1]
    return {
      variantId: '',
      radio2: '1000G',
      loading: true,
      freArr: [
        {
          population: this.$t('variat.WholeCountry'),
          frequency: ''
        },
        {
          population: this.$t('variat.NorthEast'),
          frequency: ''
        },
        {
          population: this.$t('variat.NorthChina'),
          frequency: ''
        },
        {
          population: this.$t('variat.EastChina'),
          frequency: ''
        },
        {
          population: this.$t('variat.CentralChina'),
          frequency: ''
        },
        {
          population: this.$t('variat.NorthWest'),
          frequency: ''
        },
        {
          population: this.$t('variat.SouthWest'),
          frequency: ''
        },
        {
          population: this.$t('variat.SouthChina'),
          frequency: ''
        }
      ],
      freArr2: [
        {
          population: window.vm.$t('variat.All'),
          frequency: ''
        },
        {
          population: window.vm.$t('variat.African'),
          frequency: ''
        },
        {
          population: window.vm.$t('variat.Amish'),
          frequency: ''
        },
        {
          population: window.vm.$t('variat.European'),
          frequency: ''
        },
        {
          population: window.vm.$t('variat.EastAsian'),
          frequency: ''
        },
        {
          population: window.vm.$t('variat.SouthAsian'),
          frequency: ''
        }
      ],
      variantion: null,
      schemeData1: [
        0,
        0,
        0,
        0,
        0
      ],
      schemeData2: [0, 0, 0],
      pieData: {
        aachange: '.',
        ac: '1',
        af: '0.00186567',
        alt: 'G',
        an: '536',
        cadd_PHRED: '6.968',
        cadd_RwaScore: '.',
        chn100k_ALL: '.',
        chn100k_NE: '.',
        chn100k_N: '.',
        chn100k_E: '.',
        chn100k_C: '.',
        chn100k_NW: '.',
        chn100k_SW: '.',
        chn100k_S: '.',
        chrom: '1',
        clnalleleid: '.',
        clndisdb: '.',
        clndn: '.',
        clnrevstat: '.',
        clnsig: '.',
        end: 10321,
        exAC_AFR: '.',
        exAC_ALL: '.',
        exAC_AMR: '.',
        exAC_EAS: '.',
        exAC_FIN: '.',
        exAC_NFE: '.',
        exAC_OTH: '.',
        exAC_SAS: '.',
        exonicFunc: '.',
        func: 'intergenic',
        gene: 'NONE;DDX11L1',
        geneDetail: 'dist=NONE;dist=1553',
        gerpN: '0',
        gerpS: '0',
        gnomAD_exome_AFR: '.',
        gnomAD_exome_ALL: '.',
        gnomAD_exome_AMR: '.',
        gnomAD_exome_ASJ: '.',
        gnomAD_exome_EAS: '.',
        gnomAD_exome_FIN: '.',
        gnomAD_exome_NFE: '.',
        gnomAD_exome_OTH: '.',
        gnomAD_exome_SAS: '.',
        gnomAD_genome_AFR: '.',
        gnomAD_genome_ALL: '.',
        gnomAD_genome_AMR: '.',
        gnomAD_genome_ASJ: '.',
        gnomAD_genome_EAS: '.',
        gnomAD_genome_FIN: '.',
        gnomAD_genome_NFE: '.',
        gnomAD_genome_OTH: '.',
        id: 4,
        polyPhenVal: '.',
        ref: 'C',
        rsid: '.',
        siftval: '.',
        start: 10321,
        thousandG_AFR: '.',
        thousandG_ALL: '.',
        thousandG_AMR: '.',
        thousandG_EAS: '.',
        thousandG_EUR: '.',
        thousandG_SAS: '.',
        uu_id: 'chr1-10321-C-G',
        variation_type: 'snv',
        vcf_ALT: 'G',
        vcf_CHROM: 'chr1',
        vcf_POS: '10321',
        vcf_QUAL: '168.86',
        vcf_REF: 'C'
      },
      tableData: [
        {
          name1: this.$t('variat.CHN100K'),
          value1: '.',
          name2: this.$t('variat.VariationPosition'),
          value2: '.'
        },
        {
          name1: this.$t('variat.dbSNPRsID'),
          value1: '.',
          name2: this.$t('variat.VariationType'),
          value2: '.'
        },
        {
          name1: this.$t('variat.HGVS'),
          value1:
            '.',
          name2: this.$t('variat.VariationDetails'),
          value2: '.'
        }
      ],
      tableData2: [
        {
          name1: this.$t('variat.RelatedGene'),
          value1: '.',
          name2: this.$t('variat.VariationEffect'),
          value2: '.'
        },
        {
          name1: this.$t('variat.SIFT'),
          value1: '.',
          name2: this.$t('variat.PolyPhen'),
          value2: '.'
        },
        {
          name1: this.$t('variat.GERP'),
          value1: '.',
          name2: this.$t('variat.CADD'),
          value2: '.'
        }
      ],
      tableData3: [
        {
          name1: this.$t('variat.VertebratePhastCons'),
          value1: '.',
          name2: this.$t('variat.VertebratePhyloP'),
          value2: '.'
        },
        {
          name1: this.$t('variat.MammalsPhastCons'),
          value1: '.',
          name2: this.$t('variat.MammalsPhyloP'),
          value2: '.'
        },
        {
          name1: this.$t('variat.PrimatesPhastCons'),
          value1: '.',
          name2: this.$t('variat.PrimatesPhyloP'),
          value2: '.'
        }
      ],
      tableData4: [
        {
          name1: this.$t('variat.GCContent'),
          value1: '.',
          name2: this.$t('variat.CpGRatio'),
          value2: '.'
        },
        {
          name1: this.$t('variat.RepeatMasker'),
          value1: '.',
          name2: this.$t('variat.TiTv'),
          value2: '.'
        }
      ],
      tableData5: [
        {
          name1: this.$t('variat.ClinVarID'),
          value1: '.',
          name2: this.$t('variat.OMIMID'),
          value2: '.'
        },
        {
          name1: this.$t('variat.ClinVar'),
          value1: '.',
          name2: this.$t('variat.DiseaseName'),
          value2: '.'
        },
        {
          name1: this.$t('variat.GWASCatalog'),
          value1: '.',
          name2: this.$t('variat.GRASP2'),
          value2: '.'
        },
        {
          name1: this.$t('variat.COSMIC'),
          value1: '.'
        }
      ],
      tableData6: [
        {
          name1: this.$t('variat.TFBS'),
          value1: '.',
          name2: this.$t('variat.TargetScan'),
          value2: '.'
        },
        {
          name1: this.$t('variat.CAGEPromoters'),
          value1: '.',
          name2: this.$t('variat.CAGEEnhancers'),
          value2: '.'
        }
      ]
    }
  },
  watch: {
    variantion() {
      this.$nextTick(function() {
        this.pieChart()
        this.pieChart2()
        this.schemeChart(this.schemeData1)
        this.schemeChart2(this.schemeData2)
      })
    }
  },
  created: function() {
    const _this = this
    _this.variantId = this.$route.query["id"]
    _this.tableData[0]['value1'] = _this.variantId
    const data = {
      variantId: _this.variantId,
      chrom: this.$route.query["chrom"] === "x" ? 23 : this.$route.query["chrom"]
    }
    variantDetail(data).then(response => {
      if (response['listData'][0]) {
        // console.log(response['listData'][0])
        _this.pieData['chn100k_ALL'] = response['listData'][0]['chn100k_ALL']
        _this.pieData['chn100k_NE'] = response['listData'][0]['chn100k_NE']
        _this.pieData['chn100k_N'] = response['listData'][0]['chn100k_N']
        _this.pieData['chn100k_E'] = response['listData'][0]['chn100k_E']
        _this.pieData['chn100k_C'] = response['listData'][0]['chn100k_C']
        _this.pieData['chn100k_NW'] = response['listData'][0]['chn100k_NW']
        _this.pieData['chn100k_SW'] = response['listData'][0]['chn100k_SW']
        _this.pieData['chn100k_S'] = response['listData'][0]['chn100k_S']
        _this.pieData['gnomAD_exome_AFR'] =
          response['listData'][0]['gnomAD_exome_AFR']
        _this.pieData['gnomAD_exome_ALL'] =
          response['listData'][0]['gnomAD_exome_ALL']
        _this.pieData['gnomAD_exome_AMR'] =
          response['listData'][0]['gnomAD_exome_AMR']
        _this.pieData['gnomAD_exome_ASJ'] =
          response['listData'][0]['gnomAD_exome_ASJ']
        _this.pieData['gnomAD_exome_EAS'] =
          response['listData'][0]['gnomAD_exome_EAS']
        _this.pieData['gnomAD_exome_FIN'] =
          response['listData'][0]['gnomAD_exome_FIN']
        _this.pieData['gnomAD_exome_NFE'] =
          response['listData'][0]['gnomAD_exome_NFE']
        _this.pieData['gnomAD_exome_OTH'] =
          response['listData'][0]['gnomAD_exome_OTH']
        _this.pieData['gnomAD_exome_SAS'] =
          response['listData'][0]['gnomAD_exome_SAS']
        _this.pieData['gnomAD_genome_AFR'] =
          response['listData'][0]['gnomAD_genome_AFR']
        _this.pieData['gnomAD_genome_ALL'] =
          response['listData'][0]['gnomAD_genome_ALL']
        _this.pieData['gnomAD_genome_AMR'] =
          response['listData'][0]['gnomAD_genome_AMR']
        _this.pieData['gnomAD_genome_ASJ'] =
          response['listData'][0]['gnomAD_genome_ASJ']
        _this.pieData['gnomAD_genome_EAS'] =
          response['listData'][0]['gnomAD_genome_EAS']
        _this.pieData['gnomAD_genome_FIN'] =
          response['listData'][0]['gnomAD_genome_FIN']
        _this.pieData['gnomAD_genome_NFE'] =
          response['listData'][0]['gnomAD_genome_NFE']
        _this.pieData['gnomAD_genome_OTH'] =
          response['listData'][0]['gnomAD_genome_OTH']
        _this.pieData['thousandG_AFR'] =
          response['listData'][0]['thousandG_AFR']
        _this.pieData['thousandG_ALL'] =
          response['listData'][0]['thousandG_ALL']
        _this.pieData['thousandG_AMR'] =
          response['listData'][0]['thousandG_AMR']
        _this.pieData['thousandG_EAS'] =
          response['listData'][0]['thousandG_EAS']
        _this.pieData['thousandG_EUR'] =
          response['listData'][0]['thousandG_EUR']
        _this.pieData['thousandG_SAS'] =
          response['listData'][0]['thousandG_SAS']
        _this.pieData['exAC_AFR'] = response['listData'][0]['exAC_AFR']
        _this.pieData['exAC_ALL'] = response['listData'][0]['exAC_ALL']
        _this.pieData['exAC_AMR'] = response['listData'][0]['exAC_AMR']
        _this.pieData['exAC_EAS'] = response['listData'][0]['exAC_EAS']
        _this.pieData['exAC_FIN'] = response['listData'][0]['exAC_FIN']
        _this.pieData['exAC_NFE'] = response['listData'][0]['exAC_NFE']
        _this.pieData['exAC_OTH'] = response['listData'][0]['exAC_OTH']
        _this.pieData['exAC_SAS'] = response['listData'][0]['exAC_SAS']
        _this.tableData[0]['value2'] =
          response['listData'][0]['variation_position']
        _this.tableData[1]['value1'] = response['listData'][0]['dbSNPRsID']
        _this.tableData[1]['value2'] = response['listData'][0]['variation_type']
        _this.tableData[2]['value1'] = response['listData'][0]['hgvs']
        _this.tableData[2]['value2'] =
          response['listData'][0]['variation_details']
        _this.tableData2[0]['value1'] = response['listData'][0]['related_gene']
        _this.tableData2[0]['value2'] =
          response['listData'][0]['variation_effect']
        _this.tableData2[1]['value1'] = response['listData'][0]['sift']
        _this.tableData2[1]['value2'] = response['listData'][0]['polyPhen']
        _this.tableData2[2]['value1'] = response['listData'][0]['gerp']
        _this.tableData2[2]['value2'] = response['listData'][0]['cadd']
        _this.tableData3[0]['value1'] =
          response['listData'][0]['vertebratePhastCons']
        _this.tableData3[0]['value2'] =
          response['listData'][0]['vertebratePhyloP']
        _this.tableData3[1]['value1'] =
          response['listData'][0]['mammalsPhastCons']
        _this.tableData3[1]['value2'] = response['listData'][0]['mammalsPhyloP']
        _this.tableData3[2]['value1'] =
          response['listData'][0]['primatesPhastCons']
        _this.tableData3[2]['value2'] =
          response['listData'][0]['primatesPhyloP']
        _this.tableData4[0]['value1'] = response['listData'][0]['gccontent']
        _this.tableData4[0]['value2'] = response['listData'][0]['cpGRatio']
        _this.tableData4[1]['value1'] = response['listData'][0]['repeatMasker']
        _this.tableData4[1]['value2'] = response['listData'][0]['ti_Tv']
        _this.tableData5[0]['value1'] = response['listData'][0]['clinVarID']
        _this.tableData5[0]['value2'] = response['listData'][0]['omimid']
        _this.tableData5[1]['value1'] = response['listData'][0]['clinVar']
        _this.tableData5[1]['value2'] = response['listData'][0]['diseaseName']
        _this.tableData5[2]['value1'] = response['listData'][0]['gwascatalog']
        _this.tableData5[2]['value2'] = response['listData'][0]['grasp2']
        _this.tableData5[3]['value1'] = response['listData'][0]['cosmic']
        _this.tableData6[0]['value1'] = response['listData'][0]['tfbs']
        _this.tableData6[0]['value2'] = response['listData'][0]['targetScan']
        _this.tableData6[1]['value1'] = response['listData'][0]['cagepromoters']
        _this.tableData6[1]['value2'] = response['listData'][0]['cageenhancers']
        _this.variantion = _this.pieData
        _this.freArr[0]['frequency'] = _this.variantion['chn100k_ALL']
        _this.freArr[1]['frequency'] = _this.variantion['chn100k_NE']
        _this.freArr[2]['frequency'] = _this.variantion['chn100k_N']
        _this.freArr[3]['frequency'] = _this.variantion['chn100k_E']
        _this.freArr[4]['frequency'] = _this.variantion['chn100k_C']
        _this.freArr[5]['frequency'] = _this.variantion['chn100k_NW']
        _this.freArr[6]['frequency'] = _this.variantion['chn100k_SW']
        _this.freArr[7]['frequency'] = _this.variantion['chn100k_S']
        _this.freArr2[0]['frequency'] = _this.variantion['thousandG_ALL']
        _this.freArr2[1]['frequency'] = _this.variantion['thousandG_AFR']
        _this.freArr2[2]['frequency'] = _this.variantion['thousandG_AMR']
        _this.freArr2[3]['frequency'] = _this.variantion['thousandG_EUR']
        _this.freArr2[4]['frequency'] = _this.variantion['thousandG_EAS']
        _this.freArr2[5]['frequency'] = _this.variantion['thousandG_SAS']
        _this.schemeData1 = [
          parseFloat(response['listData'][0]['h3K27me3']),
          parseFloat(response['listData'][0]['h3K9me3']),
          parseFloat(response['listData'][0]['h3K27Ac']),
          parseFloat(response['listData'][0]['h3K4Me1']),
          parseFloat(response['listData'][0]['h3K4Me3'])
        ]
        _this.schemeData2 = [
          parseFloat(response['listData'][0]['dnase']),
          parseFloat(response['listData'][0]['polII']),
          parseFloat(response['listData'][0]['ctcf'])
        ]
        _this.loading = false
      } else {
        _this.variantion = _this.pieData
        _this.freArr[0]['frequency'] = _this.variantion['chn100k_ALL']
        _this.freArr[1]['frequency'] = _this.variantion['chn100k_NE']
        _this.freArr[2]['frequency'] = _this.variantion['chn100k_N']
        _this.freArr[3]['frequency'] = _this.variantion['chn100k_E']
        _this.freArr[4]['frequency'] = _this.variantion['chn100k_C']
        _this.freArr[5]['frequency'] = _this.variantion['chn100k_NW']
        _this.freArr[6]['frequency'] = _this.variantion['chn100k_SW']
        _this.freArr[7]['frequency'] = _this.variantion['chn100k_S']
        _this.freArr2[0]['frequency'] = _this.variantion['thousandG_ALL']
        _this.freArr2[1]['frequency'] = _this.variantion['thousandG_AFR']
        _this.freArr2[2]['frequency'] = _this.variantion['thousandG_AMR']
        _this.freArr2[3]['frequency'] = _this.variantion['thousandG_EUR']
        _this.freArr2[4]['frequency'] = _this.variantion['thousandG_EAS']
        _this.freArr2[5]['frequency'] = _this.variantion['thousandG_SAS']
        _this.loading = false
      }
    })
  },
  methods: {
    handleChecked(value) {
      this.freArr2 = []
      const _this = this
      if (this.radio2 === 'gnomAD Exomes') {
        this.freArr2.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['gnomAD_exome_ALL']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['gnomAD_exome_AFR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['gnomAD_exome_AMR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.AshkenaziJewish'),
          frequency: this.variantion['gnomAD_exome_ASJ']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['gnomAD_exome_EAS']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EuropeanFinnish'),
          frequency: this.variantion['gnomAD_exome_FIN']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EuropeanNonFinnish'),
          frequency: this.variantion['gnomAD_exome_NFE']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Other'),
          frequency: this.variantion['gnomAD_exome_OTH']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.SouthAsian'),
          frequency: this.variantion['gnomAD_exome_SAS']
        })
      }
      if (this.radio2 === '1000G') {
        this.freArr2.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['thousandG_ALL']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['thousandG_AFR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['thousandG_AMR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.European'),
          frequency: this.variantion['thousandG_EUR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['thousandG_EAS']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.SouthAsian'),
          frequency: this.variantion['thousandG_SAS']
        })
      }
      if (this.radio2 === 'ExAC') {
        this.freArr2.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['exAC_ALL']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['exAC_AFR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['exAC_AMR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['exAC_EAS']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EuropeanFinnish'),
          frequency: this.variantion['exAC_FIN']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EuropeanNonFinnish'),
          frequency: this.variantion['exAC_NFE']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Other'),
          frequency: this.variantion['exAC_OTH']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.SouthAsian'),
          frequency: this.variantion['exAC_SAS']
        })
      }
      if (this.radio2 === 'gnomAD Genomes') {
        this.freArr2.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['gnomAD_genome_ALL']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['gnomAD_genome_AFR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['gnomAD_genome_AMR']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.AshkenaziJewish'),
          frequency: this.variantion['gnomAD_genome_ASJ']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['gnomAD_genome_EAS']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EuropeanFinnish'),
          frequency: this.variantion['gnomAD_genome_FIN']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.EuropeanNonFinnish'),
          frequency: this.variantion['gnomAD_genome_NFE']
        })
        this.freArr2.push({
          population: window.vm.$t('variat.Other'),
          frequency: this.variantion['gnomAD_genome_OTH']
        })
      }
      this.pieChart2()
    },
    pieChart() {
      const dataset = []
      this.freArr.forEach(function(val, index) {
        dataset.push([
          [
            val.population,
            val.frequency === '.' ? 0 : (val.frequency * 100).toFixed(1)
          ],
          [
            'other',
            val.frequency === '.' ? 100 : 100 - (val.frequency * 100).toFixed(1)
          ]
        ])
      })
      const width = parseInt(d3.select('.pie-container').style('width'))
      const height =
        ((document.body.clientWidth * 200) / 1920) *
        Math.ceil(dataset.length / 3)
      d3.select('.pie-container')
        .selectAll('*')
        .remove()
      const svg = d3
        .select('.pie-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 确定初始数据

      dataset.forEach(function(val, index) {
        // 转换数据
        const pie = d3.pie().value(function(d) {
          return d[1]
        })
        const piedata = pie(val)

        // 外半径和内半径
        const outerRadius = width / 12.5
        const innerRadius = 0

        // 创建弧生成器
        const arc = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
        const color = ['#409EFF', '#E4E7ED']

        // 添加对应数目的弧组，即<g>元素
        const arcs = svg
          .selectAll("g[id^='code']")
          .data(piedata)
          .enter()
          .append('g')
          .attr(
            'transform',
            'translate(' +
              (width * ((index % 3) * 2 + 1)) / 6 +
              ',' +
              (height * (Math.floor(index / 3) * 2 + 1)) /
                (Math.ceil(dataset.length / 3) * 2) +
              ')'
          )
        // 添加弧的路径元素
        arcs
          .append('path')
          .attr('fill', function(d, i) {
            return color[i] // 设定弧的颜色
          })
          .attr('d', function(d) {
            return arc(d) // 使用弧生成器
          })

        // 添加弧内的文字元素
        arcs
          .append('text')
          .attr('transform', function(d) {
            // const x =
            //   arc.centroid(d)[0] < 0
            //     ? arc.centroid(d)[0] * 3
            //     : arc.centroid(d)[0] * 3.2 // 文字的x坐标
            // const y =
            //   arc.centroid(d)[1] < 0
            //     ? arc.centroid(d)[1] * 2.5
            //     : arc.centroid(d)[1] * 4 // 文字的y坐标
            return 'translate(' + 90 + ',' + -70 + ')'
          })
          .attr('text-anchor', 'middle')
          .text(function(d) {
            if (d.data[0] !== 'other') {
              const percent =
                (Number(d.value) /
                  d3.sum(val, function(d) {
                    return d[1]
                  })) *
                100
              return percent.toFixed(1) + '%'
            }
          })

        // // 添加连接弧外的直线元素
        // arcs
        //   .append('line')
        //   .attr('stroke', 'black')
        //   .attr('x1', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[0] * 2 : null
        //   })
        //   .attr('y1', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[1] * 2 : null
        //   })
        //   .attr('x2', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[0] * 2.3 : null
        //   })
        //   .attr('y2', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[1] * 2.3 : null
        //   })

        // 添加弧外的文字元素
        arcs
          .append('text')
          .attr('transform', function(d) {
            return 'translate(' + 0 + ',' + width / 7 + ')'
          })
          .attr('text-anchor', 'middle')
          .text(function(d) {
            return d.data[0] !== 'other' ? d.data[0] : null
          })
      })
    },
    pieChart2() {
      const dataset = []
      this.freArr2.forEach(function(val, index) {
        dataset.push([
          [
            val.population,
            val.frequency === '.' ? 0 : (val.frequency * 100).toFixed(1)
          ],
          [
            'other',
            val.frequency === '.' ? 100 : 100 - (val.frequency * 100).toFixed(1)
          ]
        ])
      })
      const width = parseInt(d3.select('.pie-container2').style('width'))
      const height =
        ((document.body.clientWidth * 200) / 1920) *
        Math.ceil(dataset.length / 3)
      d3.select('.pie-container2')
        .selectAll('*')
        .remove()
      const svg = d3
        .select('.pie-container2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      // 确定初始数据

      dataset.forEach(function(val, index) {
        // 转换数据
        const pie = d3.pie().value(function(d) {
          return d[1]
        })
        const piedata = pie(val)

        // 外半径和内半径
        const outerRadius = width / 12.5
        const innerRadius = 0

        // 创建弧生成器
        const arc = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
        const color = ['#409EFF', '#E4E7ED']

        // 添加对应数目的弧组，即<g>元素
        const arcs = svg
          .selectAll("g[id^='code']")
          .data(piedata)
          .enter()
          .append('g')
          .attr(
            'transform',
            'translate(' +
              (width * ((index % 3) * 2 + 1)) / 6 +
              ',' +
              (height * (Math.floor(index / 3) * 2 + 1)) /
                (Math.ceil(dataset.length / 3) * 2) +
              ')'
          )
        // 添加弧的路径元素
        arcs
          .append('path')
          .attr('fill', function(d, i) {
            return color[i] // 设定弧的颜色
          })
          .attr('d', function(d) {
            return arc(d) // 使用弧生成器
          })

        // 添加弧内的文字元素
        arcs
          .append('text')
          .attr('transform', function(d) {
            // const x =
            //   arc.centroid(d)[0] < 0
            //     ? arc.centroid(d)[0] * 3
            //     : arc.centroid(d)[0] * 3.2 // 文字的x坐标
            // const y =
            //   arc.centroid(d)[1] < 0
            //     ? arc.centroid(d)[1] * 2.5
            //     : arc.centroid(d)[1] * 4 // 文字的y坐标
            return 'translate(' + 90 + ',' + -70 + ')'
          })
          .attr('text-anchor', 'middle')
          .text(function(d) {
            if (d.data[0] !== 'other') {
              const percent =
                (Number(d.value) /
                  d3.sum(val, function(d) {
                    return d[1]
                  })) *
                100
              return percent.toFixed(1) + '%'
            }
          })

        // // 添加连接弧外的直线元素
        // arcs
        //   .append('line')
        //   .attr('stroke', 'black')
        //   .attr('x1', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[0] * 2 : null
        //   })
        //   .attr('y1', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[1] * 2 : null
        //   })
        //   .attr('x2', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[0] * 2.3 : null
        //   })
        //   .attr('y2', function(d) {
        //     return d.data[0] !== 'other' ? arc.centroid(d)[1] * 2.3 : null
        //   })

        // 添加弧外的文字元素
        arcs
          .append('text')
          .attr('transform', function(d) {
            return 'translate(' + 0 + ',' + width / 7 + ')'
          })
          .attr('text-anchor', 'middle')
          .text(function(d) {
            return d.data[0] !== 'other' ? d.data[0] : null
          })
      })
    },
    schemeChart(datay) {
      var datax = ['H3K27me3', 'H3K9me3', 'H3K27Ac', 'H3K4Me1', 'H3K4Me3', '']
      var sp = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '']
      // var datay = [3.11, 3.31, 1.8, 0.39, 2.05];

      var width = parseInt(d3.select('.scheme-container1').style('width'))
      var height = 400
      var padding = {
        top: 10,
        right: 40,
        bottom: 40,
        left: 40
      }

      var svg = d3
        .select('.scheme-container1')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')

      // x轴
      var xScale = d3
        .scaleOrdinal()
        .domain(datax)
        .range([100, 200, 300, 400, 500, 600])
      var xAxis = d3.axisBottom().scale(xScale)
      svg
        .append('g')
        .call(xAxis)
        .attr('transform', 'translate(0,' + (height - padding.bottom) + ')')
        .selectAll('text')
        .attr('dx', '50px')
        .attr('font-size', '16px')

      // y轴
      var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(datay)])
        .range([height - padding.bottom, padding.top])
      var yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10)
      svg
        .append('g')
        .call(yAxis)
        .attr('font-size', '14px')
        .attr('transform', 'translate(' + 100 + ',0)')
      var bar = svg
        .selectAll('.bar')
        .data(datay)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', function(d, i) {
          return 'translate(' + xScale(i * 100) + ',' + yScale(d) + ')'
        })
      bar
        .append('rect')
        .attr('x', 1)
        .attr('width', 80)
        .attr('height', function(d) {
          return height - yScale(d) - padding.bottom
        })
        .attr('stroke', 'White')
        .attr('fill', function(d, i) {
          return sp[i] // 设定弧的颜色
        })
        .attr('transform', function(d, i) {
          return 'translate(10,0)'
        })

      // bar.append("text")
      //   .attr("dy", ".75em")
      //   .attr("y", 6)
      //   .attr("x", 50)
      //   .attr("text-anchor", "middle")
      //   .attr("font-size", "8px")
      //   .attr("fill", "White")
      //   .text(function(d) {
      //     return d;
      //   });
    },
    schemeChart2(datay) {
      var datax = ['DNase', 'PolⅡ', 'CTCF', '']
      var sp = ['#1f77b4', '#ff7f0e', '#2ca02c', '']
      // var datay = [2.21, 0, 0, ];

      var width = parseInt(d3.select('.scheme-container2').style('width'))
      var height = 400
      var padding = {
        top: 10,
        right: 40,
        bottom: 40,
        left: 40
      }

      var svg = d3
        .select('.scheme-container2')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')

      // x轴
      var xScale = d3
        .scaleOrdinal()
        .domain(datax)
        .range([100, 200, 300, 400])
      var xAxis = d3.axisBottom().scale(xScale)
      svg
        .append('g')
        .call(xAxis)
        .attr('transform', 'translate(100,' + (height - padding.bottom) + ')')
        .selectAll('text')
        .attr('dx', '50px')
        .attr('font-size', '16px')

      // y轴
      var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(datay)])
        .range([height - padding.bottom, padding.top])
      var yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10)
      svg
        .append('g')
        .call(yAxis)
        .attr('font-size', '14px')
        .attr('transform', 'translate(' + 200 + ',0)')
      var bar = svg
        .selectAll('.bar')
        .data(datay)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', function(d, i) {
          return 'translate(' + xScale(i * 100) + ',' + yScale(d) + ')'
        })
      bar
        .append('rect')
        .attr('x', 1)
        .attr('width', 80)
        .attr('height', function(d) {
          return height - yScale(d) - padding.bottom
        })
        .attr('stroke', 'White')
        .attr('fill', function(d, i) {
          return sp[i] // 设定弧的颜色
        })
        .attr('transform', function(d, i) {
          return 'translate(110,0)'
        })

      // bar.append("text")
      //   .attr("dy", ".75em")
      //   .attr("y", 6)
      //   .attr("x", 50)
      //   .attr("text-anchor", "middle")
      //   .attr("font-size", "8px")
      //   .attr("fill", "White")
      //   .text(function(d) {
      //     return d;
      //   });
    }
    // getQueryString(name) {
    //   const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    //   const l = decodeURI(window.location.search)
    //   const r = l.substr(1).match(reg)
    //   if (r != null) return unescape(r[2])
    //   return null
    // }
  }
}
</script>

<style scoped lang="scss">
.main-container {
  width: 80%;
  margin: 0 auto;
  .sub-content-1 {
    margin-bottom: 20px;
    .grid-title {
      background: rgb(160, 207, 255);
      padding: 15px;
      font-size: 20px;
      // margin: 0;
      border-radius: 5px 5px 0 0;
      text-align: left;
    }
  }
  .sub-content-2 {
    margin-bottom: 20px;
    .grid-title {
      background: rgb(160, 207, 255);
      padding: 15px;
      // margin: 0;
      border-radius: 5px 5px 0 0;
      text-align: left;
    }
    .el-row {
      .el-col {
        div {
          font-size: 18px;
          line-height: 26px;
          text-align: left;
        }
        .pie-container {
          font-size: 16px;
        }
        .grid-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
