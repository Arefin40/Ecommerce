CREATE TABLE "address" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"name" text,
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
CREATE TABLE "zone" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_zone_zone_id_fk" FOREIGN KEY ("zone") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_area_area_id_fk" FOREIGN KEY ("area") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area" ADD CONSTRAINT "area_zone_zone_id_fk" FOREIGN KEY ("zone") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;