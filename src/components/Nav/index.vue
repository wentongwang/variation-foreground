<template>
  <el-header class="hello" :gutter="20">
    <el-row>
      <el-col class="logo" :span="6"
        ><span @click="GoToIndex">{{ $t('index.name') }}</span></el-col
      >
      <el-col class="input-contaner" :span="5" :offset="4">
        <el-select
          v-model="value"
          class="header-search"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('index.search')"
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
      </el-col>
      <el-col class="input-contaner" :span="2" :offset="3">
        <el-link href="http://bioinformatics.hit.edu.cn/imputation/" target="_blank" style="animate__bounce"
          >
          <span class="word-container">I</span>
          <span class="word-container">M</span>
          <span class="word-container">P</span>
          <span class="word-container">U</span>
          <span class="word-container">T</span>
          <span class="word-container">A</span>
          <span class="word-container">T</span>
          <span class="word-container">I</span>
          <span class="word-container">O</span>
          <span class="word-container">N</span>
          <span class="svg-container">
            <i class="el-icon-top-right" /> </span
          >
        </el-link>
      </el-col>
      <el-col class="input-contaner" :span="2">
        <lang-select class="right-menu-item hover-effect" />
      </el-col>
      <el-col class="input-contaner" :span="2">
        <log-out class="right-menu-item hover-effect" />
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { search, variant, svVariant } from '@/api/variation'
import LangSelect from '@/components/LangSelect'
import LogOut from '@/components/LogOut'

export default {
  name: 'Nav',
  components: {
    LangSelect,
    LogOut,
  },
  inject: ['reload'],
  data() {
    return {
      msg: '',
      value: '',
      loading: false,
      options: [],
    }
  },
  methods: {
    GoToIndex: function () {
      this.$router.replace('/')
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
                queryArr[0] === 'x' || queryArr[0] === 'X' || queryArr[0] === 'chrx' || queryArr[0] === 'chrX'
                    ? 23
                    : parseInt(queryArr[0].replace(/[^\d]/g, " ")),
                start: parseInt(queryArr[1]) - 1,
                end: parseInt(queryArr[1]) + 1,
                type: 'position',
              })
            }
          }
          if (queryArr.length === 3) {
            if (
              parseInt(queryArr[2]) >= parseInt(queryArr[1]) &&
              parseInt(queryArr[1]) > 10
            ) {
              _this.options.push({
                value: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[2],
                label: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[2],
                chrom:
                queryArr[0] === 'x' || queryArr[0] === 'X' || queryArr[0] === 'chrx' || queryArr[0] === 'chrX'
                    ? 23
                    : parseInt(queryArr[0].replace(/[^\d]/g, " ")),
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
      const _this = this
      if (e.type === 'gene' || e.type === 'pseudogene') {
        this.$router.push('/gene')
        this.$store.dispatch('variations/geneSearch', e)
        _this.options = []
        this.reload()
      }
      if (e.type === 'position') {
        this.$router.push('/position')
        this.$store.dispatch('variations/positionSearch', e)
        _this.options = []
        this.reload()
      }
      if (e.type === 'variant') {
        this.$router.push(
          '/variant?id=' + e.value + '&chrom=' + this.options[0].chrom
        )
        this.$store.dispatch('variations/variationSearch', e)
        _this.options = []
        this.reload()
      }
      if (e.type === 'svVariant') {
        this.$router.push(
          '/svVariant?id=' + e.value + '&chrom=' + this.options[0].chrom
        )
        this.$store.dispatch('variations/variationSearch', e)
        _this.options = []
        this.reload()
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
        this.$store.dispatch('variations/variationSearch', this.options[0])
      }
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  background-color: #000000;
  color: #ffffff;
  text-align: left;
  line-height: 60px;
  overflow: hidden;
  .logo {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    float: left;
  }
  .input-contaner {
    text-align: center;
    float: left;
    .header-search {
      width: 100%;
    }
    a {
      color: #ffffff;
    }
  }
  span {
    display: inline-block;
    height: 100%;
  }
  .svg-container{
    font-size: 16px;
  }
  .word-container{
    font-size: 18px;
    text-shadow: 2px 2px 5px #409EFF;
    animation:change 1s ease infinite alternate;
  }
  .el-link--inner .word-container:nth-child(2){
      animation-delay:0.1s;
  }
  .el-link--inner .word-container:nth-child(3){
      animation-delay:0.2s;
  }
  .el-link--inner .word-container:nth-child(4){
      animation-delay:0.3s;
  }
  .el-link--inner .word-container:nth-child(5){
      animation-delay:0.4s;
  }
  .el-link--inner .word-container:nth-child(6){
      animation-delay:0.5s;
  }
  .el-link--inner .word-container:nth-child(7){
      animation-delay:0.6s;
  }
  .el-link--inner .word-container:nth-child(8){
      animation-delay:0.7s;
  }
  .el-link--inner .word-container:nth-child(9){
      animation-delay:0.8s;
  }
  .el-link--inner .word-container:nth-child(10){
      animation-delay:0.9s;
  }

  @keyframes change{
    50%{
      //  transform: translateY(-5px);
      opacity: 0.75;
      filter: alpha(opacity = 75);
    }
    100%{
      //  transform: translateY(-5px);
      opacity: 0.5;
      filter: alpha(opacity = 50);
    }
  }
}
</style>
