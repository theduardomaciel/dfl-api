/*
  Warnings:

  - You are about to drop the column `image_deleteHash` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `reports` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "parent_id" INTEGER;

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "image_deleteHash",
DROP COLUMN "image_url",
ADD COLUMN     "images_deleteHashs" TEXT[],
ADD COLUMN     "images_urls" TEXT[];

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
