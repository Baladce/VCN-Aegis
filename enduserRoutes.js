const fs = require('fs');
const enduserController = require('./../controllers/enduserController.');

const router = express.Router();

const tbl_enduser = JSON.parse(
fs.readFileSync(`${__dirname}/../dev-data/data/tbl_endusers.json`)
);

exports.getAllendusers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}
exports.getendser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}
exports.createenduser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}
exports.updateenduser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}
exports.deleteenduser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

const tbl_enduser = express.Router();
tbl_enduser
    .Router('/')
    .get(getAllendusers)
    .post(createenduser);
tbl_enduser
    .Router('/:id')
    .get(getenduser)
    .patch(updateenduser)
    .delete(deleteenduser);




module.exports = router;