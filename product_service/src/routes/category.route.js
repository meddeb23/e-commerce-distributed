const router = require("express").Router();
const category = require("../controllers/category.controller");

router.post("/", category.create);
router.get("/", category.findAll);
router.get("/:id", category.findOne);

router.put("/:id", category.update);
router.delete("/:id", category.delete);
router.delete("/", category.deleteAll);
module.exports = router;
