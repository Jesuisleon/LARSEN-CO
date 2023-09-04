const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

const { requireAuth, requireAdmin} = require("../middlewares/requireAuth");
router.use(requireAuth);

router.post("/create", clientController.createClient);
router.get("/all", clientController.getAllClients);
router.get("/:id", clientController.getSingleClient);
router.put("/update/:id", clientController.updateClient);
router.delete("/delete/:id", requireAdmin, clientController.deleteClient);

module.exports = router;
