const Article = require("../models/article");

exports.createArticle = async (req, res) => {
  let newArticle = new Article({
    name: req.body.name,
    price: req.body.price,
  });
  try {
    const article = await newArticle.save();
    if (!article) throw Error("Something went wrong saving the article");
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    if (!articles) throw Error("No articles");
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) throw Error("No article");
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body);
    if (!article) throw Error("Something went wrong updating the article");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) throw Error("No article found");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
}


