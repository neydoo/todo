// const express = require('express')
// const router = express.Router()
const TODO = require('../models/todo')

//  Displays completed tasks
exports.completed_tasks = (req,res,next) => {
    TODO.find({ completed: true }, (err, doc) => {
        if (!doc) res.send({
            title: 'Completed Tasks',
            data: `You haven't completed any tasks yet.`
        })
        res.send({
            title: 'Completed Tasks',
            data: doc
        })
    })
}

//  Displays all tasks both completed, and uncompleted
exports.all_tasks = (req, res) => {
    TODO.find({}, (err, doc) => {
        if (!doc) res.send({
            title: 'All Tasks',
            data: `You haven't added any tasks yet.`
        })
        res.json({
            title: 'All Tasks',
            data: doc
        })
    })
}

// Add new Task
exports.add_task = (req, res) => {
    const tasks = req.body
    const task = new TODO (tasks)
    task.save((err, result) => {
        if (err) {
            console.log(err)
            res.send({
                title: 'Add Task',
                data: `There was an error adding the task.`
            })
        } else {
             res.send({
                 title: 'Add Task',
                 data: result
             })
        }
    })
}

// Handle task deletion
exports.delete_task = (req, res) => {
    TODO.find({ _id: req.params.id }, (err,task) => {
        if (err) {
            console.log(err)
        } else {
            task.remove((err, results) => {
                if (err) {
                    return err
                } else {
                    res.status(201)
                }
            })
        }
    })
}

// Handles Task updates
exports.update_task = (req,res) =>{
    TODO.findByIdAndUpdate({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                title: 'Update Task',
                data: `There was an error updating this task`
            })
        } else {
            if (req.body.title) result.title = req.body.title 
            if (req.body.date_to_be_completed) result.date_to_be_completed = req.body.date_to_be_completed 
            if (req.body.description) result.description = req.body.description
            result.save((err,results) => {
                if (err) {
                     res.send({
                         title: 'Update Task',
                         data: `There was an error updating this task`
                     })
                } else {
                     res.send({
                         title: 'Update Task',
                         data: results
                     })
                }
            })
        }
    })
}

// Updates Tasks to Completed
exports.complete_task = (req, res) => {
    TODO.findByIdAndUpdate({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err)
             res.send({
                 title: 'Update Task',
                 data: `There was an error updating this task`
             })
        } else {
            result.completed = true
            result.save((err, results) => {
                if (err) {
                    console.log(err)
                     res.send({
                         title: 'Update Task',
                         data: `There was an error updating this task`
                     })
                } else {
                     res.send({
                         title: 'Update Task',
                         data: results
                     })
                }
            })
        }
    })
} 


//  Displays uncompleted tasks
exports.todo = (req, res) => {
    TODO.find({ completed: false }, (err, doc) => {
        if (!doc) res.send({
            title: 'Uncompleted Task',
            data: `You have no uncompleted tasks.`
        })
        res.send({
            title: 'Uncompleted Task',
            data: doc
        })
    })
}

// Handles search requests
exports.search = (req, res) => {
    TODO.find({ title: req.body.query }, (err, results) => {
        if (!results) {
            res.send({
                title: 'Search Results',
                data: `No results found.`
            })
        } else {
            res.send({
                title: 'Search Results',
                data: results
            })
        }
    })
}
