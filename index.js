require("dotenv").config();
const environment = process.env.DB_ENV || "development";

if (environment === "production") {
  const knex = require("knex")(require("./knexfile.js").production);

  knex.migrate.latest()
    .then(() => {
      console.log("Migrations completed");
      startServer();
    })
    .catch(err => {
      console.error("Migration failed", err);
      process.exit(1);
    });
} else {
  startServer();
}


function startServer() {
  const server = require('./api/server.js');

  const PORT = process.env.PORT || 3500;
  server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });
}

