import  mongoose from 'mongoose';
import { DB } from '../config';
 

module.exports = async ()=>{
    try{
        await mongoose
        .connect(DB, {
            useNewUrlParser: true
        });
        console.log('DB connection successful!')
    }catch(err){
        console.log('DB connection failed!', err)
    }
};



