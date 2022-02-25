const express = require('express');
const dotenv = require('dotenv')

const app = express();
const {sequelize} = require('./models')
const apiRouter = require('./routes/index')

dotenv.config()

app.use(express.json())
app.use('/api',apiRouter)

app.listen(process.env.PORT,async()=>{
    await sequelize.authenticate()
    console.log(`Server up on port ${process.env.PORT}`)
})

