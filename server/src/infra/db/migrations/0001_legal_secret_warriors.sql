ALTER TABLE "urls" RENAME COLUMN "shortened_url" TO "short_code_url";--> statement-breakpoint
ALTER TABLE "urls" DROP CONSTRAINT "urls_shortened_url_unique";--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "urls_short_code_url_unique" UNIQUE("short_code_url");