export const Getters = {
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  },
  dataArticles: (state) => {
    return state.dataArticles
  },
  dataArticleByAuthor: (state) => {
    return state.dataArticleByAuthor
  },
  detailArticle: (state) => {
    return state.detailArticle
  }
}