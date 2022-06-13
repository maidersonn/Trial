const router = require("express").Router();


module.exports = (db) => {
    router.get("/nominations", require("./getNominations")(db));
    router.post("/members/:memberId/nominations", require("./createNomination")(db));
    return router;
};