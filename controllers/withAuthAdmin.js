const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const secret = process.env.JWT_TOKEN;

function UnauthorizedResObj(message) {
    return {
        message: message,
        isAuth: false,
    };
}

const withAuthAdmin = async function (req, res, next) {
    const token = req.cookies.admin_token;
    const email = req.cookies.email;
    console.log("token")
    console.log(token)
    console.log(email)
    if (!token) {
        res.cookie("email", "");
        res.cookie("admin_token", "");
        res.cookie("isAuth", false);
        return res
            .status(201)
            .send(UnauthorizedResObj("Unauthorized: No token provided"));
    } else {
        jwt.verify(token, secret, async function (err, decoded) {
            if (err) {
                res.cookie("email", "");
                res.cookie("admin_token", "");
                res.cookie("isAuth", false);
                return res
                    .status(201)
                    .send(UnauthorizedResObj("Unauthorized: Invalid token"));
            } else {
                const already_login = await Admin.findOne(
                    { email: { $regex: "^" + email + "$", $options: "i" } },
                    { tokens: 1 }
                );
                console.log(already_login);
                if (already_login && already_login["tokens"].indexOf(token) !== -1) {
                    req.adminId = already_login._id;
                    req.email = already_login.email;
                    // check for inactivity 
                    next();
                } else {
                    res.cookie("email", "");
                    res.cookie("admin_token", "");
                    res.cookie("isAuth", false);
                    return res
                        .status(201)
                        .send(UnauthorizedResObj("Unauthorized: Invalid token"));
                }
            }
        });
    }
};

// authenticate a user
module.exports = withAuthAdmin;