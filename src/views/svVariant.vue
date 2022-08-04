<template>
  <div>
    <Nav />
    <el-main v-loading="loading">
      <div class="main-container">
        <div class="sub-content-1 clearfix" v-for="(value, key, index) in geneDetailData" :key="index">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div>{{value.uu_id}}</div></el-col
            >
          </el-row>
          <div class="content" v-for = "(v, k,i) in value" :key="i">
            <div class="div-striped">{{k}}：</div>
            <div>{{v}}</div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import { svVariantDetail } from '@/api/variation'
import Nav from '@/components/Nav'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'Variation',
  components: {
    Nav,
  },
  data() {
    return {
      geneDetailData: null,
      variantId: '',
      loading: true,
    }
  },
  watch: {

  },
  created: function () {
    const _this = this
    this.variantId = this.$route.query['id']
    const data = {
      variantId: this.variantId,
      chrom:
        this.$route.query['chrom'] === 'x' ? 23 : this.$route.query['chrom'],
    }
    svVariantDetail(data).then((response) => {
      if(response.code === 200){
        _this.geneDetailData = response.listData
        _this.loading = false
      }
      
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.main-container {
  width: 80%;
  margin: 0 auto;
  .sub-content-1 {
    margin-bottom: 30px;
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
    .content{
      width: 50%;
      display: flex;
      float: left;
      div{
        width: 50%;
        height: 70px;
        text-align: center;
        font-size: 18px;
        border: 1px solid rgb(235, 238, 245);
        padding: 15px 0;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        overflow: hidden;
      }
      div:hover {
        background-color: #f5f7fa;
      }
      .div-striped {
        background: #fafafa;
      }
    }
  }
}
</style>
