/*
  Warnings:

  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DynamicLinkSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[App] DROP CONSTRAINT [App_platformId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[DynamicLinkSettings] DROP CONSTRAINT [DynamicLinkSettings_appId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [roleId] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[App];

-- DropTable
DROP TABLE [dbo].[DynamicLinkSettings];

-- DropTable
DROP TABLE [dbo].[Platform];

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Role_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
