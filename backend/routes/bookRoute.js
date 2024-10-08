import express from 'express'

import { verifyToken, isAdmin } from '../middlewares/auth.mw.js';
import {Book} from '../models/bookModel.js'

const router = express.Router()

router.post('/',async (req, res) => {
    try{
        const {title, author, publishYear} = req.body

        if(!title || !author || !publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }

        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear,
        };

        const book = await Book.create(newBook)
        
        return res.status(201).send(book)


    }catch(error){
        console.log(error.message)
        res.status(505).send({ message: error.message })
    }

})
router.get('/',async (req, res) => {
    try{
        
        const books = await Book.find({})
        
        return res.status(201).json({
            count: books.length,
            data: books
        })


    }catch(error){
        console.log(error.message)
        res.status(505).send({ message: error.message })
    }
})

router.get('/:id',async (req, res) => {
    try{
        const { id } =req.params
        const book = await Book.findById(id)
        
        return res.status(201).json(book)


    }catch(error){
        console.log(error.message)
        res.status(505).send({ message: error.message })
    }
})

router.put('/:id', [verifyToken , isAdmin], async (req, res) => {
    try{
        const {title, author, publishYear} = req.body

        if(!title || !author || !publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }

        const { id } =req.params
        console.log("result", id)
        const result = await Book.findByIdAndUpdate(id, req.body)
        console.log("result", result)
        if(!result) {
            return res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).json({message: 'Book updated successfully'})

    }catch(error){
        console.log(error.message)
        res.status(505).send({ message: error.message })
    }
})

router.delete('/:id',[verifyToken , isAdmin], async (req, res) => {
    try{
        const {id} = req.params;

        const result =await Book.findByIdAndDelete(id)
        console.log("result", result)
        if(!result){
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).json({message: 'Book deleted successfully'})
    }catch(error){
        console.log(error.message)
        res.status(505).send({ message: error.message })
    }
})

export default router