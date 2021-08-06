const checkUsername = (username) => {
    /**
     * Regex explanation
     * ^    --> start of the string
     * \D   --> anything NOT a digit [^0-9]
     * \w   --> anything that is a alphanumeric character [a-zA-Z0-9]
     * {2,} --> 2 or more characters w/ NO UPPER LIMIT (why after comma is empty)
     */
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
};

const checkEmail = (email) => {
    // Simple email regex requires an alphanumeric characer before AND after a literal '@' character 
    let emailChecker = /^\w+@\w+$/;
    return emailChecker.test(email);
};

const checkPassword = (password) => {
    let passwordChecker = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[(\/*-+!@#$^&*)]).{8,20}$/;
    return passwordChecker.test(password);
};

const registerValidator = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if(!checkUsername(username)) {
        // Invalid username
        req.flash('error', "Invalid username!");
        req.session.save(err => {
            res.redirect("/registration");
        });
    } else if(!checkEmail(email)) {
        // Invalid email
        req.flash('error', "Invalid email!");
        req.session.save(err => {
            res.redirect("/registration");
        });
    } else if(!checkPassword(password)) {
        // Invalid password
        req.flash('error', "Invalid password!");
        req.session.save(err => {
            res.redirect("/registration");
        });
    } else {
        // Valid credentials
        next();
    }
}
const loginValidator = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if(!checkUsername(username)) {
        // Invalid username
        req.flash('error', "Invalid username!");
        req.session.save(err => {
            res.redirect("/login");
        });
    } else if(!checkPassword(password)) {
        // Invalid password
        req.flash('error', "Invalid password!");
        req.session.save(err => {
            res.redirect("/login");
        });
    } else {
        // Valid credentials
        next();
    }
}

module.exports = {registerValidator, loginValidator};