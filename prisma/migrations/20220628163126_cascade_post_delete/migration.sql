-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_adminId_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
