const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");

if(process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env"});

}

if(process.env.NODE_ENV =='production') {
    const path = require('path')

    // app.get('/',(req,res)=> {
    //     app.use(express.static(path.resolve(__dirname,'frontend','build')))
    //     res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    // })

    app.use(express.static(path.join(__dirname, "./frontend/build")));
    app.get("*",function(_,res) {
        res.sendFile(
            path.join(__dirname,"./frontend/build/index.html")
        )
    })

}



//middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());

const post = require("./routes/post");
const user = require("./routes/user");
// const { dirname } = require("path");
const { dirname } = require("path");

app.use("/api", post);
app.use("/api", user);

module.exports = app;