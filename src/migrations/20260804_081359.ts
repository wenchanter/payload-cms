import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "subtitle" DROP NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "description" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "subtitle" SET NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "description" SET NOT NULL;`)
}
