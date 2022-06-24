/*
  Warnings:

  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `draft` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `fixed` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "posts_title_key";

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "draft",
DROP COLUMN "fixed",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "pinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
