const { sql } = require("slonik");

module.exports = async (db) => {
    try {
        const result = await db.query(sql`
            SELECT id, email, description, involvement, talent, referrer, dataReferrer, status
            FROM referral
            WHERE status = 'pending'
      `);
        return result.rows;
    } catch (error) {
        console.error("Error at geTNominations query: ", error.message);
        throw error;
    }
};

