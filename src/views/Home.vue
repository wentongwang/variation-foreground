<template>
  <div>
    <Nav />
    <el-main style="height:100vh;">
      <div class="main-container">
        <el-image style="margin-top:60px; width: 200px" :src="img" />
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
        <p class="tips">
          {{ $t('home.content.con1') }}
        </p>
      </div>
    </el-main>
  </div>
</template>

<script>
import { search, variant } from '@/api/variation'
import Nav from '@/components/Nav'

export default {
  name: 'Home',
  components: {
    Nav
  },
  data() {
    return {
      img: require('../assets/logo.png'),
      value: [],
      loading: false,
      options: []
    }
  },
  methods: {
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
              parseInt(queryArr[2]) > parseInt(queryArr[1]) &&
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
      if (e.type === 'gene' || e.type === 'pseudogene') {
        this.$router.push('/gene')
        this.$store.dispatch('variations/geneSearch', e)
      }
      if (e.type === 'position') {
        this.$router.push('/position')
        this.$store.dispatch('variations/positionSearch', e)
      }
      if (e.type === 'variant') {
        this.$router.push('/variant?id=' + e.value)
        this.$store.dispatch('variations/variationSearch', e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-main {
  background-color: #fafafa;
  color: #333;
  text-align: center;
  .word {
    font-size: 20px;
    letter-spacing: 1.5px;
  }
  .search {
    width: 30%;
  }
  .tips {
    width: 32%;
    min-width: 600px;
    font-size: 16px;
    margin: 20px auto;
    text-align: left;
    line-height: 25px;
  }
}
</style>
