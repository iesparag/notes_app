const express = require('express');
require('dotenv').config()
var cors = require('cors')
const { connection } = require("./config/db")
const { userRouter } = require("./routes/User.route")
const { noteRouter } = require("./routes/Note.route");
const { authenticate } = require('./middleware/authenticate.middleware');
// const jwt = require("jsonwebtoken")
// const { UserModel } = require("./model/user.model")
// const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('welcome to the Home Page');
})


app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)







app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    } catch (err) {
        console.log("trouble connecting to the server");
        console.log(err);
}
})

