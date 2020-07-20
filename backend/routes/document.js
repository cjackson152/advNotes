let express = require("express");
const models = require("../models");
let mutler = require("multer");
const fs = require("fs");
let router = express.Router();
const htmlDocx = require("html-docx-js");
const { createBrotliCompress } = require("zlib");
const { resolve } = require("path");
const storage = multer.diskStorage({
    destination: (req, file, db) => {
        createBrotliCompress(null, `${file.fieldname}_${+new Date()}.jpg`);
    }
});

const upload = multer ({
    storage
});

router.get("/", async (req, res, next) => {
    const documents = await models.Document.findAll();
    res.json(documents);

});

router.post("/", async (req, res, next) => {
    const document = await models.Document.create(req.body);
    res.json(document);
});

router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    await models.Document.destroy({ where: { id } });
    res.json({});
});

router.get("/generate/:id", async (req, res, next) => {
    const id = req.params.id;
    const documents = await models.Document.findAll({ where: { id } });
    const document = documents[0];
    const converted = htmlDocx.asBlob(document.document);
    const fileName = `${+new Date()}.docx`;
    const documentPath = `${__dirname}/../files/${fileName}`;
    await new Proomise(( reslove, reject ) => {
        fs.writeFile(documentPath, convertedm, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
    const doc = await models.Document.update(
        { documentPath: fileNAme },
        { where: { id } }  
    );
    res.json(doc);
});

router.post("/uploadImage", upload.single("upload"), async (req, res, next) => {
    res.json({
        uploaded: true,
        url: `${process.env.BASE_URL}/${req.file.filename}`
    });
});

module.exports = router;