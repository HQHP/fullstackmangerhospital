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
let getUserInfoById= async(id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                raw: true,
                where: {id:id}
            })
            if(user){
                resolve(user)
            }else{
                resolve([])
            }
        } catch (error) {
             reject(error);
        }
    })
}
let updateUserData = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {id:data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender=data.gender;
                await  user.save();
                let allUser =  db.User.findAll()
                resolve(allUser)
            }else{
                resolve([])
            }
        } catch (error) {
             console.log(error);
        }
    })
   
}
let deleteUser = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            await db.User.destroy({
                where: {id:id}
            })
            resolve()
        } catch (error) {
             console.log(error);
        }
    })
}
module.exports={
    createNewUser: createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUser:deleteUser,
}