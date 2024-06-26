<template>
  <div>
    <Nav />
    <el-main>
      <div id="spage-tbshare-container" v-show="geneData.variation">
        <div class="tbshare_popup_enter">{{ $t('gene.filter') }}</div>
        <div class="tbshare_popup_main clearfix">
          <el-card class="box-card">
            <el-divider content-position="left">{{
              $t('gene.functionType')
            }}</el-divider>
            <el-row class="checkbox-container" type="flex" justify="start">
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
            </el-row>
            <el-divider content-position="left">SNV/Indel/SV</el-divider>
            <el-row class="checkbox-container" type="flex" align="end">
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
            </el-row>
          </el-card>
        </div>
      </div>
      <div v-loading="loading" class="main-container">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <p class="title">
              Chr{{ gene.chrom === 23 ? 'X' : gene.chrom }}-{{ gene.start }}-{{
                gene.end
              }}
              (GRCh38)<span class="sub-title" />
            </p>
          </el-col>
          <el-col :span="10" class="tools">
            <el-col :span="10">
              <div class="tools-1">
                <p>{{ $t('gene.zoom') }}</p>
                <p class="svg-container" @click="zoomClick('10')">
                  <svg-icon icon-class="narrow" />
                  <span>-10x</span>
                </p>
                <p class="svg-container" @click="zoomClick('3')">
                  <svg-icon icon-class="narrow" />
                  <span>-3x</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="enlarge" @click="zoomClick('0.3333')" />
                  <span>+3x</span>
                </p>
                <p class="svg-container">
                  <svg-icon icon-class="enlarge" @click="zoomClick('0.1')" />
                  <span>+10x</span>
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
        <el-divider class="my-divider" />
        <div class="axis-container"><svg></svg></div>
        <div class="annotation-container">
          <svg id="svg-drag" v-drag></svg>
        </div>
        <div
          class="variation-container"
          v-show="geneData.variation"
          @click="variationClick($event)"
        >
          <canvas id="canvas"></canvas>
        </div>
        <template>
          <el-row>
            <el-col :span="8">
              <el-button type="primary" @click="onReset" class="resetBtn">{{
                $t('gene.init')
              }}</el-button>
              <div id="mapChart" />
              <div>
                <div class="tableSubData-title" style="color: #909399;">
                  Allele Frequency (AF)
                </div>
                <template>
                  <el-table :data="tableSubData" border style="width: 100%">
                    <el-table-column
                      prop="NorthEast"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.NorthEastAF')"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="NorthChina"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.NorthChinaAF')"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="EastChina"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.EastChinaAF')"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="CentralChina"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.CentralChinaAF')"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="NorthWest"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.NorthWestAF')"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="SouthWest"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.SouthWestAF')"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="SouthChina"
                      :show-overflow-tooltip="true"
                      :label="this.$t('variat.SouthChinaAF')"
                    >
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
            <el-col :span="16">
              <VirtualScroll
                ref="virtualScroll"
                :virtualized="true"
                :data="tableData"
                :key="virtualListValue"
                :height="50"
                key-prop="id"
                @change="data => (virtualList = data)"
              >
                <el-table
                  row-key="id"
                  ref="filterTable"
                  class="gene-table"
                  size="mini"
                  :data="virtualList"
                  height="540"
                  style="width: 100%"
                  @cell-click="tableCell"
                  :row-style="TableRowStyle"
                  :empty-text="$t('gene.table.empty')"
                  highlight-current-row
                >
                  <el-table-column
                    prop="variatiId"
                    :label="$t('gene.table.variatiId')"
                    width="220"
                  >
                    <template slot-scope="scope">
                      <el-link
                        style="font-size: 12px"
                        v-if="scope.row.variation_type === 'SV'"
                        :href="
                          '#/svVariant?id=' +
                            scope.row.variatiId +
                            '&chrom=' +
                            scope.row.chrom +
                            '&func=' +
                            scope.row.exonicFuncValue
                        "
                        type="primary"
                        target="_blank"
                        class="stonebox"
                        v-html="secretNumber(scope.row.variatiId, 26)"
                      >
                      </el-link>
                      <el-link
                        v-else
                        style="font-size: 12px"
                        :href="
                          '#/variant?id=' +
                            scope.row.variatiId +
                            '&chrom=' +
                            scope.row.chrom +
                            '&func=' +
                            scope.row.exonicFuncValue +
                            '&AC=' +
                            scope.row.AC
                        "
                        type="primary"
                        target="_blank"
                        class="stonebox"
                        v-html="secretNumber(scope.row.variatiId, 26)"
                      >
                      </el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="gene" :label="$t('gene.table.gene')">
                    <template slot-scope="scope">
                      <span
                        class="stonebox"
                        v-html="secretNumber(scope.row.gene)"
                      ></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="rsid"
                    :label="$t('gene.table.rsid')"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <span
                        class="stonebox"
                        v-html="secretNumber(scope.row.rsid)"
                      ></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="chn100k_ALL"
                    :label="$t('gene.table.chn100k_ALL')"
                  >
                    <template slot-scope="scope">
                      <span
                        class="stonebox"
                        v-html="secretNumber(scope.row.chn100k_ALL)"
                      ></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="AC"
                    :label="$t('gene.table.AC')"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <span class="stonebox" v-html="scope.row.AC"></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="exonicFunc"
                    :label="$t('gene.table.exonicFunc')"
                  >
                    <template slot-scope="scope">
                      <el-badge
                        class="mark"
                        is-dot
                        :type="
                          scope.row.exonicFunColor === 'danger'
                            ? 'danger'
                            : scope.row.exonicFunColor === 'success'
                            ? 'success'
                            : 'info'
                        "
                        style="margin-top: 15px; margin-right: 5px"
                      />{{ scope.row.exonicFuncValue }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="variation_type"
                    :label="$t('gene.table.variation_type')"
                    width="70"
                  />
                  <el-table-column
                    prop="geneDetail"
                    :label="$t('gene.table.geneDetail')"
                  >
                    <template slot-scope="scope">
                      <span
                        class="stonebox"
                        v-html="secretNumber(scope.row.geneDetail, 50)"
                      ></span>
                    </template>
                  </el-table-column>
                </el-table>
              </VirtualScroll>
            </el-col>
          </el-row>
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
import * as echarts from 'echarts'
import chinaJson from 'echarts/map/json/china.json'
import VirtualScroll from 'el-table-virtual-scroll'
import { decrypt } from '@/utils/crypto.js'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'Gene',
  components: {
    Nav,
    VirtualScroll
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
      numberMap: {
        0: '&#59854;',
        1: '&#58670;',
        2: '&#59246;',
        3: '&#59537;',
        4: '&#57808;',
        5: '&#60146;',
        6: '&#60492;',
        7: '&#58149;',
        8: '&#58928;',
        9: '&#58397;'
      },
      virtualList: [],
      virtualListValue: undefined,
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
      checkboxGroup3: ['SNVs', 'Indels', 'SVs'],
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
        { name: 'Indels', num: 0 },
        { name: 'SVs', num: 0 }
      ],
      tableData: [],
      tableSubData: [
        {
          NorthEast: '0',
          NorthChina: '0',
          EastChina: '0',
          CentralChina: '0',
          NorthWest: '0',
          SouthWest: '0',
          SouthChina: '0'
        }
      ],
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
      ],
      tableBgPos: '',
      dataList: [],
      code: '4t5dac4nhxz41e6u',
      NorthChina: this.$t('variat.NorthChina'),
      NorthEast: this.$t('variat.NorthEast'),
      EastChina: this.$t('variat.EastChina'),
      CentralChina: this.$t('variat.CentralChina'),
      SouthChina: this.$t('variat.SouthChina'),
      SouthWest: this.$t('variat.SouthWest'),
      NorthWest: this.$t('variat.NorthWest')
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
        const margin = (_this.containerWidth / 20) * 1.5
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
            .axisBottom()
            .scale(scale)
            .ticks(10)
            .tickPadding(10)
          // svg
          //   .append('text')
          //   .attr('x', 0)
          //   .attr('y', 50)
          //   .attr('fill', '#409EFF')
          //   .attr('font-size', 18)
          //   .text(function() {
          //     return 'chr' + (_this.gene.chrom === 23 ? 'X' : _this.gene.chrom) + '(GRCh38)'
          //   })
          svg
            .append('g')
            .attr('transform', function() {
              return 'translate(' + margin + ',50)'
            })
            .call(axis)
        }
        function geneAnnotation(genename, geneid) {
          const margin = (_this.containerWidth / 20) * 1.5
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
                    .attr('y1', 13 + 15 * count)
                    .attr(
                      'x2',
                      ((d['end'] - positionStart) / geneLength) * width
                    )
                    .attr('y2', 13 + 15 * count)
                    .attr('stroke', '#dbdbdb')
                    .attr('stroke-width', 2)
                  _this.svg
                    .append('text')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width -
                        d['gene'].length * 10.5
                    )
                    .attr('y', 18 + 15 * count)
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
                    .attr('y', 6 + 15 * count)
                    .attr(
                      'width',
                      ((d['end'] - d['start']) / geneLength) * width
                    )
                    .attr('height', 14)
                    .attr('fill', '#424242')
                }
                if (d['type'] === 'exon') {
                  _this.svg
                    .append('rect')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width
                    )
                    .attr('y', 10 + 15 * count)
                    .attr(
                      'width',
                      ((d['end'] - d['start']) / geneLength) * width
                    )
                    .attr('height', 5)
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
                    .attr('y1', 13 + 15 * count)
                    .attr(
                      'x2',
                      ((d['end'] - positionStart) / geneLength) * width
                    )
                    .attr('y2', 13 + 15 * count)
                    .attr('stroke', '#c7def5')
                    .attr('stroke-width', 2)
                  _this.svg
                    .append('text')
                    .attr(
                      'x',
                      ((d['start'] - positionStart) / geneLength) * width -
                        d['gene_id'].length * 8
                    )
                    .attr('y', 18 + 15 * count)
                    .attr('fill', '#409EFF')
                    .attr('font-size', 12)
                    .attr('geneId', d['gene_id'])
                    .text(function() {
                      return d['gene_id']
                    })
                }
                if (d['parent'] === parent) {
                  if (d['type'] === 'CDS') {
                    _this.svg
                      .append('rect')
                      .attr(
                        'x',
                        ((d['start'] - positionStart) / geneLength) * width
                      )
                      .attr('y', 6 + 15 * count)
                      .attr(
                        'width',
                        ((d['end'] - d['start']) / geneLength) * width
                      )
                      .attr('height', 14)
                      .attr('fill', '#81bcf9')
                  }
                  if (d['type'] === 'exon') {
                    _this.svg
                      .append('rect')
                      .attr(
                        'x',
                        ((d['start'] - positionStart) / geneLength) * width
                      )
                      .attr('y', 10 + 15 * count)
                      .attr(
                        'width',
                        ((d['end'] - d['start']) / geneLength) * width
                      )
                      .attr('height', 5)
                      .attr('fill', '#81bcf9')
                      .attr('class', 'UTR')
                  }
                }
              })
            }
          })
          const height = 16 * (count + 1)
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
        const margin = (_this.containerWidth / 20) * 1.5
        const width = _this.containerWidth - margin * 2
        const height = 100
        const canvas = document.getElementById('canvas')
        let thisColor, activeColor, cx
        canvas.height = height
        canvas.width = width
        const ctx = canvas.getContext('2d')
        _this.filterData.variation.forEach(function(d, i) {
          cx =
            ((d['start'] +
              parseInt(d['end'] - d['start'] + 3) / 2 -
              positionStart) /
              geneLength) *
            width
          if (
            d['func'].indexOf('ncRNA_exonic') !== -1 ||
            d['func'].indexOf('ncRNA_intronic') !== -1 ||
            d['func'].indexOf('intronic') !== -1 ||
            d['func'].indexOf('UTR5') !== -1 ||
            d['func'].indexOf('UTR3') !== -1 ||
            d['func'].indexOf('ncRNA_splicing') !== -1 ||
            d['func'].indexOf('UTR5;UTR3') !== -1 ||
            d['func'].indexOf('ncRNA_exonic;splicing') !== -1 ||
            d['func'].indexOf('ncRNA_UTR5') !== -1
          ) {
            thisColor = _this.color[2]
            activeColor = _this.colorActive[2]
          } else if (
            d['func'].indexOf('exonic') !== -1 ||
            d['func'].indexOf('splicing') !== -1 ||
            d['func'].indexOf('exonic;splicing') !== -1
          ) {
            thisColor = _this.color[0]
            activeColor = _this.colorActive[0]
          } else {
            thisColor = _this.color[3]
            activeColor = _this.colorActive[3]
          }
          if (d['chn100k_ALL'] !== '.') {
            if (i < 10) {
              _this.BezierEllipse1(
                ctx,
                cx,
                50,
                parseInt(d['end'] - d['start'] + 5),
                parseInt(35 * d['chn100k_ALL']),
                '#DCDFE6',
                activeColor
              )
            } else {
              _this.BezierEllipse1(
                ctx,
                cx,
                50,
                parseInt(d['end'] - d['start'] + 5),
                parseInt(35 * d['chn100k_ALL']),
                '#C0C4CC',
                thisColor
              )
            }
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
        let svNum = 0
        if (_this.filterData.variation) {
          _this.filterData.variation.forEach(function(d) {
            let exonicFunColor = ''
            let exonicFuncValue = ''
            if (
              d['func'].indexOf('ncRNA_exonic') !== -1 ||
              d['func'].indexOf('ncRNA_intronic') !== -1 ||
              d['func'].indexOf('intronic') !== -1 ||
              d['func'].indexOf('UTR5') !== -1 ||
              d['func'].indexOf('UTR3') !== -1 ||
              d['func'].indexOf('ncRNA_splicing') !== -1 ||
              d['func'].indexOf('UTR5;UTR3') !== -1 ||
              d['func'].indexOf('ncRNA_exonic;splicing') !== -1 ||
              d['func'].indexOf('ncRNA_UTR5') !== -1
            ) {
              exonicFunColor = 'success'
            } else if (
              d['func'].indexOf('exonic') !== -1 ||
              d['func'].indexOf('splicing') !== -1 ||
              d['func'].indexOf('exonic;splicing') !== -1
            ) {
              exonicFunColor = 'danger'
            } else {
              exonicFunColor = 'info'
            }

            if (d['exonicFunc'].indexOf('.') !== -1) {
              exonicFuncValue = d['func']
            } else {
              exonicFuncValue = d['func'] + ':' + d['exonicFunc']
            }
            if (
              d['func'] === 'splicing' ||
              d['func'] === 'exonic;splicing' ||
              d['exonicFunc'] === 'stopgain' ||
              d['exonicFunc'] === 'frameshift insertion' ||
              d['exonicFunc'] === 'frameshift deletion' ||
              d['exonicFunc'] === 'startloss' ||
              d['exonicFunc'] === 'stoploss'
            ) {
              pLoFNum = pLoFNum + 1
            } else if (
              d['exonicFunc'] === 'nonsynonymous SNV' ||
              d['exonicFunc'] === 'nonframeshift deletion' ||
              d['exonicFunc'] === 'nonframeshift insertion'
            ) {
              MissenseNum = MissenseNum + 1
            } else if (
              d['exonicFunc'] === 'synonymous SNV' ||
              d['exonicFunc'] === 'unknown'
            ) {
              SynonymousNum = SynonymousNum + 1
            } else if (
              d['func'] !== 'splicing' &&
              d['func'] !== 'exonic;splicing' &&
              d['func'] !== 'exonic'
            ) {
              OtherNum = OtherNum + 1
            }

            if (d['variation_type'].indexOf('exome') !== -1) {
              exomeNum = exomeNum + 1
            }
            if (d['variation_type'].indexOf('genome') !== -1) {
              genomeNum = genomeNum + 1
            }
            if (d['variation_type'].indexOf('SNV') !== -1) {
              snvNum = snvNum + 1
            }
            if (d['variation_type'].indexOf('INDEL') !== -1) {
              indelNum = indelNum + 1
            }
            if (d['variation_type'].indexOf('SV') !== -1) {
              svNum = svNum + 1
            }
            _this.tableData.push({
              id: d['id'],
              variatiId: d['uu_id'],
              chrom: d['chrom'],
              rsid: d['RSID'],
              exonicFunColor: exonicFunColor,
              exonicFuncValue: exonicFuncValue,
              variation_type: d['variation_type'],
              chn100k_ALL: parseFloat(d['chn100k_ALL'] * 100).toFixed(4) + '%',
              AC:
                d['chn100k_ALL'] === '0.0'
                  ? 1
                  : Math.ceil(d['chn100k_ALL'] * 25169 * 2),
              gene: d['gene'],
              geneDetail: d['geneDetail'],
              chn100k_NE: d['chn100k_NE'],
              chn100k_N: d['chn100k_N'],
              chn100k_E: d['chn100k_E'],
              chn100k_C: d['chn100k_C'],
              chn100k_NW: d['chn100k_NW'],
              chn100k_SW: d['chn100k_SW'],
              chn100k_S: d['chn100k_S']
            })
          })
        }
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
          { name: 'Indels', num: indelNum },
          { name: 'SVs', num: svNum }
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
      if (_this.filterData.variation) {
        geneVariation() // 变异功能类型及筛选
      }
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
        chrom: this.gene.chrom === 'x' ? 23 : this.gene.chrom
      }
      genePositionData(data).then(response => {
        if (response.variation) {
          response.variation = JSON.parse(
            decrypt(response.variation, decrypt(response.key, this.code))
          )
          this.scrollHeight = response.variation.length * 51
        }
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
      //   this.dom = this.$refs.filterTable.bodyWrapper
      //   this.dom.addEventListener('scroll', function () {
      //   const windowHeight = _this.dom.clientHeight
      //   const scrollHeight = _this.dom.scrollHeight
      //   const needScroll = scrollHeight - windowHeight
      //   const scrollTop = _this.dom.scrollTop
      //   const positionStart =
      //     _this.gene.start - 100 < 0 ? 0 : _this.gene.start - 100
      //   const positionEnd = _this.gene.end + 100
      //   const geneLength = positionEnd - positionStart
      //   const margin = (_this.containerWidth / 20) * 1.5
      //   const width = _this.containerWidth - margin * 2
      //   const canvas = document.getElementById('canvas')
      //   let thisColor, activeColor, cx
      //   const ctx = canvas.getContext('2d')
      //   ctx.clearRect(0,0,width,100)
      //   _this.minIdxSC = Math.ceil(
      //     (scrollTop * (_this.filterData.variation.length - 1)) / needScroll
      //   )
      //   if (_this.minIdxSC < 5) {
      //     _this.minIdxSC = 5
      //   } else if (_this.minIdxSC > _this.filterData.variation.length - 6) {
      //     _this.minIdxSC = _this.filterData.variation.length - 5
      //   }
      //   _this.filterData.variation.forEach(function (d, i) {
      //     if (
      //       d['func'].indexOf('ncRNA_exonic') !== -1 ||
      //       d['func'].indexOf('ncRNA_intronic') !== -1 ||
      //       d['func'].indexOf('intronic') !== -1 ||
      //       d['func'].indexOf('UTR5') !== -1 ||
      //       d['func'].indexOf('UTR3') !== -1 ||
      //       d['func'].indexOf('ncRNA_splicing') !== -1 ||
      //       d['func'].indexOf('UTR5;UTR3') !== -1 ||
      //       d['func'].indexOf('ncRNA_exonic;splicing') !== -1 ||
      //       d['func'].indexOf('ncRNA_UTR5') !== -1
      //     ) {
      //       thisColor = _this.color[2]
      //       activeColor = _this.colorActive[2]
      //     } else if (
      //       d['func'].indexOf('exonic') !== -1 ||
      //       d['func'].indexOf('splicing') !== -1 ||
      //       d['func'].indexOf('exonic;splicing') !== -1
      //     ) {
      //       thisColor = _this.color[0]
      //       activeColor = _this.colorActive[0]
      //     } else {
      //       thisColor = _this.color[3]
      //       activeColor = _this.colorActive[3]
      //     }
      //     cx =
      //       ((d['start'] +
      //         parseInt(d['end'] - d['start'] + 3) / 2 -
      //         positionStart) /
      //         geneLength) *
      //       width
      //     if (d['chn100k_ALL'] !== '.') {
      //       if (_this.minIdxSC - i < 6 && _this.minIdxSC - i > -6) {
      //         _this.BezierEllipse1(ctx,cx,50,parseInt(d['end'] - d['start'] + 5),parseInt(35 * d['chn100k_ALL']),'#DCDFE6',activeColor)
      //       } else {
      //         _this.BezierEllipse1(ctx,cx,50,parseInt(d['end'] - d['start'] + 5),parseInt(35 * d['chn100k_ALL']),'#C0C4CC',thisColor)
      //       }
      //     }
      //   })
      // })
      const svgDrag = document.getElementById('svg-drag')
      // 火狐
      if (window.addEventListener) {
        svgDrag.addEventListener(
          'DOMMouseScroll',
          function(evt) {
            const e = evt || window.event
            const detail = -e.detail / 3
            if (detail >= 1) {
              _this.zoomClick('3')
            }
            if (detail <= -1) {
              _this.zoomClick('0.3333')
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
          _this.zoomClick('3')
        }
        if (detail <= -1) {
          _this.zoomClick('0.3333')
        }
        return false
      }
    }
    this.initMap()
    this.initChart()
  },
  methods: {
    zoomClick(value) {
      this.loading = true
      const center =
        parseInt((this.gene.end - this.gene.start) / 2) + this.gene.start
      const length = parseInt(((this.gene.end - this.gene.start) * value) / 2)
      if (length > 500) {
        const start = center - length <= 0 ? 0 : center - length
        const end = center + length
        const data = {
          start: start,
          end: end,
          chrom: this.gene.chrom === 'x' ? 23 : this.gene.chrom
        }
        genePositionData(data).then(response => {
          if (response.variation) {
            response.variation = JSON.parse(
              decrypt(response.variation, decrypt(response.key, this.code))
            )
            this.scrollHeight = response.variation.length * 51
          }
          this.geneData = response
          this.filterData = Object.assign({}, response)
          this.containerWidth = parseInt(
            d3.select('.axis-container').style('width')
          )
          this.gene.start = data.start
          this.gene.end = data.end
          this.$store.dispatch('variations/geneSearch', this.gene)
          this.loading = false
        })
      } else {
        this.loading = false
      }
    },
    moveClick(value) {
      this.loading = true
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
          if (response.variation) {
            response.variation = JSON.parse(
              decrypt(response.variation, decrypt(response.key, this.code))
            )
            this.scrollHeight = response.variation.length * 51
          }
          this.geneData = response
          this.filterData = Object.assign({}, response)
          this.containerWidth = parseInt(
            d3.select('.axis-container').style('width')
          )
          this.gene.start = data.start
          this.gene.end = data.end
          this.$store.dispatch('variations/geneSearch', this.gene)
          this.loading = false
        })
      } else {
        this.loading = false
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
        this.zoomClick('3')
      }
      if (detail <= -1) {
        this.zoomClick('0.33333')
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
      const margin = (_this.containerWidth / 20) * 1.5
      const width = _this.containerWidth - margin * 2
      let temp = Infinity
      let scrollIndex = 0
      const canvas = document.getElementById('canvas')
      let thisColor, activeColor, cx
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, width, 100)
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
            parseInt(d['end'] - d['start'] + 5) / 2 -
            positionStart) /
            geneLength) *
          width
        if (
          d['func'].indexOf('ncRNA_exonic') !== -1 ||
          d['func'].indexOf('ncRNA_intronic') !== -1 ||
          d['func'].indexOf('intronic') !== -1 ||
          d['func'].indexOf('UTR5') !== -1 ||
          d['func'].indexOf('UTR3') !== -1 ||
          d['func'].indexOf('ncRNA_splicing') !== -1 ||
          d['func'].indexOf('UTR5;UTR3') !== -1 ||
          d['func'].indexOf('ncRNA_exonic;splicing') !== -1 ||
          d['func'].indexOf('ncRNA_UTR5') !== -1
        ) {
          thisColor = _this.color[2]
          activeColor = _this.colorActive[2]
        } else if (
          d['func'].indexOf('exonic') !== -1 ||
          d['func'].indexOf('splicing') !== -1 ||
          d['func'].indexOf('exonic;splicing') !== -1
        ) {
          thisColor = _this.color[0]
          activeColor = _this.colorActive[0]
        } else {
          thisColor = _this.color[3]
          activeColor = _this.colorActive[3]
        }

        if (d['chn100k_ALL'] !== '.') {
          if (_this.minIdxSC - i < 6 && _this.minIdxSC - i > -6) {
            _this.BezierEllipse1(
              ctx,
              cx,
              50,
              parseInt(d['end'] - d['start'] + 5),
              parseInt(35 * d['chn100k_ALL']),
              '#DCDFE6',
              activeColor
            )
          } else {
            _this.BezierEllipse1(
              ctx,
              cx,
              50,
              parseInt(d['end'] - d['start'] + 5),
              parseInt(35 * d['chn100k_ALL']),
              '#C0C4CC',
              thisColor
            )
          }
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
                _this.checkboxGroup1[i] === 'pLoF' &&
                (d['func'] === 'splicing' ||
                  d['func'] === 'exonic;splicing' ||
                  d['exonicFunc'] === 'stopgain' ||
                  d['exonicFunc'] === 'frameshift insertion' ||
                  d['exonicFunc'] === 'frameshift deletion' ||
                  d['exonicFunc'] === 'startloss' ||
                  d['exonicFunc'] === 'stoploss')
              ) {
                filterArr.push(d)
              } else if (
                _this.checkboxGroup1[i] === 'Missense' &&
                d['func'] !== 'splicing' &&
                d['func'] !== 'exonic;splicing' &&
                (d['exonicFunc'] === 'nonsynonymous SNV' ||
                  d['exonicFunc'] === 'nonframeshift deletion' ||
                  d['exonicFunc'] === 'nonframeshift insertion')
              ) {
                filterArr.push(d)
              } else if (
                _this.checkboxGroup1[i] === 'Synonymous' &&
                d['func'] !== 'splicing' &&
                d['func'] !== 'exonic;splicing' &&
                (d['exonicFunc'] === 'synonymous SNV' ||
                  d['exonicFunc'] === 'unknown')
              ) {
                filterArr.push(d)
              } else if (
                _this.checkboxGroup1[i] === 'Other' &&
                d['func'] !== 'splicing' &&
                d['func'] !== 'exonic;splicing' &&
                d['func'] !== 'exonic'
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
              (d['func'] === 'splicing' ||
                d['func'] === 'exonic;splicing' ||
                d['exonicFunc'] === 'stopgain' ||
                d['exonicFunc'] === 'frameshift insertion' ||
                d['exonicFunc'] === 'frameshift deletion' ||
                d['exonicFunc'] === 'startloss' ||
                d['exonicFunc'] === 'stoploss')
            ) {
              filterArr.push(d)
            } else if (
              _this.checkboxGroup1[i] === 'Missense' &&
              d['func'] !== 'splicing' &&
              d['func'] !== 'exonic;splicing' &&
              (d['exonicFunc'] === 'nonsynonymous SNV' ||
                d['exonicFunc'] === 'nonframeshift deletion' ||
                d['exonicFunc'] === 'nonframeshift insertion')
            ) {
              filterArr.push(d)
            } else if (
              _this.checkboxGroup1[i] === 'Synonymous' &&
              d['func'] !== 'splicing' &&
              d['func'] !== 'exonic;splicing' &&
              (d['exonicFunc'] === 'synonymous SNV' ||
                d['exonicFunc'] === 'unknown')
            ) {
              filterArr.push(d)
            } else if (
              _this.checkboxGroup1[i] === 'Other' &&
              d['func'] !== 'splicing' &&
              d['func'] !== 'exonic;splicing' &&
              d['func'] !== 'exonic'
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
            d['variation_type'].indexOf('SNV') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
          if (
            _this.checkboxGroup3[i] === 'Indels' &&
            d['variation_type'].indexOf('INDEL') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
          if (
            _this.checkboxGroup3[i] === 'SVs' &&
            d['variation_type'].indexOf('SV') !== -1
          ) {
            _this.filterData.variation.push(d)
          }
        }
      })
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
            encodeOffsets: polygons2[a]
          },
          properties: {
            name: properties.name[a] || '',
            childNum: polygons[a].length
          }
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
          ['陕西', '甘肃', '青海', '宁夏', '新疆']
        ],
        properties: {
          //自定义大区的名字，要和上面的大区省份一一对应
          name: [
            this.NorthChina,
            this.NorthEast,
            this.EastChina,
            this.CentralChina,
            this.SouthChina,
            this.SouthWest,
            this.NorthWest
          ],
          cp: [
            //经纬度可以自己随意定义
            [116.24, 39.54],
            [126.32, 43.5],
            [121.28, 31.13],
            [114.2, 30.32],
            [113.15, 23.08],
            [104.04, 30.39],
            [103.49, 36.03]
          ]
        }
      }
      if (chinaJson.features && chinaJson.features.length > 8) {
        this.mergeProvinces(chinaJson, params.names, params.properties)
      }
      echarts.registerMap('china', chinaJson) // 注册地图
    },
    initChart(dataList) {
      var _this = this
      var chartDom = document.getElementById('mapChart')
      var clientWidth = document.body.clientWidth
      chartDom.style.height = (460 / 1903) * clientWidth + 'px'
      var myChart = echarts.init(chartDom)

      var option = {
        // center: ['80%', '50%'],
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name // 自行定义formatter格式
          }
        },
        visualMap: {
          // min: 0,
          // max: 1,
          type: 'piecewise',
          left: 'left',
          top: 'top',
          // text: ['High', 'Low'], //取值范围的文字
          splitNumber: 4,
          pieces: [
            { min: 0.05, max: 1, label: '5%-100%', color: '#f96262' },
            { min: 0.01, max: 0.05, label: '1%-5%', color: '#f5c63a' },
            { min: 0.005, max: 0.01, label: '0.5%-1%', color: '#48bd48' },
            { min: 0, max: 0.005, label: '0%-0.5%', color: '#40a1e5' },
            { value: 0, label: '0%', color: '#eeeeee' }
          ],
          // inRange: {
          // color: ['#e0ffff', '#2196f3'], //取值范围的颜色
          // color: ['#1f77b4', '#2ca02c', '#ff7f0e', '#d62728'],
          // color: ['#ffffff', '#1f77b4', '#2ca02c', '#ff7f0e', '#d62728'],
          // color: function(e){
          //   console.log(e)
          // }
          // color: [['ffffff','#eeeeee'], ['ffffff','#d62728'],['ffffff','#ff7f0e'],['ffffff','#2ca02c'],['ffffff','#1f77b4']],
          // colorLightness: [0.8, 0.2],
          // color: ['#eeeeee', 'rgba(31,119,180,1)', 'rgba(44,160,44,1)', 'rgba(255,127,14,1)', 'rgba(214,39,40,1)'],
          // opacity: [0.3, 1]
          // colorLightness: [0.8, 0.2]
          // color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          // symbolSize: [30, 100]
          // },
          show: true //图注
        },
        geo: {
          map: 'china',
          roam: false, //不开启缩放和平移
          center: [105, 35],
          zoom: 1, //视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '12',
              color: 'rgba(0,0,0,0.7)'
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          // regions: [
          //   {
          //     name: '南海诸岛',
          //     itemStyle: {
          //       // 隐藏地图
          //       normal: {
          //         opacity: 0, // 为 0 时不绘制该图形
          //       },
          //     },
          //     label: {
          //       show: false, // 隐藏文字
          //     },
          //   },
          // ],
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '变异数量',
            type: 'map',
            geoIndex: 0,
            data: dataList
          }
        ]
      }
      myChart.setOption(option, true)

      myChart.on('click', function(params) {
        if (params.name === _this.NorthEast) {
          _this.tableBgPos = 'chn100k_NE'
          _this.dataList = [
            {
              name: _this.NorthEast,
              value: 0.004
            }
          ]
        }
        if (params.name === _this.NorthChina) {
          _this.tableBgPos = 'chn100k_N'
          _this.dataList = [
            {
              name: _this.NorthChina,
              value: 0.004
            }
          ]
        }
        if (params.name === _this.EastChina) {
          _this.tableBgPos = 'chn100k_E'
          _this.dataList = [
            {
              name: _this.EastChina,
              value: 0.004
            }
          ]
        }
        if (params.name === _this.CentralChina) {
          _this.tableBgPos = 'chn100k_C'
          _this.dataList = [
            {
              name: _this.CentralChina,
              value: 0.004
            }
          ]
        }
        if (params.name === _this.SouthChina) {
          _this.tableBgPos = 'chn100k_S'
          _this.dataList = [
            {
              name: _this.SouthChina,
              value: 0.004
            }
          ]
        }
        if (params.name === _this.NorthWest) {
          _this.tableBgPos = 'chn100k_NW'
          _this.dataList = [
            {
              name: _this.NorthWest,
              value: 0.004
            }
          ]
        }
        if (params.name === _this.SouthWest) {
          _this.tableBgPos = 'chn100k_SW'
          _this.dataList = [
            {
              name: _this.SouthWest,
              value: 0.004
            }
          ]
        }
        myChart.clear()
        myChart.off()
        _this.initChart(_this.dataList)
        _this.$refs.filterTable.setCurrentRow()
      })
      this.$nextTick(() => {
        myChart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
      })
    },
    tableCell(row, column, event, cell) {
      this.dataList = [
        {
          name: this.NorthEast,
          value: row.chn100k_NE
        },
        {
          name: this.NorthChina,
          value: row.chn100k_N
        },
        {
          name: this.SouthChina,
          value: row.chn100k_S
        },
        {
          name: this.EastChina,
          value: row.chn100k_E
        },
        {
          name: this.CentralChina,
          value: row.chn100k_C
        },
        {
          name: this.SouthWest,
          value: row.chn100k_SW
        },
        {
          name: this.NorthWest,
          value: row.chn100k_NW
        }
      ]
      this.tableSubData = [
        {
          NorthEast: row.chn100k_NE,
          NorthChina: row.chn100k_N,
          EastChina: row.chn100k_E,
          CentralChina: row.chn100k_C,
          NorthWest: row.chn100k_NW,
          SouthWest: row.chn100k_SW,
          SouthChina: row.chn100k_S
        }
      ]
      if (this.tableBgPos !== '') {
        this.tableBgPos = ''
      }
      this.initChart(this.dataList)
    },
    TableRowStyle(row) {
      let rowBackground = {}
      if (this.tableBgPos) {
        if (0 < row.row[this.tableBgPos] && row.row[this.tableBgPos] < 0.005) {
          rowBackground.background =
            'rgba(123,189,235,' + row.row[this.tableBgPos] * 1000 + ')'
        }
        if (
          0.005 <= row.row[this.tableBgPos] &&
          row.row[this.tableBgPos] < 0.01
        ) {
          rowBackground.background =
            'rgba(111,215,111,' + row.row[this.tableBgPos] * 1000 + ')'
        }
        if (
          0.01 <= row.row[this.tableBgPos] &&
          row.row[this.tableBgPos] < 0.05
        ) {
          rowBackground.background =
            'rgba(245,198,58,' + row.row[this.tableBgPos] * 1000 + ')'
        }
        if (0.05 <= row.row[this.tableBgPos] && row.row[this.tableBgPos] < 1) {
          rowBackground.background =
            'rgba(245,138,138,' + row.row[this.tableBgPos] * 1000 + ')'
        }
        // rowBackground.background =
        //   'rgba(145,213,255,' + row.row[this.tableBgPos] * 1000 + ')'
      }
      return rowBackground
    },
    onReset() {
      if (this.tableBgPos !== '') {
        this.tableBgPos = ''
      }
      if (this.dataList.length > 0) {
        this.dataList = []
        this.$refs.filterTable.setCurrentRow()
        this.initChart(this.dataList)
      }
      this.tableSubData = [
        {
          NorthEast: 0,
          NorthChina: 0,
          EastChina: 0,
          CentralChina: 0,
          NorthWest: 0,
          SouthWest: 0,
          SouthChina: 0
        }
      ]
    },
    BezierEllipse1(context, x, y, a, b, strokeColor, fillColor) {
      context.save()
      var r = a > b ? a : b
      var ratioX = a / r
      var ratioY = b / r
      context.scale(ratioX, ratioY)
      context.beginPath()
      context.moveTo((x + a) / ratioX, y / ratioY)
      context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI)
      context.closePath()
      context.strokeStyle = strokeColor
      context.fillStyle = fillColor
      context.fill()
      context.stroke()
      context.restore()
    },
    secretNumber(value, n) {
      if (!n) n = 20
      var newval = value
      var newvalArr = null
      if (value) {
        if (newval.length > n) {
          newval = newval.substring(0, n)
          newvalArr = newval.split('')
          for (var i = 0; i < newvalArr.length; i++) {
            if (this.numberMap[newvalArr[i]]) {
              newvalArr[i] = this.numberMap[newvalArr[i]]
            }
          }
          newval = newvalArr.join('')
          newval = newval + '...'
        } else {
          newvalArr = newval.split('')
          for (var i = 0; i < newvalArr.length; i++) {
            if (this.numberMap[newvalArr[i]]) {
              newvalArr[i] = this.numberMap[newvalArr[i]]
            }
          }
          newval = newvalArr.join('')
        }
      } else {
        newval = '.'
      }
      return newval
    }
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'stone-secret';
  src: url('../assets/font/stone.woff2') format('truetype');
}

.stonebox {
  font-family: 'stone-secret', 'Hiragino Sans GB', 'Microsoft yahei', Arial,
    sans-serif, '宋体' !important;
}
#spage-tbshare-container {
  width: 34px;
  height: 122px;
  border-radius: 6px 0 0 6px;
  background: #84c0f2;
  position: fixed;
  right: 0;
  top: 30%;
  z-index: 99;
  .tbshare_popup_enter {
    width: 34px;
    height: 122px;
    padding-top: 24px;
    color: #ffffff;
    font-size: 18px;
    writing-mode: vertical-rl;
    text-align: left;
    line-height: 34px;
  }
  .tbshare_popup_main {
    display: none;
    background: #ffffff;
    width: 180px;
    position: absolute;
    right: 74px;
    top: 0;
    .box-card {
      width: 220px;
      // margin-right: 4px;
      .checkbox-container {
        width: 180px;
        .el-checkbox-group {
          .el-checkbox-button {
            position: relative;
            margin: 2px 0;
            .num-tag {
              position: absolute;
              top: -1px;
              left: 119px;
              width: 60px;
              height: 40px;
              line-height: 40px;
              white-space: nowrap;
              -webkit-appearance: none;
              text-align: center;
              box-sizing: border-box;
              outline: 0;
              margin: 0;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              font-size: 14px;
              border-radius: 0 4px 4px 0;
              border-color: #409eff;
              border-left: none;
            }
          }
          // .el-checkbox-button:first-child {
          //   .num-tag {
          //     border: 1px solid #409eff;
          //     border-radius: 0 0 0 4px;
          //   }
          // }
          // .el-checkbox-button:last-child {
          //   .num-tag {
          //     border-radius: 0 0 4px 0;
          //   }
          // }
        }
      }
    }
  }
}
#spage-tbshare-container:hover {
  border-radius: 0;
  .tbshare_popup_main {
    display: block;
  }
}
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
  .el-table {
    max-width: 96%;
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
  #mapChart {
    height: 460px;
  }
  .resetBtn {
    position: absolute;
    left: 5px;
    top: -34px;
    padding: 6px 21px;
  }
}
</style>
<style>
#spage-tbshare-container .el-checkbox-button__inner {
  width: 120px;
  height: 40px;
  margin-right: 60px;
  border-radius: 4px 0 0 4px;
  border-left: 1px solid #dcdfe6;
}
#spage-tbshare-container
  .el-checkbox-button.is-checked
  .el-checkbox-button__inner {
  border-left-color: #409eff;
}
#spage-tbshare-container
  .el-checkbox-button.is-focus
  .el-checkbox-button__inner {
  border-left-color: #409eff;
}
.el-link.el-link--primary {
  color: #0580ff;
}
.gene-table .el-tooltip__popper.is-dark {
  display: none !important;
}
.my-divider {
  margin: 10px 0;
}
</style>
