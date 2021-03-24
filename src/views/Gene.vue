<template>
  <div>
    <Nav />
    <el-main>
      <div v-loading="loading" class="main-container">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <p class="title">
              {{ gene.start }}-{{ gene.end }}<span class="sub-title" />
            </p>
          </el-col>
          <el-col :span="10" class="tools">
            <el-col :span="10">
              <div class="tools-1">
                <p>{{ $t('gene.zoom') }}</p>
                <p class="svg-container" @click="zoomClick('-10')">
                  <svg-icon icon-class="narrow" />
                  <span>-10</span>
                </p>
                <p class="svg-container" @click="zoomClick('-3')">
                  <svg-icon icon-class="narrow" />
                  <span>-3</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="enlarge" @click="zoomClick('3')" />
                  <span>+3</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="enlarge" @click="zoomClick('10')" />
                  <span>+10</span>
                </p>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="tools-2">
                <p>{{ $t('gene.move') }}</p>
                <p class="svg-container">
                  <svg-icon icon-class="Left-3" @click="moveClick('-95')" />
                  <span>-95%</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="Left-2" @click="moveClick('-50')" />
                  <span>-50%</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="Left-1" @click="moveClick('-5')" />
                  <span>-5%</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="Right-1" @click="moveClick('5')" />
                  <span>+5%</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="Right-2" @click="moveClick('50')" />
                  <span>+50%</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="Right-3" @click="moveClick('95')" />
                  <span>+95%</span>
                </p>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <el-divider />
        <div class="annotation-container">
          <svg id="svg-drag" v-drag />
        </div>
        <div class="variation-container" @click="variationClick($event)" />
        <div class="axis-container"><svg /></div>
        <template>
          <el-row
            class="checkbox-container"
            type="flex"
            justify="space-between"
          >
            <el-col :span="8">
              <el-checkbox-group
                v-model="checkboxGroup1"
                @change="handleCheckedOptionsChangeOne"
              >
                <el-checkbox-button
                  v-for="op in options"
                  :key="op.name"
                  :label="op.name"
                >{{ op.name }}
                  <el-tag class="num-tag">{{ op.num }} </el-tag>
                </el-checkbox-button>
              </el-checkbox-group>
            </el-col>
            <el-col :span="6">
              <el-checkbox-group
                v-model="checkboxGroup3"
                @change="handleCheckedOptionsChangeThree"
              >
                <el-checkbox-button
                  v-for="(item, index) in options3"
                  :key="index"
                  :label="item.name"
                >{{ item.name }}
                  <el-tag class="num-tag">{{ item.num }} </el-tag>
                </el-checkbox-button>
              </el-checkbox-group>
            </el-col>
            <!-- <el-col :span="8">
              <el-checkbox-group
                v-model="checkboxGroup1"
                @change="handleCheckedOptionsChangeOne"
              >
                <el-tooltip v-for="op in options" :key="op.name" :content="op.num + '个'" placement="bottom" effect="light">
                  <el-checkbox-button :label="op.name">{{ op.name }}
                  </el-checkbox-button>
                </el-tooltip>
              </el-checkbox-group>
            </el-col>
            <el-col :span="6">
              <el-checkbox-group
                v-model="checkboxGroup2"
                @change="handleCheckedOptionsChangeTwo"
              >
                <el-tooltip v-for="(item, index) in options2" :key="index" :content="item.num + '个'" placement="bottom" effect="light">
                  <el-checkbox-button :label="item.name">{{ item.name }}
                  </el-checkbox-button>
                </el-tooltip>
              </el-checkbox-group>
            </el-col>
            <el-col :span="6">
              <el-checkbox-group
                v-model="checkboxGroup3"
                @change="handleCheckedOptionsChangeThree"
              >
                <el-tooltip v-for="(item, index) in options3" :key="index" :content="item.num + '个'" placement="bottom" effect="light">
                  <el-checkbox-button :label="item.name">{{ item.name }}
                  </el-checkbox-button>
                </el-tooltip>
              </el-checkbox-group>
            </el-col> -->
            <!-- <el-col :span="4">
              <el-input
                v-model="input"
                :placeholder="$t('gene.search')"
                prefix-icon="el-icon-search"
                clearable
              />
            </el-col>-->
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
              :label="$t('gene.table.variatiId')"
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
            <el-table-column
              prop="source"
              :label="$t('gene.table.source')"
              width="180"
            >
              <template slot-scope="scope">
                <el-tag
                  v-for="sc in scope.row.source"
                  :key="sc"
                  :type="sc === 'E' ? 'primary' : 'success'"
                  disable-transitions
                >{{ sc }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="exonic_function"
              :label="$t('gene.table.exonic_function')"
            >
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
            <el-table-column
              prop="variation_type"
              :label="$t('gene.table.variation_type')"
            />
            <el-table-column
              prop="thousandG_ALL"
              :label="$t('gene.table.thousandG_ALL')"
            />
            <el-table-column
              prop="exAC_ALL"
              :label="$t('gene.table.exAC_ALL')"
            />
            <el-table-column
              prop="gnomAD_exome_ALL"
              :label="$t('gene.table.gnomAD_exome_ALL')"
            />
            <el-table-column
              prop="gnomAD_genome_ALL"
              :label="$t('gene.table.gnomAD_genome_ALL')"
            />
            <el-table-column
              prop="ref_seq_gene"
              :label="$t('gene.table.ref_seq_gene')"
            />
          </el-table>
        </template>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { genePositionData } from '@/api/variation'
import * as d3 from 'd3'
import Nav from '@/components/Nav'
export default {
  name: 'Gene',
  components: {
    Nav
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el, binding, vnode) {
        // el.drag();
        // 获取元素
        // var dv = document.getElementById("dv");
        let x = 0
        let nl = 0
        let isDown = false
        // 鼠标按下事件
        el.onmousedown = function(e) {
          // 获取x坐标和y坐标
          x = e.clientX
          // 获取左部和顶部的偏移量
          // l = el.offsetLeft
          // t = el.offsetTop
          // console.log(el.offsetLeft)
          // 开关打开
          isDown = true
          nl = 0
          // 设置样式
          el.style.cursor = 'move'
        }
        // 鼠标移动
        window.onmousemove = function(e) {
          if (isDown == false) {
            return
          }
          // 获取x和y
          const nx = e.clientX
          // 计算移动后的左偏移量和顶部的偏移量
          nl = nx - x
          el.style.left = nl + 'px'
        }
        // 鼠标抬起事件
        el.onmouseup = function() {
          // 开关关闭
          if (nl < -20 && nl > -300) {
            vnode.context.moveClick('10')
            el.style.cursor = 'default'
          } else if (nl < -300) {
            vnode.context.moveClick('50')
            el.style.cursor = 'default'
          }
          if (nl > 300) {
            vnode.context.moveClick('-50')
            el.style.cursor = 'default'
          } else if (nl > 20 && nl < 300) {
            vnode.context.moveClick('-10')
            el.style.cursor = 'default'
          }
          isDown = false
          el.style.left = '0px'
          el.style.cursor = 'default'
        }
      }
    }
  },
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
      radio1: false,
      containerWidth: 0,
      minIdxSC: 0,
      svg: '',
      svg2: '',
      input: '',
      checkboxGroup1: ['pLoF', 'Missense', 'Synonymous', 'Other'],
      checkboxGroup3: ['SNVs', 'Indels'],
      options: [
        { name: 'pLoF', num: 0 },
        { name: 'Missense', num: 0 },
        { name: 'Synonymous', num: 0 },
        { name: 'Other', num: 0 }
      ],
      options2: [
        { name: 'EXomes', num: 0 },
        { name: 'Genomes', num: 0 }
      ],
      options3: [
        { name: 'SNVs', num: 0 },
        { name: 'Indels', num: 0 }
      ],
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
        // console.log(_this.filterData)
        const margin = _this.containerWidth / 20
        const axisWidth = _this.containerWidth - margin * 2
        const positionStart =
          _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
        const positionEnd = _this.gene.end + 100
        const position = [positionStart, positionEnd]
        const geneLength = positionEnd - positionStart
        function initAxis() {
          const height = 100
          const svg = d3.select('.axis-container').select('svg')
          svg.selectAll('*').remove()
          svg
            .attr('class', 'axis')
            .attr('width', _this.containerWidth)
            .attr('height', height)
          const scale = d3
            .scaleLinear()
            .domain([positionStart, positionEnd])
            .range([0, axisWidth])

          const axis = d3
            .axisTop()
            .scale(scale)
            .ticks(10)
            .tickPadding(10)
          svg
            .append('text')
            .attr('x', 0)
            .attr('y', margin)
            .attr('fill', '#409EFF')
            .attr('font-size', 20)
            .text(function() {
              return 'chr:' + _this.gene.chrom
            })
          svg
            .append('g')
            .attr('transform', function() {
              return 'translate(' + margin + ',' + margin + ')'
            })
            .call(axis)
        }
        function geneAnnotation(genename, geneid) {
          const margin = _this.containerWidth / 20
          const width = _this.containerWidth - margin * 2
          const newArr = []
          const numArr = []
          let start = 0
          let end = 0
          const name = []
          let grandParent = null
          let parent = null
          let count = 0
          _this.svg = d3.select('.annotation-container').select('svg')
          _this.svg.selectAll('*').remove()
          _this.svg.style('overflow', 'visible')
          _this.annotationColor = '#424242'
          _this.filterData.genomic.forEach(function(d) {
            if (d['type'] === 'pseudogene' || d['type'] === 'gene') {
              newArr.push({
                start: ((d['start'] - positionStart) / geneLength) * width,
                end: ((d['end'] - positionStart) / geneLength) * width,
                gene: d['gene']
              })
            }
          })
          newArr.sort(function(a, b) {
            return a['start'] - b['start']
          })
          newArr.forEach(function(d, i) {
            start = 0
            end = -Infinity
            for (let j = i; j < newArr.length; j++) {
              start = newArr[j]['start']
              if (start - end > 120) {
                if (name.indexOf(newArr[j]['gene']) === -1) {
                  end = newArr[j]['end']
                  name.push(newArr[j]['gene'])
                  numArr.push(newArr[j])
                }
              }
            }
          })
          numArr.forEach(function(c, i) {
            if (i > 0 && numArr[i]['start'] - 120 < numArr[i - 1]['end']) {
              count = count + 1
            }
            grandParent = null
            parent = null
            _this.filterData.genomic.forEach(function(d) {
              if (d['parent'] === '.' && d['gene'] === c['gene']) {
                // if (d['parent'] === '.' && d['gene'] === 'STATH') {
                if (d['type'] === 'pseudogene' || d['type'] === 'gene') {
                  grandParent = d['gene_id']
                  _this.svg
                    .append('line')
                    .attr(
                      'x1',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y1', 13 + 30 * count)
                    .attr(
                      'x2',
                      ((d['end'] - positionStart) / geneLength) * width
                    )
                    .attr('y2', 13 + 30 * count)
                    .attr('stroke', '#dbdbdb')
                    .attr('stroke-width', 2)
                  _this.svg
                    .append('text')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width -
                        d['gene'].length * 10.5
                    )
                    .attr('y', 18 + 30 * count)
                    .attr('fill', '#409EFF')
                    .attr('font-size', 14)
                    .attr('cursor', 'pointer')
                    .attr('geneId', d['gene_id'])
                    .on('click', function() {
                      const thisName = d3.select(this).text()
                      const thisId = d3.select(this).attr('geneId')
                      if (genename === thisName) {
                        geneAnnotation()
                      } else {
                        geneAnnotation(thisName, thisId)
                      }
                    })
                    .text(function() {
                      return d['gene']
                    })
                }
              }
              if (d['parent'] === grandParent) {
                parent = d['gene_id']
              }
              if (d['parent'] === parent) {
                if (d['type'] === 'CDS') {
                  _this.svg
                    .append('rect')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y', 6 + 30 * count)
                    .attr(
                      'width',
                      ((d['end'] - d['start']) / geneLength) * width
                    )
                    .attr('height', 16)
                    .attr('fill', '#424242')
                }
                if (d['type'] === 'exon') {
                  _this.svg
                    .append('rect')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y', 10 + 30 * count)
                    .attr(
                      'width',
                      ((d['end'] - d['start']) / geneLength) * width
                    )
                    .attr('height', 7)
                    .attr('fill', '#424242')
                    .attr('class', 'UTR')
                }
              }
            })
            if (c['gene'] === genename) {
              _this.filterData.genomic.forEach(function(d) {
                if (d['parent'] === geneid) {
                  count = count + 1
                  parent = d['gene_id']
                  _this.svg
                    .append('line')
                    .attr(
                      'x1',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y1', 13 + 30 * count)
                    .attr(
                      'x2',
                      ((d['end'] - positionStart) / geneLength) * width
                    )
                    .attr('y2', 13 + 30 * count)
                    .attr('stroke', '#c7def5')
                    .attr('stroke-width', 2)
                }
                if (d['parent'] === parent) {
                  if (d['type'] === 'CDS') {
                    _this.svg
                      .append('rect')
                      .attr(
                        'x',
                        ((d['start'] - positionStart) / geneLength) * width
                      )
                      .attr('y', 6 + 30 * count)
                      .attr(
                        'width',
                        ((d['end'] - d['start']) / geneLength) * width
                      )
                      .attr('height', 16)
                      .attr('fill', '#81bcf9')
                  }
                  if (d['type'] === 'exon') {
                    _this.svg
                      .append('rect')
                      .attr(
                        'x',
                        ((d['start'] - positionStart) / geneLength) * width
                      )
                      .attr('y', 10 + 30 * count)
                      .attr(
                        'width',
                        ((d['end'] - d['start']) / geneLength) * width
                      )
                      .attr('height', 7)
                      .attr('fill', '#81bcf9')
                      .attr('class', 'UTR')
                  }
                }
              })
            }
          })
          const height = 32 * (count + 1)
          _this.svg.attr('height', height).attr('width', width)
        }
        initAxis(position) // 创建坐标轴
        geneAnnotation() // 基因注释
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
        let pLoFNum = 0
        let MissenseNum = 0
        let SynonymousNum = 0
        let OtherNum = 0
        let exomeNum = 0
        let genomeNum = 0
        let snvNum = 0
        let indelNum = 0
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

          if (
            d['exonic_function'].indexOf('frameshift') !== -1 ||
            d['exonic_function'].indexOf('stopgain') !== -1
          ) {
            pLoFNum = pLoFNum + 1
          }
          if (d['exonic_function'].indexOf('missense') !== -1) {
            MissenseNum = MissenseNum + 1
          }
          if (d['exonic_function'].indexOf('synonymous') !== -1) {
            SynonymousNum = SynonymousNum + 1
          }
          if (d['exonic_function'].indexOf('.') !== -1) {
            OtherNum = OtherNum + 1
          }

          if (d['variation_type'].indexOf('exome') !== -1) {
            exomeNum = exomeNum + 1
          }
          if (d['variation_type'].indexOf('genome') !== -1) {
            genomeNum = genomeNum + 1
          }

          if (d['variation_type'].indexOf('snv') !== -1) {
            snvNum = snvNum + 1
          }
          if (d['variation_type'].indexOf('indel') !== -1) {
            indelNum = indelNum + 1
          }

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

        _this.options = [
          { name: 'pLoF', num: pLoFNum },
          { name: 'Missense', num: MissenseNum },
          { name: 'Synonymous', num: SynonymousNum },
          { name: 'Other', num: OtherNum }
        ]
        _this.options2 = [
          { name: 'EXomes', num: exomeNum },
          { name: 'Genomes', num: genomeNum }
        ]
        _this.options3 = [
          { name: 'SNVs', num: snvNum },
          { name: 'Indels', num: indelNum }
        ]

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
        start: this.gene.start,
        end: this.gene.end,
        chrom: this.gene.chrom
      }
      genePositionData(data).then(response => {
        this.geneData = response
        this.filterData = Object.assign({}, response)
        this.containerWidth = parseInt(
          d3.select('.axis-container').style('width')
        )
        this.loading = false
      })
    }
  },
  mounted() {
    const _this = this
    if (this.$refs.filterTable) {
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
      const svgDrag = document.getElementById('svg-drag')
      // 火狐
      if (window.addEventListener) {
        svgDrag.addEventListener(
          'DOMMouseScroll',
          function(evt) {
            const e = evt || window.event
            const detail = -e.detail / 3
            if (detail >= 1) {
              _this.zoomClick('-10')
            }
            if (detail <= -1) {
              _this.zoomClick('10')
            }
            evt.preventDefault()
          },
          false
        )
      }
      // 非火狐
      svgDrag.onmousewheel = function(evt) {
        const e = evt || window.event
        const detail = e.wheelDelta / 120
        if (detail >= 1) {
          _this.zoomClick('-10')
        }
        if (detail <= -1) {
          _this.zoomClick('10')
        }
        return false
      }
    }
  },
  methods: {
    zoomClick(value) {
      const center =
        parseInt((this.gene.end - this.gene.start) / 2) + this.gene.start
      const length = parseInt(
        ((this.gene.end - this.gene.start) *
          ((100 + parseInt(value) * -1) / 100)) /
          2
      )
      if (length > 500) {
        const start = center - length <= 0 ? 0 : center - length
        const end = center + length
        const data = {
          start: start,
          end: end,
          chrom: this.gene.chrom
        }
        genePositionData(data).then(response => {
          this.geneData = response
          this.filterData = Object.assign({}, response)
          this.containerWidth = parseInt(
            d3.select('.axis-container').style('width')
          )
          this.gene.start = data.start
          this.gene.end = data.end
          this.$store.dispatch('variations/geneSearch', this.gene)
        })
      }
    },
    moveClick(value) {
      const length = parseInt((this.gene.end - this.gene.start) / 2)
      const center = parseInt(
        (this.gene.end - this.gene.start) / 2 +
          this.gene.start +
          (parseInt(value) * length) / 100
      )
      const start = center - length <= 0 ? 0 : center - length
      const end = start <= 0 ? length * 2 : center + length
      if (this.gene.start > 0 || value > 0) {
        const data = {
          start: start,
          end: end,
          chrom: this.gene.chrom
        }
        genePositionData(data).then(response => {
          this.geneData = response
          this.filterData = Object.assign({}, response)
          this.containerWidth = parseInt(
            d3.select('.axis-container').style('width')
          )
          this.gene.start = data.start
          this.gene.end = data.end
          this.$store.dispatch('variations/geneSearch', this.gene)
        })
      }
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleCheckedOptionsChangeOne(value) {
      this.dataFiter()
    },
    handleCheckedOptionsChangeTwo(value) {
      this.dataFiter()
    },
    handleCheckedOptionsChangeThree(value) {
      this.dataFiter()
    },
    mouseWheel(evt) {
      const e = evt || window.event
      let detail = null
      if (e.wheelDelta) {
        detail = e.wheelDelta / 120
      } else if (e.detail) {
        detail = -e.detail / 3
      }
      if (detail >= 1) {
        this.zoomClick('-10')
      }
      if (detail <= -1) {
        this.zoomClick('10')
      }
    },
    variationClick(e) {
      const _this = this
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
      const svg = d3.select('.variation-container').select('svg')
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
    geneListClick(e, i) {
      if (
        this.geneList[i].type === 'gene' ||
        this.geneList[i].type === 'pseudogene'
      ) {
        const routeUrl = this.$router.resolve({ name: 'Gene' })
        this.$store.dispatch('variations/geneSearch', {
          chrom: parseInt(this.geneList[i].chrom.split('.')[0].split('_')[1]),
          value: this.geneList[i].gene,
          label: this.geneList[i].gene,
          type: this.geneList[i].type,
          start: parseInt(this.geneList[i].start) - 1,
          end: parseInt(this.geneList[i].end) + 1
        })
        window.open(routeUrl.href, '_blank')
      }
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
                (_this.checkboxGroup1[i] === 'pLoF' &&
                  d['exonic_function'].indexOf('frameshift') !== -1) ||
                d['exonic_function'].indexOf('stopgain') !== -1
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
              (_this.checkboxGroup1[i] === 'pLoF' &&
                d['exonic_function'].indexOf('frameshift') !== -1) ||
              d['exonic_function'].indexOf('stopgain') !== -1
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
  .tools {
    .tools-1 {
      p {
        float: left;
      }
      .svg-container {
        height: 25px;
        width: 25px;
        margin-left: 12px;
        cursor: pointer;
        svg {
          height: 100%;
          width: 100%;
        }
        span {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .tools-2 {
      p {
        float: left;
      }
      .svg-container {
        height: 25px;
        width: 25px;
        border: 1px solid #409eff;
        border-radius: 5px;
        margin-left: 12px;
        cursor: pointer;
        svg {
          height: 100%;
          width: 100%;
        }
        span {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  .chrom-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .chrom {
      display: flex;
      height: 30px;
      svg {
        height: 100%;
      }
      .el-link {
        font-size: 18px;
      }
    }
  }
  .checkbox-container {
    max-width: 90%;
    margin: 0 auto 60px;
    .el-checkbox {
      width: 100px;
      text-align: left;
    }
    .el-checkbox-group {
      .el-checkbox-button {
        position: relative;
        .num-tag {
          position: absolute;
          bottom: -80%;
          left: 0;
          width: 100%;
          white-space: nowrap;
          vertical-align: middle;
          -webkit-appearance: none;
          text-align: center;
          box-sizing: border-box;
          outline: 0;
          margin: 0;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          font-size: 14px;
          border-radius: 0;
          border-color: #409eff;
          border-left-color: #ecf5ff;
        }
      }
      .el-checkbox-button:first-child {
        .num-tag {
          border: 1px solid #409eff;
          border-radius: 0 0 0 4px;
        }
      }
      .el-checkbox-button:last-child {
        .num-tag {
          border-radius: 0 0 4px 0;
        }
      }
    }
  }
  .el-table {
    max-width: 90%;
    margin: 0 auto;
  }
  .annotation-container {
    position: relative;
    svg {
      position: relative;
      top: 0;
      left: 0;
    }
  }
  .gene-table {
    .el-tag {
      margin: 0 2px;
    }
  }
}
</style>
