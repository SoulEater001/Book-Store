import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURl } from './config.js';
import { Book } from './Models/bookModel.js';

const app = express();

app.use(express.json());
/*app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});*/

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

//Route for save new book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
//Route to get all books from database
app.get('/books', async (reqest, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Route to get one book from database by id
app.get('/books/:id', async (reqest, response) => {
    try {

        const { id } = reqest.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(mongoDBURl).then(() => {
    console.log('App is connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})