const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employee = require('../models/Member')
const router = require('../routes/employee')





const index = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
}

    //show single user
    const show = (req,res,next) => {

        let employeeID = req.body.employeeID
        Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(err => {
            res.json({
                message: 'An error occured!'
            })
        })
    }


        const store = (req,res,next) => {

            let employee = new Employee({
                username : req.body.username,
                email : req.body.email,
                phonenumber : req.body.phonenumber,
                password : req.body.phone
            })
            employee.save()
            .then(response => {
                res.json({
                    message : 'User Added Successfully'
                })
            })
            .catch(err => {
                res.json({
                    message: 'An error occured!'
                })
            })


            Employee.findById(employeeID)
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(err => {
                res.json({
                    message: 'An error occured!'
                })
            }) 
        }
            //update a user

            const update = (req,res,next) => {
                let employeeId = req.body.employeeID

                let updatedData = {
                    username : req.body.username,
                    email : req.body.email,
                    phonenumber : req.body.phonenumber,
                    password : req.body.phone
                }

                Employee.findByIdAndUpdate(employeeID, {$set : updatedData})
                .then( () => {
                    res.json({
                        message: 'Employee updated successfully!'
                    })
                })
                .catch(err => {
                    res.json({
                        message: 'An error occured!'
                    })
                }) 
    
            }

        //delete an employee
        
        const destroy = (req,res,next) => {
            let employeeId = req.body.employeeID

            Employee.findByIdAndRemove(employeeID)
            .then( () => {
                res.json({
                    message: 'Employee deleted successfully!'
                })
            })
            .catch(err => {
                res.json({
                    message: 'An error occured!'
                }) 
            }) 

        }


module.exports = {
    index, show, store, update, destroy
}