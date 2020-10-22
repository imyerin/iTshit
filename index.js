const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mongo_imyerin:qkswkd3948@cluster0.pupeq.mongodb.net/learning_mongodb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!')) //로컬호스트에 띄워지는 문구

app.listen(port, () => console.log('Example app Listening on port ${port}!')) //실행시 터미널에 띄워지는 콘솔로그
