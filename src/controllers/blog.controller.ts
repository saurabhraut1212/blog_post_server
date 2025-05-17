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
    res
      .status(201)
      .json({ message: "Blog created successfully", data: result.data });
  } else {
    res.status(400).json({ message: "Blog creation failed" });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllBlogs();
  if (result.success) {
    res
      .status(200)
      .json({ message: "Blogs fetched successfully", data: result.data });
  } else {
    res.status(404).json({ message: "No blogs found" });
  }
};

export const updateExistingBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await updateBlog(req.params.id, req.user!, req.body);
  if (result.success) {
    res
      .status(200)
      .json({ message: "Blog updated successfully", data: result.data });
  } else {
    res.status(403).json({ message: "Forbidden: Cannot update this blog" });
  }
};

export const deleteExistingBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await deleteBlog(req.params.id, req.user!);
  if (result.success) {
    res.status(200).json({ message: "Blog deleted successfully" });
  } else {
    res.status(403).json({ message: "Forbidden: Cannot delete this blog" });
  }
};
