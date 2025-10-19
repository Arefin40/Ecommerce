CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" text NOT NULL,
	"total_quantity" integer DEFAULT 0 NOT NULL,
	"total_price" numeric(10, 2) DEFAULT '0.00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"cart_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "cart_items_cart_id_product_id_pk" PRIMARY KEY("cart_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" text NOT NULL,
	"ordered_at" timestamp DEFAULT now() NOT NULL,
	"confirmed_at" timestamp,
	"fulfilled_at" timestamp,
	"shipped_at" timestamp,
	"out_for_delivery_at" timestamp,
	"delivered_at" timestamp,
	"cancelled_at" timestamp,
	"returned_at" timestamp,
	"order_status" text DEFAULT 'pending' NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"coupon" uuid,
	"discount_amount" numeric(10, 2),
	"shipping_name" text NOT NULL,
	"shipping_contact" text NOT NULL,
	"shipping_address" text NOT NULL,
	"shipping_zone" text NOT NULL,
	"shipping_area" text NOT NULL,
	"billing_name" text NOT NULL,
	"billing_contact" text NOT NULL,
	"billing_address" text NOT NULL,
	"billing_zone" text NOT NULL,
	"billing_area" text NOT NULL,
	"shipping_method" text DEFAULT 'STANDARD' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_id" uuid NOT NULL,
	"product_id" uuid,
	"product_name" text NOT NULL,
	"product_price" numeric(10, 2) NOT NULL,
	"product_image" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_product_per_order" UNIQUE("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"transaction_id" text,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" text NOT NULL,
	"order_id" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"payment_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_payment_per_order" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"discount_amount" numeric(10, 2),
	"discount_percent" numeric(5, 2),
	"max_usage" integer DEFAULT 1,
	"used_count" integer DEFAULT 0,
	"expires_at" timestamp with time zone,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "coupons_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "address" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"contact" text NOT NULL,
	"user_id" text NOT NULL,
	"zone" serial NOT NULL,
	"area" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "area" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"zone" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_application" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" text NOT NULL,
	"image" text,
	"nid" text NOT NULL,
	"mobile" text NOT NULL,
	"comment" text,
	"application_status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zone" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"store_id" uuid NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"stock" integer NOT NULL,
	"total_sales" integer DEFAULT 0 NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL,
	"total_likes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product" uuid NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_reviews" (
	"product" uuid NOT NULL,
	"reviewer" text,
	"reviewer_id" text,
	"rating" integer,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"store_id" uuid NOT NULL,
	"description" text NOT NULL,
	"total_likes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_likes" (
	"post_id" uuid NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_products" (
	"post_id" uuid NOT NULL,
	"product_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wishlist" (
	"user_id" text NOT NULL,
	"product_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"merchant" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"logo" text,
	"cover" text,
	"total_followers" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "store_followers" (
	"store" uuid NOT NULL,
	"follower" text NOT NULL,
	"followed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_coupon_coupons_id_fk" FOREIGN KEY ("coupon") REFERENCES "public"."coupons"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_zone_zone_id_fk" FOREIGN KEY ("zone") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_area_area_id_fk" FOREIGN KEY ("area") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area" ADD CONSTRAINT "area_zone_zone_id_fk" FOREIGN KEY ("zone") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "merchant_application" ADD CONSTRAINT "merchant_application_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_product_id_fk" FOREIGN KEY ("product") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_product_id_fk" FOREIGN KEY ("product") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_reviewer_id_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_products" ADD CONSTRAINT "post_products_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_products" ADD CONSTRAINT "post_products_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store" ADD CONSTRAINT "store_merchant_user_id_fk" FOREIGN KEY ("merchant") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_followers" ADD CONSTRAINT "store_followers_store_store_id_fk" FOREIGN KEY ("store") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_followers" ADD CONSTRAINT "store_followers_follower_user_id_fk" FOREIGN KEY ("follower") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "by_cart_user" ON "cart" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "by_cart_id" ON "cart_items" USING btree ("cart_id");--> statement-breakpoint
CREATE INDEX "by_order_user" ON "orders" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "by_order_status" ON "orders" USING btree ("order_status");--> statement-breakpoint
CREATE INDEX "by_order_item_order" ON "order_items" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "by_order_item_product" ON "order_items" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "by_payment_user" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "by_payment_order" ON "payments" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "by_coupon_is_active" ON "coupons" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "by_coupon_expiry" ON "coupons" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "by_coupon_code" ON "coupons" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "name_user_unique" ON "address" USING btree ("name","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_index" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "by_product" ON "product_images" USING btree ("product");--> statement-breakpoint
CREATE INDEX "by_post_store" ON "post" USING btree ("store_id");--> statement-breakpoint
CREATE INDEX "by_like_post" ON "post_likes" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "by_post_product" ON "post_products" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "by_wishlist_user" ON "wishlist" USING btree ("user_id");