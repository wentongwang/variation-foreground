<template>
  <div>
    <Nav />
    <el-main>
      <div class="main-container">
        <el-image style="margin-top: 40px; width: 380px" :src="img" />
        <p class="word">{{ $t('home.name') }}</p>
        <el-select
          v-model="value"
          class="search"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('home.search')"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="handleClick($event)"
          @keyup.enter.native="selectBlur"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
            {{ item.label }}
          </el-option>
        </el-select>
        <div class="chart-container clearfix">
          <el-row
            type="flex"
            class="chart-content"
            justify="space-around"
            style="margin: 20px 0"
          >
            <el-col :span="7"
              ><div id="echart1" class="mychart"></div>
              <p class="name">各染色体变异数量统计</p></el-col
            >
            <el-col :span="7"
              ><div id="echart2" class="mychart"></div>
              <p class="name">各AF区间变异数量统计</p></el-col
            >
            <el-col :span="7">
              <div id="echart3" class="mychart"></div>
              <p class="name">各地域人群样本数统计</p>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="chart-content"
            justify="space-around"
            style="margin: 20px 0"
          >
            <el-col :span="7">
              <div id="echart4" class="mychart"></div>
              <p class="name">各功能类型变异数量统计</p>
            </el-col>
            <el-col :span="7">
              <div id="echart5" class="mychart"></div>
              <p class="name">SNV/Indel/SV数量统计</p>
            </el-col>
            <el-col :span="7" style="position: relative">
              <div id="line6" class="mychart">
                <span class="triangle"></span>
              </div>
              <div id="echart6" class="mychart"></div>

              <p class="name">临床特征相关变异数量统计</p>
            </el-col>
          </el-row>
        </div>
        <div class="tips">
          <div class="tip">
            {{ $t('home.content.con1') }}
          </div>
          <div class="reference">
            <el-divider content-position="left">参考文献</el-divider>
            <p>
              1.Howe K L, Achuthan P, Allen J, et al. Ensembl 2021[J]. Nucleic
              acids research, 2021, 49(D1): D884-D891.
            </p>
            <p>
              2.Karolchik D, Baertsch R, Diekhans M, et al. The UCSC genome
              browser database[J]. Nucleic acids research, 2003, 31(1): 51-54.
            </p>
            <p>
              3.Tate J G, Bamford S, Jubb H C, et al. COSMIC: the catalogue of
              somatic mutations in cancer[J]. Nucleic acids research, 2019,
              47(D1): D941-D947.
            </p>
            <p>
              4.Hamosh A, Scott A F, Amberger J S, et al. Online Mendelian
              Inheritance in Man (OMIM), a knowledgebase of human genes and
              genetic disorders[J]. Nucleic acids research, 2005, 33(suppl_1):
              D514-D517.
            </p>
            <p>
              5.Landrum M J, Lee J M, Benson M, et al. ClinVar: public archive
              of interpretations of clinically relevant variants[J]. Nucleic
              acids research, 2016, 44(D1): D862-D868.
            </p>
            <p>
              6.Ng P C, Henikoff S. SIFT: Predicting amino acid changes that
              affect protein function[J]. Nucleic acids research, 2003, 31(13):
              3812-3814.
            </p>
            <p>
              7.Adzhubei I A, Schmidt S, Peshkin L, et al. A method and server
              for predicting damaging missense mutations[J]. Nature methods,
              2010, 7(4): 248-249.
            </p>
            <p>
              8.Fairley S, Lowy-Gallego E, Perry E, et al. The International
              Genome Sample Resource (IGSR) collection of open human genomic
              variation resources[J]. Nucleic Acids Research, 2020, 48(D1):
              D941-D947.
            </p>
            <p>
              9.Rentzsch P, Schubach M, Shendure J, et al. CADD-Splice—improving
              genome-wide variant effect prediction using deep learning-derived
              splice scores[J]. Genome medicine, 2021, 13(1): 1-12.
            </p>
            <p>
              10.Wang K, Li M, Hakonarson H. ANNOVAR: functional annotation of
              genetic variants from high-throughput sequencing data[J]. Nucleic
              acids research, 2010, 38(16): e164-e164.
            </p>

            <p>
              11.Buniello A, MacArthur J A L, Cerezo M, et al. The NHGRI-EBI
              GWAS Catalog of published genome-wide association studies,
              targeted arrays and summary statistics 2019[J]. Nucleic acids
              research, 2019, 47(D1): D1005-D1012.
            </p>
          </div>
        </div>
      </div>
    </el-main>
    <div class="co">
      Copyright © 2021 哈尔滨工业大学生物信息技术研究院. All right reserved.
    </div>
  </div>
</template>

<script>
import Circos from 'circos'
import * as d3 from 'd3'
import { search, variant, svVariant } from '@/api/variation'
import echarts from 'echarts'
import Nav from '@/components/Nav'

export default {
  name: 'Home',
  components: {
    Nav,
  },
  data() {
    return {
      img: require('../assets/logo.png'),
      value: [],
      loading: false,
      options: [],
    }
  },
  mounted() {
    this.getEchartData1()
    this.getEchartData2()
    this.getEchartData3()
    this.getEchartData4()
    this.getEchartData5()
    this.getEchartData6()
  },
  methods: {
    getEchartData1() {
      this.dataListAll = [
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '11',
          Pos2: '77532155',
          Gene2: 'AAMDC',
          FG_Name: 'AAMDC-TP53',
          Samples: 'SRR1164881',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '13',
          Pos2: '111530887',
          Gene2: 'ANKRD10',
          FG_Name: 'ANKRD10-TP53',
          Samples: 'SRR1164883',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '2',
          Pos2: '132905164',
          Gene2: 'ANKRD30BL',
          FG_Name: 'ANKRD30BL-TP53',
          Samples:
            'SRR1164787、SRR1164794、SRR1164802、SRR1164805、SRR1164821、SRR1164826、SRR1164834、SRR1164835、SRR1164847、SRR1164848、SRR1164853、SRR1164854、SRR1164871、SRR1164872、SRR1164877、SRR1164880、SRR1164888、SRR1164891、SRR1164892',
          Num_Samples: '19',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '13',
          Pos2: '25946209',
          Gene2: 'ATP8A2',
          FG_Name: 'ATP8A2-TP53',
          Samples: 'SRR1164831',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '11',
          Pos2: '83166055',
          Gene2: 'DLG2',
          FG_Name: 'DLG2-TP53',
          Samples: 'SRR1164861',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '14',
          Pos2: '90261013',
          Gene2: 'EFCAB11',
          FG_Name: 'EFCAB11-TP53',
          Samples: 'SRR1164808',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '2',
          Pos2: '62900986',
          Gene2: 'EHBP1',
          FG_Name: 'EHBP1-TP53',
          Samples: 'SRR1164809',
          Num_Samples: '10',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '16',
          Pos2: '14014014',
          Gene2: 'ERCC4',
          FG_Name: 'ERCC4-TP53',
          Samples: 'SRR1164869',
          Num_Samples: '5',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '3',
          Pos2: '99548985',
          Gene2: 'FILIP1L',
          FG_Name: 'FILIP1L-TP53',
          Samples: 'SRR1164824',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '1',
          Pos2: '91726323',
          Gene2: 'HFM1',
          FG_Name: 'HFM1-TP53',
          Samples: 'SRR1164829',
          Num_Samples: '7',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '16',
          Pos2: '903634',
          Gene2: 'LMF1',
          FG_Name: 'LMF1-TP53',
          Samples: 'SRR1164865',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '15',
          Pos2: '52244303',
          Gene2: 'MAPK6',
          FG_Name: 'MAPK6-TP53',
          Samples: 'SRR1164886',
          Num_Samples: '8',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '1',
          Pos2: '61330931',
          Gene2: 'NFIA',
          FG_Name: 'NFIA-TP53',
          Samples: 'SRR1164839',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '14',
          Pos2: '90742580',
          Gene2: 'NRDE2',
          FG_Name: 'NRDE2-TP53',
          Samples: 'SRR1164884',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '13',
          Pos2: '33160564',
          Gene2: 'PDS5B',
          FG_Name: 'PDS5B-TP53',
          Samples: 'SRR1164813',
          Num_Samples: '3',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '10',
          Pos2: '6186881',
          Gene2: 'PFKFB3',
          FG_Name: 'PFKFB3-TP53',
          Samples: 'SRR1164840',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '2',
          Pos2: '44395108',
          Gene2: 'PPM1B',
          FG_Name: 'PPM1B-TP53',
          Samples: 'SRR1164816',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '15',
          Pos2: '91509270',
          Gene2: 'PRC1',
          FG_Name: 'PRC1-TP53',
          Samples: 'SRR1164870',
          Num_Samples: '2',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '12',
          Pos2: '24366190',
          Gene2: 'RP11-444D3.1',
          FG_Name: 'RP11-444D3.1-TP53',
          Samples: 'SRR1164795',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '1',
          Pos2: '235530675',
          Gene2: 'TBCE',
          FG_Name: 'TBCE-TP53',
          Samples: 'SRR1164820',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '17',
          Pos2: '19342456',
          Gene2: 'AC004448.5',
          FG_Name: 'TP53-AC004448.5',
          Samples: 'SRR1164800、SRR1164815',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: 'MT',
          Pos2: '1671',
          Gene2: 'MT-RNR2',
          FG_Name: 'TP53-MT-RNR2',
          Samples: 'SRR1164832',
          Num_Samples: '1',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '20',
          Pos2: '44563267',
          Gene2: 'PCIF1',
          FG_Name: 'TP53-PCIF1',
          Samples: 'SRR1164863',
          Num_Samples: '6',
        },
        {
          Chr1: '17',
          Pos1: '7565097',
          Gene1: 'TP53',
          Chr2: '19',
          Pos2: '11546109',
          Gene2: 'PRKCSH',
          FG_Name: 'TP53-PRKCSH',
          Samples:
            'SRR1164796、SRR1164789、SRR1164798、SRR1164803、SRR1164810、SRR1164817、SRR1164819、SRR1164822、SRR1164825、SRR1164827、SRR1164828、SRR1164836、SRR1164838、SRR1164841、SRR1164844、SRR1164846、SRR1164849、SRR1164855、SRR1164858、SRR1164859、SRR1164866、SRR1164867、SRR1164873、SRR1164874、SRR1164875、SRR1164878、SRR1164882、SRR1164885、SRR1164887、SRR1164889、SRR1164890',
          Num_Samples: '31',
        },
      ]
      //圆环颜色
      var gieStainColor = {
        gpos100: 'rgb(0,0,0)',
        gpos: 'rgb(0,0,0)',
        gpos75: 'rgb(130,130,130)',
        gpos66: 'rgb(160,160,160)',
        gpos50: 'rgb(200,200,200)',
        gpos33: 'rgb(210,210,210)',
        gpos25: 'rgb(200,200,200)',
        gvar: 'rgb(220,220,220)',
        gneg: 'rgb(255,255,255)',
        acen: 'rgb(217,47,39)',
        stalk: 'rgb(100,127,164)',
        select: 'rgb(135,177,255)',
      }
      //线条颜色
      var dataColor = {
        chr1: '#b7944c',
        chr2: '#92924a',
        chr3: '#a7a751',
        chr4: '#cb3c3c',
        chr5: '#ff4c4c',
        chr6: '#f940d4',
        chr7: '#ffdbdb',
        chr8: '#f8ae3f',
        chr9: '#efcb3c',
        chr10: '#f4f43b',
        chr11: '#ccf03b',
        chr12: '#46fd46',
        chr13: '#61963c',
        chr14: '#4040d3',
        chr15: '#91b5fd',
        chr16: '#afd4f8',
        chr17: '#3cefef',
        chr18: '#d4f8f8',
        chr19: '#ac3dd2',
        chr20: '#cb60ef',
        chr21: '#ceaaf2',
        chr22: '#848484',
        chrX: '#ababab',
        chrY: '#d1d1d1',
      }
      var buildData = function (rawData1, rawData2, karyotype) {
        var binLength = 10000000
        var data = []
        var rawDataByChr1 = d3
          .nest()
          .key(function (d) {
            return d.chr
          })
          .entries(rawData1)
        var rawDataByChr2 = d3
          .nest()
          .key(function (d) {
            return d.chr
          })
          .entries(rawData2)
        karyotype.forEach(function (chr) {
          var raw1 = rawDataByChr1.filter(function (d) {
            return d.key === chr.id
          })[0].values
          var raw2 = rawDataByChr2.filter(function (d) {
            return d.key === chr.id
          })[0].values
          d3.range(0, chr.len, binLength).forEach(function (position) {
            var counter = 0
            raw1.forEach(function (datum) {
              var start = parseInt(datum.start)
              var end = parseInt(datum.end)
              if (
                (start < position && end > position) ||
                (start > position && start < position + binLength)
              ) {
                counter++
              }
            })
            raw2.forEach(function (datum) {
              var start = parseInt(datum.start)
              var end = parseInt(datum.end)
              if (
                (start < position && end > position) ||
                (start > position && start < position + binLength)
              ) {
                counter++
              }
            })
            data.push({
              block_id: chr.id,
              start: position,
              end: Math.min(position + binLength - 1, chr.len),
              value: counter,
            })
          })
        })
        return data
      }
      var drawCircos = (error, GRCh38, cytobands, es, ips) => {
        var width = parseInt(document.getElementById('echart1').offsetWidth)
        document.getElementById('echart1').style.height = width + 'px'
        var circos = new Circos({
          container: '#echart1',
          width: width,
          height: width,
        })
        cytobands = cytobands.map(function (d) {
          return {
            block_id: d.chrom,
            start: parseInt(d.chromStart),
            end: parseInt(d.chromEnd),
            gieStain: d.gieStain,
            name: d.name,
          }
        })
        var data = this.dataListAll.map((d) => {
          return {
            source: {
              id: 'chr' + d.Chr1,
              start: parseInt(d.Pos1) - 2000000,
              end: parseInt(d.Pos1) + 2000000,
            },
            target: {
              id: 'chr' + d.Chr2,
              start: parseInt(d.Pos2) - 2000000,
              end: parseInt(d.Pos2) + 2000000,
            },
            name: d.FG_Name,
            number: d.Num_Samples,
            sample: d.Samples,
          }
        })

        circos
          .layout(GRCh38, {
            innerRadius: width / 2 - 108,
            outerRadius: width / 2 - 75,
            labels: {
              position: 'center',
              display: true,
              size: 12,
              color: '#000',
              radialOffset: 70,
            },
            ticks: {
              display: true,
              labelDenominator: 1000000,
            },
            events: {
              'click.demo': function (d, i, nodes, event) {
                // console.log('clicked on layout block', d, event)
              },
            },
          })
          .highlight('cytobands', cytobands, {
            innerRadius: width / 2 - 108,
            outerRadius: width / 2 - 75,
            opacity: 0.3,
            color: function (d) {
              return gieStainColor[d.gieStain]
            },
            tooltipContent: function (d) {
              return d.name
            },
          })
          .histogram('es', buildData(es, ips, GRCh38), {
            innerRadius: width / 2 - 140,
            outerRadius: width / 2 - 110,
            color: 'OrRd',
          })
          // .chords('l1', data, {
          //   radius: function (d) {
          //     return null
          //     // if (d.source.id === 'chr1') {
          //     //   return 0.5
          //     // } else {
          //     //   return null
          //     // }
          //   },
          //   logScale: false,
          //   opacity: (d) => {
          //     return d.number
          //   },
          //   color: (d) => {
          //     return dataColor[d.source.id]
          //   },
          //   //strokeWidth :15,
          //   tooltipContent: function (d) {
          //     // return '<h3>' + d.source.id + ' ➤ ' + d.target.id + ': ' + d.value + '</h3><i>(CTRL+C to copy to clipboard)</i>'
          //     return (
          //       '<p><i>FG_Name : ' +
          //       d.name +
          //       '</i></p><i> Num_Samples : ' +
          //       d.number +
          //       '</i>'
          //     )
          //   },
          //   events: {
          //     'mouseover.demo': function (d, i, nodes, event) {
          //       // console.log(d, i, nodes, event.pageX)
          //     },
          //   },
          // })
          .render()
      }
      d3.queue()
        .defer(d3.json, './GRCh38.json')
        .defer(d3.csv, './cytobands.csv')
        .defer(d3.csv, './es.csv')
        .defer(d3.csv, './ips.csv')
        .await(drawCircos)
    },
    getEchartData2() {
      var width = document.getElementById('echart2').offsetWidth
      var chartDom = document.getElementById('echart2')
      var myChart = echarts.init(chartDom)
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: '各AF区间变异数量',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            label: {
              fontSize: 14,
            },
            color: [
              '#eb2f96',
              '#722ed1',
              '#2f54eb',
              '#52c41a',
              '#ffc069',
              '#faad14',
              '#1890ff',
              '#fa8c16',
              '#13c2c2',
            ],
            data: [
              { value: 132783003, name: 'AC=1' },
              { value: 75470019, name: 'AF<0.01%' },
              { value: 33441788, name: 'AF<0.1%' },
              { value: 7069182, name: 'AF<1' },
              { value: 2686164, name: 'AF<5%' },
              { value: 6814282, name: 'AF>5%' },
            ],
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
      option && myChart.setOption(option)
      myChart.resize({ width: width, height: width })
    },
    getEchartData3() {
      var width = document.getElementById('echart3').offsetWidth
      var chartDom = document.getElementById('echart3')
      var myChart = echarts.init(chartDom)
      var option = {
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: '60%',
            radius: [20, 160],
            center: ['50%', '50%'],
            label: {
              fontSize: 14,
            },
            // color: [
            //   '#b7944c',
            //   '#92924a',
            //   '#cb3c3c',
            //   '#f940d4',
            //   '#f8ae3f',
            //   '#f4f43b',
            //   '#46fd46',
            //   '#4040d3',
            //   '#3cefef',
            //   '#d4f8f8',
            //   '#ac3dd2',
            //   '#848484'
            // ],
            color: [
              '#eb2f96',
              '#722ed1',
              '#2f54eb',
              '#52c41a',
              '#ffc069',
              '#faad14',
              '#1890ff',
              '#fa8c16',
              '#13c2c2',
            ],
            roseType: 'area',
            data: [
              { value: 2000, name: '华北' },
              { value: 16000, name: '华东' },
              { value: 500, name: '西北' },
              { value: 1000, name: '华南' },
              { value: 5500, name: '东北' },
              { value: 3000, name: '西南' },
              { value: 5400, name: '华中' },
            ],
          },
        ],
      }
      option && myChart.setOption(option)
      myChart.resize({ width: width, height: width })
    },
    getEchartData4() {
      var width = document.getElementById('echart4').offsetWidth
      var chartDom = document.getElementById('echart4')
      var myChart = echarts.init(chartDom)
      var option = {
        color: ['#188df0'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: 14,
              },
            },
            data: ['Synonymous', 'PloF', 'Missense'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            textStyle: {
              fontSize: 14,
            },
          },
        ],
        series: [
          {
            name: '变异数量',
            type: 'bar',
            barWidth: '60%',
            data: [1110270, 179317, 2183046],
          },
        ],
      }
      option && myChart.setOption(option)
      myChart.resize({ width: width, height: width })
    },
    getEchartData5() {
      var width = document.getElementById('echart5').offsetWidth
      var chartDom = document.getElementById('echart5')
      var myChart = echarts.init(chartDom)
      var option = {
        color: ['#2f54eb', '#52c41a', '#ffc069'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['SNP', 'Indel', 'SV'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['AC=1', 'AF<0.01%', 'AF<0.1%', 'AF<1%', 'AF<5%', 'AF>5%'],
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            textStyle: {
              fontSize: 14,
            },
          },
        ],
        series: [
          {
            name: 'SNP x1M',
            type: 'bar',
            stack: 'SNP',
            data: [
              121.31254, 68.965787, 29.880671, 5.744029, 2.00137, 5.545652,
            ],
          },
          {
            name: 'Indel x100K',
            type: 'bar',
            stack: 'Indel',
            data: [111.43149, 63.62683, 34.70793, 12.96697, 6.72408, 12.50544],
          },
          {
            name: 'SV x10K',
            type: 'bar',
            stack: 'SV',
            data: [32.7314, 14.1549, 9.0324, 2.8456, 1.2386, 1.8086],
          },
        ],
      }
      option && myChart.setOption(option)
      myChart.resize({ width: width, height: width })
    },
    getEchartData6() {
      var width = document.getElementById('echart6').offsetWidth
      var chartDom = document.getElementById('echart6')
      var myChart = echarts.init(chartDom)
      var total = 1207 + 1206 + 192 + 62 + 100 + 921
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          confine: true,
        },
        series: [
          {
            name: '临床特征相关变异数量分图',
            type: 'pie',
            radius: '40%',
            center: ['60%', '40%'],
            label: {
              fontSize: 16,
            },
            color: [
              '#eb2f96',
              '#722ed1',
              '#2f54eb',
              '#52c41a',
              '#ffc069',
              '#faad14',
              '#1890ff',
              '#fa8c16',
              '#13c2c2',
            ],
            label: {
              formatter: '{b}：{c}',
              fontSize: 14,
              lineHeight: 20,
            },
            data: [
              { value: 1207, name: 'Benign' },
              { value: 1206, name: 'Likely_benign' },
              {
                value: 192,
                name: 'Conflicting_interpretations_of\n_pathogenicity',
              },
              { value: 62, name: 'Likely_pathogenic' },
              { value: 100, name: 'Pathogenic' },
              { value: 921, name: 'Uncertain_significance' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
          {
            name: '临床特征相关变异数量总图',
            type: 'pie',
            radius: '15%',
            minAngle: 10,
            center: ['28%', '90%'],
            color: [
              '#eb2f96',
              '#722ed1',
              '#2f54eb',
              '#52c41a',
              '#ffc069',
              '#faad14',
              '#1890ff',
              '#fa8c16',
              '#13c2c2',
            ],
            label: {
              formatter: '{b}：{c}',
              position: 'outer',
              fontSize: 14,
              // alignTo: 'edge',
              margin: 20,
            },
            data: [
              {
                value: total,
                name: '',
                label: { show: false },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
              },
              { value: 4746545, name: 'ALL' },
            ],
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

      option && myChart.setOption(option)
      myChart.resize({ width: width, height: width })
    },
    remoteMethod(query) {
      if (query !== '') {
        const queryArr = query.split('-')
        this.options = []
        const _this = this
        if (
          (queryArr.length < 5 && queryArr.length > 0 && queryArr[0] < 23) ||
          (queryArr.length < 5 && queryArr.length > 0 && queryArr[0] === 'x') ||
          (queryArr.length < 5 && queryArr.length > 0 && queryArr[0] === 'X') ||
          (queryArr.length < 5 &&
            queryArr.length > 0 &&
            queryArr[0].indexOf('chr') !== -1)
        ) {
          if (queryArr.length === 2) {
            if (parseInt(queryArr[1]) > 10) {
              _this.options.push({
                value: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[1],
                label: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[1],
                chrom:
                  queryArr[0] === 'x' ||
                  queryArr[0] === 'X' ||
                  queryArr[0] === 'chrx' ||
                  queryArr[0] === 'chrX'
                    ? 23
                    : parseInt(queryArr[0].replace(/[^\d]/g, ' ')),
                start: parseInt(queryArr[1]) - 1,
                end: parseInt(queryArr[1]) + 1,
                type: 'position',
              })
            }
          }
          if (queryArr.length === 3) {
            if (
              parseInt(queryArr[2]) > parseInt(queryArr[1]) &&
              parseInt(queryArr[1]) > 10
            ) {
              _this.options.push({
                value: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[2],
                label: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[2],
                chrom:
                  queryArr[0] === 'x' ||
                  queryArr[0] === 'X' ||
                  queryArr[0] === 'chrx' ||
                  queryArr[0] === 'chrX'
                    ? 23
                    : parseInt(queryArr[0].replace(/[^\d]/g, ' ')),
                start: parseInt(queryArr[1]) - 1,
                end: parseInt(queryArr[2]) + 1,
                type: 'position',
              })
            }
          }
          if (
            queryArr.length >= 4 &&
            (queryArr[3] === 'DEL' ||
              queryArr[3] === 'INS' ||
              queryArr[3] === 'BND' ||
              queryArr[3] === 'INV' ||
              queryArr[3] === 'DUP')
          ) {
            this.loading = true
            const data = {
              variantId: query.toUpperCase(),
              chrom: null,
            }
            if (
              (queryArr[0].slice(0, 3) === 'chr' &&
                queryArr[0].slice(3) < 23) ||
              (queryArr[0].slice(0, 3) === 'chr' &&
                queryArr[0].slice(3) === 'x') ||
              (queryArr[0].slice(0, 3) === 'chr' &&
                queryArr[0].slice(3) === 'X')
            ) {
              queryArr[0].slice(3) === 'x' || queryArr[0].slice(3) === 'X'
                ? (data.chrom = 23)
                : (data.chrom = queryArr[0].slice(3)),
                svVariant(data).then((response) => {
                  const data = response.listData
                  data.forEach(function (val, index, arr) {
                    _this.options.push({
                      chrom: val.chrom,
                      value: val.uu_id,
                      label: val.uu_id,
                      type: response['type'],
                      start: parseInt(val.start) - 1,
                      end: parseInt(val.end) + 1,
                    })
                  })
                  this.loading = false
                })
            }
          }
          if (
            (queryArr[0].slice(0, 3) === 'chr' &&
              queryArr[0].slice(3) < 23) ||
            (queryArr[0].slice(0, 3) === 'chr' &&
              queryArr[0].slice(3) === 'x') ||
            (queryArr[0].slice(0, 3) === 'chr' &&
              queryArr[0].slice(3) === 'X')
          ) {
            this.loading = true
            const data = {
              variantId: query.toUpperCase(),
              chrom: null,
            }
            queryArr[0].slice(3) === 'x' || queryArr[0].slice(3) === 'X'
              ? (data.chrom = 23)
              : (data.chrom = queryArr[0].slice(3)),
              variant(data).then((response) => {
                const data = response.listData
                data.forEach(function (val, index, arr) {
                  _this.options.push({
                    chrom: val.chrom,
                    value: val.uu_id,
                    label: val.uu_id,
                    type: response['type'],
                    start: parseInt(val.start) - 1,
                    end: parseInt(val.end) + 1,
                  })
                })
                this.loading = false
              })
          }
        } else {
          this.loading = true
          search(query.toUpperCase()).then((response) => {
            const data = response.listData
            data.forEach(function (val, index, arr) {
              _this.options.push({
                chrom: parseInt(val.chrom.split('.')[0].split('_')[1]),
                value: val.gene,
                label: val.gene,
                type: data[0]['type'],
                start: parseInt(val.start) - 1,
                end: parseInt(val.end) + 1,
              })
            })
            this.loading = false
          })
        }
      } else {
        this.options = []
      }
    },
    handleClick(e) {
      if (e.type === 'gene' || e.type === 'pseudogene') {
        this.$router.push('/gene')
        this.$store.dispatch('variations/geneSearch', e)
      }
      if (e.type === 'position') {
        this.$router.push('/position')
        this.$store.dispatch('variations/positionSearch', e)
      }
      if (e.type === 'variant') {
        this.$router.push(
          '/variant?id=' + e.value + '&chrom=' + this.options[0].chrom
        )
        this.$store.dispatch('variations/variationSearch', e)
      }
      if (e.type === 'svVariant') {
        this.$router.push(
          '/svVariant?id=' + e.value + '&chrom=' + this.options[0].chrom
        )
        this.$store.dispatch('variations/variationSearch', e)
      }
    },
    selectBlur() {
      if (this.options.length) {
        if (
          this.options[0].type === 'gene' ||
          this.options[0].type === 'pseudogene'
        ) {
          this.$router.push('/gene')
          this.$store.dispatch('variations/geneSearch', this.options[0])
        }
        if (this.options[0].type === 'position') {
          this.$router.push('/position')
          this.$store.dispatch('variations/positionSearch', this.options[0])
        }
        if (this.options[0].type === 'variant') {
          this.$router.push(
            '/variant?id=' +
              this.options[0].value +
              '&chrom=' +
              this.options[0].chrom
          )
          this.$store.dispatch('variations/variationSearch', this.options[0])
        }
        if (e.type === 'svVariant') {
          this.$router.push(
            '/svVariant?id=' + e.value + '&chrom=' + this.options[0].chrom
          )
          this.$store.dispatch('variations/variationSearch', e)
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.el-main {
  background-color: #fafafa;
  color: #333;
  text-align: center;
  .word {
    font-size: 26px;
    letter-spacing: 1.5px;
  }
  .search {
    width: 30%;
  }
  .tips {
    .tip {
      line-height: 1.8;
      font-size: 14px;
      padding: 18px 24px;
      background-color: rgb(244, 244, 245);
      border: 1px solid #f2f6fc;
      margin-bottom: 25px;
      border-radius: 4px;
      -webkit-font-smoothing: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .reference {
      font-size: 14px;
      text-align: left;
      padding: 8px 16px;
      background-color: #ffffff;
      border-radius: 4px;
      border-left: 4px solid #50bfff;
      margin: 20px 0;
    }
  }
  .chart-container {
    width: 95%;
    margin: 20px 2.5% 0 2.5%;
  }
}
.co {
  padding: 16px 50px;
  color: #000000d9;
  font-size: 14px;
  background: #f0f2f5;
}
#line6 {
  position: absolute;
  right: 0;
  top: 10%;
  height: 60%;
  width: 100%;
  border: 1px solid #1890ff;
  border-radius: 20px;
}
.triangle {
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  bottom: -11px;
  left: 26%;
  background-color: #fff;
  border-top: 1px solid #1890ff;
  border-left: 1px solid #1890ff;
  transform: rotate(225deg);
  -ms-transform: rotate(225deg); /* IE 9 */
  -moz-transform: rotate(225deg); /* Firefox */
  -webkit-transform: rotate(225deg); /* Safari 和 Chrome */
  -o-transform: rotate(225deg); /* Opera */
}
</style>
