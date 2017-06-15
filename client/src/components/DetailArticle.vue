<template lang="html">
  <div>
    <!-- {{detailArticle}} -->
    <el-row style="margin-top:20px;">
      <el-col :span="15">
        <div class="grid-content">
          <el-card :body-style="{ padding: '5px' }" style="height:auto;">
            <div slot="header" class="clearfix">
              <span>{{detailArticle.title}}</span>
            </div>
            <div class="text item">
              <span class="mini-counts"><b>Author: {{detailArticle.author.name}}</b></span>
              <hr style="border-color:white;">
              <span class="mini-counts">{{detailArticle.content}}</span><br>
              <span class="teks-bawah">Kategori: {{detailArticle.category}}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userActive: ''
    }
  },
  props: ['id'],
  computed: {
    detailArticle() {
      return this.$store.state.detailArticle
    }
  },
  created() {
    this.$store.dispatch('detailArticle', this.id)
    this.userActive = window.localStorage.getItem('id')
  }
}
</script>

<style lang="css">
</style>
