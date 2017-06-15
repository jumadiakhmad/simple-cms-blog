const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/alluser', userController.getAllUser)

router.get('/allarticles', articleController.getAllArticles)
router.get('/articlebyauthor/:id', articleController.getArticleByAuthor)
router.get('/detailarticle/:id', articleController.getDetailArticles)
router.post('/createarticle', articleController.createArticle)
router.put('/editarticle/:id', articleController.editArticle)
router.delete('/deletearticle/:id', articleController.deleteArticle)

module.exports = router