-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "published" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;
