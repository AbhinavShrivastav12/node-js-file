const express = require('express')
require('dotenv').config();
const app = express();

app.use(express.json());
//now it is in JSON Format

const PORT = process.env.PORT || 3000

let contacts= []
let currentId= 1
//in-memory contacts array

app.get('/contacts', (req,res) => {
    res.json(contacts);
})
//Get All the contacts 

app.get('/contacts/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id===id)
    if(!contact)
        return res.status(404).json({message: 'Contact not found'})
    res.json(contact);
})
//get contact by id

app.post('/contacts', (req,res) => {
const {name, address, phone, gender} = req.body;
if (!name || !phone ){
    return res.status(400).json({message: 'Name and Phone are required'})
}
const newContact = {id: currentId++, name, address, phone, gender};
contacts.push(newContact)
res.status(201).json(newContact)
})
//popst all the data at once

app.listen(PORT,() => {
    console.log(`Server Started at ${PORT}`)
})
//for strating your server