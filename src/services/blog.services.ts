import { BlogModel } from "../models/blog.model";
import { IUser } from "../types/user.types";
import { IBlog } from "../types/blog.types";
import { ServiceResult } from "../types/user.types";

export const createBlog = async (
  data: IBlog,
  user: IUser
): Promise<ServiceResult> => {
  try {
    const blog = await BlogModel.create({ ...data, author: user._id });
    return {
      success: true,
      message: "Blog created successfully",
      data: blog,
    };
  } catch (error) {
    return {
      success: false,
      message: "Blog creation failed",
    };
  }
};

export const getAllBlogs = async (): Promise<ServiceResult> => {
  try {
    const blogs = await BlogModel.find();
    if (!blogs || blogs.length === 0) {
      return {
        success: false,
        message: "No blogs found",
      };
    }
    return {
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch blogs",
    };
  }
};

export const updateBlog = async (
  blogId: string,
  user: IUser,
  updateData: IBlog
): Promise<ServiceResult> => {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { _id: blogId, author: user._id },
      updateData,
      { new: true }
    );
    if (!blog) {
      return {
        success: false,
        message: "Blog not found or you are not the author",
      };
    }
    return {
      success: true,
      message: "Blog updated successfully",
      data: blog,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update blog",
    };
  }
};

export const deleteBlog = async (
  blogId: string,
  user: IUser
): Promise<ServiceResult> => {
  try {
    const blog = await BlogModel.findOneAndDelete({
      _id: blogId,
      author: user._id,
    });
    if (!blog) {
      return {
        success: false,
        message: "Blog not found or you are not the author",
      };
    }
    return {
      success: true,
      message: "Blog deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete blog",
    };
  }
};
