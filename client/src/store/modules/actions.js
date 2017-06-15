export const Actions = {
  signIn: ({commit}, payload) => {
    axios.post('http://localhost:3000/signin', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('Action SignIn');
      console.log(response.data);
      commit('signIn', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error signin, masuk ke catch');
    })
  },
  signUp: ({commit}, payload) => {
    axios.post('http://localhost:3000/signup', {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      console.log('Action SignUp');
      console.log(response.data);
      commit('signUp', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error signup, masuk ke catch');
    })
  },
  dataArticles: ({commit}) => {
    axios.get('http://localhost:3000/allarticles').then(response => {
      console.log('Action get all articles');
      console.log(response.data);
      commit('dataArticles', response.data)
    }).catch(error => {
      console.log(error);
      console.log('error signup, masuk ke catch');
    })
  },
  newArticle: ({commit}, payload) => {
    axios.post('http://localhost:3000/createarticle', payload).then(response => {
      console.log('Action create article');
      console.log(response.data);
      commit('newArticle', response.data)
    }).catch(error => {
      console.log(error);
      console.log('error newArticle, masuk ke catch');
    })
  },
  editArticle: ({commit}, payload) => {
    axios.post(`http://localhost:3000/editarticle/${payload.id}`, payload).then(response => {
      console.log('Action edit article');
      console.log(response.data);
      commit('newArticle', response.data)
    }).catch(error => {
      console.log(error);
      console.log('error editArticle, masuk ke catch');
    })
  },
  deleteArticle: ({commit}, payload) => {
    axios.post(`http://localhost:3000/deletearticle/${payload}`).then(response => {
      console.log('Action delete article');
      console.log(response.data);
      commit('deleteArticle', response.data)
    }).catch(error => {
      console.log(error);
      console.log('error deleteArticle, masuk ke catch');
    })
  },
}