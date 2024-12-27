-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "completeTime" TIMESTAMP(3),
ADD COLUMN     "diferenceTime" INTEGER,
ADD COLUMN     "objectiveTime" TIMESTAMP(3);
