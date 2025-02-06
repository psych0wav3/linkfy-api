BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[App] DROP CONSTRAINT [App_platformId_fkey];

-- CreateTable
CREATE TABLE [dbo].[Domain] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [scheme] NVARCHAR(1000) NOT NULL,
    [host] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Domain_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Domain_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Domain_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[DynamicLink] (
    [id] NVARCHAR(1000) NOT NULL,
    [domainId] NVARCHAR(1000) NOT NULL,
    [slug] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DynamicLink_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [DynamicLink_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [DynamicLink_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[DynamicLinkApp] (
    [id] NVARCHAR(1000) NOT NULL,
    [dynamicLinkId] NVARCHAR(1000) NOT NULL,
    [appId] NVARCHAR(1000) NOT NULL,
    [destination] NVARCHAR(1000) NOT NULL,
    [fallbackUrl] NVARCHAR(1000),
    CONSTRAINT [DynamicLinkApp_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[App] ADD CONSTRAINT [App_platformId_fkey] FOREIGN KEY ([platformId]) REFERENCES [dbo].[PlatformType]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DynamicLink] ADD CONSTRAINT [DynamicLink_domainId_fkey] FOREIGN KEY ([domainId]) REFERENCES [dbo].[Domain]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DynamicLinkApp] ADD CONSTRAINT [DynamicLinkApp_dynamicLinkId_fkey] FOREIGN KEY ([dynamicLinkId]) REFERENCES [dbo].[DynamicLink]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DynamicLinkApp] ADD CONSTRAINT [DynamicLinkApp_appId_fkey] FOREIGN KEY ([appId]) REFERENCES [dbo].[App]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
