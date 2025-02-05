BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[App] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [platformId] NVARCHAR(1000) NOT NULL,
    [packageName] NVARCHAR(1000),
    [sha256] NVARCHAR(1000),
    [bundleId] NVARCHAR(1000),
    [teamId] NVARCHAR(1000),
    [baseUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [App_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [App_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PlatformType] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PlatformType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PlatformType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[App] ADD CONSTRAINT [App_platformId_fkey] FOREIGN KEY ([platformId]) REFERENCES [dbo].[PlatformType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
