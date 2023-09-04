const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

const { requireAuth} = require("../middlewares/requireAuth");
router.use(requireAuth);

router.post("/create", articleController.createArticle);
router.get("/all", articleController.getAllArticles);
router.get("/:id", articleController.getSingleArticle);
router.put("/update/:id", articleController.updateArticle);
router.delete("/delete/:id", articleController.deleteArticle);

module.exports = router;
