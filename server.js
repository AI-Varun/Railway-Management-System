const express = require("express");
require('dotenv').config();
const sequelize = require("./database");


const app = express();
const port = 3000;


app.use(express.json());


const authenticateRouter = require("./endpoints/authenticate");
const secureMessagesRouter = require("./endpoints/secure_messages");
const registerUserRouter = require("./endpoints/register_user");

app.use("/api", secureMessagesRouter);
app.use("/api/auth_check", authenticateRouter);
app.use("/api/add_user", registerUserRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });
