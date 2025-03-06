-- AlterTable
ALTER TABLE `post` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `testimonial` ADD COLUMN `logo` VARCHAR(191) NULL;
