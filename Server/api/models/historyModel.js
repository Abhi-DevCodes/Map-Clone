import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    keyword:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        /*validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }*/
    }
},{timestamps:true});

const History = mongoose.model("History" , historySchema);
export default History;