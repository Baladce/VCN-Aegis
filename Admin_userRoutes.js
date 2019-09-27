const fs = require('fs');

const router = express.Router();

const tbl_enduser = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tbl_Admin_user.json`)
);

exports.getAllAdmin_user = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tbl_Admin_user.length,
        data: {
            tbl_Admin_user
        }
    });
}

exports.getAdmin_user = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;

    const tbl_Admin_user = tbl_Admin_user.find(el => el.id === id);

  //  if(id > tbl_Admin_user.length) {
    if(!tbl_Admin_user) {
        return res.status(404).json({
             status: 'fail',
             message: 'Invalid ID'
        });
    }  

    res.status(200).json({
        status: 'success',
        data: {
            tbl_Admin_user
        }
    })
};

exports.createAdmin = (req, res) => {
    // console.log(req.body);

    const newId = tbl_Admin_user[tbl_Admin_user.length - 1].id + 1;
    const newtbl_Admin_user = Object.assign({ id: newId }, req.body);

    tbl_Admin_user.push(newtbl_Admin_user);

    fs.writeFile(`${__dirname}/dev-data/data/tbl_Admin_user.model.js`, JSON.stringify(tbl_Admin_user), err => {
        res.status(201).json({
            status: 'created',
            data: {
                tbl_Admin_user: newtbl_Admin_user
                }
            });
        }
    )
     res.send('Done'); 
};



const router = express.Router();




module.exports = router;