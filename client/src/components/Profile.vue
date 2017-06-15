<template lang="html">
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="15" style="margin-top:15px;">
        <el-card :body-style="{ padding: '5px' }" style="height:auto;">
          <div style="text-align:center;">
          </div>
          <div style="margin:10px;">
            <el-row :gutter="20" style="font-size:25px;">
              <el-col :span="3">
                <img src="https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png" style="width:100%;">
              </el-col>
              <el-col :span="15">
                <div style="margin-top:10px;">
                  <span>Name: {{user.username}}</span><br>
                  <span>Email: {{user.email}}</span>
                </div>
              </el-col>
            </el-row>
            <hr style="border-color:white;margin-top:10px;margin-bottom:10px;">
            <span><b><u>List of Article</u></b></span>
            <el-row :gutter="20" style="margin-top:10px;" v-if="dataArticleByAuthor.length > 0">
              <el-col :span="12" v-for="(article, index) in dataArticleByAuthor" :key="index" style="margin-bottom:10px;">
                <div class="grid-content">
                  <el-card :body-style="{ padding: '5px' }" style="height:auto;">
                    <div slot="header" class="clearfix">
                      <span>{{article.title}}</span>
                    </div>
                    <div class="text item">
                      <span class="mini-counts">Author: {{article.author.name}}</span>
                      <hr style="border-color:white;">
                      <span class="mini-counts">{{article.content}}</span><br>
                      <span class="teks-bawah">Kategori: {{article.category}}</span>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
            <el-row v-else>
              <h2>You don't have article.</h2>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        userActive: '',
        username: '',
        email: ''
      }
    }
  },
  computed: {
    dataArticleByAuthor() {
      return this.$store.state.dataArticleByAuthor
    }
  },
  created() {
    this.user.userActive = window.localStorage.getItem('id')
    this.user.username = window.localStorage.getItem('user')
    this.user.email = window.localStorage.getItem('email')
    this.$store.dispatch('dataArticleByAuthor', this.user.userActive)
  }
}
</script>

<style lang="css">
</style>
