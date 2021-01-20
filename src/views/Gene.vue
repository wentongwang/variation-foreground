<template>
  <el-main>
    <div v-loading="loading" class="main-container">
      <p class="title">{{ this.gene.value }}</p>
      <el-divider />
      <div class="infor">
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple infor-title">
              Ensembl gene ID
            </div>
          </el-col>
          <el-col :span="10">
            <div
              v-if="geneData.genomic[0].gene_id"
              class="grid-content bg-purple infor-content"
            >
              {{ geneData.genomic[0].gene_id }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple infor-title">
              Ensembl gene Name
            </div>
          </el-col>
          <el-col :span="10">
            <div
              v-if="geneData.genomic[0].gene"
              class="grid-content bg-purple infor-content"
            >
              {{ geneData.genomic[0].gene }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple infor-title">Source</div>
          </el-col>
          <el-col :span="10">
            <div
              v-if="geneData.genomic[0].source"
              class="grid-content bg-purple infor-content"
            >
              {{ geneData.genomic[0].source }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple infor-title">Chrom</div>
          </el-col>
          <el-col :span="10">
            <div
              v-if="geneData.genomic[0].chrom"
              class="grid-content bg-purple infor-content"
            >
              {{ geneData.genomic[0].chrom }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple infor-title">Region</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple infor-content">
              <el-link
                type="primary"
              >{{ this.gene.chrom }}:{{ this.gene.start }}-{{
                this.gene.end
              }}</el-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="annotation-container">
        <el-button
          v-if="transcriptsBtnShow"
          @click="handleClick($event)"
        >transcripts</el-button>
        <div class="annotation-include">
          <span>Include:</span>
          <el-checkbox class="checkbox-1" label="CDS" disabled />
          <el-checkbox
            class="checkbox-2"
            :disabled="!transcriptsBtnShow"
            label="UTR"
            @change="UTRchecked($event)"
          />
          <el-checkbox
            class="checkbox-3"
            label="Non-coding transcript"
            disabled
          />
        </div>
      </div>
      <div v-show="transcriptsShow" class="annotation-container-2" />
      <div class="variation-container" @click="variationClick($event)" />
      <!-- <div class="variation-container2" @click="variationClick($event)" /> -->
      <div class="axis-container" />
      <template>
        <el-row class="checkbox-container" type="flex" justify="space-between">
          <el-col :span="6">
            <el-checkbox-group
              v-model="checkboxGroup1"
              @change="handleCheckedOptionsChangeOne"
            >
              <el-checkbox-button v-for="op in options" :key="op" :label="op">{{
                op
              }}</el-checkbox-button>
            </el-checkbox-group>
          </el-col>
          <el-col :span="6">
            <el-checkbox-group
              v-model="checkboxGroup2"
              @change="handleCheckedOptionsChangeTwo"
            >
              <el-checkbox
                v-for="(item, index) in options2"
                :key="index"
                :label="item"
                :disabled="checkboxGroupSelect2[index]"
              >{{ item }}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="checkboxGroup3"
              @change="handleCheckedOptionsChangeThree"
            >
              <el-checkbox
                v-for="(item, index) in options3"
                :key="index"
                :label="item"
                :disabled="checkboxGroupSelect3[index]"
              >{{ item }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="input"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              clearable
            />
          </el-col>
        </el-row>
        <el-table
          ref="filterTable"
          class="gene-table"
          stripe
          size="mini"
          :data="tableData"
          max-height="540"
          style="width: 100%"
          @scroll="tableScroll($event)"
        >
          <el-table-column
            prop="variatiId"
            label="Vatriat ID"
            sortable
            width="180"
          >
            <template slot-scope="scope">
              <el-link
                :href="'#/variant?id=' + scope.row.variatiId"
                type="primary"
              >{{ scope.row.variatiId }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="Source" width="180">
            <template slot-scope="scope">
              <el-tag
                v-for="sc in scope.row.source"
                :key="sc"
                :type="sc === 'E' ? 'primary' : 'success'"
                disable-transitions
              >{{ sc }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="exonic_function" label="Exonic Function">
            <template slot-scope="scope">
              <el-badge
                class="mark"
                is-dot
                :type="
                  scope.row.exonic_function === 'frameshift'
                    ? 'danger'
                    : scope.row.exonic_function === 'missense'
                      ? 'warning'
                      : scope.row.exonic_function === 'synonymous'
                        ? 'success'
                        : 'info'
                "
                style="margin-top:15px;margin-right:5px"
              />{{ scope.row.exonic_function }}
            </template>
          </el-table-column>
          <el-table-column prop="variation_type" label="Variation Type" />
          <el-table-column prop="thousandG_ALL" label="1000G ALL" />
          <el-table-column prop="exAC_ALL" label="ExAC ALL" />
          <el-table-column prop="gnomAD_exome_ALL" label="gnomADExome ALL" />
          <el-table-column prop="gnomAD_genome_ALL" label="gnomADGenome ALL" />
          <el-table-column prop="ref_seq_gene" label="Refseq Gene" />
        </el-table>
      </template>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { geneData } from '@/api/variation'
import * as d3 from 'd3'
export default {
  name: 'Gene',
  data() {
    return {
      geneData: {
        genomic: [
          {
            chrom: '',
            source: '',
            type: '',
            start: 0,
            end: 0,
            score: '',
            chain: '',
            cds_position: '',
            gene_id: '',
            parent: '',
            gene: '',
            id: 1
          }
        ],
        variation: []
      },
      filterData: '',
      loading: true,
      transcriptsShow: false,
      transcriptsBtnShow: false,
      radio1: false,
      containerWidth: 0,
      minIdxSC: 0,
      svg: '',
      svg2: '',
      input: '',
      checkboxGroup1: ['pLoF', 'Missense', 'Synonymous', 'Other'],
      checkboxGroup2: ['EXomes', 'Genomes'],
      checkboxGroupSelect2: [false, false],
      checkboxGroup3: ['SNVs', 'Indels'],
      checkboxGroupSelect3: [false, false],
      options: ['pLoF', 'Missense', 'Synonymous', 'Other'],
      options2: ['EXomes', 'Genomes'],
      options3: ['SNVs', 'Indels'],
      tableData: [],
      colorActive: [
        'rgb(245, 108, 108)',
        'rgb(230, 162, 60)',
        'rgb(103, 194, 58)',
        'rgb(157, 157, 157)'
      ],
      color: [
        'rgb(253, 226, 226)',
        'rgb(250, 236, 216)',
        'rgb(208, 249, 188)',
        'rgb(233, 233, 235)'
      ]
    }
  },
  computed: {
    ...mapGetters(['gene']),
    variation() {
      return this.filterData.variation
    }
  },
  watch: {
    filterData() {
      const _this = this
      this.$nextTick(() => {
        console.log(_this.filterData)
        const margin = _this.containerWidth / 20
        const axisWidth = _this.containerWidth - margin * 2
        // const positionStart = Math.floor(_this.gene.start / 100) * 100
        // const positionEnd = Math.ceil(_this.gene.end / 100) * 100
        const positionStart =
          _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
        const positionEnd = _this.gene.end + 100
        // const exonStart = positionStart
        // const exonEnd = positionEnd
        const geneLength = positionEnd - positionStart
        const position = [positionStart, positionEnd]
        const annotationXWidth = []
        // const variationData = [{ x: 10, width: 10, height: 30 }]

        function initAxis() {
          const height = 100
          const svg = d3
            .select('.axis-container')
            .append('svg')
            .attr('class', 'axis')
            .attr('width', _this.containerWidth)
            .attr('height', height)
          const scale = d3
            .scaleLinear()
            .domain([positionStart, positionEnd])
            .range([0, axisWidth])
          // .scaleThreshold()
          // .domain([
          //   positionStart,
          //   3857286,
          //   3858718,
          //   3865762,
          //   3867974,
          //   3869605,
          //   3872472,
          //   3883507,
          //   3885038,
          //   3885419,
          //   positionEnd
          // ])
          // .range([
          //   0,
          //   axisWidth / 10,
          //   axisWidth / 5,
          //   (axisWidth * 3) / 10,
          //   (axisWidth * 2) / 5,
          //   axisWidth / 2,
          //   (axisWidth * 3) / 5,
          //   (axisWidth * 7) / 10,
          //   (axisWidth * 4) / 5,
          //   (axisWidth * 9) / 10,
          //   axisWidth
          // ])

          const axis = d3
            .axisTop()
            .scale(scale)
            .ticks(10)
            .tickPadding(10)
          svg
            .append('g')
            .attr('transform', function() {
              return 'translate(' + margin + ',' + margin + ')'
            })
            .call(axis)
        }
        function geneAnnotation(annotationXWidth) {
          const margin = _this.containerWidth / 20
          const width = _this.containerWidth - margin * 2
          const height = 75
          let parent = ''
          // let type = ''
          let count = 0

          _this.svg = d3.select('.annotation-container').append('svg')
          _this.svg2 = d3.select('.annotation-container-2').append('svg')

          _this.svg.attr('height', height).attr('width', width)

          _this.svg
            .append('line')
            .attr('x1', 0)
            .attr('y1', 49)
            .attr('x2', width)
            .attr('y2', 49)
            .attr('stroke', '#dbdbdb')
            .attr('stroke-width', 2)
          if (_this.gene.type === 'gene') {
            _this.transcriptsBtnShow = true
            _this.filterData.genomic.forEach(function(d) {
              if (parent !== '') {
                if (d['parent'] === parent && d['type'] === 'CDS') {
                  _this.svg2
                    .append('rect')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y', 6 + 18 * count)
                    .attr(
                      'width',
                      ((d['end'] - d['start']) / geneLength) * width
                    )
                    .attr('height', 12)
                    .attr('fill', '#424242')

                  _this.svg
                    .append('rect')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y', 40)
                    .attr(
                      'width',
                      ((d['end'] - d['start']) / geneLength) * width
                    )
                    .attr('height', 20)
                    .attr('fill', '#424242')
                }
              }
              if (d['type'] === 'mRNA') {
                parent = d['gene_id']
                // type = d['type']
                count = count + 1
                _this.svg2
                  .append('line')
                  .attr('x1', 0)
                  .attr('y1', 12 + 18 * count)
                  .attr('x2', width)
                  .attr('y2', 12 + 18 * count)
                  .attr('stroke', '#dbdbdb')
                  .attr('stroke-width', 2)
              }
            })
            _this.annotationColor = '#424242'
            _this.svg2.attr('height', parseInt(count * 18)).attr('width', width)
          } else {
            _this.filterData.genomic.forEach(function(d) {
              if (d['type'] === 'exon') {
                annotationXWidth.push({
                  x: ((d['start'] - positionStart) / geneLength) * axisWidth,
                  width: ((d['end'] - d['start']) / geneLength) * axisWidth
                })
              }
            })
            annotationXWidth.forEach(function(d) {
              _this.svg
                .append('rect')
                .attr('x', d['x'])
                .attr('y', 42)
                .attr('width', d['width'])
                .attr('height', 12)
                .attr('fill', '#bdbdbd')
            })
          }
        }
        initAxis(position) // 创建坐标轴
        geneAnnotation(annotationXWidth) // 基因注释
      })
    },
    variation() {
      const _this = this
      const positionStart =
        _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
      const positionEnd = _this.gene.end + 100
      const geneLength = positionEnd - positionStart
      function geneVariation() {
        const margin = _this.containerWidth / 20
        const width = _this.containerWidth - margin * 2
        const height = 100
        let thisColor, activeColor, cx
        d3.select('.variation-container')
          .selectAll('*')
          .remove()
        const svg = d3
          .select('.variation-container')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
        _this.filterData.variation.forEach(function(d, i) {
          cx =
            ((d['start'] +
              parseInt(d['end'] - d['start'] + 3) / 2 -
              positionStart) /
              geneLength) *
            width
          if (d['thousandG_ALL'] === '.' || d['thousandG_ALL'] <= 0.15) {
            d['thousandG_ALL'] = 0.15
          }
          if (
            d['exonic_function'].indexOf('frameshift') !== -1 ||
            d['exonic_function'].indexOf('stopgain') !== -1
          ) {
            thisColor = _this.color[0]
            activeColor = _this.colorActive[0]
          } else if (d['exonic_function'].indexOf('missense') !== -1) {
            thisColor = _this.color[1]
            activeColor = _this.colorActive[1]
          } else if (d['exonic_function'].indexOf('synonymous') !== -1) {
            thisColor = _this.color[2]
            activeColor = _this.colorActive[2]
          } else {
            thisColor = _this.color[3]
            activeColor = _this.colorActive[3]
          }
          if (i < 11) {
            svg
              .append('ellipse')
              .attr('cx', cx)
              .attr('cy', 50)
              .attr('rx', parseInt(d['end'] - d['start'] + 5))
              .attr('ry', parseInt(35 * d['thousandG_ALL']))
              .attr('stroke', '#DCDFE6')
              .attr('fill', activeColor)
          } else {
            svg
              .append('ellipse')
              .attr('cx', cx)
              .attr('cy', 50)
              .attr('rx', parseInt(d['end'] - d['start'] + 5))
              .attr('ry', parseInt(35 * d['thousandG_ALL']))
              .attr('stroke', '#C0C4CC')
              .attr('fill', thisColor)
          }
        })
      }
      function creatTable() {
        _this.tableData = []
        _this.filterData.variation.forEach(function(d) {
          const thisSource = []
          let exonic_function = ''
          let thousandG_ALL = ''
          let exAC_ALL = ''
          let gnomAD_exome_ALL = ''
          let gnomAD_genome_ALL = ''

          if (!isNaN(d['gnomAD_exome_ALL'])) {
            thisSource.push('E')
          }
          if (!isNaN(d['gnomAD_genome_ALL'])) {
            thisSource.push('G')
          }

          if (
            d['exonic_function'].indexOf('frameshift') !== -1 ||
            d['exonic_function'].indexOf('stopgain') !== -1
          ) {
            exonic_function = 'frameshift'
          } else if (d['exonic_function'].indexOf('missense') !== -1) {
            exonic_function = 'missense'
          } else if (d['exonic_function'].indexOf('synonymous') !== -1) {
            exonic_function = 'synonymous'
          } else {
            exonic_function = 'other'
          }

          thousandG_ALL = parseNum(d['thousandG_ALL'])
          exAC_ALL = parseNum(d['exAC_ALL'])
          gnomAD_exome_ALL = parseNum(d['gnomAD_exome_ALL'])
          gnomAD_genome_ALL = parseNum(d['gnomAD_genome_ALL'])

          _this.tableData.push({
            variatiId: d['uuId'],
            source: thisSource,
            exonic_function: exonic_function,
            variation_type: d['variation_type'],
            thousandG_ALL: thousandG_ALL,
            exAC_ALL: exAC_ALL,
            gnomAD_exome_ALL: gnomAD_exome_ALL,
            gnomAD_genome_ALL: gnomAD_genome_ALL,
            ref_seq_gene: '.'
          })
        })

        function parseNum(num) {
          let newNum = '.'
          const e = String(num)
          const rex = /^([0-9])\.?([0-9]*)e-([0-9])/
          if (rex.test(e)) {
            newNum = num
          } else {
            if (!isNaN(num) && num > 0) {
              const p = Math.floor(Math.log(num) / Math.LN10)
              var n = (num * Math.pow(10, -p)).toFixed(2)
              newNum = n + 'e' + p
            } else {
              newNum = num
            }
          }
          return newNum
        }
      }
      geneVariation() // 变异功能类型及筛选
      creatTable() // 创建表格
    },
    input() {
      this.dataFiter()
    }
  },
  created: function() {
    if (this.gene.value) {
      const data = {
        gene: this.gene.value,
        start: this.gene.start,
        end: this.gene.end,
        chrom: this.gene.chrom
      }
      geneData(data).then(response => {
        this.geneData = response
        this.filterData = Object.assign({}, response)
        this.containerWidth = parseInt(
          d3.select('.axis-container').style('width')
        )
        // console.log(this.tableData)
        this.loading = false
      })
    }
  },
  mounted() {
    const _this = this
    this.dom = this.$refs.filterTable.bodyWrapper
    this.dom.addEventListener('scroll', function() {
      const windowHeight = _this.dom.clientHeight
      const scrollHeight = _this.dom.scrollHeight
      const needScroll = scrollHeight - windowHeight
      const scrollTop = _this.dom.scrollTop
      const positionStart =
        _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
      const positionEnd = _this.gene.end + 100
      const geneLength = positionEnd - positionStart
      const margin = _this.containerWidth / 20
      const width = _this.containerWidth - margin * 2
      let cx, thisColor, activeColor
      const svg = d3.select('.variation-container').select('svg')
      svg.selectAll('*').remove()
      _this.minIdxSC = Math.ceil(
        (scrollTop * (_this.filterData.variation.length - 1)) / needScroll
      )
      if (_this.minIdxSC < 5) {
        _this.minIdxSC = 5
      } else if (_this.minIdxSC > _this.filterData.variation.length - 6) {
        _this.minIdxSC = _this.filterData.variation.length - 5
      }
      _this.filterData.variation.forEach(function(d, i) {
        if (
          d['exonic_function'].indexOf('frameshift') !== -1 ||
          d['exonic_function'].indexOf('stopgain') !== -1
        ) {
          thisColor = _this.color[0]
          activeColor = _this.colorActive[0]
        } else if (d['exonic_function'].indexOf('missense') !== -1) {
          thisColor = _this.color[1]
          activeColor = _this.colorActive[1]
        } else if (d['exonic_function'].indexOf('synonymous') !== -1) {
          thisColor = _this.color[2]
          activeColor = _this.colorActive[2]
        } else {
          thisColor = _this.color[3]
          activeColor = _this.colorActive[3]
        }
        cx =
          ((d['start'] +
            parseInt(d['end'] - d['start'] + 3) / 2 -
            positionStart) /
            geneLength) *
          width
        if (d['thousandG_ALL'] === '.' || d['thousandG_ALL'] <= 0.15) {
          d['thousandG_ALL'] = 0.15
        }
        if (_this.minIdxSC - i < 6 && _this.minIdxSC - i > -6) {
          svg
            .append('ellipse')
            .attr('cx', cx)
            .attr('cy', 50)
            .attr('rx', parseInt(d['end'] - d['start'] + 5))
            .attr('ry', parseInt(35 * d['thousandG_ALL']))
            .attr('stroke', '#DCDFE6')
            .attr('fill', activeColor)
        } else {
          svg
            .append('ellipse')
            .attr('cx', cx)
            .attr('cy', 50)
            .attr('rx', parseInt(d['end'] - d['start'] + 5))
            .attr('ry', parseInt(35 * d['thousandG_ALL']))
            .attr('stroke', '#C0C4CC')
            .attr('fill', thisColor)
        }
      })
    })
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleCheckedOptionsChangeOne(value) {
      this.dataFiter()
    },
    handleCheckedOptionsChangeTwo(value) {
      if (value.length === 2) {
        this.checkboxGroupSelect2 = [false, false]
      } else {
        if (value[0] === 'Genomes') {
          this.checkboxGroupSelect2 = [false, true]
        }
        if (value[0] === 'EXomes') {
          this.checkboxGroupSelect2 = [true, false]
        }
      }
      this.dataFiter()
    },
    handleCheckedOptionsChangeThree(value) {
      if (value.length === 2) {
        this.checkboxGroupSelect3 = [false, false]
      } else {
        if (value[0] === 'Indels') {
          this.checkboxGroupSelect3 = [false, true]
        }
        if (value[0] === 'SNVs') {
          this.checkboxGroupSelect3 = [true, false]
        }
      }
      this.dataFiter()
    },
    handleClick(e) {
      this.transcriptsShow = !this.transcriptsShow
    },
    UTRchecked(e) {
      const _this = this
      const positionStart =
        _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
      const positionEnd = _this.gene.end + 100
      // let exonStart = positionStart
      // let exonEnd = positionEnd
      const geneLength = positionEnd - positionStart
      if (e) {
        const margin = _this.containerWidth / 20
        const width = _this.containerWidth - margin * 2
        let parent = ''
        let type = ''
        let count = 0
        if (_this.gene.type === 'gene') {
          _this.transcriptsBtnShow = true
          _this.geneData.genomic.forEach(function(d) {
            if (parent !== '') {
              if (
                d['parent'] === parent &&
                type === 'mRNA' &&
                d['type'] === 'exon'
              ) {
                _this.svg2
                  .append('rect')
                  .attr(
                    'x',
                    ((d['start'] - positionStart) / geneLength) * width
                  )
                  .attr('y', 10 + 18 * count)
                  .attr('width', ((d['end'] - d['start']) / geneLength) * width)
                  .attr('height', 5)
                  .attr('fill', '#424242')
                  .attr('class', 'UTR')
              }
            }
            if (d['type'] === 'transcript') {
              parent = d['gene_id']
              type = 'transcript'
            }
            if (d['type'] === 'mRNA') {
              parent = d['gene_id']
              type = 'mRNA'
              count = count + 1
            }
          })
          _this.annotationColor = '#424242'
        }
      } else {
        d3.select('body')
          .select('.annotation-container-2')
          .select('svg')
          .selectAll('.UTR')
          .remove()
      }
    },
    variationClick(e) {
      const _this = this
      this.dom = this.$refs.filterTable.bodyWrapper
      const windowHeight = this.dom.clientHeight
      const scrollHeight = this.dom.scrollHeight
      const needScroll = scrollHeight - windowHeight
      const positionStart =
        _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
      const positionEnd = _this.gene.end + 100
      const geneLength = positionEnd - positionStart
      const margin = _this.containerWidth / 20
      const width = _this.containerWidth - margin * 2
      let cx, thisColor, activeColor
      let temp = Infinity
      let scrollIndex = 0
      const svg = d3.select('.variation-container2').select('svg')
      svg.selectAll('*').remove()
      this.filterData.variation.forEach(function(d1, i1) {
        cx =
          ((d1['start'] +
            parseInt(d1['end'] - d1['start'] + 5) / 2 -
            positionStart) /
            geneLength) *
          width
        if (Math.abs(e.x - margin - 20 - cx) < temp) {
          temp = Math.abs(e.x - margin - 20 - cx)
          _this.minIdxSC = i1
          if (_this.minIdxSC < 5) {
            scrollIndex = 0
            _this.minIdxSC = 5
          } else if (_this.minIdxSC > _this.filterData.variation.length - 6) {
            scrollIndex = _this.filterData.variation.length - 1
            _this.minIdxSC = _this.filterData.variation.length - 5
          } else {
            scrollIndex = _this.minIdxSC
          }
        }
      })
      this.filterData.variation.forEach(function(d, i) {
        cx =
          ((d['start'] +
            parseInt(d['end'] - d['start'] + 3) / 2 -
            positionStart) /
            geneLength) *
          width
        if (d['thousandG_ALL'] === '.' || d['thousandG_ALL'] <= 0.15) {
          d['thousandG_ALL'] = 0.15
        }
        if (
          d['exonic_function'].indexOf('frameshift') !== -1 ||
          d['exonic_function'].indexOf('stopgain') !== -1
        ) {
          thisColor = _this.color[0]
          activeColor = _this.colorActive[0]
        } else if (d['exonic_function'].indexOf('missense') !== -1) {
          thisColor = _this.color[1]
          activeColor = _this.colorActive[1]
        } else if (d['exonic_function'].indexOf('synonymous') !== -1) {
          thisColor = _this.color[2]
          activeColor = _this.colorActive[2]
        } else {
          thisColor = _this.color[3]
          activeColor = _this.colorActive[3]
        }
        if (_this.minIdxSC - i < 6 && _this.minIdxSC - i > -6) {
          svg
            .append('ellipse')
            .attr('cx', cx)
            .attr('cy', 50)
            .attr('rx', parseInt(d['end'] - d['start'] + 5))
            .attr('ry', parseInt(35 * d['thousandG_ALL']))
            .attr('stroke', '#DCDFE6')
            .attr('fill', activeColor)
        } else {
          svg
            .append('ellipse')
            .attr('cx', cx)
            .attr('cy', 50)
            .attr('rx', parseInt(d['end'] - d['start'] + 5))
            .attr('ry', parseInt(35 * d['thousandG_ALL']))
            .attr('stroke', '#C0C4CC')
            .attr('fill', thisColor)
        }
      })
      this.dom.scrollTop =
        (needScroll * scrollIndex) / (this.filterData.variation.length - 1)
    },
    dataFiter() {
      const _this = this
      const filterArr = []
      _this.filterData.variation = []
      let i
      if (this.input) {
        _this.geneData.variation.forEach(function(d) {
          if (d['uuId'].indexOf(_this.input) !== -1) {
            i = 0
            while (i < _this.checkboxGroup1.length) {
              if (
                _this.checkboxGroup1[i] === 'pLoF' &&
                (d['exonic_function'].indexOf('frameshift') !== -1 ||
                  d['exonic_function'].indexOf('stopgain') !== -1)
              ) {
                filterArr.push(d)
              }
              if (
                _this.checkboxGroup1[i] === 'Missense' &&
                d['exonic_function'].indexOf('missense') !== -1
              ) {
                filterArr.push(d)
              }
              if (
                _this.checkboxGroup1[i] === 'Synonymous' &&
                d['exonic_function'].indexOf('synonymous') !== -1
              ) {
                filterArr.push(d)
              }
              if (
                _this.checkboxGroup1[i] === 'Other' &&
                d['exonic_function'].indexOf('.') !== -1
              ) {
                filterArr.push(d)
              }
              i++
            }
          }
        })
      } else {
        _this.geneData.variation.forEach(function(d) {
          i = 0
          while (i < _this.checkboxGroup1.length) {
            if (
              _this.checkboxGroup1[i] === 'pLoF' &&
              (d['exonic_function'].indexOf('frameshift') !== -1 ||
                d['exonic_function'].indexOf('stopgain') !== -1)
            ) {
              filterArr.push(d)
            }
            if (
              _this.checkboxGroup1[i] === 'Missense' &&
              d['exonic_function'].indexOf('missense') !== -1
            ) {
              filterArr.push(d)
            }
            if (
              _this.checkboxGroup1[i] === 'Synonymous' &&
              d['exonic_function'].indexOf('synonymous') !== -1
            ) {
              filterArr.push(d)
            }
            if (
              _this.checkboxGroup1[i] === 'Other' &&
              d['exonic_function'].indexOf('.') !== -1
            ) {
              filterArr.push(d)
            }
            i++
          }
        })
      }
      filterArr.forEach(function(d) {
        for (let i = 0; i < _this.checkboxGroup2.length; i++) {
          if (
            _this.checkboxGroup2[i] === 'EXomes' &&
            d['variation_type'].indexOf('exome') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
          if (
            _this.checkboxGroup2[i] === 'Genomes' &&
            d['variation_type'].indexOf('genome') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
        }
        for (let i = 0; i < _this.checkboxGroup3.length; i++) {
          if (
            _this.checkboxGroup3[i] === 'SNVs' &&
            d['variation_type'].indexOf('snv') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
          if (
            _this.checkboxGroup3[i] === 'Indels' &&
            d['variation_type'].indexOf('indel') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main-container {
  width: 96%;
  margin: 0 auto;
  .title {
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    .sub-title {
      font-size: 16px;
      margin-left: 10px;
      font-weight: normal;
    }
  }
  .infor {
    .el-row {
      width: 600px;
      font-size: 14px;
      .el-col {
        line-height: 20px;
        .infor-title {
          font-weight: bold;
          text-align: right;
        }
        .infor-content {
          text-align: left;
        }
      }
    }
  }
  .checkbox-container {
    max-width: 90%;
    margin: 0 auto 20px;
    .el-checkbox {
      width: 100px;
      text-align: left;
    }
  }
  .el-table {
    max-width: 90%;
    margin: 0 auto;
  }
  .annotation-container {
    position: relative;
    .el-button {
      position: absolute;
      top: 50px;
      left: -20px;
    }
    .annotation-include {
      text-align: right;
      .checkbox-1 {
        margin-right: 8px;
        margin-left: 5px;
      }
      .checkbox-2 {
        margin-right: 8px;
      }
      .checkbox-3 {
        margin-right: 8px;
      }
      .checkbox-1::after {
        content: '';
        display: inline-block;
        height: 16px;
        width: 20px;
        background: #424242;
        margin-left: 5px;
        transform: translateY(4px);
      }
      .checkbox-2::after {
        content: '';
        display: inline-block;
        height: 8px;
        width: 20px;
        background: #424242;
        margin-left: 5px;
      }
      .checkbox-3::after {
        content: '';
        display: inline-block;
        height: 8px;
        width: 20px;
        background: #bdbdbd;
        margin-left: 5px;
      }
    }
  }
  .gene-table {
    .el-tag {
      margin: 0 2px;
    }
  }
}
</style>
