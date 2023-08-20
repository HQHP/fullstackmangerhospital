import db from '../models/index'
import CRUDServices from '../services/CRUDServices';
let getHomePage= async(req,res)=>{
    try {
        let data= await db.User.findAll() //db.User phair trung vs model o index.js trong models
        return res.render('homepage.ejs',{
            data:JSON.stringify(data)   
        });
    }catch(e){
        console.log(e)
    }
}
let getCrud =async (req,res)=>{
       return res.render('crud.ejs')
}
let postCrud=async(req,res)=>{
    let message =await CRUDServices.createNewUser(req.body);
    console.log(message)   
       return res.send('post crd')
}
let displayGetCrud=async(req,res)=>{
    let data = await CRUDServices.getAllUser()
    console.log(data)
   return res.send('get crd')
}
module.exports={
    getHomePage: getHomePage,
    getCrud:getCrud,
    postCrud:postCrud,
    displayGetCrud:displayGetCrud,
}