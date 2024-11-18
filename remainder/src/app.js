const express = require('express');
const morgan = require('morgan');

const { productRouter, shopRouter, remainderRouter } = require('./routers/index');
const { ErrorHandler } = require('./middlewares/index');

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'Ok!' });
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRouter);
app.use('/api/shop', shopRouter);
app.use('/api/remainder', remainderRouter);

app.use(ErrorHandler);

module.exports = app;
