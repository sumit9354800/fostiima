
import "dotenv/config";
import mariadb from "mariadb";

async function testDatabase() {
  let connection;

  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL is missing from your environment.");
    }

    const url = new URL(databaseUrl);

    console.log("Testing Hostinger MySQL connection...");

    connection = await mariadb.createConnection({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: decodeURIComponent(url.pathname.slice(1)),
      connectTimeout: 10000,
    });

    const result = await connection.query("SELECT 1 AS connection_test");

    console.log("✅ Database connection successful!");
    console.log("✅ Test query result:", result[0]);
  } catch (error) {
    console.error("❌ Database connection failed.");
    console.error("Error code:", error.code ?? "Unknown");
    console.error("Error message:", error.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end().catch(() => {});
    }
  }
}

testDatabase();
