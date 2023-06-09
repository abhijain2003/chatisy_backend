const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/userRoute");
const PasswordRoutes = require("./routes/passwordRoute");
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", UserRoutes);
app.use("/passwords", PasswordRoutes);


const connectUser =
    process.env.MONGODB_URL;

mongoose
    .connect(connectUser, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        let port = process.env.PORT;
        if (port == null || port == "") {
            port = 8000;
        }
        console.log("successfully listening on port after connection", port)
        app.listen(port);
    }).catch((e) => {
        console.log("error", e.message);
    })