import { Router } from "express";
import {
  createNewBlog,
  getBlogs,
  updateExistingBlog,
  deleteExistingBlog,
} from "../controllers/blog.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { blogSchema, blogUpdateSchema } from "../schemas/blog.schema";

const router = Router();

router.get("/", getBlogs);
router.post("/", authenticate, validate(blogSchema), createNewBlog);
router.put(
  "/:id",
  authenticate,
  validate(blogUpdateSchema),
  updateExistingBlog
);
router.delete("/:id", authenticate, deleteExistingBlog);

export default router;
