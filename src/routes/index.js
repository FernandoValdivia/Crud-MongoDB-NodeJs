const express = require('express');
const router = express.Router();

const Book =  require('../models/book');

router.get('/', async (req,res) =>{
    const books = await Book.find();
    res.render('home');
});

router.get('/index', async (req,res) =>{
    const books = await Book.find();
    res.render('index', {
        books // books: books
    });
});

router.post('/add', async (req, res) =>{
    const book = new Book(req.body);
    await book.save();
    res.redirect('/index');
});

router.get('/check/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    book.status = !book.status
    await book.save();
    res.redirect('/index');
});

router.get('/edit/:id', async (req,res) =>{
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render('edit', {
        book
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Book.updateOne({_id: id}, req.body);
    res.redirect('/index');
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Book.remove({_id: id}); // Delete with identifier
    res.redirect('/index'); // Redirect to Home
});

module.exports = router;