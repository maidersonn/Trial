const createNomination = require("../data/nominations/create");
const getNomineeByEmail = require("../data/nominations/getByEmail");
const getMemberById = require("../data/members/getById");
const sendEmail = require("../helpers/emailHandler");

module.exports = (db) => async (req, resp) => {

    try {
        const { memberId } = req.params;
        const { email, description, score } = req.body;

        if (!isRequestValid({ memberId, email, description, score })) {
            return resp.status(400).json({
                success: false,
                message: "Given data failed"
            });
        };
        const member = await getMemberById(db, memberId);

        if (!member) {
            return resp.status(400).json({
                message: "Member does not exist"
            });
        };

        const nominee = await getNomineeByEmail(db, email);

        if (nominee) {
            return resp.status(409).json({
                message: "Nomination already exists"
            });
        };

        const status = score.talent < 8 ? "rejected" : "pending";

        const result = await createNomination(db, { memberId, email, description, involvement: score.involvement, talent: score.talent, status });

        if (result[0].status === "rejected") {
            sendEmail([member.email, result[0].email]);
        };

        resp.status(200).json({ message: "Nomination created" });

    } catch (error) {
        resp.status(500).json({
            message: "Some transient error ocurred"
        })
    }
};

const isUUID = (string) => string.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const isRequestValid = ({ memberId, email, score, description }) => {

    return isEmailValid(email) && isMemberIdValid(memberId) && isScoreValid(score) && isDescriptionValid(description);
};

const isEmailValid = (email) => (email !== undefined && isEmail(email));

const isMemberIdValid = (memberId) => (memberId !== undefined && isUUID(memberId));

const isScoreValid = (score) => {
    return (
        score !== undefined &&
        score.involvement !== undefined && score.involvement !== "" && !isNaN(score.involvement) &&
        score.talent !== undefined && score.talent !== "" && !isNaN(score.talent) &&
        (score.talent >= 0 && score.talent <= 10) &&
        (score.involvement >= 0 && score.involvement <= 10)
    );
};

const isDescriptionValid = (description) => description !== undefined;

