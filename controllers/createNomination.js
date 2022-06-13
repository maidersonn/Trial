const createNomination = require("../data/createNomination");

module.exports = (db) => async (req, resp, next) => {
    const { memberId } = req.params;
    const { email, description, score } = req.body;

    if (!email || !score.involvement || !score.talent || !memberId ||
        !isUUID(memberId) || isNaN(score.involvement) || isNaN(score.talent) || !isEmail(email) ||
        !(score.talent >= 0 && score.talent <= 10) || !(score.involvement >= 0 && score.involvement <= 10)) {

        resp.status(400).json({
            success: false,
            message: "Given data failed"
        });
    };

    const status = score.talent < 8 ? "rejected" : "pending";

    const result = await createNomination(db, { memberId, email, description, involvement: score.involvement, talent: score.talent, status });

    if (result === false) {
        resp.status(500).json({
            success: false,
            message: "Some transient error ocurred"
        })
    };

    console.log("result of insertion", result)

    resp.status(200).json({ message: "Nomination created" });

};

const isUUID = (string) => string.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

