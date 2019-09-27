const mongoose = require('mongoose'); //requires mongoose
const dotenv = require('dotenv'); //requires dotenv 
const app = require('./app');
/* const fs = require('fs'); */
/* const express = require('express'); */
/* const stringify = require('stringify'); //require stringify */
/* const morgan = require('morgan'); //require morgan  */
/* const tbl_Admin_userRoutes = express.Router(); */ // creates an instance of the Express Router
/* let tbl_Admin_user = require('./dev-data/data/tbl_Admin_user.model'); */

/* const PORT = 3000; */
/* const cors = require('cors'); */

/* app.use(cors()); */

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

// 1) MIDDLEWARE
dotenv.config({ path: `${__dirname}/../../config.env`});
/* app.use(morgan('dev'));  */


app.use(express.json());

console.log(process.env);
/*
app.use((req, res, next) => { 

})*/
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true, 
    })
    .then(() => {
        console.log('DB connection successful!');
    });
/* const connection = mongoose.connection
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
}) */

/* 
tbl_Admin_userRoutes
    .route('/')
    .get(function(req,res) {tbl_Admin_user
    .find (function (err, tbl_Admin_users) {
        if (err) {
            console.log(err);
    }   else {
            res.json(tbl_Admin_users);
            }
        });
    }); //adds an endpoint which is delivering all available tbl_Admin_users items

tbl_Admin_userRoutes
    .route('/:id')
    .get(function(req, res) {
        let id = req.params.id;
        tbl_Admin_user
        .findById(id, function(err, tbl_Admin_user) {
        res.json(tbl_Admin_user);
        });
    }); // to accept the :id parameter, and attach it to the HTTP respoonse in JSON

tbl_Admin_userRoutes.route('/add').post(function(req, res) {
    let tbl_Admin_user = new tbl_Admin_user(req.body);
    tbl_Admin_user.save()
        .then(tbl_Admin_user => {
            res.status(200).json({'tbl_Admin_user': 'tbl_Admin_user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new tbl_Admin_user failed');
        });
}); // adds the route needed to be able to add new tbl_Admin_user items by sending a HTTP request (/add)

tbl_Admin_userRoutes.route('/update/:id').post(function(req, res) {
    tbl_Admin_user.findById(req.params.id, function(err, tbl_Admin_user) {
        if (!tbl_Admin_user)
            res.status(404).send("data is not found");
        else
            tbl_Admin_user.tbl_Admin_user_admin_id = req.body.tbl_Admin_user_admin_id;
            tbl_Admin_user.tbl_Admin_user_parent_admin_id = req.body.tbl_Admin_user_parent_admin_id;
            tbl_Admin_user.tbl_Admin_user_admin_type = req.body.tbl_Admin_user_admin_type;
            tbl_Admin_user.tbl_Admin_user_admin_uid = req.body.tbl_Admin_user_admin_uid;
            tbl_Admin_user.tbl_Admin_user_admin_pwd = req.body.tbl_Admin_user_admin_pwd;
            tbl_Admin_user.tbl_Admin_user_admin_name = req.body.tbl_Admin_user_admin_name;
            tbl_Admin_user.tbl_Admin_user_admin_emailid = req.body.tbl_Admin_user_admin_emailid;
            tbl_Admin_user.tbl_Admin_user_admin_phone = req.body.tbl_Admin_user_admin_phone;
            tbl_Admin_user.tbl_Admin_user_priviligeid = req.body.tbl_Admin_user_priviligeid;
            tbl_Admin_user.tbl_Admin_user_created_on = req.body.tbl_Admin_user_created_on;
            tbl_Admin_user.tbl_Admin_user_tstamp = req.body.tbl_Admin_user_tstamp;

            tbl_Admin_user.save().then(tbl_Admin_user => {
                res.json('tbl_Admin_user updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
}); //HTTP POST route /update/:id is added:

app.use('/tbl_Admin_users', tbl_Admin_userRoutes); // router added as middleware to take control of request starting with path/tbl_Admin_users */

/* const tbl_Admin_user = fs.readFileSync(`${__dirname}/dev-data/data/tbl_Admin_user.model.js`); */


//ROUTES

app.get('/api/tbl_Admin_user', tbl_Admin_userRouter);

app.post('/api/tbl_enduser', tbl_enduserRouter);


//START SERVER

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}..`);
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
