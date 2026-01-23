const express = require("express");
const controllrs = require("../controllrs/archive.controllrs");
const router = express.Router();


router.get("/arquichive", controllrs.getArquichive);
router.get("/arquichive/:id", controllrs.getIdArquichive);
router.post("/arquichive", controllrs.postArquichive);
router.put("/arquichive/:id", controllrs.putArquichive);
router.delete("/arquichive/:id", controllrs.deleteArquichive);


module.exports = router;