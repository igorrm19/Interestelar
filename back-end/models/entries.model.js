const Pool = require("../models/db.model");

const getEntries = () => {
    return Pool.query("SELECT * FROM entries ORDER BY name ASC");
};

const getEntryById = (id) => {
    return Pool.query("SELECT * FROM entries WHERE id = $1", [id]);
};

const createEntry = (entry) => {
    return Pool.query(
        "INSERT INTO entries (name, type, danger_level, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [entry.name, entry.type, entry.danger_level, entry.description]
    );
};

const updateEntry = (id, entry) => {
    return Pool.query(
        "UPDATE entries SET name = $2, type = $3, danger_level = $4, description = $5 WHERE id = $1 RETURNING *",
        [id, entry.name, entry.type, entry.danger_level, entry.description]
    );
};

const deleteEntry = (id) => {
    return Pool.query("DELETE FROM entries WHERE id = $1", [id]);
};

module.exports = {
    getEntries,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry
};
