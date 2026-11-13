import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";
import { CONTENT_TAG_BY_MODEL, expireContentTag } from "@/lib/content-cache";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function parseDatabaseUrl(value: string): URL {
  try {
    return new URL(value);
  } catch {
    // Drop the original error: it can contain the full connection string.
    throw new Error("DATABASE_URL is not a valid connection URL.");
  }
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const parsedDatabaseUrl = parseDatabaseUrl(databaseUrl);

  const adapter = new PrismaMariaDb({
    host: parsedDatabaseUrl.hostname,
    port: Number(parsedDatabaseUrl.port) || 3306,
    user: decodeURIComponent(parsedDatabaseUrl.username),
    password: decodeURIComponent(parsedDatabaseUrl.password),
    database: parsedDatabaseUrl.pathname.replace(/^\//, ""),

    // The hosting MySQL user may open only 500 connections per hour, shared by
    // every server instance and local development. Each instance (and Proxy,
    // which has its own) keeps one connection open and adds up to two more
    // under load. The driver's default opens all 10 of a 10-connection pool
    // at startup. minimumIdle must stay at least 1: with 0, mariadb 3.4 never
    // opens a connection and every query times out.
    connectionLimit: 3,
    minimumIdle: 1,

    // Don't wait indefinitely for a database connection. A refused connection
    // (e.g. the hourly limit) is retried until acquireTimeout, so it is kept
    // short; queries are quick, so a free connection never takes this long.
    connectTimeout: 10000,
    acquireTimeout: 5000,
  });

  const WRITE_OPERATIONS = new Set([
    "create",
    "createMany",
    "createManyAndReturn",
    "update",
    "updateMany",
    "updateManyAndReturn",
    "upsert",
    "delete",
    "deleteMany",
  ]);

  // Every successful write to content shown on public pages expires that
  // content's cache, so admin edits appear on the next visit.
  return new PrismaClient({ adapter }).$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const result = await query(args);
          const tag = CONTENT_TAG_BY_MODEL[model];

          if (tag && WRITE_OPERATIONS.has(operation)) {
            expireContentTag(tag);
          }

          return result;
        },
      },
    },
  }) as unknown as PrismaClient;
}

let client = globalForPrisma.prisma;

function getPrismaClient(): PrismaClient {
  if (!client) {
    client = createPrismaClient();

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
  }

  return client;
}

// Connects on first use, so a missing or invalid DATABASE_URL fails where the
// database is accessed and can be handled there, not while importing this file.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const instance = getPrismaClient();
    const value = Reflect.get(instance, property, instance);

    return typeof value === "function" ? value.bind(instance) : value;
  },
});
