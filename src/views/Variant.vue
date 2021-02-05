<template>
  <div>
    <Nav />
    <el-main v-loading="loading">
      <div v-if="variantion" class="main-container">
        <p class="title">
          {{
            variantion.variation_type === 'snv'
              ? $t('variat.snv')
              : $t('variat.InDel')
          }}：{{ variantId }}
        </p>
        <el-divider />
        <div class="sub-content-1">
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="2"
            ><div class="grid-title">
              {{ $t('variat.vep') }}
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="4"
            ><div class="grid-content">
              {{ $t('variat.Exonic_function') + variantion.exonic_function }}
            </div></el-col>
            <el-col
              :span="10"
              :offset="0"
            ><div class="grid-content">
              {{ $t('variat.SIFT') + variantion.sift }}
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="4"
            ><div class="grid-content">
              {{ $t('variat.ClinvarId') + variantion.clinvar_id }}
            </div></el-col>
            <el-col
              :span="10"
              :offset="0"
            ><div class="grid-content">
              {{ $t('variat.polyPhenVal') + variantion.polyPhenVal }}
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="4"
            ><div class="grid-content">
              {{ $t('variat.DiseaseName') + variantion.disease_name_id }}
            </div></el-col>
            <el-col
              :span="10"
              :offset="0"
            ><div class="grid-content">
              {{ $t('variat.GERP') + variantion.gerp }}
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="4"
            ><div class="grid-content">
              {{ $t('variat.Significance') + variantion.significance }}
            </div></el-col>
            <el-col
              :span="10"
              :offset="0"
            ><div class="grid-content">
              {{ $t('variat.CADD') + variantion.cadd }}
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="4"
            ><div class="grid-content">
              {{ $t('variat.OMIMId') + variantion.omim_ID }}
            </div></el-col>
          </el-row>
        </div>
        <div class="sub-content-2">
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="2"
            ><div class="grid-title">
              {{ $t('variat.Population_frequencies') }}
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="10"
              :offset="4"
            ><div style="margin-top: 20px">
              {{ $t('variat.Include') }}:
              <el-radio-group
                v-model="radio2"
                size="medium"
                @change="handleChecked"
              >
                <el-radio-button label="exomes" />
                <el-radio-button label="1000G" />
                <el-radio-button label="ExAC" />
                <el-radio-button label="genomes" />
              </el-radio-group>
              <div class="grid-content">
                <el-table :data="freArr" style="width: 100%">
                  <el-table-column prop="population" :label="$t('variat.population')" />
                  <el-table-column prop="frequency" :label="$t('variat.frequency')" />
                </el-table>
              </div>
            </div>
            </el-col>
            <el-col :span="10" :offset="0"><div class="pie-container" /></el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import { variant } from '@/api/variation'
import * as d3 from 'd3'
import Nav from '@/components/Nav'
export default {
  name: 'Variation',
  components: {
    Nav
  },
  data() {
    return {
      variantId: '',
      radio2: 'exomes',
      loading: true,
      freArr: [],
      variantion: null
    }
  },
  watch: {
    variantion() {
      this.$nextTick(function() {
        this.pieChart()
      })
    }
  },
  created: function() {
    const _this = this
    const url = window.location.href
    const cs = url.split('?')[1]
    this.variantId = cs.split('=')[1]
    const data = {
      variantId: this.variantId
    }
    variant(data).then(response => {
      _this.variantion = response['listData'][0]
      _this.freArr.push({
        population: window.vm.$t('variat.All'),
        frequency: _this.variantion['gnomAD_exome_ALL']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.African'),
        frequency: _this.variantion['gnomAD_exome_AFR']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.Amish'),
        frequency: _this.variantion['gnomAD_exome_AMR']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.AshkenaziJewish'),
        frequency: _this.variantion['gnomAD_exome_ASJ']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.EastAsian'),
        frequency: _this.variantion['gnomAD_exome_EAS']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.EuropeanFinnish'),
        frequency: _this.variantion['gnomAD_exome_FIN']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.EuropeanNonFinnish'),
        frequency: _this.variantion['gnomAD_exome_NFE']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.Other'),
        frequency: _this.variantion['gnomAD_exome_OTH']
      })
      _this.freArr.push({
        population: window.vm.$t('variat.SouthAsian'),
        frequency: _this.variantion['gnomAD_exome_SAS']
      })
      console.log(_this.freArr)
      _this.loading = false
    })
  },
  methods: {
    handleChecked(value) {
      this.freArr = []
      if (this.radio2 === 'exomes') {
        this.freArr.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['gnomAD_exome_ALL']
        })
        this.freArr.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['gnomAD_exome_AFR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['gnomAD_exome_AMR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.AshkenaziJewish'),
          frequency: this.variantion['gnomAD_exome_ASJ']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['gnomAD_exome_EAS']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EuropeanFinnish'),
          frequency: this.variantion['gnomAD_exome_FIN']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EuropeanNonFinnish'),
          frequency: this.variantion['gnomAD_exome_NFE']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Other'),
          frequency: this.variantion['gnomAD_exome_OTH']
        })
        this.freArr.push({
          population: window.vm.$t('variat.SouthAsian'),
          frequency: this.variantion['gnomAD_exome_SAS']
        })
      }
      if (this.radio2 === '1000G') {
        this.freArr.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['thousandG_ALL']
        })
        this.freArr.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['thousandG_AFR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['thousandG_AMR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.European'),
          frequency: this.variantion['thousandG_EUR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['thousandG_EAS']
        })
        this.freArr.push({
          population: window.vm.$t('variat.SouthAsian'),
          frequency: this.variantion['thousandG_SAS']
        })
      }
      if (this.radio2 === 'ExAC') {
        this.freArr.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['exAC_ALL']
        })
        this.freArr.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['exAC_AFR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['exAC_AMR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['exAC_EAS']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EuropeanFinnish'),
          frequency: this.variantion['exAC_FIN']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EuropeanNonFinnish'),
          frequency: this.variantion['exAC_NFE']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Other'),
          frequency: this.variantion['exAC_OTH']
        })
        this.freArr.push({
          population: window.vm.$t('variat.SouthAsian'),
          frequency: this.variantion['exAC_SAS']
        })
      }
      if (this.radio2 === 'genomes') {
        this.freArr.push({
          population: window.vm.$t('variat.All'),
          frequency: this.variantion['gnomAD_genome_ALL']
        })
        this.freArr.push({
          population: window.vm.$t('variat.African'),
          frequency: this.variantion['gnomAD_genome_AFR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Amish'),
          frequency: this.variantion['gnomAD_genome_AMR']
        })
        this.freArr.push({
          population: window.vm.$t('variat.AshkenaziJewish'),
          frequency: this.variantion['gnomAD_genome_ASJ']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EastAsian'),
          frequency: this.variantion['gnomAD_genome_EAS']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EuropeanFinnish'),
          frequency: this.variantion['gnomAD_genome_FIN']
        })
        this.freArr.push({
          population: window.vm.$t('variat.EuropeanNonFinnish'),
          frequency: this.variantion['gnomAD_genome_NFE']
        })
        this.freArr.push({
          population: window.vm.$t('variat.Other'),
          frequency: this.variantion['gnomAD_genome_OTH']
        })
      }
      this.pieChart()
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
            const x =
              arc.centroid(d)[0] < 0
                ? arc.centroid(d)[0] * 3
                : arc.centroid(d)[0] * 3.2 // 文字的x坐标
            const y =
              arc.centroid(d)[1] < 0
                ? arc.centroid(d)[1] * 2.5
                : arc.centroid(d)[1] * 4 // 文字的y坐标
            return 'translate(' + x + ',' + y + ')'
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

        // 添加连接弧外的直线元素
        arcs
          .append('line')
          .attr('stroke', 'black')
          .attr('x1', function(d) {
            return d.data[0] !== 'other' ? arc.centroid(d)[0] * 2 : null
          })
          .attr('y1', function(d) {
            return d.data[0] !== 'other' ? arc.centroid(d)[1] * 2 : null
          })
          .attr('x2', function(d) {
            return d.data[0] !== 'other' ? arc.centroid(d)[0] * 2.3 : null
          })
          .attr('y2', function(d) {
            return d.data[0] !== 'other' ? arc.centroid(d)[1] * 2.3 : null
          })

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
  .title {
    font-weight: bold;
    font-size: 20px;
    text-align: left;
  }
  .sub-content-1,
  .sub-content-2 {
    .el-row {
      .el-col {
        div {
          font-size: 18px;
          line-height: 26px;
          text-align: left;
        }
        .pie-container {
          font-size: 14px;
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
