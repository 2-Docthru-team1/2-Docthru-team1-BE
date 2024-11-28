-- CreateTable
CREATE TABLE "_recipeLikeRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_recipeLikeRelation_AB_unique" ON "_recipeLikeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_recipeLikeRelation_B_index" ON "_recipeLikeRelation"("B");

-- AddForeignKey
ALTER TABLE "_recipeLikeRelation" ADD CONSTRAINT "_recipeLikeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipeLikeRelation" ADD CONSTRAINT "_recipeLikeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
