const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {
    auth
} = require('./middleware/auth');
const {
    User
} = require('./models/user');
/*어플리케이션 데이타를 분석해줌*/
app.use(bodyParser.urlencoded({
    extended: true
}));
/*제이슨 데이타를 분석해줌*/
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


app.get('/api/hello',(req,res)=>{
    
    res.send('안녕하세요~')
})



app.get('/', (req, res) => res.send('Hello World!데브몬으로 수정 바로바로 가능한가요?')) //로컬호스트에 띄워지는 문구
app.post('/api/users/register', (req, res) => {
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





app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터 베이스에 있는지 찾는다
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }
        //요청된 이메일이 있다면 비밀번호도 같은지 확인하기
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다.',
                })
            //맞다면 유저를 위한 토큰을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //토큰을 저장 (쿠키,로컬 등등 원하는곳에)
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            })
        })
    })
})



app.get('/api/users/auth', auth, (req, res) => {

    //여기까지 미들웨어를 통과해 왔다는 얘기는 어센티케이션이 트루라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        token: ""
    }, (err, user) => {
        if (err) return res.json({
            success: false,
            err
        });
        return res.status(200).send({
            success: true
        })
    })
})




app.listen(port, () => console.log('Example app Listening on port 5000!')) //실행시 터미널에 띄워지는 콘솔로그
