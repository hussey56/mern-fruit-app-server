const fs = require("fs");
const path = require("path");

const checkFileExists = (req, res, next) => {
    const folderPath = "public/uploads/";
    const fileName = req.file.originalname;

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            throw err;
        }
        const existingFile = files.filter((file) => file === fileName);
        if (existingFile.length > 0) {
            return res.status(400).send({ error: "A file with the same name already exists in the folder." });
        }
        next();
    });
};

module.exports = checkFileExists;
