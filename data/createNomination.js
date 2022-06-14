const { sql } = require("slonik");

module.exports = async (db, { memberId, email, description, involvement, talent, status }) => {
    try {
        const result = await db.query(sql`
            INSERT INTO referral (referrer, email, description, involvement, talent, status)
            VALUES (${memberId}, ${email}, ${description}, ${involvement}, ${talent}, ${status})
            RETURNING email, status
      `);
        return result.rows;
    } catch (error) {
        console.error("Error at createNominations query: ", error.message);
        throw error;
    }
};
