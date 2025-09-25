require('dotenv').config();
const express = require('express');

const app = express();

app.use(middleware1);
app.use(middleware2);

function middleware1 (req, res, next) {
    console.log('I am middleware #1');

    req.customProperty = 100;

    next();
}

function middleware2 (req, res, next) {
    console.log('I am middleware #2');

    console.log(`The custom property value is ${req.customProperty}`);
    req.customProperty = 600;

    // const errObj = new Error('I am an error');

    // next(errObj);
    next();
}

function middleware3 (req, res, next) {
    console.log('I am middleware #3');
    next();
}

function errorHandler(err, req, res, next) {
    if (err) {
        res.json({ err });
    }
}

app.get('/', middleware3, (req, res, next) => {
    console.log('I am the standard Express function');
    res.send(`<h1>The value is ${req.customProperty}</h1>`);
});

app.use(errorHandler);

app.listen(process.env.PORT);