const express = require("express");
const router = express.Router();
const salesmanController = require("../controllers/salesmanController");

const { requireAuth, requireAdmin} = require("../middlewares/requireAuth");
router.use(requireAuth, requireAdmin);

router.get("/all", salesmanController.getAllSalesmen);
router.get("/:id", salesmanController.getSingleSalesman);
router.put("/update/:id", salesmanController.updateSalesman);
router.delete("/delete/:id", salesmanController.deleteSalesman);

module.exports = router;
