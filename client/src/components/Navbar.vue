<template lang="html">
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><img src="http://www.justinas.tk/images/cmsms.png" alt="Logo" style="width:90px;height:60px;"></el-menu-item>
      <div class="user_menu" style="float:right" v-show="statusLogin == null">
        <el-menu-item index="1" @click="signInDialog">SignIn</el-menu-item>
        <el-menu-item index="1" @click="signinfb">Signin FB</el-menu-item>
        <el-menu-item index="1" @click="signUpDialog">SignUp</el-menu-item>
      </div>

      <el-submenu index="2" style="float:right;" v-show="statusLogin">
        <template slot="title"><b>Welcome, {{userActive}}</b></template>
        <el-menu-item index="2-2" @click="toProfile">Profile</el-menu-item>
        <el-menu-item index="2-3" @click="toHome">Home</el-menu-item>
        <el-menu-item index="2-4" @click="signOut">SignOut</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-dialog title="SignUp" v-model="dialogFormVisibleSignup">
      <el-form :model="form_signup" :rules="rules" ref="form_signup" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form_signup.name"></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input v-model="form_signup.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form_signup.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form_signup.email"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:0px;">
          <el-button type="primary" @click="submitFormSignUp('form_signup');notification('SignUp succes')">SignUp</el-button>
          <el-button @click="resetForm('form_signup')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="SignIn" v-model="dialogFormVisibleSignin">
      <el-form :model="form_signin" :rules="rules" ref="form_signin" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form_signin.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form_signin.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:0px;">
          <el-button type="primary" @click="submitFormSignIn('form_signin');notification('SignIn success')">SignIn</el-button>
          <el-button @click="resetForm('form_signin')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// Proses login facebook-sdk
window.fbAsyncInit = function() {
  FB.init({
    appId      : '413434489050147',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    console.log(response);
  });

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    FB.api('/me', {fields: 'first_name, name, email'}, function (apiResponse) {
      console.log(apiResponse);
      window.localStorage.setItem('token', response.authResponse.accessToken);
      window.localStorage.setItem('uuid', apiResponse.id);
      window.localStorage.setItem('user', apiResponse.first_name);
      window.localStorage.setItem('login_method', 'facebook');
      let url = 'http://localhost:3000/signinfb';
      let body = {
        uuid: apiResponse.id,
        email: apiResponse.email,
        name: apiResponse.name
      }
      axios.post(url, body)
        .then((res) => {
          window.localStorage.setItem('id', res.data._id);
          window.location = "/"
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function fb_login(){
  FB.login(function(response) {
    checkLoginState()
  }, {
    scope: 'email, public_profile, publish_actions'
  });
}

export default {
  data() {
    return {
      form_signup: {
        name: '',
        username: '',
        password: '',
        email: ''
      },
      form_signin: {
        username: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' },
          { min: 5, message: 'Length should be 5 to more', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 5, message: 'Length should be 5 to more', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 5, message: 'Length should be 5 to more', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
        ]
      },
      dialogFormVisibleSignup: false,
      dialogFormVisibleSignin: false,
      userActive: ''
    }
  },
  methods: {
    signinfb(){
      fb_login()
    },
    ...mapActions([
      "signIn", "signUp"
    ]),
    signUpDialog(){
      this.dialogFormVisibleSignup = true
    },
    signInDialog(){
      this.dialogFormVisibleSignin = true
    },
    signOut(){
      window.localStorage.clear()
      window.location = "/"
    },
    notification(notif='') {
      if (notif='SignUp succes') {
        this.$message({
          message: 'SignUp succes, you mush signin first!',
          type: 'success'
        });
      } else if (notif='SignIn success'){
        this.$message({
          message: 'SignIn success!',
          type: 'success'
        });
      }
    },
    submitFormSignUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            name: this.form_signup.name,
            username: this.form_signup.username,
            password: this.form_signup.password,
            email: this.form_signup.email
          }
          this.$store.dispatch('signUp', payload)
          this.form_signup.name = ''
          this.form_signup.username = ''
          this.form_signup.password = ''
          this.form_signup.email = ''
          this.dialogFormVisibleSignup = false
        } else {
          alert('Application error for a while. Please wait!')
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitFormSignIn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            username: this.form_signin.username,
            password: this.form_signin.password
          }
          this.$store.dispatch('signIn', payload)
          this.form_signin.username = ''
          this.form_signin.password = ''
          this.dialogFormVisibleSignin = false
        } else {
          alert('Application error for a while. Please wait!')
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toProfile() {
      this.$router.push('/profile')
    },
    toHome() {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: "isLogin"
    })
  },
  created() {
    this.userActive = window.localStorage.getItem('user')
  }
}
</script>

<style lang="css">
  .el-submenu__title {
      font-size: medium;
  }
  .el-select {
    width: 100%
  }
  .el-card {
    text-align: left;
  }
  .el-menu{
   border: 1px solid #d9d9d9;
  }
</style>
