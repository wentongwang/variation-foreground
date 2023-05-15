<template>
  <el-dropdown trigger="click" class="international" @command="handleLogOut">
    <div class="language">
      <span class="el-dropdown-link">
        {{ name }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        {{ $t('index.logout') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      name: store.getters.name
    }
  },
  methods: {
    handleLogOut() {
      this.$store.dispatch('user/logout')
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
