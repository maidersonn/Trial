require('dotenv').config();

const db = require('../config/db');
const { sql } = require('slonik');

const create = async () => {
  try {
    await db.query(sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TYPE status_mode AS ENUM ('pending', 'rejected');
      `);

    await db.query(sql`     
      CREATE TABLE IF NOT EXISTS members (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL
      );
    
      CREATE TABLE IF NOT EXISTS referral (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        referrer uuid references members(id) NOT NULL,
        email TEXT NOT NULL,
        description TEXT,
        status status_mode NOT NULL,
        involvement SMALLINT NOT NULL CHECK (involvement BETWEEN 0 AND 10),
        talent SMALLINT NOT NULL CHECK (talent BETWEEN 0 AND 10),
        dataReferrer TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
        )
    `);
    console.info('> creation done! 🚀');
  } catch (error) {
    console.info('> creation error! ❌');
    console.info('>', error.message);
  }
};

create();