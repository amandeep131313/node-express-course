const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req,res)=>{
    const allTasks = await Task.find({}).exec();
    res.status(200).send({tasks:allTasks});
});
const createTask = asyncWrapper(async (req,res)=>{
    // only field in schema will be saved others will
    // be ignored
       const task = await Task.create(req.body)
        res.status(201).json({task});
})

const getTask = asyncWrapper (async (req,res,next)=>{
    const task = await Task.findById(req.params.id);
        if(!task){
            // const error = new Error('Not Found')
            // error.status = 404;
            return next(createCustomError( "No Task is Available", 404));
        //    return res.status(404).json({message: "No Task is Available"})
        }
        res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req,res)=>{
    let task;
        task = await Task.findOneAndUpdate({_id: req.params.id},req.body, {
            new: true,
            runValidators: true,
            upsert: true // Make this update into an upsert,
          });
          res.status(200).json({task});
   
});

const deleteTask = asyncWrapper(async(req,res)=>{
    let task;
        task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({task})
   
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}