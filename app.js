const express = require("express");
const request = require('request');
const https = require("https");
const mongoose = require("mongoose");
// const FormData = require("form-data");
// var fs = require("fs");
// const { response } = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/Repozitory");

const itemsSchema = {
    fName: String,
    lName: String,
    pass: Number,
    emp: Number,
    gen: String,
    dat: Date,
    dep: String,
    des: String,
    email: String,
    add: String,
    pro: String,
    city: String,
    count: String
}

const Form = mongoose.model("Form", itemsSchema);

app.get("/", function(req, res) {
    Form.find({}, function(err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { details: allDetails });
        }
    });

});

app.get("/form", function(req, res) {
    // Form.findById(function(err, foundID) {
    //     if (!err) {
    //         console.log(foundID);
    //     } else {
    //         console.log(err);
    //     }
    // });
    res.render("form");
});
app.get("/personal", function(req, res) {
    // Form.find({}, function(err, items) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("personal", { item: items });
    //     }
    // });

    res.render("personal");

});
// app.get("/personal/:PersonalID", function(req, res) {
//     const requestedID = req.params.PersonalID;
//     Form.findOne({ _id: requestedID }, function(err, allDetails) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("personal", { details: allDetails });
//         }
//     });

// res.render("personal");
// });


app.post("/form", function(req, res) {
    const form = new Form({
        fName: req.body.fName,
        lName: req.body.lName,
        pass: req.body.pass,
        emp: req.body.emp,
        gen: req.body.gen,
        dat: req.body.dat,
        dep: req.body.dep,
        des: req.body.des,
        email: req.body.email,
        add: req.body.add,
        pro: req.body.pro,
        city: req.body.city,
        count: req.body.count
    });
    form.save();
    res.render("personal", {
        form: form
    });

});

app.listen(3000, function(req, res) {
    console.log("server is started");
})