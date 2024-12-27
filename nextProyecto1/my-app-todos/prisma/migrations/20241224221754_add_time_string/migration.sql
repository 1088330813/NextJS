/*
  Warnings:

  - The `objectiveTime` column on the `Todos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "objectiveTime",
ADD COLUMN     "objectiveTime" TIMESTAMP(3);
