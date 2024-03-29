import { Request, Response } from "express";
import Todo from "../models/todoModel";
import { AuthRequest } from "../middlewares/requireAuth";

//get all todos
const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }
  const _id = req.user._id;
  try {
    const todos = await Todo.find({ _id });
    res.status(200).json(todos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//add todo
const addTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }
  const { content } = req.body;
  const _id = req.user._id;
  let missing = false;
  if (!content) {
    missing = true;
  }
  if (missing) {
    res.status(400).json({ message: "Missing content" });
    return;
  }

  try {
    const todo = new Todo({
      content,
      _id,
    });
    const newTodo = await todo.save();
    res.status(200).json(newTodo);
  } catch (err: any) {
    res.status(400).json({ message: err.message, missing: true });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params._id;

  try {
    const todo = await Todo.findByIdAndDelete(_id);
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params._id;
  const { content } = req.body;
  let missing = false;
  if (!content) {
    missing = true;
  }
  if (missing) {
    res.status(400).json({ message: "Missing content" });
    return;
  }

  try {
    const todo = await Todo.findByIdAndUpdate(_id, { content }, { new: true });
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export { getTodos, addTodo, deleteTodo, updateTodo };
