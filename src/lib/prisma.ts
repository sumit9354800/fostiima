import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

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

    // Allow parallel homepage queries.
    connectionLimit: 10,

    // Don't wait indefinitely for a database connection.
    connectTimeout: 10000,
  });

  return new PrismaClient({
    adapter,
  });
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
