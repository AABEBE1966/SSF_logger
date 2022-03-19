const express = require("express");
const jwt = require("jsonwebtoken");
const withAuthAdmin = require("../controllers/withAuthAdmin")
const Person = require("../models/Person");
const Admin = require("../models/Admin");

const dotenv = require("dotenv");
dotenv.config({
    path: "../config.env",
});
const router = express.Router();

const allowedEmails = ["nefnegn@gmail.com"];

router.post("/sign_up", async (req, res) => {
    const { firstName, lastName, email, password } =
        req.body;
    if (allowedEmails.indexOf(email.toLowerCase() === -1)) {
        return res.status(201).send({
            message: `You are not authorize to use this.`
        });
    }
    const existingAdmin = await Admin.findOne(
        {
            email: { $regex: "^" + email + "$", $options: "i" },
        },
        { email: 1 }
    );
    if (existingAdmin) {
        return res.status(201).send({
            message: `${email} is used by another account. Please use another email.`
        });
    }

    try {
        let admin = new Admin({
            firstName,
            lastName,
            email,
            password,
        });
        await admin.save();

        return res.status(200).send({ message: "Admin account created successfully!" });
    } catch (err) {
        return res
            .status(201)
            .send({ message: "Failed to create admin " + err.message });
    }
});


router.post("/sign_in", async function (req, res) {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        let admin = await Admin.findOne({ email: { $regex: "^" + email + "$", $options: "i" } }, {
            password: 1,
            tokens: 1,
            email: 1
        })

        if (!admin) {
            res.cookie("email", "");
            res.cookie("admin_token", "");
            res.cookie("isAuth", false);
            return res.status(201).send({
                message: `Failed to log in. Please check your credentials and try again.`,
            });
        }

        await admin.isCorrectPassword(password, async (err, same) => {

            if (err || !same) {
                res.cookie("email", "");
                res.cookie("admin_token", "");
                res.cookie("isAuth", false);
                return res.status(201).send({
                    message: `Failed to log in. Please check your credentials and try again.`,
                });
            } else {
                // Issue token
                const payload = { email: admin["email"] };
                const token = jwt.sign(payload, process.env.JWT_TOKEN, {
                    expiresIn: "1d",
                });
                admin.tokens.push(token);
                res.cookie("email", admin['email']);
                res.cookie("admin_token", token);
                res.cookie("isAuth", true);
                await admin.save();
                let adminRes = await Admin.findById(admin._id, { password: 0, tokens: 0, email: 0 })
                return res.status(200).send({
                    message: "Logger signed in successfully!",
                    admin: adminRes
                });
            }
        });
    } catch (e) {
        res.cookie("email", "");
        res.cookie("admin_token", "");
        res.cookie("isAuth", false);
        return res.status(201).send({
            message: `Failed to log in. Please check your credentials and try again.`,
        });
    }
});


router.get("/log_out", withAuthAdmin, async function (req, res) {
    const token = req.cookies.admin_token;
    const email = req.cookies.email;

    const already_login = await Admin.findOne(
        { email: { $regex: "^" + email + "$", $options: "i" } },
        {
            tokens: 1
        }
    );

    if (already_login && already_login["tokens"].indexOf(token) !== -1) {
        already_login["tokens"] = []
        //.splice((already_login["tokens"].indexOf(token), 1));
        res.cookie("email", "");
        res.cookie("admin_token", "");
        res.cookie("isAuth", false);
        await already_login.save();
        return res.status(200).send({ message: "Sucessfully Logged Out!" });
    } else {
        res.cookie("email", "");
        res.cookie("admin_token", "");
        res.cookie("isAuth", false);
        return res
            .status(201)
            .send({ message: "Sucessfully Logged Out!" });
    }
});



router.get("/find_all_persons", withAuthAdmin, async (req, res) => {
    try {
        let persons = await Person.find({})
        return res.status(200).send(persons);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});


router.get("/get_logged_in_admin", withAuthAdmin, async (req, res) => {
    let token = req
    console.log(req)
    let admin_id = req.adminId
    console.log(admin_id)
    try {
        let admin = await Admin.findById(admin_id, { tokens: 0, password: 0 })
        return res.status(200).send({ admin: admin, message: "Logger data returned successfully!" });
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});

router.post("/find_all_persons_by_zone/", withAuthAdmin, async (req, res) => {
    const { zone } = req.body
    try {
        let persons = await Person.find({ zone: zone })
        return res.status(200).send(persons);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});

router.post("/find_all_persons_by_wereda/", async (req, res) => {
    const { wereda, zone } = req.body
    try {
        let persons = await Person.find({ zone: zone, wereda: wereda })
        return res.status(200).send(persons);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});

router.get("/find_person/", withAuthAdmin, async (req, res) => {
    const { licenseNumber } = req.body

    try {
        let persons = await Person.find({ licenseNumber: licenseNumber })
        return res.status(200).send(persons);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});


router.get("/find_all_metrics", async (req, res) => {
    const person = await Person.find({}).count();
    const bullet_data = await Person.aggregate([{
        $group: {
            _id: null,
            total: {
                $sum: "$bulletNumber"
            }
        }
    }]);
    const AK47 = await Person.find({ armType: 'AK 47' }).count();
    const brail = await Person.find({ armType: 'Brail' }).count();
    const dishka = await Person.find({ armType: 'Dishka' }).count();
    const abraraw = await Person.find({ armType: 'Abraraw' }).count();
    const guande = await Person.find({ armType: 'Guande' }).count();

    let bullet = bullet_data[0].total
    let data = {
        "person": person, "AK47": AK47, "bullet": bullet
        , "brail": brail, "dishka": dishka, "abraraw": abraraw, "guande": guande
    }

    try {
        //let persons = await Person.find({ licenseNumber: licenseNumber })
        return res.status(200).send(data);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});


router.post("/find_all_metrics_for_zone_with_wereda", async (req, res) => {
    const { zone } = req.body

    const zone_wereda_arm_type_data  = await Person.aggregate([{
        $match: { zone: zone }
    }, {
        $group: {
            _id: { wereda: "$wereda", armType: "$armType" },
            total_bullet: {
                $sum: "$bulletNumber"
            },
            total_person: {
                $sum: 1
            },
        }
    }]);

    let temp_data = {}

    for (let i = 0; i < zone_wereda_arm_type_data.length; i++) {
        let wereda_arm_type_data = zone_wereda_arm_type_data[i]
        let wereda_name = wereda_arm_type_data["_id"]['wereda']
        let arm_type = wereda_arm_type_data["_id"]['armType']
        let total_person = wereda_arm_type_data["total_person"]
        let total_bullet = wereda_arm_type_data["total_bullet"]

        if (wereda_name in temp_data) {
            temp_data[wereda_name][arm_type] = temp_data[wereda_name][arm_type] + total_person
            temp_data[wereda_name]["person"] = temp_data[wereda_name]["person"] + total_person
            temp_data[wereda_name]["bullet"] = temp_data[wereda_name]["bullet"] + total_bullet
        } else {
            temp_data[wereda_name] = {
                "Dishka": 0,
                "Guande": 0,
                "Brail": 0,
                "Abraraw": 0,
                "AK 47": 0,
                "bullet": 0,
                "person":0
            }
            temp_data[wereda_name][arm_type] = total_person
            temp_data[wereda_name]["person"] = total_person
            temp_data[wereda_name]["bullet"] = total_bullet

        }
       // data['zone']=zone
    }
    let data=[]
    let keys = Object.keys(temp_data);
    for (let i = 0; i < keys.length; i++) {
        let wereda_name = keys[i]
        let value = temp_data[wereda_name];
        value['wereda']=wereda_name
        data.push(value)
    }


    try {
        //let persons = await Person.find({ licenseNumber: licenseNumber })
        return res.status(200).send(data);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});


router.get("/find_all_metrics_for_region_with_zone", async (req, res) => {

    const region_zone_arm_type_data  = await Person.aggregate([ {
        $group: {
            _id: { zone: "$zone", armType: "$armType" },
            total_bullet: {
                $sum: "$bulletNumber"
            },
            total_person: {
                $sum: 1
            },
        }
    }]);

    let temp_data = {}

    for (let i = 0; i < region_zone_arm_type_data.length; i++) {
        let zone_arm_type_data = region_zone_arm_type_data[i]
        let zone_name = zone_arm_type_data["_id"]['zone']
        let arm_type = zone_arm_type_data["_id"]['armType']
        let total_person = zone_arm_type_data["total_person"]
        let total_bullet = zone_arm_type_data["total_bullet"]

        if (zone_name in temp_data) {
            temp_data[zone_name][arm_type] = temp_data[zone_name][arm_type] + total_person
            temp_data[zone_name]["person"] = temp_data[zone_name]["person"] + total_person
            temp_data[zone_name]["bullet"] = temp_data[zone_name]["bullet"] + total_bullet
        } else {
            temp_data[zone_name] = {
                "Dishka": 0,
                "Guande": 0,
                "Brail": 0,
                "Abraraw": 0,
                "AK 47": 0,
                "bullet": 0,
                "person":0
            }
            temp_data[zone_name][arm_type] = total_person
            temp_data[zone_name]["person"] = total_person
            temp_data[zone_name]["bullet"] = total_bullet

        }
       // data['zone']=zone
    }
    let data=[]
    let keys = Object.keys(temp_data);
    for (let i = 0; i < keys.length; i++) {
        let zone_name = keys[i]
        let value = temp_data[zone_name];
        value['zone']=zone_name
        data.push(value)
    }


    try {
        //let persons = await Person.find({ licenseNumber: licenseNumber })
        return res.status(200).send(data);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});

router.post("/find_all_metrics_for_zone", async (req, res) => {
    const { zone } = req.body
    console.log(zone)

    const person = await Person.find({ zone: zone }).count();
    const bullet_data = await Person.aggregate([{
        $match: { zone: zone }
    }, {
        $group: {
            _id: null,
            total: {
                $sum: "$bulletNumber"
            }
        }
    }]);
    const AK47 = await Person.find({ zone: zone, armType: 'AK 47' }).count();
    const brail = await Person.find({ zone: zone, armType: 'Brail' }).count();
    const dishka = await Person.find({ zone: zone, armType: 'Dishka' }).count();
    const abraraw = await Person.find({ zone: zone, armType: 'Abraraw' }).count();
    const guande = await Person.find({ zone: zone, armType: 'Guande' }).count();

    let bullet = bullet_data[0].total
    let data = {
        "person": person, "AK47": AK47, "bullet": bullet
        , "brail": brail, "dishka": dishka, "abraraw": abraraw, "guande": guande, zone: zone
    }

    try {
        //let persons = await Person.find({ licenseNumber: licenseNumber })
        return res.status(200).send(data);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});



router.post("/find_all_metrics_for_wereda", async (req, res) => {
    const { zone, wereda } = req.body

    const person = await Person.find({ zone: zone, wereda: wereda }).count();
    const bullet_data = await Person.aggregate([{
        $match: { zone: zone, wereda: wereda }
    }, {
        $group: {
            _id: null,
            total: {
                $sum: "$bulletNumber"
            }
        }
    }]);
    const AK47 = await Person.find({ zone: zone, wereda: wereda, armType: 'AK 47' }).count();
    const brail = await Person.find({ zone: zone, wereda: wereda, armType: 'Brail' }).count();
    const dishka = await Person.find({ zone: zone, wereda: wereda, armType: 'Dishka' }).count();
    const abraraw = await Person.find({ zone: zone, wereda: wereda, armType: 'Abraraw' }).count();
    const guande = await Person.find({ zone: zone, wereda: wereda, armType: 'Guande' }).count();

    let bullet = bullet_data[0].total
    let data = {
        "person": person, "AK47": AK47, "bullet": bullet
        , "brail": brail, "dishka": dishka, "abraraw": abraraw, "guande": guande, wereda: wereda, zone: zone
    }

    try {
        //let persons = await Person.find({ licenseNumber: licenseNumber })
        return res.status(200).send(data);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});

module.exports = router;