import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient Singleton Pattern
 *
 * In Next.js development mode, files recompile upon save, which can trigger
 * multiple PrismaClient instantiations and quickly exhaust database connection pools.
 * By attaching Prisma to globalThis, we maintain a single active connection pool.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
