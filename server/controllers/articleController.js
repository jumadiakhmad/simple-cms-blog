const Article = require('../models/article')
const methods = {}

methods.getAllArticles = (req, res) => {
  Article.find({})
  .populate('author')
  .exec((error, response) => {
    if (error) res.json({msg: `Something error siggetAllArticlesnup: ${error}`, success: false})
    else {
      res.send(response)
    }
  })
}

methods.getArticleByAuthor = (req, res) => {
  Article.find({})
  .populate('author')
  .exec((error, response) => {
    let pushData = []
    response.forEach(article => {
      if (article.author._id == req.params.id) {
        pushData.push(article)
      }
    })
    res.send(pushData)
  })
}

methods.getDetailArticles = (req, res) => {
  Article.findById(req.params.id)
  .populate('author')
  .exec((error, response) => {
    if (error) res.json({msg: `Something error getDetailArticles: ${error}`, success: false})
    else {
      res.send(response)
    }
  })
}

methods.createArticle = (req, res) => {
  let newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author
  })

  newArticle.save((error, response) => {
    if (error) res.json({msg: `Something error newArticle: ${error}`, success: false})
    else {
      Article.findById(response._id)
      .populate('author')
      .exec((error, response) => {
        if (error) res.json({msg: `Something error getDetailArticles: ${error}`, success: false})
        else {
          res.send(response)
        }
      })
    }
  })
}

methods.editArticle = (req, res) => {
  Article.findById(req.params.id, (error, response) => {
    if (error) res.json({msg: `Something error editArticle: ${error}`, success: false})
    else {
      Article.findByIdAndUpdate( {'_id': response._id}, {
        $set: {
          title: req.body.title || response.title,
          content: req.body.content || response.content,
          category: req.body.category || response.category,
          author: req.body.author || response.author
        }
      }, {
        new: true
      })
      .exec((error, result) => {
        if (error) res.json({msg: `Something error getDetailArticles: ${error}`, success: false})
        else {
          Article.findById(result._id)
          .populate('author')
          .exec((error, hasil) => {
            if (error) res.json({msg: `Something error getDetailArticles: ${error}`, success: false})
            else {
              res.send(hasil)
            }
          })
        }
      })
    }
  })
}

methods.deleteArticle = (req, res) => {
  Article.findOneAndRemove(req.params.id, (error, response) => {
    if (error) res.json({msg: `Something error deleteArticle: ${error}`, success: false})
    else {
      res.send(response)
    }
  })
}

module.exports = methods