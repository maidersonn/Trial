const getNominations = require("../data/getNominations");

module.exports = (db) => async (req, res, next) => {
    const results = await getNominations(db);

    if (results === false) {
        res.status(500).json({
            success: false,
            message: "Some transient error ocurred"
        })
    };


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
    })
};