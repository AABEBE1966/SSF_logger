const express = require("express");
const jwt = require("jsonwebtoken");
const withAuthLogger = require("../controllers/withAuthLogger")
const Logger = require("../models/Logger");
const Person = require("../models/Person");
const dotenv = require("dotenv");
const { zones } = require("../models/CONSTANTS");

const names = [
    "abebe", "alemu", "yosef", "mekonen", "mengesha", "chane", "mekash", "abere", "alemu", "belay", "Sisay", "Destaw", "Tesfaye", "Habtamu"
]
const armTypes = ["AK 47", "Brail", "Dishka", "Abraraw", "Guande"]
const zones_with_keys = Object.keys(zones);

dotenv.config({
    path: "../config.env",
});
const router = express.Router();


router.post("/sign_up", async (req, res) => {
    const { firstName, lastName, province, zone, wereda, kebele, email, password } =
        req.body;

    const existingLogger = await Logger.findOne(
        {
            email: { $regex: "^" + email + "$", $options: "i" },
        },
        { email: 1 }
    );
    if (existingLogger) {
        return res.status(201).send({
            message: `${email} is used by another account. Please use another email.`
        });
    }

    try {
        let logger = new Logger({
            firstName,
            lastName,
            province,
            zone, wereda, kebele,
            email,
            password,
        });
        await logger.save();

        return res.status(200).send({ message: "Logger account created successfully!" });
    } catch (err) {
        return res
            .status(201)
            .send({ message: "Failed to create logger " + err.message });
    }
});


router.post("/sign_in", async function (req, res) {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        let logger = await Logger.findOne({ email: { $regex: "^" + email + "$", $options: "i" } }, {
            password: 1,
            tokens: 1,
            email: 1
        })

        if (!logger) {
            res.cookie("email", "");
            res.cookie("logger_token", "");
            res.cookie("isAuth", false);
            return res.status(201).send({
                message: `Failed to log in. Please check your credentials and try again.`,
            });
        }

        await logger.isCorrectPassword(password, async (err, same) => {

            if (err || !same) {
                res.cookie("email", "");
                res.cookie("logger_token", "");
                res.cookie("isAuth", false);
                return res.status(201).send({
                    message: `Failed to log in. Please check your credentials and try again.`,
                });
            } else {
                // Issue token
                const payload = { email: logger["email"] };
                const token = jwt.sign(payload, process.env.JWT_TOKEN, {
                    expiresIn: "1d",
                });
                logger.tokens.push(token);
                res.cookie("email", logger['email']);
                res.cookie("logger_token", token);
                res.cookie("isAuth", true);
                await logger.save();
                let loggerRes = await Logger.findById(logger._id, { password: 0, tokens: 0, email:0 })
                return res.status(200).send({
                    message: "Logger signed in successfully!",
                    logger: loggerRes
                });
            }
        });
    } catch (e) {
        res.cookie("email", "");
        res.cookie("logger_token", "");
        res.cookie("isAuth", false);
        return res.status(201).send({
            message: `Failed to log in. Please check your credentials and try again.`,
        });
    }
});


router.get("/log_out", withAuthLogger, async function (req, res) {
    const token = req.cookies.logger_token;
    const email = req.cookies.email;

    const already_login = await Logger.findOne(
        { email: { $regex: "^" + email + "$", $options: "i" } },
        {
            tokens: 1
        }
    );

    if (already_login && already_login["tokens"].indexOf(token) !== -1) {
        already_login["tokens"] = []
        //.splice((already_login["tokens"].indexOf(token), 1));
        res.cookie("email", "");
        res.cookie("logger_token", "");
        res.cookie("isAuth", false);
        await already_login.save();
        return res.status(200).send({ message: "Sucessfully Logged Out!" });
    } else {
        res.cookie("email", "");
        res.cookie("logger_token", "");
        res.cookie("isAuth", false);
        return res
            .status(201)
            .send({ message: "Sucessfully Logged Out!" });
    }
});


router.post("/log_user_data", withAuthLogger, async (req, res) => {
    const { firstName, lastName, province, zone, wereda, kebele, licenseNumber, armType, bulletNumber } = req.body

    try {
        let existingPerson = await Person.findOne({ licenseNumber: licenseNumber })
        if (existingPerson) {
            return res.status(201).send({ message: `Person with licenseNumber: ${licenseNumber} is logged already. ` });
        }
        let person = new Person({
            firstName, lastName, province, zone, wereda, kebele, licenseNumber, armType, bulletNumber
        })
        await person.save()
        return res.status(200).send({ message: "Information uploaded successfully!" });
    } catch (err) {
        return res.status(201).send({ message: "Failed to log user information. " + err.message });
    }
});

router.get("/find_all_persons", async (req, res) => {
    try {
        let persons = await Person.find({})
        console.log(persons)
        return res.status(200).send(persons);
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});


router.get("/get_logged_in_logger", withAuthLogger, async (req, res) => {
    let token = req
    console.log(req)
    let logger_id = req.loggerId
    console.log(logger_id)
    try {
        let logger = await Logger.findById(logger_id, { tokens: 0, password: 0 })
        return res.status(200).send({ logger: logger, message: "Logger data returned successfully!" });
    } catch (err) {
        return res.status(201).send({ message: "Something is wrong. Please retry. " + err.message });
    }
});


router.get("/generate_data", async (req, res) => {
    // for (let i = 10000; i < 100000; i++) {
    //     let data = generateData(i)
    //     //console.log(data)
    //     try {

    //         let person = new Person(data)
    //         await person.save()
    //         console.log(`Created ${person._id} at ${i} iteration.`)
    //     } catch (err) {
    //         console.log(pe`Failed at ${i} iteration.`)
    //         console.log(err.message);
    //     }
    // }
});

const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
};

const generateData = (idx) => {

    const firstName = randomChoice(names)
    const lastName = randomChoice(names)
    const zone = randomChoice(zones_with_keys)
    const wereda = randomChoice(zones[zone])
    const armType = randomChoice(armTypes)
    const kebele = Math.floor(Math.random() * 30) + 1;
    const bulletNumber = Math.floor(Math.random() * 100) + 1;
    const licenseNumber = `${idx}${firstName}`
    return {
        firstName, lastName, armType, licenseNumber, zone, wereda, kebele, bulletNumber
    }

}
module.exports = router;