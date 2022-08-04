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
            :cell-style="{
              textAlign: 'center',
              fontSize: '18px',
              width: '100%',
              border: '1px solid #EBEEF5',
            }"
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
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <div class="funcAnnotation-container" />
              <div class="signal-container">
                <div class="AAchange-one grid-content">{{ AAchangeOne }}</div>
                <div class="AAchange-line grid-content">
                  <div class="line"></div>
                  <div class="arrow"></div>
                </div>
                <div class="AAchange-two grid-content">{{ AAchangeTwo }}</div>
              </div>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-table
                :data="tableData2"
                stripe
                :show-header="false"
                :cell-style="{
                  textAlign: 'center',
                  fontSize: '18px',
                  width: '100%',
                  border: '1px solid #EBEEF5',
                }"
              >
                <el-table-column prop="name1"> </el-table-column>
                <el-table-column prop="value1"> </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
        <div class="sub-content-2">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>{{ $t('variat.AlleleFrequency') }}</div></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0"
              ><div class="pie-container" id="pie-container" />
            </el-col>
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
            :cell-style="{
              textAlign: 'center',
              fontSize: '18px',
              border: '1px solid #EBEEF5',
            }"
            :header-cell-style="{
              textAlign: 'center',
              fontSize: '18px',
              border: '1px solid #EBEEF5',
            }"
            style="width: 100%"
          >
            <el-table-column prop="name" label=" " width="180">
            </el-table-column>
            <el-table-column
              prop="Vertebrate"
              label="脊椎动物"
              :index="1"
              :render-header="renderHeader"
            >
            </el-table-column>
            <el-table-column
              prop="Mammals"
              label="哺乳类"
              :index="2"
              :render-header="renderHeader"
            >
            </el-table-column>
            <el-table-column
              prop="Primates"
              label="灵长目"
              :index="3"
              :render-header="renderHeader"
            >
            </el-table-column>
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
          <el-row class="grid-gc">
            <el-col :span="6"
              ><div class="grid-content">
                {{ this.$t('variat.GCContent') }}
              </div></el-col
            >
            <el-col :span="6"
              ><div id="GCContent-chart" class="grid-content"></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content">
                {{ this.$t('variat.CpGRatio') }}
              </div></el-col
            >
            <el-col :span="6"
              ><div id="CpGRatio-chart" class="grid-content"></div
            ></el-col>
          </el-row>
          <el-table
            :data="tableData4"
            stripe
            :show-header="false"
            :cell-style="{
              textAlign: 'center',
              fontSize: '18px',
              border: '1px solid #EBEEF5',
            }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"></el-table-column>
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
          <el-row class="grid-clinVar">
            <el-col :span="6"
              ><div class="grid-content">
                {{ this.$t('variat.ClinVarID') }}
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content">
                <el-link
                  :href="
                    this.ClinVarHref === '.'
                      ? 'javascript:void(0)'
                      : this.ClinVarHref
                  "
                  >{{ this.ClinVarID }}</el-link
                >
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content">
                {{ this.$t('variat.OMIMID') }}
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content">
                <el-link
                  :href="
                    this.OMIMHref === '.' ? 'javascript:void(0)' : this.OMIMHref
                  "
                  >{{ this.OMIMID }}</el-link
                >
              </div></el-col
            >
          </el-row>
          <el-table
            :data="tableData5"
            stripe
            :show-header="false"
            :cell-style="{
              textAlign: 'center',
              fontSize: '18px',
              border: '1px solid #EBEEF5',
            }"
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
                {{
                  $t(
                    'variat.InternationalPublicDatabasePopulationAlleleFrequency'
                  )
                }}
              </div></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0"
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
                <div id="pie-container2" class="pie-container2" />
              </div>
            </el-col>
          </el-row>
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
            :cell-style="{ textAlign: 'center', fontSize: '18px' }"
            style="width: 100%"
          >
            <el-table-column prop="name1"> </el-table-column>
            <el-table-column prop="value1"></el-table-column>
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
          <el-row :gutter="20" style="margin-top:10px">
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
import * as echarts from 'echarts'
import chinaJson from 'echarts/map/json/china.json'
import worldJson from 'echarts/map/json/world.json'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'Variation',
  components: {
    Nav,
  },
  data() {
    let name = window.location.href.split('?')[1].split('=')[1]
    return {
      geneDetailData: null,
      variantId: '',
      radio2: '1000G',
      loading: true,
      variantion: null,
      schemeData1: [0, 0, 0, 0, 0],
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
        vcf_REF: 'C',
      },
      tableData: [
        {
          name1: this.$t('variat.CHN100K'),
          value1: '.',
          name2: this.$t('variat.VariationPosition'),
          value2: '.',
        },
        {
          name1: this.$t('variat.dbSNPRsID'),
          value1: '.',
          name2: this.$t('variat.VariationType'),
          value2: '.',
        },
        {
          name1: this.$t('variat.HGVS'),
          value1: '.',
          name2: this.$t('variat.VariationDetails'),
          value2: '.',
        },
      ],
      tableData2: [
        {
          name1: this.$t('variat.PolyPhen'),
          value1: '.',
        },
        {
          name1: this.$t('variat.SIFT'),
          value1: '.',
        },
        {
          name1: this.$t('variat.CADD'),
          value1: '.',
        },
        {
          name1: this.$t('variat.GERP'),
          value1: '.',
        },
      ],
      tableData3: [
        {
          name: 'PhastCons',
          Vertebrate: '.',
          Mammals: '.',
          Primates: '.',
        },
        {
          name: 'PhyloP',
          Vertebrate: '.',
          Mammals: '.',
          Primates: '.',
        },
      ],
      tableData4: [
        {
          name1: this.$t('variat.RepeatMasker'),
          value1: '.',
          name2: this.$t('variat.TiTv'),
          value2: '.',
        },
      ],
      tableData5: [
        {
          name1: this.$t('variat.ClinVar'),
          value1: '.',
          name2: this.$t('variat.DiseaseName'),
          value2: '.',
        },
        {
          name1: this.$t('variat.GWASCatalog'),
          value1: '.',
          name2: this.$t('variat.GRASP2'),
          value2: '.',
        },
        {
          name1: this.$t('variat.COSMIC'),
          value1: '.',
        },
      ],
      tableData6: [
        {
          name1: this.$t('variat.TFBS'),
          value1: '.',
          name2: this.$t('variat.TargetScan'),
          value2: '.',
        },
        {
          name1: this.$t('variat.CAGEPromoters'),
          value1: '.',
          name2: this.$t('variat.CAGEEnhancers'),
          value2: '.',
        },
      ],
      AAchangeOne: '.',
      AAchangeTwo: '.',
      hunkDetail: [
        {
          name: window.vm.$t('variat.NorthChina'),
          coord: [116.24, 39.54],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.NorthEast'),
          coord: [126.32, 43.5],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.EastChina'),
          coord: [121.28, 31.13],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.CentralChina'),
          coord: [114.2, 30.32],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.SouthChina'),
          coord: [113.15, 23.08],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.SouthWest'),
          coord: [104.04, 30.39],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.NorthWest'),
          coord: [103.49, 36.03],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
      ],
      worldHunkDetail: [
        {
          name: window.vm.$t('variat.African'),
          coord: [17.873887, -11.202692],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.Amish'),
          coord: [-95.712891, 37.09024],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.European'),
          coord: [-3.435973, 55.378051],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.EastAsian'),
          coord: [104.195397, 35.86166],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
        {
          name: window.vm.$t('variat.SouthAsian'),
          coord: [78.96288, 20.593684],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              name: '等位基因频率',
              value: 0,
            },
            {
              name: '',
              value: 1,
            },
          ],
        },
      ],
      img: require('../assets/logo.png'),
      GCContent: [
        { value: 0, name: 'GC含量' },
        { value: 100, name: '其他' },
      ],
      CpGRatio: [
        { value: 0, name: 'CpG比例' },
        { value: 100, name: '其他' },
      ],
      ClinVarID: '.',
      OMIMID: '.',
      ClinVarHref: '.',
      OMIMHref: '.',
    }
  },
  watch: {
    variantion() {
      this.$nextTick(function () {
        this.funcAnnotationChart()
        this.initMap()
        this.initChinaChart(this.hunkDetail)
        this.initWorldChart(this.worldHunkDetail)
        this.schemeChart(this.schemeData1)
        this.schemeChart2(this.schemeData2)
        this.initGCContentChart(this.GCContent)
        this.initCpGRatioChart(this.CpGRatio)
      })
    },
  },
  created: function () {
    const _this = this
    _this.variantId = this.$route.query['id']
    _this.tableData[0]['value1'] = _this.variantId
    const data = {
      variantId: _this.variantId,
      chrom:
        this.$route.query['chrom'] === 'x' ? 23 : this.$route.query['chrom'],
    }
    variantDetail(data).then((response) => {
      this.geneDetailData = response
      if (response['listData'][0]) {
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
        var hgvsArr = response['listData'][0]['hgvs'].split(',')
        if(hgvsArr.length > 2){
          _this.tableData[2]['value1'] = hgvsArr[0] + ',' + hgvsArr[1] + ',' + hgvsArr[2]
        }else{
          _this.tableData[2]['value1'] = response['listData'][0]['hgvs']
        }
        _this.tableData[2]['value2'] =
          response['listData'][0]['variation_details']
        _this.tableData2[0]['value1'] = response['listData'][0]['polyPhen']
        _this.tableData2[1]['value1'] = response['listData'][0]['sift']
        _this.tableData2[2]['value1'] = response['listData'][0]['cadd']
        _this.tableData2[3]['value1'] = response['listData'][0]['gerp']
        _this.tableData3 = [
          {
            name: 'PhastCons',
            Vertebrate: response['listData'][0]['vertebratePhastCons'],
            Mammals: response['listData'][0]['mammalsPhastCons'],
            Primates: response['listData'][0]['primatesPhastCons'],
          },
          {
            name: 'PhyloP',
            Vertebrate: response['listData'][0]['vertebratePhyloP'],
            Mammals: response['listData'][0]['mammalsPhyloP'],
            Primates: response['listData'][0]['primatesPhyloP'],
          },
        ]
        _this.GCContent = [
          {
            value: response['listData'][0]['gccontent'] * 100,
            name: 'GC含量',
          },
          {
            value: 100 - response['listData'][0]['gccontent'] * 100,
            name: '其他',
          },
        ]
        _this.cpGRatio = [
          { value: response['listData'][0]['cpGRatio'] * 100, name: 'CpG比例' },
          {
            value: 100 - response['listData'][0]['cpGRatio'] * 100,
            name: '其他',
          },
        ]
        _this.tableData4[0]['value1'] = response['listData'][0]['repeatMasker']
        _this.tableData4[0]['value2'] = response['listData'][0]['ti_Tv']
        if (response['listData'][0]['clinVarID'] !== '.') {
          _this.ClinVarID = response['listData'][0]['clinVarID']
          _this.ClinVarHref =
            'https://www.ncbi.nlm.nih.gov/clinvar/?term=' +
            response['listData'][0]['clinVarID'] +
            '%5BAlleleID%5D'
        }
        if (response['listData'][0]['omimid'].indexOf('OMIM:') !== -1) {
          var OMid = response['listData'][0]['omimid']
            .split('OMIM:')[1]
            .slice(0, 6)
          _this.OMIMID = OMid
          _this.OMIMHref =
            'https://omim.org/entry/' +
            OMid +
            '?search=' +
            OMid +
            '&highlight=' +
            OMid
        }
        _this.tableData5[0]['value1'] = response['listData'][0]['clinVar']
        _this.tableData5[0]['value2'] = response['listData'][0]['diseaseName']
        _this.tableData5[1]['value1'] = response['listData'][0]['gwascatalog']
        _this.tableData5[1]['value2'] = response['listData'][0]['grasp2']
        _this.tableData5[2]['value1'] = response['listData'][0]['cosmic']
        _this.tableData6[0]['value1'] = response['listData'][0]['tfbs']
        _this.tableData6[0]['value2'] = response['listData'][0]['targetScan']
        _this.tableData6[1]['value1'] = response['listData'][0]['cagepromoters']
        _this.tableData6[1]['value2'] = response['listData'][0]['cageenhancers']
        _this.variantion = _this.pieData
        _this.schemeData1 = [
          parseFloat(response['listData'][0]['h3K27me3']),
          parseFloat(response['listData'][0]['h3K9me3']),
          parseFloat(response['listData'][0]['h3K27Ac']),
          parseFloat(response['listData'][0]['h3K4Me1']),
          parseFloat(response['listData'][0]['h3K4Me3']),
        ]
        _this.schemeData2 = [
          parseFloat(response['listData'][0]['dnase']),
          parseFloat(response['listData'][0]['polII']),
          parseFloat(response['listData'][0]['ctcf']),
        ]
        if (response['listData'][0]['hgvs'] !== '.') {
          if (response['listData'][0]['hgvs'].indexOf('ins') !== -1 || response['listData'][0]['hgvs'].indexOf('dup') !== -1 || response['listData'][0]['hgvs'].indexOf('del') !== -1) {
            this.AAchangeOne = response['listData'][0]['hgvs']
              .split(':p.')[1]
              .split(',')[0]
              .match(/(\w)\d+(\w+\*\d+)/)[1]
            this.AAchangeTwo = response['listData'][0]['hgvs']
              .split(':p.')[1]
              .split(',')[0]
              .match(/(\w)\d+(\w+\*\d+)/)[2]
          }else{
            this.AAchangeOne = response['listData'][0]['hgvs']
              .split(':p.')[1]
              .split('')[0]
            this.AAchangeTwo = response['listData'][0]['hgvs']
              .split(':p.')[1]
              .split(',')[0]
              .split('')
              .pop()
          }
        }
        this.hunkDetail = [
          {
            name: window.vm.$t('variat.NorthChina'),
            coord: [116.24, 39.54],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_N'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_N']).toFixed(6),
              },
              {
                name: '',
                value: 1 - parseFloat(_this.variantion['chn100k_N']).toFixed(6),
              },
            ],
          },
          {
            name: window.vm.$t('variat.NorthEast'),
            coord: [126.32, 43.5],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_NE'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_NE']).toFixed(6),
              },
              {
                name: '',
                value:
                  1 - parseFloat(_this.variantion['chn100k_NE']).toFixed(6),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EastChina'),
            coord: [121.28, 31.13],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_E'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_E']).toFixed(6),
              },
              {
                name: '',
                value: 1 - parseFloat(_this.variantion['chn100k_E']).toFixed(6),
              },
            ],
          },
          {
            name: window.vm.$t('variat.CentralChina'),
            coord: [114.2, 30.32],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_C'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_C']).toFixed(6),
              },
              {
                name: '',
                value: 1 - parseFloat(_this.variantion['chn100k_C']).toFixed(6),
              },
            ],
          },
          {
            name: window.vm.$t('variat.SouthChina'),
            coord: [113.15, 23.08],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_S'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_S']).toFixed(6),
              },
              {
                name: '',
                value: 1 - parseFloat(_this.variantion['chn100k_S']).toFixed(6),
              },
            ],
          },
          {
            name: window.vm.$t('variat.SouthWest'),
            coord: [104.04, 30.39],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_SW'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_SW']).toFixed(6),
              },
              {
                name: '',
                value:
                  1 - parseFloat(_this.variantion['chn100k_SW']).toFixed(6),
              },
            ],
          },
          {
            name: window.vm.$t('variat.NorthWest'),
            coord: [103.49, 36.03],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value:
                  _this.variantion['chn100k_NW'] === '0.0'
                    ? 0
                    : parseFloat(_this.variantion['chn100k_NW']).toFixed(6),
              },
              {
                name: '',
                value:
                  1 - parseFloat(_this.variantion['chn100k_NW']).toFixed(6),
              },
            ],
          },
        ]
        this.worldHunkDetail = [
          {
            name: window.vm.$t('variat.African'),
            coord: [17.873887, -11.202692],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_AFR'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_AFR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_AFR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_AFR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.Amish'),
            coord: [-95.712891, 37.09024],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_AMR'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_AMR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_AMR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_AMR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.European'),
            coord: [-3.435973, 55.378051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_EUR'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_EUR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_EUR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_EUR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EastAsian'),
            coord: [104.195397, 35.86166],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_EAS'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_EAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_EAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_EAS']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.SouthAsian'),
            coord: [78.96288, 20.593684],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_SAS'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_SAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_SAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_SAS']),
              },
            ],
          },
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
      this.worldHunkDetail = []
      const _this = this
      if (this.radio2 === 'gnomAD Exomes') {
        this.worldHunkDetail = [
          {
            name: window.vm.$t('variat.African'),
            coord: [17.873887, -11.202692],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_AFR'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_AFR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_AFR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_AFR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.Amish'),
            coord: [-95.712891, 37.09024],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_AMR'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_AMR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_AMR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_AMR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.AshkenaziJewish'),
            coord: [34.851612, 31.046051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_ASJ'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_ASJ']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_ASJ'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_ASJ']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EastAsian'),
            coord: [104.195397, 35.86166],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_EAS'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_EAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_EAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_EAS']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EuropeanFinnish'),
            coord: [25.748151, 61.92410999999999],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_FIN'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_FIN']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_FIN'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_FIN']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EuropeanNonFinnish'),
            coord: [-3.435973, 55.378051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_NFE'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_NFE']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_NFE'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_NFE']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.SouthAsian'),
            coord: [78.96288, 20.593684],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_exome_SAS'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_exome_SAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_exome_SAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_exome_SAS']),
              },
            ],
          },
        ]
      }
      if (this.radio2 === '1000G') {
        this.worldHunkDetail = [
          {
            name: window.vm.$t('variat.African'),
            coord: [17.873887, -11.202692],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_AFR'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_AFR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_AFR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_AFR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.Amish'),
            coord: [-95.712891, 37.09024],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_AMR'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_AMR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_AMR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_AMR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.European'),
            coord: [-3.435973, 55.378051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_EUR'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_EUR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_EUR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_EUR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EastAsian'),
            coord: [104.195397, 35.86166],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_EAS'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_EAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_EAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_EAS']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.SouthAsian'),
            coord: [78.96288, 20.593684],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['thousandG_SAS'])
                  ? 0
                  : parseFloat(_this.variantion['thousandG_SAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['thousandG_SAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['thousandG_SAS']),
              },
            ],
          },
        ]
      }
      if (this.radio2 === 'ExAC') {
        this.worldHunkDetail = [
          {
            name: window.vm.$t('variat.African'),
            coord: [17.873887, -11.202692],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['exAC_AFR'])
                  ? 0
                  : parseFloat(_this.variantion['exAC_AFR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['exAC_AFR'])
                  ? 1
                  : 1 - parseFloat(_this.variantion['exAC_AFR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.Amish'),
            coord: [-95.712891, 37.09024],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['exAC_AMR'])
                  ? 0
                  : parseFloat(_this.variantion['exAC_AMR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['exAC_AMR'])
                  ? 1
                  : 1 - parseFloat(_this.variantion['exAC_AMR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EastAsian'),
            coord: [104.195397, 35.86166],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['exAC_EAS'])
                  ? 0
                  : parseFloat(_this.variantion['exAC_EAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['exAC_EAS'])
                  ? 1
                  : 1 - parseFloat(_this.variantion['exAC_EAS']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EuropeanFinnish'),
            coord: [25.748151, 61.92410999999999],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['exAC_FIN'])
                  ? 0
                  : parseFloat(_this.variantion['exAC_FIN']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['exAC_FIN'])
                  ? 1
                  : 1 - parseFloat(_this.variantion['exAC_FIN']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EuropeanNonFinnish'),
            coord: [-3.435973, 55.378051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['exAC_NFE'])
                  ? 0
                  : parseFloat(_this.variantion['exAC_NFE']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['exAC_NFE'])
                  ? 1
                  : 1 - parseFloat(_this.variantion['exAC_NFE']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.SouthAsian'),
            coord: [78.96288, 20.593684],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['exAC_SAS'])
                  ? 0
                  : parseFloat(_this.variantion['exAC_SAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['exAC_SAS'])
                  ? 1
                  : 1 - parseFloat(_this.variantion['exAC_SAS']),
              },
            ],
          },
        ]
      }
      if (this.radio2 === 'gnomAD Genomes') {
        this.worldHunkDetail = [
          {
            name: window.vm.$t('variat.African'),
            coord: [17.873887, -11.202692],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_genome_AFR'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_genome_AFR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_genome_AFR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_genome_AFR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.Amish'),
            coord: [-95.712891, 37.09024],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_genome_AMR'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_genome_AMR']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_genome_AMR'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_genome_AMR']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.AshkenaziJewish'),
            coord: [34.851612, 31.046051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_genome_ASJ'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_genome_ASJ']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_genome_ASJ'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_genome_ASJ']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EastAsian'),
            coord: [104.195397, 35.86166],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_genome_EAS'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_genome_EAS']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_genome_EAS'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_genome_EAS']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EuropeanFinnish'),
            coord: [25.748151, 61.92410999999999],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_genome_FIN'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_genome_FIN']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_genome_FIN'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_genome_FIN']),
              },
            ],
          },
          {
            name: window.vm.$t('variat.EuropeanNonFinnish'),
            coord: [-3.435973, 55.378051],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: '等位基因频率',
                value: isNaN(_this.variantion['gnomAD_genome_NFE'])
                  ? 0
                  : parseFloat(_this.variantion['gnomAD_genome_NFE']),
              },
              {
                name: '',
                value: isNaN(_this.variantion['gnomAD_genome_NFE'])
                  ? 1
                  : 1 -
                    parseFloat(_this.variantion['gnomAD_genome_NFE']),
              },
            ],
          },
        ]
      }
      this.initWorldChart(this.worldHunkDetail)
    },
    funcAnnotationChart() {
      const _this = this
      const width = parseInt(
        d3.select('.funcAnnotation-container').style('width')
      )
      const height = 100
      const margin = (width / 20) * 1.5
      const axisWidth = width - margin * 2
      const variatPos =
        this.geneDetailData.listData[0].variation_position.split(':')[1]
      let positionStart = Infinity
      let positionEnd = 0
      d3.select('.funcAnnotation-container').selectAll('*').remove()
      const svg = d3
        .select('.funcAnnotation-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      this.geneDetailData.relateList.forEach(function (d, i) {
        if (d.start < positionStart) {
          positionStart = d.start - 200
        }
        if (d.end > positionEnd) {
          positionEnd = d.end + 200
        }
      })
      this.geneDetailData.listData.forEach(function (d, i) {
        if (variatPos < positionStart) {
          positionStart = variatPos - 200
        }
        if (variatPos > positionEnd) {
          positionEnd = variatPos + 200
        }
      })
      let position = [positionStart, positionEnd]
      let geneLength = positionEnd - positionStart
      // svg
      //   .attr('class', 'axis')
      //   .attr('width', width)
      //   .attr('height', height)
      // const scale = d3
      //   .scaleLinear()
      //   .domain([positionStart, positionEnd])
      //   .range([0, axisWidth])
      // const axis = d3
      //   .axisBottom()
      //   .scale(scale)
      //   .ticks(10)
      //   .tickPadding(10)
      // svg
      //   .append('text')
      //   .attr('x', 0)
      //   .attr('y', 50)
      //   .attr('fill', '#409EFF')
      //   .attr('font-size', 20)
      // svg.append('g').call(axis)
      svg
        .append('line')
        .attr('x1', 0)
        .attr('y1', 28)
        .attr('x2', axisWidth)
        .attr('y2', 28)
        .attr('stroke', '#69c0ff')
        .attr('stroke-width', 2)
        .attr('transform', 'translate(' + margin + ',0)')
      this.geneDetailData.relateList.forEach(function (d, i) {
        svg
          .append('rect')
          .attr('x', ((d['start'] - positionStart) / geneLength) * axisWidth)
          .attr('y', 20)
          .attr('width', ((d['end'] - d['start']) / geneLength) * axisWidth)
          .attr('height', 18)
          .attr('fill', '#1890ff')
          .attr('transform', 'translate(' + margin + ',0)')
        svg
          .append('text')
          .attr('x', ((d['start'] - positionStart) / geneLength) * axisWidth)
          .attr('y', 15)
          .attr('fill', '#409EFF')
          .attr('font-size', 12)
          .attr('gene', d['gene'])
          .text(function () {
            return d['gene']
          })
          .attr('transform', 'translate(' + margin + ',0)')
      })

      let trang =
        'M ' +
        parseInt(((variatPos - positionStart) / geneLength) * axisWidth - 10) +
        ' 60 L ' +
        parseInt(((variatPos - positionStart) / geneLength) * axisWidth + 10) +
        ' 60 L ' +
        parseInt(((variatPos - positionStart) / geneLength) * axisWidth) +
        ' 45 Z'
      svg
        .append('path')
        .attr('d', trang)
        .attr('stroke', '#ff7a45')
        .attr('fill', '#ff7a45')
        .attr('stroke-width', 2)
        .attr('transform', 'translate(' + margin + ',0)')
      svg
        .append('text')
        .attr('x', ((variatPos - positionStart) / geneLength) * axisWidth + 20)
        .attr('y', 60)
        .attr('fill', '#409EFF')
        .attr('font-size', 12)
        .attr('gene', this.geneDetailData.listData[0]['chn100K'])
        .text(function () {
          return _this.geneDetailData.listData[0]['chn100K']
        })
        .attr('transform', 'translate(' + margin + ',0)')
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
        left: 40,
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
      var yAxis = d3.axisLeft().scale(yScale).ticks(10)
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
        .attr('transform', function (d, i) {
          return (
            'translate(' +
            xScale(i * 100) +
            ',' +
            parseInt(isNaN(yScale(d)) ? 0 : yScale(d)) +
            ')'
          )
        })
      bar
        .append('rect')
        .attr('x', 1)
        .attr('width', 80)
        .attr('height', function (d) {
          return parseInt(
            height - (isNaN(yScale(d)) ? 0 : yScale(d)) - padding.bottom
          )
        })
        .attr('stroke', 'White')
        .attr('fill', function (d, i) {
          return sp[i] // 设定弧的颜色
        })
        .attr('transform', function (d, i) {
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
        left: 40,
      }

      var svg = d3
        .select('.scheme-container2')
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')

      // x轴
      var xScale = d3.scaleOrdinal().domain(datax).range([100, 200, 300, 400])
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
      var yAxis = d3.axisLeft().scale(yScale).ticks(10)
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
        .attr('transform', function (d, i) {
          return (
            'translate(' +
            xScale(i * 100) +
            ',' +
            parseInt(isNaN(yScale(d)) ? 0 : yScale(d)) +
            ')'
          )
        })
      bar
        .append('rect')
        .attr('x', 1)
        .attr('width', 80)
        .attr('height', function (d) {
          return parseInt(
            height - (isNaN(yScale(d)) ? 0 : yScale(d)) - padding.bottom
          )
        })
        .attr('stroke', 'White')
        .attr('fill', function (d, i) {
          return sp[i] // 设定弧的颜色
        })
        .attr('transform', function (d, i) {
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
    },
    mergeProvinces(chinaJson, names, properties) {
      //合并大区里省份的coordinates
      var features = chinaJson.features
      var polygons = []
      var polygons2 = []

      for (var i = 0; i < names.length; i++) {
        var polygonsCoordinates = []
        var polygonsEncodeOffsets = []
        for (var z = 0; z < names[i].length; z++) {
          for (var j = 0; j < features.length; j++) {
            if (features[j].properties.name == names[i][z]) {
              if (features[j].geometry.coordinates[0].constructor == String) {
                //合并coordinates
                for (
                  var l = 0;
                  l < features[j].geometry.coordinates.length;
                  l++
                ) {
                  polygonsCoordinates.push(features[j].geometry.coordinates[l])
                }
              } else if (
                features[j].geometry.coordinates[0].constructor == Array
              ) {
                for (
                  var k = 0;
                  k < features[j].geometry.coordinates.length;
                  k++
                ) {
                  for (
                    var d = 0;
                    d < features[j].geometry.coordinates[k].length;
                    d++
                  ) {
                    polygonsCoordinates.push(
                      features[j].geometry.coordinates[k][d]
                    )
                  }
                }
              }

              if (features[j].geometry.encodeOffsets[0].constructor == String) {
                //合并encodeOffsets
                polygonsEncodeOffsets.push(features[j].geometry.encodeOffsets)
              } else if (
                features[j].geometry.encodeOffsets[0].constructor == Array
              ) {
                for (
                  var k = 0;
                  k < features[j].geometry.encodeOffsets.length;
                  k++
                ) {
                  if (
                    features[j].geometry.encodeOffsets[k][0].constructor ==
                    Array
                  ) {
                    for (
                      var e = 0;
                      e < features[j].geometry.encodeOffsets[k].length;
                      e++
                    ) {
                      polygonsEncodeOffsets.push(
                        features[j].geometry.encodeOffsets[k][e]
                      )
                    }
                  } else {
                    polygonsEncodeOffsets.push(
                      features[j].geometry.encodeOffsets[k]
                    )
                  }
                }
              }

              break
            }
          }
        }
        polygons.push(polygonsCoordinates)
        polygons2.push(polygonsEncodeOffsets)
      }

      // 构建新的合并区域
      var features = []

      for (var a = 0; a < names.length; a++) {
        var feature = {
          id: features.length.toString(),
          type: 'FeatureCollection',
          geometry: {
            type: 'Polygon',
            coordinates: polygons[a],
            encodeOffsets: polygons2[a],
          },
          properties: {
            name: properties.name[a] || '',
            childNum: polygons[a].length,
          },
        }
        if (properties.cp[a]) {
          feature.properties.cp = properties.cp[a]
        }

        // 将新的合并区域添加到地图中
        features.push(feature)
      }
      chinaJson.features = features
    },
    initMap() {
      var params = {
        names: [
          //把各个大区的省份用二维数组分开
          ['北京', '天津', '河北', '山西', '内蒙古'],
          ['黑龙江', '吉林', '辽宁'],
          ['山东', '江苏', '安徽', '江西', '浙江', '福建', '上海', '台湾'],
          ['河南', '湖北', '湖南'],
          ['广东', '广西', '海南', '香港', '澳门'],
          ['重庆', '四川', '云南', '西藏', '贵州'],
          ['陕西', '甘肃', '青海', '宁夏', '新疆'],
        ],
        properties: {
          //自定义大区的名字，要和上面的大区省份一一对应
          name: ['华北', '东北', '华东', '华中', '华南', '西南', '西北'],
          cp: [
            //经纬度可以自己随意定义
            [116.24, 39.54],
            [126.32, 43.5],
            [121.28, 31.13],
            [114.2, 30.32],
            [113.15, 23.08],
            [104.04, 30.39],
            [103.49, 36.03],
          ],
        },
      }
      if (chinaJson.features && chinaJson.features.length > 8) {
        this.mergeProvinces(chinaJson, params.names, params.properties)
      }
      echarts.registerMap('china', chinaJson) // 注册中国地图
      echarts.registerMap('world', worldJson) // 注册世界地图
    },
    initChinaChart(hunkDetail) {
      var chartDom = document.getElementById('pie-container')
      var myChart = echarts.init(chartDom)
      function getDe() {
        var ser = []
        echarts.util.each(hunkDetail, function (dataItem, idx) {
          ser.push({
            name: hunkDetail[idx].name,
            color: ['#e1494a', '#2589cf', '#1890ff', '#fa8c16', '#13c2c2'],
            type: 'pie',
            radius: '8%',
            // minAngle: 10,
            center: myChart.convertToPixel('geo', hunkDetail[idx].coord),
            label: {
              position: 'inside',
              padding: [0,50,35,0],
              color: '#909399',
              fontWeight: 'bold',
              // fontSize: 13,
              formatter: function (e) {
                if (e.data.name !== '') {
                  return e.seriesName + ': ' + (e.data.value > 0 ? (e.data.value * 100).toFixed(2) : 0)  + '%'
                }
              },
            },
            labelLine: hunkDetail[idx].labelLine,
            data: hunkDetail[idx].data,
          })
        })
        return ser
      }
      var option = {
        // center: ['80%', '50%'],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name // 自行定义formatter格式
          },
        },
        geo: {
          map: 'china',
          roam: false, //不开启缩放和平移
          center: [105, 35],
          zoom: 1, //视角缩放比例
          silent: true,
          label: {
            normal: {
              show: true,
              fontSize: '12',
              color: 'rgba(0,0,0,0.7)',
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              areaColor: '#F3B329', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        series: [
          {
            name: '变异数量',
            type: 'map',
            geoIndex: 0,
            // data: dataList,
          },
        ],
      }
      myChart.setOption(option)
      var option2 = {
        series: getDe(),
      }
      myChart.setOption(option2)
      this.$nextTick(() => {
        myChart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
      })
    },
    initWorldChart(worldHunkDetail) {
      var chartDom = document.getElementById('pie-container2')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      function getDe() {
        var ser = []
        echarts.util.each(worldHunkDetail, function (dataItem, idx) {
          ser.push({
            name: worldHunkDetail[idx].name,
            color: ['#e1494a', '#2589cf', '#1890ff', '#fa8c16', '#13c2c2'],
            type: 'pie',
            radius: '8%',
            // minAngle: 10,
            center: myChart.convertToPixel('geo', worldHunkDetail[idx].coord),
            label: {
              position: 'inside',
              padding: [0,50,35,0],
              color: '#909399',
              fontWeight: 'bold',
              formatter: function (e) {
                if (e.data.name !== '') {
                  return e.seriesName + ': ' + (e.data.value > 0 ? (e.data.value * 100).toFixed(2) : 0)  + '%'
                }
              },
            },
            labelLine: worldHunkDetail[idx].labelLine,
            data: worldHunkDetail[idx].data,
          })
        })
        return ser
      }
      var option = {
        // center: ['80%', '50%'],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name // 自行定义formatter格式
          },
        },
        geo: {
          map: 'world',
          mapType: 'world',
          roam: false, //不开启缩放和平移
          center: ['50%', '50%'],
          zoom: 1, //视角缩放比例
          silent: true,
          label: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              areaColor: '#F3B329', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        series: [
          {
            name: '变异数量',
            type: 'map',
            geoIndex: 0,
            // data: dataList,
          },
        ],
      }
      myChart.setOption(option)
      var option2 = {
        series: getDe(),
      }
      myChart.setOption(option2)
      this.$nextTick(() => {
        myChart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
      })
    },
    renderHeader(h, { column }) {
      return h('div', [
        h('img', {
          style: {
            width: '60px',
            marginRight: '5px',
            verticalAlign: 'middle',
          },
          attrs: {
            src: require('../assets/PhastCons-' + column.index + '.png'),
          },
        }),
        h('span', column.label),
      ])
    },
    initGCContentChart(GCContent) {
      var chartDom = document.getElementById('GCContent-chart')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :{d}%',
        },
        series: [
          {
            name: 'GC含量',
            type: 'pie',
            radius: '60%',
            color: ['#e1494a', '#2589cf'],
            center: ['50%', '50%'],
            label:{
              show: false,
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: GCContent,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      myChart.setOption(option)
      this.$nextTick(() => {
        myChart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
      })
    },
    initCpGRatioChart(CpGRatio) {
      var chartDom = document.getElementById('CpGRatio-chart')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :{d}%',
        },
        series: [
          {
            name: 'CpG比例',
            type: 'pie',
            radius: '60%',
            color: ['#e1494a', '#2589cf', '#1890ff', '#fa8c16', '#13c2c2'],
            center: ['50%', '50%'],
            label:{
              show: false,
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: CpGRatio,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      myChart.setOption(option)
      this.$nextTick(() => {
        myChart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
      })
    },
  },
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
      font-size: 22px;
      // margin: 0;
      border-radius: 5px 5px 0 0;
      text-align: left;
    }
    .grid-gc {
      font-size: 18px;
      text-align: center;
      .grid-content {
        padding: 15px;
        border: 1px solid #ebeef5;
        color: #606266;
        height: 100px;
        line-height: 100px;
      }
    }
    .grid-clinVar {
      font-size: 18px;
      text-align: center;
      .grid-content {
        padding: 15px;
        color: #606266;
        border: 1px solid #ebeef5;
        a {
          color: #409eff;
        }
      }
    }
  }
  .sub-content-2 {
    margin-bottom: 20px;
    .grid-title {
      background: rgb(160, 207, 255);
      font-size: 22px;
      padding: 15px;
      // margin: 0;
      border-radius: 5px 5px 0 0;
      text-align: left;
    }
    .el-row {
      .el-col {
        div {
          font-size: 22px;
          line-height: 26px;
          text-align: left;
        }
        .pie-container {
          height: 550px;
          font-size: 16px;
        }
        .pie-container2 {
          height: 650px;
          font-size: 16px;
        }
        .grid-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }
  }
  .signal-container {
    display: flex;
    justify-content: center;
    height: 30px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    .AAchange-one {
      padding: 5px;
      border: 1px solid #1890ff;
    }
    .AAchange-line {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      .line {
        height: 2px;
        width: 20px;
        margin-left: 5px;
        background: #1890ff;
      }
      .arrow {
        width: 10px;
        height: 10px;
        border: 10px solid #ffffff;
        border-left-color: #1890ff;
      }
    }
    .AAchange-two {
      padding: 5px;
      border: 1px solid #1890ff;
    }
  }
}
</style>
