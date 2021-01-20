<template>
  <el-main>
    <div class="main-container">
      <el-image style="margin-top:60px" :src="img" />
      <p class="word">genome aggregation database</p>
      <el-select
        v-model="value"
        class="search"
        filterable
        remote
        reserve-keyword
        placeholder="Search by gene, region, or variant"
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
        Please note that gnomAD v2.1.1 and v3.1 have substantially different but
        overlapping sample compositions and are on different genome builds. For
        more information, see the FAQ "Should I switch to the latest version of
        gnomAD?"
      </p>
      <p class="tips" style="text-align:center">
        Examples - Gene: PCSK9, Variant: 1-55516888-G-GA
      </p>
      <p class="tips">
        The Genome Aggregation Database (gnomAD) is a resource developed by an
        international coalition of investigators, with the goal of aggregating
        and harmonizing both exome and genome sequencing data from a wide
        variety of large-scale sequencing projects, and making summary data
        available for the wider scientific community.
      </p>
      <p class="tips">
        The v2 data set (GRCh37/hg19) provided on this website spans 125,748
        exome sequences and 15,708 whole-genome sequences from unrelated
        individuals sequenced as part of various disease-specific and population
        genetic studies. The v3.1 data set (GRCh38) spans 76,156 genomes,
        selected as in v2. The gnomAD Principal Investigators and groups that
        have contributed data to the current release are listed here.
      </p>
      <p class="tips">
        All data here are released for the benefit of the wider biomedical
        community, without restriction on use - see the terms of use. Sign up
        for our mailing list for future release announcements.
      </p>
    </div>
  </el-main>
</template>

<script>
import { search, variant } from '@/api/variation'

export default {
  name: 'Home',
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
      console.log(e)
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
