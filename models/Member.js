const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    phonenumber : {
        type : String
    },
    password : {
        type : String
    }
    
},{timestamps : true} )

mongoose.model('Employee',employeeSchema)
