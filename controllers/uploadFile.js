const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imageKit = require("../libs/imageKit");

class UploadFile {
  static async showFile(req, res) {
    try {
      const files = await prisma.gambar.findMany({});

      return res.status(200).json({
        message: "Ini Datanya",
        data: files,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  static async uploadFile(req, res) {
    if (!req.file) {
      res.status(500).json({
        error: "No file Uploaded",
        message: "gaada file yang di up",
      });
    }
    try {
      const stringFile = req.file.buffer.toString("base64");
      const fileName = req.file.originalname;

      const upload = await imageKit.upload({
        file: stringFile,
        fileName: fileName,
      });

      const uploadPrisma = await prisma.gambar.create({
        data: {
          judul: req.file.originalname,
          deskripsi: req.body.deskripsi || null,
          urlGambar: upload.url,
          fileId: upload.fileId,
        },
      });
      res.status(201).json({
        message: "File uploaded successfully",
        data: uploadPrisma,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  static async showFIleId(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const file = await prisma.gambar.findUnique({
        where: { id: id },
      });
      res.status(200).json({
        message: "Ini datanya",
        data: file,
      });
    } catch (err) {
      console.log(err, "Ini Errornya");
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  static async updateFile(req, res) {
    const { judul, deskripsi } = req.body;
    const id = parseInt(req.params.id, 10);
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const stringImage = req.file.buffer.toString("base64");
      const upload = await imageKit.upload({
        fileName: req.file.originalname,
        file: stringImage,
      });

      const file = await prisma.gambar.update({
        where: { id: id },
        data: {
          judul: judul || null,
          deskripsi: deskripsi || null,
          urlGambar: upload.url,
          fileId: upload.id,
        },
      });

      res.status(201).json({
        message: "Update Data is Succesfull",
        data: file,
      });
    } catch (err) {
      console.log(err, "Ini errornya");
      res.status(500).json({
        error: "Internal server Error",
        message: err,
      });
    }
  }

  static async deleteFile(req, res) {
    const id = parseInt(req.params.id, 10);

    try {
      const file = await prisma.gambar.findUnique({
        where: { id: id },
      });

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      await imageKit.deleteFile(file.fileId);

      await prisma.gambar.delete({
        where: { id: id },
      });

      res.status(200).json({
        message: "File deleted successfully",
      });
    } catch (err) {
      console.log(err, "Ini errornya");
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}

module.exports = UploadFile;
