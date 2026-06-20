-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contato" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "removeBackground" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "telegramChatId" TEXT;
