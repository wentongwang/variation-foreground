<template>
  <div>
    <Nav />
    <el-main>
      <div class="main-container">
        <div class="help-collapse">
          <div class="help-title">{{ this.$t('help.title1') }}</div>
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="this.$t('help.words1')" name="1">
              <div class="sub-title">{{ this.$t('help.words2') }}</div>
              <div>{{ this.$t('help.words3') }}</div>
              <div>{{ this.$t('help.words4') }}</div>
            </el-collapse-item>
            <el-collapse-item :title="this.$t('help.words5')" name="2">
              <div>{{ this.$t('help.words6') }}</div>
              <div>{{ this.$t('help.words8') }}</div>
              <div>{{ this.$t('help.words9') }}</div>
              <div>{{ this.$t('help.words10') }}</div>
              <div>{{ this.$t('help.words11') }}</div>
              <div>{{ this.$t('help.words12') }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="help-collapse">
          <div class="help-title">{{ this.$t('help.title2') }}</div>
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="this.$t('help.words13')" name="3">
              <div>{{ this.$t('help.words14') }}</div>
              <div class="sub-title">{{ this.$t('help.words15') }}</div>
              <div style="font-size: 12px;">{{ this.$t('help.words16') }}</div>
              <div style="font-size: 12px;">{{ this.$t('help.words17') }}</div>
              <div style="font-size: 12px;">{{ this.$t('help.words18') }}</div>
              <el-collapse-item :title="this.$t('help.words19')" name="4">
                <div class="sub-title">{{ this.$t('help.words20') }}</div>
                <div class="sub-img"><img src="../assets/help-1-1.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words21') }}</div>
                <div class="sub-img"><img src="../assets/help-1-2.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words22') }}</div>
                <div class="sub-img"><img src="../assets/help-1-3.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words23') }}</div>
                <div class="sub-img"><img src="../assets/help-1-4.png" alt=""></div>
              </el-collapse-item>
              <el-collapse-item :title="this.$t('help.words24')" name="5">
                <div class="sub-title">{{ this.$t('help.words25') }}</div>
                <div class="sub-img"><img src="../assets/help-2-1.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words26') }}</div>
                <div class="sub-img"><img src="../assets/help-2-2.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words27') }}</div>
                <div class="sub-img"><img src="../assets/help-2-3.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words28') }}</div>
                <div class="sub-img"><img src="../assets/help-2-4.png" alt=""></div>
              </el-collapse-item>
              <el-collapse-item :title="this.$t('help.words29')" name="6">
                <div class="sub-title">{{ this.$t('help.words30') }}</div>
                <div class="sub-img"><img src="../assets/help-3-1.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words31') }}</div>
                <div class="sub-img"><img src="../assets/help-3-2.png" alt=""></div>
                <div class="sub-title">{{ this.$t('help.words27') }}</div>
              </el-collapse-item>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'Help',
  components: {
    Nav
  },
  data() {
    return {
      activeNames: []
    };
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    & .help-collapse{
      width: 80%;
      text-align: left;
      & .help-title{
        font-size: 32px;
        padding: 30px 0;
      }
      & .sub-title{
        padding: 10px 0;
        font-size: 16px;
      }
      & .sub-img{
        width: 100%;
        & img{
          width: 100%;
        }
      }
    }
  }
</style>

<style lang="scss">
  .main-container{
    & .el-collapse{
      // border: none;
      & .el-collapse-item__header{
        font-size: 20px;
        color: #409EFF;
      }
    }
  }
</style>