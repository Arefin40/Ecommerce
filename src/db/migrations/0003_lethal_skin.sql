DROP INDEX "by_product";--> statement-breakpoint
CREATE INDEX "by_product" ON "product_images" USING btree ("product");