<template>
  <div class="forgot-container">
    <el-form
      ref="forgotForm"
      :model="forgotForm"
      :rules="forgotRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('forgotPassword.title') }}</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message" />
        </span>
        <el-input
          ref="email"
          v-model="forgotForm.email"
          :placeholder="$t('forgotPassword.email')"
          name="email"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="emailCode">
        <span class="svg-container">
          <i class="el-icon-chat-line-round" />
        </span>
        <el-input
          class="sendCodeInput"
          ref="emailCode"
          maxlength="6"
          v-model="forgotForm.emailCode"
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
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input
          ref="password"
          v-model="forgotForm.password"
          :placeholder="$t('forgotPassword.password')"
          name="password"
          type="password"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input
          ref="checkPass"
          v-model="forgotForm.checkPass"
          :placeholder="$t('forgotPassword.checkPass')"
          name="checkPass"
          type="password"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 10px"
        @click.native.prevent="handleForgot"
        >{{ $t('forgotPassword.handleForgot') }}</el-button
      >
    </el-form>
    <div class="forgot-container">
      <span class="title"
        >{{ $t('forgotPassword.loginTitle')
        }}<el-link type="primary" @click.native.prevent="handleToLogin">{{
          $t('forgotPassword.toLogin')
        }}</el-link></span
      >
    </div>
  </div>
</template>

<script>
import { forgot, forgotSendCode } from '@/api/user'
export default {
  name: 'forgotPassword',
  data() {
    const validateEmail = (rule, value, callback) => {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (!verify.test(value)) {
        callback(new Error(this.$t('register.validateEmail')))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8) {
        callback(new Error('密码不得少于8位数'))
      } else {
        if (this.forgotForm.checkPass !== '') {
          this.$refs.forgotForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.forgotForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      SendCodeDisabled: false,
      sendCodeBtnContent: this.$t('forgotPassword.sendCode'),
      forgotForm: {
        email: '',
        emailCode: '',
        password: '',
        checkPass: ''
      },
      forgotRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        emailCode: [{ required: true, trigger: 'blur'}],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        checkPass: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ]
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleSendCode() {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      var that = this
      this.SendCodeDisabled = true
      if (verify.test(this.forgotForm.email)) {
        forgotSendCode({ email: this.forgotForm.email }).then(response => {
          if (response.code === 500) {
            that.SendCodeDisabled = false
            this.$message({
              message: this.$t('forgotPassword.sendCodeErrorMessage'),
              type: 'error'
            })
          } else if (response.code === 201) {
            that.SendCodeDisabled = false
            this.$message({
              message: this.$t('forgotPassword.isReregistedMessage'),
              type: 'error'
            })
          } else {
            this.$message({
              message: this.$t('forgotPassword.sendCodeSuccessMessage'),
              type: 'success'
            })
            var count = 60
            var interval = setInterval(function() {
              count -= 1
              that.sendCodeBtnContent = count
              if (count === 0) {
                clearInterval(interval)
                that.SendCodeDisabled = false
                that.sendCodeBtnContent = that.$t('forgotPassword.sendCode')
              }
            }, 1000)
          }
        })
      } else {
        that.SendCodeDisabled = false
      }
    },
    handleForgot() {
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          this.loading = true
          forgot(this.forgotForm)
            .then((response) => {
              if (response.code === 200) {
                this.forgotForm = {
                  email: '',
                  emailCode: '',
                  password: '',
                  checkPass: ''
                }
                this.$message({
                  message: this.$t('forgotPassword.successMessage'),
                  type: 'success',
                })
              } else if(response.code === 201){
                this.$message({
                  message: this.$t('forgotPassword.warnMessage'),
                  type: 'warning',
                })
              }else {
                this.$message({
                  message: this.$t('forgotPassword.errorMessage'),
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
    handleToLogin() {
      this.$router.push({ path: '/login' })
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .forgot-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.forgot-container {
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
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.forgot-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
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

  a {
    font-size: 14px;
  }
  .sendCodeInput {
    width: 60%;
  }
  .sendCodeBtn {
    width: 25%;
    padding-top: 10px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .title {
      font-size: 14px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: left;
    }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
