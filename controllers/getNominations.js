const getNominations = require("../data/nominations/getAllNonRejected");

module.exports = (db) => async (_, res) => {

    try {
        const results = await getNominations(db);

        const nominations = results.map(({ id, email, description, involvement, talent, referrer, dataReferred, status }) => {
            return {
                "id": id,
                "email": email,
                "description": description,
                "score": {
                    "involvement": involvement,
                    "talent": talent
                },
                "referrer": referrer,
                "dataReferrer": dataReferred,
                "status": status
            }
        })

        res.status(200).json({
            message: "Request message response",
            data: nominations
        });

    } catch (error) {
        res.status(500).json({
            message: "Some transient error ocurred"
        })
    }
};