/*
  Warnings:

  - Added the required column `available` to the `HotelRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HotelRoom` ADD COLUMN `available` BOOLEAN NOT NULL;
