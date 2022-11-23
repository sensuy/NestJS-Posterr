import { CreatePostDto } from "modules/post/dtos/createPost.dto";
import Post from "modules/post/repositories/typeorm/entities/Post";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import { makeFakeArrayPosts, makeFakePost, makeFakeQuote, makeFakeRepost } from "./factories";



export const mockPostRepository = {
  create: jest.fn((dto: CreatePostDto) => (makeFakePost(dto))),
  save: jest.fn((dto: Post) => (makeFakeRepost(dto))),
  // listById: jest.fn((postid: string) => (makeFakeQuote(postid))),
  listLatestPosts: jest.fn((queryParams: IPaginationByDate) => (makeFakeArrayPosts())),
  listPostsByUserId: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts())),
  countUserPostByDate: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts())),
  verifyRepostById: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts())),
  verifyQuoteById: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts()))
}