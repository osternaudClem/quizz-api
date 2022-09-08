import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import winston from 'winston';
import expressWinston from 'express-winston';
import colors from 'colors';

import {
    CategoriesRoute,
    QuestionsRoute,
} from './routes';

const PORT = process.env.PORT || 4000;
const app = express();

console.log('PORT', PORT);

// connect to Mongo when the app initializes
mongoose.connect(process.env.DB_URI);

app.use(bodyParser.json());
app.use(cors());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
    ],
    meta: false,
    msg: `{{res.statusCode}} - {{req.method}} - {{req.url}} - {{res.responseTime}}ms`,
    expressFormat: true,
    colorize: true,
}));

// routes
app.use('/api/doc', express.static(__dirname + '/doc'));
app.use('/api/categories', CategoriesRoute);
app.use('/api/questions', QuestionsRoute);

app.listen(PORT, () => {
    console.log('Server is running on port ' + `${PORT}`.green);
  });