import { Router } from "express";
import {
  createNewBlog,
  getBlogs,
  updateExistingBlog,
  deleteExistingBlog,
  getBlogWithId,
} from "../controllers/blog.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { blogSchema, blogUpdateSchema } from "../schemas/blog.schema";

const router = Router();

router.get("/allBlogs", getBlogs);
router.post("/create", authenticate, validate(blogSchema), createNewBlog);
router.put(
  "/update/:id",
  authenticate,
  validate(blogUpdateSchema),
  updateExistingBlog
);
router.delete("/delete/:id", authenticate, deleteExistingBlog);
router.get("/getBlogById/:id", authenticate, getBlogWithId);

export default router;
