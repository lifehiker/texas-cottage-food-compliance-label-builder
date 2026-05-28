import path from "node:path";
import { PrismaClient } from "@prisma/client";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
function normalizeSqliteDatabaseUrl() {
  const url = process.env.DATABASE_URL;

  if (!url || (!url.startsWith("file:./") && !url.startsWith("file:../"))) {
    return;
  }

  const relativePath = url.slice("file:".length);
  const prismaSchemaDir = path.join(/* turbopackIgnore: true */ process.cwd(), "prisma");
  process.env.DATABASE_URL = `file:${path.resolve(prismaSchemaDir, relativePath)}`;
}

normalizeSqliteDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" }),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
