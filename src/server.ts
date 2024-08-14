import { app } from "./app";
import { env } from "./env";
import { prisma } from "./lib/prisma";

async function startServer() {
  try {
    // Tenta conectar ao banco de dados
    await prisma.$connect();
    console.log("Database connected.");

    // Inicia o servidor somente após a conexão ser bem-sucedida
    app
      .listen({
        host: "0.0.0.0",
        port: env.PORT,
      })
      .then(() => {
        console.log(`Server is running on http://localhost:${env.PORT}`);
      });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    console.log("❌ Server is not running.");
  }
}

// Chama a função para iniciar o servidor
startServer();
