const express = require("express");
const controllrs = require("../controllrs/archive.controllrs");
const validateEntry = require("../middleware/validateZod.middlware");
const router = express.Router();


router.get("/entries", controllrs.getArquichive);
router.get("/entries/:id", controllrs.getIdArquichive);
router.post("/entries", validateEntry, controllrs.createArquichive);
router.put("/entries/:id", validateEntry, controllrs.updateArquichive);
router.delete("/entries/:id", controllrs.deleteArquichive);



router.put("/entries", (req, res) => {
    res.json({ message: "Rota não permitida, adicione um id" });
});

router.delete("/entries", (req, res) => {
    res.json({ message: "Rota não permitida, adicione um id" });
});


module.exports = router;