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
exports.deleteExistingBlog = exports.updateExistingBlog = exports.getBlogs = exports.createNewBlog = void 0;
const blog_services_1 = require("../services/blog.services");
const createNewBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_services_1.createBlog)(req.body, req.user);
    if (result.success) {
        res.status(201).json({ message: result.message, data: result.data });
    }
    else {
        res.status(400).json({ message: result.message });
    }
});
exports.createNewBlog = createNewBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_services_1.getAllBlogs)();
    if (result.success) {
        res.status(200).json({ message: result.message, data: result.data });
    }
    else {
        res.status(404).json({ message: result.message });
    }
});
exports.getBlogs = getBlogs;
const updateExistingBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_services_1.updateBlog)(req.params.id, req.user, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message, data: result.data });
    }
    else {
        res.status(403).json({ message: result.message });
    }
});
exports.updateExistingBlog = updateExistingBlog;
const deleteExistingBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_services_1.deleteBlog)(req.params.id, req.user);
    if (result.success) {
        res.status(200).json({ message: result.message });
    }
    else {
        res.status(403).json({ message: result.message });
    }
});
exports.deleteExistingBlog = deleteExistingBlog;
