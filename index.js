const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');

const {
    User
} = require('./models/User');
/*어플리케이션 데이타를 분석해줌*/
app.use(bodyParser.urlencoded({
    extended: true
}));
/*제이슨 데이타를 분석해줌*/
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!데브몬으로 수정 바로바로 가능한가요?')) //로컬호스트에 띄워지는 문구


app.post('/register', (req, res) => {
    //회원가입할 때 필요한 정보들을 클라이언트에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => console.log('Example app Listening on port 3000!')) //실행시 터미널에 띄워지는 콘솔로그
