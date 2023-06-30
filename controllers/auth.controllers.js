const axios = require('axios');

//controller for sign up route
module.exports.signup = async(req, res) => {

    const data = req.body;

    try {
        const response = await axios({
            url: "http://localhost:3000/scissor/api/v1/auth/signup",
            method: "post",
            data: data
        });

        if (Object.keys(response.data).includes("error_messages")) {
            errors = Object.entries(response.data.error_messages);
            res.render('signup', { messages: errors[0][1] });
        } else {
            res.render("login", {})
                //console.log(response.data)
        }


    } catch (err) {
        console.log(err);
        //res.render("404");
    }

};



module.exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const data = { email: email, password: password };

        //validate user data
        if (!email || !password) {
            return res.render('login', { message: "Incomplete Input" });
        }

        const response = await axios({
            url: "http://localhost:3000/scissor/api/v1/auth/login",
            method: "post",
            data: data
        });

        //console.log(response.data)

        if (Object.keys(response.data).includes("message")) {
            error = response.data.message;
            res.render('login', { message: error });
        } else if (Object.keys(response.data).includes("success")) {
            // console.log(response.data);

            req.session.token = response.data.token;

            // console.log(req.session.token)
            res.redirect('/');

        }


    } catch (err) {
        console.log(err);
        //res.render("404");
    }



}





//     } catch (error) {
//         console.log(error);
//         return res.status(409).json({ message: "An error occurred" + error.message });
//         console.log(error);
//     }

// };