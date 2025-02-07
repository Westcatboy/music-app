-- CreateTable
CREATE TABLE `_ListSongs` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListSongs_AB_unique`(`A`, `B`),
    INDEX `_ListSongs_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ListSongs` ADD CONSTRAINT `_ListSongs_A_fkey` FOREIGN KEY (`A`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListSongs` ADD CONSTRAINT `_ListSongs_B_fkey` FOREIGN KEY (`B`) REFERENCES `songs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
