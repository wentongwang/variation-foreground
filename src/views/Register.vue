<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('register.toRegister') }}</h3>
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          :placeholder="$t('register.email')"
          name="email"
          type="text"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="principalType">
        <span class="svg-container">
          <i class="el-icon-office-building" />
        </span>
        <el-input
          ref="principalType"
          v-model="registerForm.principalType"
          :placeholder="$t('register.principalType')"
          name="principalType"
          type="text"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="IDCardName">
        <span class="svg-container">
          <i class="el-icon-s-custom" />
        </span>
        <el-input
          ref="IDCardName"
          v-model="registerForm.IDCardName"
          :placeholder="$t('register.IDCardName')"
          name="IDCardName"
          type="text"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="IDCardNo">
        <span class="svg-container">
          <i class="el-icon-price-tag" />
        </span>
        <el-input
          ref="IDCardNo"
          v-model="registerForm.IDCardNo"
          :placeholder="$t('register.IDCardNo')"
          name="IDCardNo"
          type="text"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="applicationPurpose">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-input
          ref="applicationPurpose"
          v-model="registerForm.applicationPurpose"
          :placeholder="$t('register.applicationPurpose')"
          name="applicationPurpose"
          type="text"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="emailCode">
        <span class="svg-container">
          <i class="el-icon-chat-line-round" />
        </span>
        <el-input
          class="sendCodeInput"
          ref="emailCode"
          maxlength="6"
          v-model="registerForm.emailCode"
          :placeholder="$t('register.emailCode')"
          name="emailCode"
          type="text"
        >
        </el-input>
        <el-button
          class="sendCodeBtn"
          type="primary"
          :disabled="SendCodeDisabled"
          plain
          @click.native.prevent="handleSendCode"
          >{{ this.sendCodeBtnContent }}</el-button
        >
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 10px"
        @click.native.prevent="handleRegister"
        >{{ $t('register.toRegister') }}</el-button
      >
    </el-form>
    <div class="login-container">
      <span class="title"
        >{{ $t('register.loginTitle')
        }}<el-link type="primary" @click.native.prevent="handleLogin">{{
          $t('register.toLogin')
        }}</el-link></span
      >
    </div>
  </div>
</template>

<script>
import { register, sendCode } from '@/api/user'
export default {
  name: 'register',
  data() {
    const validateEmail = (rule, value, callback) => {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (!verify.test(value)) {
        callback(new Error(this.$t('register.validateEmail')))
      } else {
        callback()
      }
    }
    const validateIDCardNo = (rule, value, callback) => {
      var verify = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!verify.test(value)) {
        callback(new Error(this.$t('register.validateIDCardNo')))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        email: '',
        principalType: '',
        applicationPurpose: '',
        IDCardName: '',
        IDCardNo: '',
        emailCode: '',
      },
      registerRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        principalType: [{ required: true, trigger: 'blur' }],
        applicationPurpose: [{ required: true, trigger: 'blur' }],
        IDCardName: [{ required: true, trigger: 'blur' }],
        IDCardNo: [
          { required: true, trigger: 'blur', validator: validateIDCardNo },
        ],
        emailCode: [{ required: true, trigger: 'blur' }],
      },
      loading: false,
      SendCodeDisabled: false,
      sendCodeBtnContent: this.$t('register.sendCode'),
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.registerForm)
            .then((response) => {
              console.log(response)
              if (response.code === 200) {
                this.registerForm = {
                  email: '',
                  principalType: '',
                  applicationPurpose: '',
                  IDCardName: '',
                  IDCardNo: '',
                }
                this.$message({
                  message: this.$t('register.successMessage'),
                  type: 'success',
                })
              } else if(response.code === 201){
                this.$message({
                  message: this.$t('register.warnMessage'),
                  type: 'warning',
                })
              }else {
                this.$message({
                  message: this.$t('register.errorMessage'),
                  type: 'error',
                })
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleLogin() {
      this.$router.push({ path: '/login' })
    },
    handleSendCode() {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      var that = this
      this.SendCodeDisabled = true
      if (verify.test(this.registerForm.email)) {
        sendCode({'email':this.registerForm.email}).then((response) => {
          if (response === 'error') {
            that.SendCodeDisabled = false
            this.$message({
              message: this.$t('register.sendCodeErrorMessage'),
              type: 'error',
            })
          } else {
            this.$message({
              message: this.$t('register.sendCodeSuccessMessage'),
              type: 'success',
            })
            var count = 60
            var interval = setInterval(function () {
              count -= 1
              that.sendCodeBtnContent = count
              if (count === 0) {
                clearInterval(interval)
                that.SendCodeDisabled = false
                that.sendCodeBtnContent = that.$t('register.sendCode')
              }
            }, 1000)
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .sendCodeInput {
    width: 60%;
  }
  .sendCodeBtn {
    width: 25%;
    padding-top: 10px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-container {
    position: relative;
    .title {
      font-size: 14px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: left;
    }
    a {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
