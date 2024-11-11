-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "urlGambar" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fileUpload" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "fileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_urlGambar_key" ON "image"("urlGambar");

-- CreateIndex
CREATE UNIQUE INDEX "fileUpload_imageId_key" ON "fileUpload"("imageId");

-- AddForeignKey
ALTER TABLE "fileUpload" ADD CONSTRAINT "fileUpload_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
