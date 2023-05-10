const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')

require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = 6000 ;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("data base connected")
    } catch (error) {
        console.log("data base not connected")
    }
}


app.listen(PORT, () => console.log(`server run on server ${PORT}`))

const router = express.Router();

//create user
router.post("/addUser", async (req, res) => {
    const { name, email, age } = req.body
    try {
        const find = await Contact.findOne({ email })

        if (find) {
            return res.status(400).send(' email allready exists')
        }
        const user = new Contact({ name, email, age });
        await user.save()
        res.status(201).send({ msg: 'user created', user })
    } catch (error) {
        res.status(500).send('server error')
    }
})

// read users
router.get('/getUsers', async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.status(200).send({ msg: 'all Users', contacts })
    } catch (error) {
        res.status(500).send('server error')
    }

})

//delete User

router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete(id);
        res.status(200).send('User deleted')
    } catch (error) {
        res.status(500).send('server error')
    }
})
//update User

router.put('/updateUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contactUpdate = await Contact.findByIdAndUpdate(
            id ,
            {
                $set : {...req.body}
            },
            { new :true }
        )
        res.status(200).send('User updated' , contactUpdate)

    } catch (error) {
        res.status(500).send('server error')
    } 
})
