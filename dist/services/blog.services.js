"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogById = exports.deleteBlog = exports.updateBlog = exports.getAllBlogs = exports.createBlog = void 0;
const blog_model_1 = require("../models/blog.model");
const createBlog = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.BlogModel.create(Object.assign(Object.assign({}, data), { author: user._id }));
        return {
            success: true,
            message: "Blog created successfully",
            data: blog,
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Blog creation failed",
        };
    }
});
exports.createBlog = createBlog;
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_model_1.BlogModel.find();
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
    }
    catch (error) {
        return {
            success: false,
            message: "Failed to fetch blogs",
        };
    }
});
exports.getAllBlogs = getAllBlogs;
const updateBlog = (blogId, user, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: blogId, author: user._id }, updateData, { new: true });
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
    }
    catch (error) {
        return {
            success: false,
            message: "Failed to update blog",
        };
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (blogId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.BlogModel.findOneAndDelete({
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
    }
    catch (error) {
        return {
            success: false,
            message: "Failed to delete blog",
        };
    }
});
exports.deleteBlog = deleteBlog;
const getBlogById = (blogId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user || !user._id) {
            return {
                success: false,
                message: "User not authenticated",
            };
        }
        const blog = yield blog_model_1.BlogModel.findOne({ _id: blogId, author: user._id });
        if (!blog) {
            return {
                success: false,
                message: "Blog not found or you are not the author",
            };
        }
        return {
            success: true,
            message: "Blog fetched successfully",
            data: blog,
        };
    }
    catch (error) {
        console.log(error, "error");
        return {
            success: false,
            message: "Failed to fetch blog",
        };
    }
});
exports.getBlogById = getBlogById;
