const express= require("express");
const todoController = require("../controller/todos");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", todoController.handleGetTodo);
router.post("/addtodo/:id",todoController.handleAddTodo);
router.put("/updateTodo/:id",todoController.handleUpdateTodo);
router.delete("/deleteTodo/:id", todoController.handleDeleteTodo);


module.exports = router;



