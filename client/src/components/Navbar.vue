<template lang="html">
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">Simple CSM</el-menu-item>
      <div v-show="statusLogin == null">
        <el-menu-item index="1" style="float:right">SignIn</el-menu-item>
      </div>
      <div v-show="statusLogin">
        <el-menu-item index="1" style="float:right">SignOut</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      statusLogin: 'isLogin'
    })
  }
}
</script>

<style lang="css">
</style>
