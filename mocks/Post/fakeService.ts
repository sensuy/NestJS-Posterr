import { CreatePostDto } from "modules/post/dtos/createPost.dto";
import { CreateQuoteDto } from "modules/post/dtos/createQuote.dto";
import { CreateRepostDTO } from "modules/post/dtos/createRepost.dto";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import { makeFakeArrayPosts, makeFakePost, makeFakeQuote, makeFakeRepost } from "./factories";


export const mockPostService = {
  createPost: jest.fn((dto: CreatePostDto) => (makeFakePost(dto))),
  createRepost: jest.fn((dto: CreateRepostDTO) => (makeFakeRepost(dto))),
  createQuote: jest.fn((dto: CreateQuoteDto) => (makeFakeQuote(dto))),
  listLatestPosts: jest.fn((queryParams: IPaginationByDate) => (makeFakeArrayPosts())),
  listUserPosts: jest.fn((useridParam, queryParams) => (makeFakeArrayPosts()))
}