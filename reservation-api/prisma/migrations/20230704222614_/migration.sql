/*
  Warnings:

  - You are about to alter the column `checkInDate` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `checkOutDate` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Reservation` MODIFY `checkInDate` DATETIME(3) NOT NULL,
    MODIFY `checkOutDate` DATETIME(3) NOT NULL;
