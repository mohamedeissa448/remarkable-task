import Article from './../models/articleModel';
import APIFeatures from './../utils/apiFeatures';

const getMyArticles = async (req, res) => {
  console.log("req.query::------", req.query);
  const features = new APIFeatures(Article.find({
    owner: req.user._id
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
    owner: req.params.id
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
  const newArticle = await Article.create(req.body);

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