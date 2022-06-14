const { sql } = require("slonik");

module.exports = async (db, memberId) => {
    try {
        const result = await db.query(sql`
            SELECT email
            FROM members
            WHERE id = ${memberId}
      `);
        return result.rows;
    } catch (error) {
        console.error("Error at geById query: ", error.message);
        throw error;
    }
};
