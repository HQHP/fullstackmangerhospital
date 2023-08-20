var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
import db from '../models/index'
let createNewUser =async (data)=>{
    return new Promise(async(resolve, reject) =>{
         try {
            let hashPassword=await hashUserPassword(data.password);
             await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address:data.address,
                phoneNumber:data.phoneNumber,
                gender: data.gender==='1'?true:false,
                roleId: data.roleId,
             })
             resolve('success')
         } catch (error) {
            reject(error);
         }
    })
    
}
let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}
let getAllUser = async ()=>{
   return new Promise(async(resolve, reject)=>{
    try {
        let users =  db.User.findAll({
            raw: true,
        });
        resolve(users)
    } catch (e) {
        reject(e);
    }
   })
} 
module.exports={
    createNewUser: createNewUser,
    getAllUser:getAllUser,
}