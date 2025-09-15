const express = require("express");
const parcelController = require("../controllers/parcelController");

const router = express.Router();

router.get("/add", parcelController.addPage);
router.post("/add", parcelController.add);

router.get("/view-all", parcelController.viewAll);

router.get("/delete", parcelController.deleteByIdPage);
router.post("/delete", parcelController.deleteById);

router.get("/update", parcelController.updateByIdPage);
router.post("/update", parcelController.updateById);

module.exports = router;
