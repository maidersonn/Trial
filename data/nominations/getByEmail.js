const { sql } = require("slonik");

module.exports = async (db, email) => {
    try {
        const result = await db.query(sql`
            SELECT id
            FROM referral
            WHERE email = ${email}
      `);
        return result.rows[0];

    } catch (error) {
        console.error("Error at geByEmail query: ", error.message);
        throw error;
    }
};