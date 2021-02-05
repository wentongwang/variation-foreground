<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div class="language">
      <span class="el-dropdown-link">
        {{ language === 'zh' ? '中文' : 'English' }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('apps/setLanguage', lang)
      if (lang === 'zh') {
        this.$message({
          message: '切换语言成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: 'Switch Language Success',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .language{
    color: #ffffff;
    cursor: pointer;
  }
</style>
