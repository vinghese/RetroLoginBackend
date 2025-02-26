var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const multer = require("multer");

var app = express();
app.use(cors())
app.use(express.json())

// var CONNECTION_STRING = "mongodb+srv://admin:goodbad1987@ddukk24.g4kjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var CONNECTION_STRING = "mongodb+srv://ddukk:ddukk2025@cluster0.jzxrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



var DATABASE_NAME = "DDUKK25";
var COLLECTION_NAME = "Users";

var database;


//Add google DNS such as 8.8.8.8 and 4.4.4.4 to the network or wifi adapter to resolve cannot read property error

ConnectDB().catch(err => console.log(err.body));

async function ConnectDB() {
    await mongoose.connect(CONNECTION_STRING, {
        dbName: DATABASE_NAME
    }).then(() => console.log('Database connected!'))
        .catch(err => console.error('Database connection error:', err))
    // console.log("Mongo DB connection successful");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.listen(4040, () => {

    ConnectDB()

    console.log("Server Listening in port : 4040");
})



//Sample check for root 
app.get('/', (req, res) => {
    res.send("Jetpack Compose - Login Server");
});

//add GetNotes route to the backend
app.post('/api/users', multer().none(), async (request, response) => {

    console.log("/api/users")
    console.log(request.body)
    const res = await AddUser(request.body)
    console.log("result", res)
    response.json(res);

})

const User = require("./user")

async function AddUser(userModel) {

    let user = new User({
        ...userModel
    });

    console.log("User Model", user)

    await user.save();
    console.log("Add user saved Object", user.toObject());
    return user.toObject();

}

async function GetUsers() {

    const users = await User.find({});
    console.log("Add user saved Object", users.toString());
    return users.map(x => x.toObject());

}


app.get('/api/users', multer().none(), async (request, response) => {

    const res = await GetUsers()
    console.log("users", res)
    response.json(res);

})


async function DeleteUserById(id) {
    console.log("Inside Function DeleteUserById", id);
    const user = await User.findByIdAndDelete(id);
    return user.toObject();
}


app.delete('/api/users/:id', async (request, response) => {
    const id = request.params.id;
    console.log("Delete User by ID:", id);
    const res = await DeleteUserById(id);
    response.send(res)
})


app.get('/api/users/:id', multer().none(), async (request, response) => {

    const id = request.params.id;
    const user = await GetUserById(id)
    response.send(user)

})

async function GetUserById(id) {
    console.log("Inside Function GetUserById", id);
    const user = await User.findById(id).catch(err => console.error('Database Fetch error:', err));
    return user.toObject();

}