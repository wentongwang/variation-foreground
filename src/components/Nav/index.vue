<template>
  <el-header class="hello" :gutter="20">
    <el-row>
      <el-col
        class="logo"
        :span="6"
      ><span @click="GoToIndex">{{ $t('index.name') }}</span></el-col>
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
      <el-col class="input-contaner" :span="2" :offset="5">
        <lang-select class="right-menu-item hover-effect" />
      </el-col>
      <el-col class="input-contaner" :span="2">
        <log-out class="right-menu-item hover-effect" />
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { search, variant } from '@/api/variation'
import LangSelect from '@/components/LangSelect'
import LogOut from '@/components/LogOut'

export default {
  name: 'Nav',
  components: {
    LangSelect,
    LogOut
  },
  inject: ['reload'],
  data() {
    return {
      msg: '',
      value: '',
      loading: false,
      options: []
    }
  },
  methods: {
    GoToIndex: function() {
      this.$router.replace('/')
    },
    remoteMethod(query) {
      if (query !== '') {
        const queryArr = query.split('-')
        this.options = []
        const _this = this
        if (queryArr.length > 0 && queryArr[0] < 23) {
          if (queryArr.length === 2) {
            if (parseInt(queryArr[1]) > 10) {
              _this.options.push({
                value: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[1],
                label: queryArr[0] + '-' + queryArr[1] + '-' + queryArr[1],
                chrom: parseInt(queryArr[0]),
                start: parseInt(queryArr[1]) - 1,
                end: parseInt(queryArr[2]) + 1,
                type: 'position'
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
                chrom: parseInt(queryArr[0]),
                start: parseInt(queryArr[1]) - 1,
                end: parseInt(queryArr[2]) + 1,
                type: 'position'
              })
            }
          }
          if (queryArr.length >= 4) {
            this.loading = true
            const data = {
              variantId: query.toUpperCase()
            }
            variant(data).then(response => {
              const data = response.listData
              data.forEach(function(val, index, arr) {
                _this.options.push({
                  chrom: val.chrom,
                  value: val.uuId,
                  label: val.uuId,
                  type: response['type'],
                  start: parseInt(val.start) - 1,
                  end: parseInt(val.end) + 1
                })
              })
              this.loading = false
            })
          }
        } else {
          this.loading = true
          search(query.toUpperCase()).then(response => {
            const data = response.listData
            data.forEach(function(val, index, arr) {
              _this.options.push({
                chrom: parseInt(val.chrom.split('.')[0].split('_')[1]),
                value: val.gene,
                label: val.gene,
                type: data[0]['type'],
                start: parseInt(val.start) - 1,
                end: parseInt(val.end) + 1
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
        this.$router.push('/variant?id=' + e.value)
        this.$store.dispatch('variations/variationSearch', e)
        _this.options = []
        this.reload()
      }
    }
  }
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
    float: left;
    .header-search {
      width: 100%;
    }
  }
  span {
    display: inline-block;
    height: 100%;
  }
}
</style>
