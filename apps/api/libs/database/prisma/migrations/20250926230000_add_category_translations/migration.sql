-- CreateTable
CREATE TABLE "category_translations" (
    "id" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "language" VARCHAR(5) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_translations_categoryId_language_key" ON "category_translations"("categoryId", "language");

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrate existing data to translations table
INSERT INTO "category_translations" ("id", "categoryId", "language", "name", "description", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    "id",
    'pt',
    "name",
    "description",
    "createdAt",
    "updatedAt"
FROM "categories";

-- Drop columns from categories table
ALTER TABLE "categories" DROP COLUMN "name";
ALTER TABLE "categories" DROP COLUMN "description";
