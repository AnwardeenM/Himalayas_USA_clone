const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
const port = 2345;

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/porter", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
}

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
const User = mongoose.model("user", userSchema)

const orderHistorySchema = new mongoose.Schema({
//  [1,"TATA ACE", "Saurabh", "open", 943, "05 / 06 / 2021"]
    transactionType: String,
    vechicalName: String,
    driverName: String,
    status: String,
    amount: Number,
    date: String
})
const orderschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    details: {
        type: [orderHistorySchema],
        default : undefined
    }
})
const Order = mongoose.model("order", orderschema)

app.post("/user", async (req, res) => {
    console.log(req.body)
    const user = await User.create(req.body)
    res.send(user)
})
app.post("/user/:id", async (req, res) => {
    const order = await Order.create(req.body)
    res.send(order)
})
app.get("/order/:id", async (req, res) => {
    console.log(req.params.id)
    const users = await Order.find({"userId": req.params.id }).lean().exec();
    res.send(users)
})

app.listen(port, async (req, res) => {
    connect();
    console.log("Listening to port ", port);
})