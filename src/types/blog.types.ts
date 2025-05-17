import { Types } from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  authorName: string;
  author: Types.ObjectId;
}
