const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

const { requireAuth, requireAdmin } = require("../middlewares/requireAuth");
router.use(requireAuth);

router.get("/all", requireAdmin, reportController.getAllReports);
router.post("/create", reportController.createReport);
router.get("/all/:id", reportController.getAllReportsBySalesman);
router.get("/:id", reportController.getSingleReport);
router.put("/update/:id", reportController.updateReport);
router.delete("/delete/:id", reportController.deleteReport);

module.exports = router;
