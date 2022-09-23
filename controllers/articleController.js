import Article from './../models/articleModel';
import User from './../models/userModel';

import APIFeatures from './../utils/apiFeatures';

const getMyArticles = async (req, res) => {
  console.log("req.user::------", req.user);
  const features = new APIFeatures(Article.find({
    owner: req.user.id
  }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    
  const articles = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: articles.length,
    data: {
      articles
    }
  });
};

const getUserArticles = async (req, res) => {
  console.log("req.query::------", req.query);
  console.log("req.params::------", req.params);

  const features = new APIFeatures(Article.find({
    owner: req.query.owner
  }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    
  const articles = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: articles.length,
    data: {
      articles
    }
  });
};
const getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  
  if (!article) {
    return res.status(404).json({
      status: 'failed',
      message: 'No article found with that ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      article
    }
  });
};

const createArticle = async (req, res) => {
  //the following 2 queries sould be a transaction,both should success or cancelled
  const newArticle = await Article.create({
    title: req.body.title,
    content: req.body.content,
    owner: req.user.id

  });
  //increment number of creator articles
  const user = await User.findByIdAndUpdate(req.user.id, {
    $inc: { 
      numberOfArticles: 1
     }
  })
  res.status(201).json({
    status: 'success',
    data: {
      article: newArticle
    }
  });
};

const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!article) {
    return res.status(404).json({
      status: 'failed',
      message: 'No article found with that ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      article
    }
  });
};

const deleteArticle = async (req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({
      status: 'failed',
      message: 'No article found with that ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};


export {
  getMyArticles,getUserArticles, getArticle, createArticle, updateArticle, deleteArticle
}