<template>
  <div class="report-download-container">
    <div class="title-container">
      <div class="logo">
        <img src="../assets/logo_nebula.png" alt="">
      </div>
      <div class="title">星云生物报告下载</div>
    </div>
    <div class="report-form-container">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.phone" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code" placeholder="请输入您的报告码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="report-form-button" round :loading="isLoading" @click="handleDownload">下载报告</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'DownloadReport',
  components: {
    
  },
  data() {
    return {
      form: {
        phone:'',
        code:'',
      },
      isLoading: false
    }
  },
  mounted() {
    
  },
  methods: {
    warn1() {
      this.$message({
        message: '请您填写全部信息',
        type: 'warning'
      });
    },
    warn2() {
      this.$message({
        message: '请检查您的信息是否填写正确',
        type: 'warning'
      });
    },
    handleDownload() {
      if(this.form.phone !== '' && this.form.code !== ''){
        this.isLoading = true;
        const params = {
          phone: this.form.phone,
          code: this.form.code
        }
        axios.get('http://bioinformatics.hit.edu.cn/chnpop/downloadFile', { params })
        .then( response => {
          // 处理响应数据
          if(response.status === 200){
            window.open('http://bioinformatics.hit.edu.cn/chnpop/downloadFile?phone=' + this.form.phone + '&name=' + this.form.name + '&code=' + this.form.code, '_blank')
            this.isLoading = false;
          }else{
            this.isLoading = false;
            this.warn2();
          }
        })
        .catch(error => {
          // 处理错误情况
          this.isLoading = false;
          this.warn2();
          console.log(error);
        })
      }else{
        this.warn1()
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .report-download-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & .title-container{
      width: 80%;
      & .logo{
        padding: 50px 0 0px 0;
      }
      & .title{
        font-size: 20px;
        font-weight: bold;
        padding: 30px 0;
      }
    }
    & .report-form-container{
      width: 80%;
      & .report-form-button{
        width: 100%;
      }
    }
  }
  
</style>
