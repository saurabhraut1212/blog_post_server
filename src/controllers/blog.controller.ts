import { Request, Response } from "express";
import {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} from "../services/blog.services";

export const createNewBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await createBlog(req.body, req.user!);
  if (result.success) {
    res.status(201).json({ message: result.message, data: result.data });
  } else {
    res.status(400).json({ message: result.message });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllBlogs();
  if (result.success) {
    res.status(200).json({ message: result.message, data: result.data });
  } else {
    res.status(404).json({ message: result.message });
  }
};

export const updateExistingBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await updateBlog(req.params.id, req.user!, req.body);
  if (result.success) {
    res.status(200).json({ message: result.message, data: result.data });
  } else {
    res.status(403).json({ message: result.message });
  }
};

export const deleteExistingBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await deleteBlog(req.params.id, req.user!);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(403).json({ message: result.message });
  }
};
