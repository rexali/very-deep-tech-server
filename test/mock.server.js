// import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// instantiate express
const app = express();
// port
const PORT = 3001;
// host
const HOST = "localhost";

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookies
app.use(cookieParser());
// apply default cors to the server 
app.use(cors());
// server home
app.get("/", (req, res) => {
    res.status(500).json({
        status: "success",
        data: { name: "Edu Africa" },
        message: "Homepage loaded"
    });
});

app.post("/auth/register", (req, res) => {
    
    res.status(200).json({
        status: "success",
        data: {
            ...req.body
        },
        message: "Registration successfull"
    });
})

app.post("/auth/login", (req, res) => {
    let mock_data = { ...req.body }
    res.status(200).json({
        status: "success",
        data: {
            ...mock_data
        },
        message: "Login successfull"
    });
})


app.get("/profiles", (req, res) => {
    
    res.status(200).json({
        status: "success",
        data: req.body,
        message: "Users found"
    });
})


app.delete("/profiles", (req, res) => {

    res.status(200).json({
        status: "success",
        data: req.body,
        message: "Delete successfull"
    });
});


app.patch("/profiles", (req, res) => {
    let mock_data = { ...req.body}
    res.status(200).json({
        status: "success",
        data: mock_data,
        message: "Update successfull"
    });
})

// catch not found page
app.use((req, res) => {
    try {
        // return json
        res.status(404).json({
            status: "fail",
            data: null,
            message: "page not found"
        });
        // catch error
    } catch (error) {
        // log error
        console.warn(error);
        res.status(500).json({
            status: "fail",
            data: null,
            message: "Internal server error"
        });
    }
});

// listent to server  
app.listen(PORT, HOST, () => {
    // log to the console
    console.log(`The server host is ${HOST} and is listening at port ${PORT}`);
});
// make app object available to the whole application
module.exports = app;