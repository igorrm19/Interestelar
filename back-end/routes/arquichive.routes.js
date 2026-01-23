const express = require("express");
const controllrs = require("../controllrs/archive.controllrs");
const router = express.Router();


router.get("/entries", controllrs.getArquichive);
router.get("/entries/:id", controllrs.getIdArquichive);
router.post("/entries", controllrs.createArquichive);
router.put("/entries/:id", controllrs.updateArquichive);
router.delete("/entries/:id", controllrs.deleteArquichive);



router.put("/entries", (req, res) => {
    res.json({ message: "Rota não permitida, adicione um id" });
});

router.delete("/entries", (req, res) => {
    res.json({ message: "Rota não permitida, adicione um id" });
});


module.exports = router;