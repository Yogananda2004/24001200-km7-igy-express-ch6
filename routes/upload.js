const express = require("express");
const route = express.Router();
const uploadFile = require("../controllers/uploadFile");
const multer = require("../libs/multer");
const UploadFile = require("../controllers/uploadFile");

route.get("/file", uploadFile.showFile);
route.get("/file/:id", uploadFile.showFIleId);
route.post("/upload-file", multer.single("file"), UploadFile.uploadFile);
route.put("/update-file/:id", multer.single("file"), UploadFile.updateFile);
route.delete("/file/:id", UploadFile.deleteFile);

module.exports = route;