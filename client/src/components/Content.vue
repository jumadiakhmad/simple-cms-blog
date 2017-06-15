<template lang="html">
  <div>

    <div style="margin-top:20px;">
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="14">
          <div class="grid-content">
            <el-tabs type="border-card">
              <el-tab-pane label="All Article">
                <span slot="label"><i class="el-icon-date"></i> All Article</span>
                <el-row v-for="(article, index) in dataArticles" :key="index" style="margin-bottom:10px;">
                  <div class="grid-content">
                    <el-card :body-style="{ padding: '5px' }" style="height:auto;">
                      <div slot="header" class="clearfix">
                        <router-link :to="'detailarticle/'+article._id"><span>{{article.title}}</span></router-link>
                        <el-button-group style="float:right;" v-show='statusLogin' v-if="userActive == article.author._id">
                          <el-button type="warning" size="small" icon="edit" v-on:click="viewEditArticle(article)"></el-button>
                          <el-button type="danger" size="small" icon="delete" v-on:click="deleteArticle(article)"></el-button>
                        </el-button-group>
                      </div>
                      <div class="text item">
                        <span class="mini-counts"><b>Author: {{article.author.name}}</b></span>
                        <hr style="border-color:white;">
                        <span class="mini-counts">{{article.content}}</span><br>
                        <span class="teks-bawah">Kategori: {{article.category}}</span>
                      </div>
                    </el-card>
                  </div>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="Novel">
                <span slot="label"><i class="el-icon-date"></i> Novel</span>
                <el-row v-for="(article, index) in dataArticles" :key="index" v-if="article.category == 'novel'" style="margin-bottom:10px;">
                  <div class="grid-content">
                    <el-card :body-style="{ padding: '5px' }" style="height:auto;">
                      <div slot="header" class="clearfix">
                        <!-- <span>{{article.title}}</span> -->
                        <router-link :to="'detailarticle/'+article._id"><span>{{article.title}}</span></router-link>
                        <el-button-group style="float:right;" v-show='statusLogin' v-if="userActive == article.author._id">
                          <el-button type="warning" size="small" icon="edit" v-on:click="viewEditArticle(article)"></el-button>
                          <el-button type="danger" size="small" icon="delete" v-on:click="deleteArticle(article)"></el-button>
                        </el-button-group>
                      </div>
                      <div class="text item">
                        <span class="mini-counts"><b>Author: {{article.author.name}}</b></span>
                        <hr style="border-color:white;">
                        <span class="mini-counts">{{article.content}}</span>
                      </div>
                    </el-card>
                  </div>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="Dongeng">
                <span slot="label"><i class="el-icon-date"></i> Dongeng</span>
                <el-row v-for="(article, index) in dataArticles" :key="index" v-if="article.category == 'dongeng'" style="margin-bottom:10px;">
                  <div class="grid-content">
                    <el-card :body-style="{ padding: '5px' }" style="height:auto;">
                      <div slot="header" class="clearfix">
                        <!-- <span>{{article.title}}</span> -->
                        <router-link :to="'detailarticle/'+article._id"><span>{{article.title}}</span></router-link>
                        <el-button-group style="float:right;" v-show='statusLogin' v-if="userActive == article.author._id">
                          <el-button type="warning" size="small" icon="edit" v-on:click="viewEditArticle(article)"></el-button>
                          <el-button type="danger" size="small" icon="delete" v-on:click="deleteArticle(article)"></el-button>
                        </el-button-group>
                      </div>
                      <div class="text item">
                        <span class="mini-counts"><b>Author: {{article.author.name}}</b></span>
                        <hr style="border-color:white;">
                        <span class="mini-counts">{{article.content}}</span>
                      </div>
                    </el-card>
                  </div>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="Horor">
                <span slot="label"><i class="el-icon-date"></i> Horor</span>
                <el-row v-for="(article, index) in dataArticles" :key="index" v-if="article.category == 'horor'" style="margin-bottom:10px;">
                  <div class="grid-content">
                    <el-card :body-style="{ padding: '5px' }" style="height:auto;">
                      <div slot="header" class="clearfix">
                        <!-- <span>{{article.title}}</span> -->
                        <router-link :to="'detailarticle/'+article._id"><span>{{article.title}}</span></router-link>
                        <el-button-group style="float:right;" v-show='statusLogin' v-if="userActive == article.author._id">
                          <el-button type="warning" size="small" icon="edit" v-on:click="viewEditArticle(article)"></el-button>
                          <el-button type="danger" size="small" icon="delete" v-on:click="deleteArticle(article)"></el-button>
                        </el-button-group>
                      </div>
                      <div class="text item">
                        <span class="mini-counts"><b>Author: {{article.author.name}}</b></span>
                        <hr style="border-color:white;">
                        <span class="mini-counts">{{article.content}}</span>
                      </div>
                    </el-card>
                  </div>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>

        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-button @click="viewNewArticle" v-show="statusLogin" icon="plus" style="background-color:crimson;color:#fff;">New Article</el-button><br>
            <hr style="border-color:white;">
            <div style="margin-top: 15px;text-align:-webkit-auto;">
              <p style="color:navy;">List of Categories</p>
              <el-tag style="margin:0px 5px 5px 0px;" type="gray">Novel</el-tag>
              <el-tag style="margin:0px 5px 5px 0px;" type="gray">Dongeng</el-tag>
              <el-tag style="margin:0px 5px 5px 0px;" type="gray">Horor</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-dialog title="New Article" v-model="dialogFormNewArticle">
        <el-form :model="formNewArticle" :rules="rules" ref="formNewArticle" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
          <el-form-item label="Title" prop="title">
            <el-input v-model="formNewArticle.title"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="content">
            <el-input type="textarea" v-model="formNewArticle.content"></el-input>
          </el-form-item>
          <el-form-item label="Category">
            <el-card :body-style="{ padding: '10px' }" style="height:auto;">
              <el-tag
                :key="category"
                v-for="category in categoryTemp"
                :closable="true"
                :close-transition="false"
                @close="handleClose(category)"
              >
              {{category}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-card>
          </el-form-item>
          <el-form-item style="margin-left:0px;">
            <el-button type="primary" @click="submitFormNewArticle('formNewArticle')">Create</el-button>
            <el-button @click="resetForm('formNewArticle')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="Edit Article" v-model="dialogFormEditArticle">
        <el-form :model="formEditArticle" :rules="rules" ref="formEditArticle" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
          <el-form-item label="Title" prop="title">
            <el-input v-model="formEditArticle.title"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="content">
            <el-input type="textarea" v-model="formEditArticle.content"></el-input>
          </el-form-item>
          <el-form-item label="Category">
            <el-card :body-style="{ padding: '10px' }" style="height:auto;">
              <el-tag
                :key="category"
                v-for="category in categoryTemp"
                :closable="true"
                :close-transition="false"
                @close="handleClose(category)"
              >
              {{category}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-card>
          </el-form-item>
          <el-form-item style="margin-left:0px;">
            <el-button type="primary" @click="submitFormEditArticle('formEditArticle')">Edit</el-button>
            <el-button @click="resetForm('formEditArticle')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialogFormEditArticle: false,
      dialogFormNewArticle: false,
      formNewArticle: {
        title: '',
        content: '',
        category: ''
      },
      formEditArticle: {
        id: '',
        title: '',
        content: '',
        category: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input the title', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Please input the content', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      inputValue: '',
      categoryTemp: [],
      userActive: ''
    }
  },
  methods: {
    viewEditArticle(data) {
      console.log('ini data edit');
      console.log(data);
      this.dialogFormEditArticle = true
      this.formEditArticle.id = data._id
      this.formEditArticle.title = data.title
      this.formEditArticle.content = data.content
      this.categoryTemp = []
      this.categoryTemp.push(data.category)
    },
    viewNewArticle(data) {
      this.dialogFormNewArticle = true
    },
    deleteArticle(data) {
      this.$store.dispatch('deleteArticle', data._id)
    },
    submitFormNewArticle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            title: this.formNewArticle.title,
            content: this.formNewArticle.content,
            category: this.categoryTemp[0],
            author: window.localStorage.getItem('id')
          }
          this.$store.dispatch('newArticle', payload)
          this.$refs[formName].resetFields();
          this.categoryTemp = []
          this.dialogFormNewArticle = false
        } else {
          console.log('error add new article!!');
          return false;
        }
      });
    },
    submitFormEditArticle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            id: this.formEditArticle.id,
            title: this.formEditArticle.title,
            content: this.formEditArticle.content,
            category: this.categoryTemp[0],
            author: window.localStorage.getItem('id')
          }
          console.log('Payload data edit');
          console.log(payload);
          console.log(payload.category);
          this.$store.dispatch('editArticle', payload)
          this.$refs[formName].resetFields();
          this.categoryTemp = []
          this.dialogFormEditArticle = false
        } else {
          console.log('error edit article');
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(category) {
      this.categoryTemp.splice(this.categoryTemp.indexOf(category), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.categoryTemp.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    detailArticle(data) {
      this.$store.dispatch('detailArticle', data._id)
      this.$router.push(`detailarticle/${data._id}`)
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: 'isLogin'
    }),
    dataArticles() {
      return this.$store.state.dataArticles
    }
  },
  created() {
    this.$store.dispatch('dataArticles')
    this.userActive = window.localStorage.getItem('id')
  }
}
</script>

<style lang="css">
  .el-card__header {
    padding: 10px;
    background-color: cadetblue;
    color: #fff;
    font-weight: bold;
  }

  .mini-counts {
    font-size: 17px;
    font-weight: 300;
    color: #6a737c;
    margin-top: 3px;
  }

  .teks-bawah {
    font-size: 70%;
    color: #848d95;
  }
</style>
