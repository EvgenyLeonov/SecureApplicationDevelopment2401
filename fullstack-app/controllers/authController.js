module.exports.getSignup = async (req, res) => {
    res.render("auth/login", {
        title: "Sign Up",
        isSignup: true
    });
}

module.exports.postSignup = async (req, res) => {
    const login = req.body.login;
    console.log("signup with login=" + login);
    //you can store any object instead of this string
    req.session.userName = login;

    res.redirect("/search/form");
}

module.exports.postLogout = async (req, res) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}


