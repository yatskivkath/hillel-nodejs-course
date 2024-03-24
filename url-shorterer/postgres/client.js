import pg from 'pg'

const client = new pg.Client({
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT,
    database: process.env.DB_POSTGRES_DATABASE,
    user: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD
})

await client.connect();

export default client;