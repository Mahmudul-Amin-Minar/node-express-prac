const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");

const PORT = process.env.PORT_ONE || 8080;
const Product = require("./product");
const isAuthenticated = require("../isAuthenticated");

const app = express();
app.use(express.json());

var channel, connection;
var order;

mongoose.connect("mongodb://127.0.0.1:27017/product-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Product-Service DB connected`);
    }
})

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
}
connect();

// create product 
app.post("/product/create", isAuthenticated, async (req, res) => {
    console.log(req.user)
    const {name, description, price} = req.body;
    const newProduct = new Product({
        name,
        description,
        price
    });
    newProduct.save();
    return res.json(newProduct);
});

// buy product 
// user send a list of products IDs to buy 
// creating an order with those products and a total value of sum of products prices 
app.post("/product/buy", isAuthenticated, async (req, res) => {
    const {ids} = req.body;
    const products = await Product.find({_id:{$in: ids}});
    channel.sendToQueue(
        "ORDER",
        Buffer.from(
            JSON.stringify({
                products,
                userEmail: req.user.email,
            })
        )
    );
    channel.consume("PRODUCT", data => {
        console.log("Consuming PRODUCT queue");
        order = JSON.parse(data.content);
        channel.ack(data);
        console.log(order);
    });
    return res.json(order);
})

app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});