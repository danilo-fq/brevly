import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const urls = pgTable('urls', {
	id: uuid('id').primaryKey().defaultRandom(),
	originalUrl: text('original_url').notNull(),
	shortCodeUrl: text('short_code_url').notNull().unique(),
	countViews: integer('count_views').notNull().default(0),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})
