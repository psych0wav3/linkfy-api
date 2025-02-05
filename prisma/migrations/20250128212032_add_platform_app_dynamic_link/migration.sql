/*
  Warnings:

  - Added the required column `updatedAt` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[RefreshToken] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [RefreshToken_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Platform] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Platform_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Platform_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[App] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [platformId] NVARCHAR(1000) NOT NULL,
    [bundleId] NVARCHAR(1000),
    [teamId] NVARCHAR(1000),
    [packageName] NVARCHAR(1000),
    [sha256] NVARCHAR(1000),
    [baseUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [App_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [App_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DynamicLinkSettings] (
    [id] NVARCHAR(1000) NOT NULL,
    [appId] NVARCHAR(1000) NOT NULL,
    [customDomain] NVARCHAR(1000),
    [fallbackUrl] NVARCHAR(1000) NOT NULL,
    [utmSource] NVARCHAR(1000),
    [utmCampaign] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DynamicLinkSettings_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [DynamicLinkSettings_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [DynamicLinkSettings_appId_key] UNIQUE NONCLUSTERED ([appId])
);

-- AddForeignKey
ALTER TABLE [dbo].[App] ADD CONSTRAINT [App_platformId_fkey] FOREIGN KEY ([platformId]) REFERENCES [dbo].[Platform]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DynamicLinkSettings] ADD CONSTRAINT [DynamicLinkSettings_appId_fkey] FOREIGN KEY ([appId]) REFERENCES [dbo].[App]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
