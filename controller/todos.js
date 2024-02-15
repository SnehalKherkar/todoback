const Todo = require("../models/todos");


async function handleGetTodo(req,res){
    try {
        const userId = req.user.userId;
        const todos = await Todo.find({userId});
        res.json({todos})      
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
};

async function handleAddTodo(req,res){
    try {
        const userId = req.user.userId;
        const {task} = req.body;
        const todo = await Todo.create({userId,task});
        res.status(201).json({todo});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Enternal Server Error"});

    }
}

async function handleUpdateTodo(req,res){
    try {
        const todoId = req.params.id;
        const { task } = req.body;
    
        const updatedTodo = await Todo.findByIdAndUpdate(
          todoId,
          { task },
          { new: true }
        );
    
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.json({ updatedTodo });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function handleDeleteTodo(req,res){
    try {
        const todoId = req.params.id;
    
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
    
        if (!deletedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.json({ deletedTodo });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    handleGetTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo

}