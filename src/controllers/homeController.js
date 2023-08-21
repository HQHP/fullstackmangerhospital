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
    return res.render('displayCrud.ejs',{
        dataTable:data
    })
}
let editCrud=async(req,res)=>{
     let userId = req.query.id
     if(userId){
         let userData= await CRUDServices.getUserInfoById(userId)
         console.log(userData)
         return res.render('editCrud.ejs',{
            user:userData
         })
        }
     else{
         return res.send('user not found')
     }
} 
let putCrud=async(req,res)=>{
    let data =req.body;
    let allUser= await CRUDServices.updateUserData(data);
    return res.render('displayCrud.ejs',{
        dataTable:allUser
    })
}
let deleteCrud = async(req,res)=>{
    let id = req.query.id;
    await CRUDServices.deleteUser(id)
    
}
module.exports={
    getHomePage: getHomePage,
    getCrud:getCrud,
    postCrud:postCrud,
    displayGetCrud:displayGetCrud,
    editCrud:editCrud,
    putCrud:putCrud,
    deleteCrud:deleteCrud,
}