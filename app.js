const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const { db, page, user } = require('./models');
const userRouter = require('./routes/users')
const wikiRouter = require('./routes/wiki')

const app = express()

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.redirect('/wiki')
})

const PORT = 8080;

async function run(){
    await db.sync({force: true})
    
    app.listen(PORT, () => {
    console.log("hello")
    })
}

run()

