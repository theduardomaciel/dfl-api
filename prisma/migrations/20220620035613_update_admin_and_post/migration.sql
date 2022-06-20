/*
  Warnings:

  - Added the required column `image_url` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
