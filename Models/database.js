import pg from "pg";

const db = new pg.Client({
    database : "IRCTC",
    password : "Collage@2022",
    host : "localhost",
    port : 5432,
    user : "postgres"
});

db.connect();

export default db;
