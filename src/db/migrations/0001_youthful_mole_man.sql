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
ALTER TABLE "store" ADD CONSTRAINT "store_merchant_user_id_fk" FOREIGN KEY ("merchant") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_followers" ADD CONSTRAINT "store_followers_store_store_id_fk" FOREIGN KEY ("store") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_followers" ADD CONSTRAINT "store_followers_follower_user_id_fk" FOREIGN KEY ("follower") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;