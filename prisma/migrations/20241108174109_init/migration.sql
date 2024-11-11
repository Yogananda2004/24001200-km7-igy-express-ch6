/*
  Warnings:

  - You are about to drop the `fileUpload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fileUpload" DROP CONSTRAINT "fileUpload_imageId_fkey";

-- DropTable
DROP TABLE "fileUpload";

-- DropTable
DROP TABLE "image";

-- CreateTable
CREATE TABLE "Gambar" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "urlGambar" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Gambar_pkey" PRIMARY KEY ("id")
);
