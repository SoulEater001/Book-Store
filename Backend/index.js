import express from "express";
import mongoose from "mongoose";
// import { MongoClient, ServerApiVersion } from 'mongodb';
import { PORT, mongoDBURl } from "./config.js";
import { Book } from "./Models/bookModel.js";

const app = express();

app.use(express.json());
/*app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});*/

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome");
});

//Route for save new book
app.post("/books", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send all required fields : title, author, publishYear", });
        }
        const newBook = {
            title: "req.body.title",
            author: "req.body.author",
            publishYear: "req.body.publishYear",
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

//Route to get all books from database
app.get("/books", async (reqest, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(mongoDBURl).then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})