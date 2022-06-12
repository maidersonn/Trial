const router = require("express").Router();


module.exports = (db) => {
    router.get("/nominations", require("./getNominations")(db));

    return router;
};