const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media')
    },
    filename: function (req, file, cb) {

     const uniqueName = `${Date.now()}_${file.originalname}`;
      cb(null,uniqueName)
    }
  });
module.exports = multer({storage:storage});