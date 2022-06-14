const { sql } = require("slonik");

module.exports = async (db, memberId) => {
    try {
        const result = await db.query(sql`
            SELECT email
            FROM members
            WHERE id = ${memberId}
      `);
        return result.rowCount;
    } catch (error) {
        console.info("Error at geById query: ", error.message);
        return false;
    }
};
