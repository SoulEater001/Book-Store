import express from 'express';
import mongoose, { mongo } from 'mongoose';
import { PORT, mongoDBURl } from './config.js';
import { Book } from './Models/bookModel.js';
import BooksRoute from './Routes/BooksRoutes.js';
import cors from 'cors';
// import 'dotenv/config';

const app = express();

//Middleware for parsing request body
app.use(express.json());
/*app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});*/

//Middleware for handling cors policy
//Allowing all origins with default of cors(*)
app.use(cors());

//Allowing custom origin
// app.use(cors({
//     origin: 'http://localhost/3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

app.use('/books', BooksRoute);

// Accessing environment variables
// const PORT = process.env.PORT || 3000;
// const mongoDBURl = process.env.mongoDBURl || 'your-default-mongo-url';

mongoose.connect(mongoDBURl).then(() => {
    console.log('App is connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})