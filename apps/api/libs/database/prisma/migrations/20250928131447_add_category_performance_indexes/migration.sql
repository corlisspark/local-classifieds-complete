-- CreateIndex
CREATE INDEX "categories_parentId_active_idx" ON "categories"("parentId", "active");

-- CreateIndex
CREATE INDEX "categories_active_displayOrder_idx" ON "categories"("active", "displayOrder");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");
