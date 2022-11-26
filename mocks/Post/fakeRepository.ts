import { CreatePostDto } from "modules/post/dtos/createPost.dto";
import Post from "modules/post/repositories/typeorm/entities/Post";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import { makeFakeArrayPosts, makeFakePost, makeFakeQuote, makeFakeRepost } from "./factories";



export const mockPostRepository = {
  create: jest.fn((dto: CreatePostDto) => (makeFakePost(dto))),
  save: jest.fn((dto: Post) => (makeFakePost(dto))),
  // listById: jest.fn((postid: string) => (makeFakeRepost(postid))),
  listLatestPosts: jest.fn((queryParams: IPaginationByDate) => (makeFakeArrayPosts())),
  listPostsByUserId: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts())),
  countUserPostByDate: jest.fn((useridParam, queryParams) => (4)),
  verifyRepostById: jest.fn((postid: string) => (makeFakeArrayPosts()[0])),
  verifyQuoteById: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts()))
}