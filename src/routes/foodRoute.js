const express = require('express');
const foodRoute = express.Router();

const { getFoodDemo } = require('../controllers/foodController');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {

    const fileNameNew = Date.now() + "_" + file.originalname;
    cb(null, fileNameNew)
  }
})
const upload = multer({ storage });
//, upload.single("upload")
const fs = require('fs');

foodRoute.post("/upload", upload.single("upload"), (req, res) => {

  fs.readFile(process.cwd() + "/" + req.file.path, (err, data) => {
    let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}"`;
    fs.unlinkSync(process.cwd() + "/" + req.file.path);
    res.send(fileName);
  })

})

//
foodRoute.get("/demo", getFoodDemo);

module.exports = foodRoute;