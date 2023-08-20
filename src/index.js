import express from 'express';
import bodyParser from 'body-parser';//thư viện lấy tham số 
import viewEngine from './config/viewEngine';
import initWebRountes from './route/web';
import connectDb from './config/connectDb';
require('dotenv').config();
let app =express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
viewEngine(app)
initWebRountes(app)
connectDb()
let port = process.env.PORT || 3535
app.listen(port,()=>{
    console.log('server is running on port '+port)
})    
