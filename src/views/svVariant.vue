<template>
  <div>
    <Nav />
    <el-main v-loading="loading">
      <div class="main-container">
        <div class="sub-content-1 clearfix" v-for="(value, key, index) in geneDetailData" :key="index">
          <el-row :gutter="0" class="grid-title">
            <el-col :span="24" :offset="0"
              ><div class="stonebox"
                  v-html="secretNumber(value.uu_id)"></div></el-col
            >
          </el-row>
          <div class="content" v-for = "(v, k,i) in value" :key="i" v-if = "k !== 'id'">
            
            <div class="div-striped">{{k}}：</div>
            <el-tooltip class="item" :disabled="v.length > 50 ? false : true" effect="light" :content="v" placement="top-start">
              <div class="stonebox" v-html="secretNumber(v)"></div>
            </el-tooltip>
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
import { decrypt } from '@/utils/crypto.js'
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
      code: '4t5dac4nhxz41e6u',
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
        _this.geneDetailData = JSON.parse(decrypt(response.listData,decrypt(response.key,this.code)))
        _this.loading = false
      }
    })
  },
  methods: {
    secretNumber(value) {
      var newval = value
      if(value){
        var newvalArr = newval.split('')
        for (var i = 0; i < newvalArr.length; i++) {
          if (this.numberMap[newvalArr[i]]) {
            newvalArr[i] = this.numberMap[newvalArr[i]]
          }
        }
        newval = newvalArr.join('')
      }else{
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
