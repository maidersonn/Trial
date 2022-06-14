const createNomination = require("../data/nominations/create");
const getNomineeByEmail = require("../data/nominations/getByEmail");
const getMemberById = require("../data/members/getById");
const sendEmail = require("../helpers/emailHandler");

module.exports = (db) => async (req, resp) => {

    try {
        const { memberId } = req.params;
        const { email, description, score } = req.body;

        if (isRequestInvalid({ memberId, email, talent: score.talent, involvement: score.involvement })) {

            return resp.status(400).json({
                success: false,
                message: "Given data failed"
            });
        };

        const member = await getMemberById(db, memberId);

        if (!member.length) {
            return resp.status(400).json({
                message: "Member does not exist"
            });
        };


        const nominee = await getNomineeByEmail(db, email);

        if (nominee.length) {
            return resp.status(409).json({
                message: "Nomination already exists"
            });
        };

        const status = score.talent < 8 ? "rejected" : "pending";

        const result = await createNomination(db, { memberId, email, description, involvement: score.involvement, talent: score.talent, status });

        if (result[0].status === "rejected") {
            sendEmail([member[0].email, result[0].email]);
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

const isRequestInvalid = ({ memberId, email, talent, involvement }) => {

    return (email === undefined ||
        involvement === undefined || involvement === "" || isNaN(involvement) ||
        talent === undefined || talent === "" || isNaN(talent) ||
        memberId === undefined ||
        !isUUID(memberId) ||
        !isEmail(email) ||
        !(talent >= 0 && talent <= 10) ||
        !(involvement >= 0 && involvement <= 10));
}

