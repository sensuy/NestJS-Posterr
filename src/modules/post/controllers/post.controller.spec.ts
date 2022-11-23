import { Test, TestingModule } from "@nestjs/testing";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import { mockPostService } from "../../../../mocks/Post/fakeService";
import { CreatePostDto } from "../dtos/createPost.dto";
import { CreateQuoteDto } from "../dtos/createQuote.dto";
import { CreateRepostDTO } from "../dtos/createRepost.dto";
import PostService from "../services/post.service";
import PostController from "./post.controller"

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService
        }
      ]
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('PostController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to created a posts', async () => {
    const postDto: CreatePostDto = {
      content: 'test',
      userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86'
    }

    const post = await controller.createPost(postDto);
    expect(post.postid).toBeDefined();
    expect(post.content).toBe(postDto.content);
    expect(post.userid).toBe(postDto.userid);
  });

  it('Should be able to create a repost', async () => {
    const repostDto: CreateRepostDTO = {
      userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
      postid: 'ea371e92-dec6-468f-aac5-c50df491da9e'
    }
    const repost = await controller.createRepost(repostDto);

    expect(repost.postid).toBeDefined();
    expect(repost.userid).toBe(repostDto.userid);
    expect(repost.reposts[0].postid).toBe(repostDto.postid);
  });

  it('Should be able to create a quote', async () => {
    const quoteDto: CreateQuoteDto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      postid: '1f2325e6-b2c1-4a7f-ac3d-49ee4aec9765',
      content: 'I\'m testing this post!'
    };

    const quote = await controller.createQuote(quoteDto);

    expect(quote.postid).toBeDefined();
    expect(quote.userid).toBe(quoteDto.userid);
    expect(quote.quotes[0].postid).toBe(quoteDto.postid);
  });

  it('Should be able to get a the latest posts', async () => {
    const paginationParams: IPaginationByDate = {
      limit: 10,
      page: 1,
      startDate: new Date('2022-08-28T19:25:45.422Z'),
      endDate: new Date('2022-08-28T19:25:45.422Z')
    }
    const posts = await controller.getLatestPosts(paginationParams);
    expect(posts.length).toBeGreaterThan(0);
  });

  it('Should be able to get a the latest post by a user', async () => {
    const paginationParams: IPaginationByDate = {
      limit: 10,
      page: 1,
      startDate: new Date('2022-08-28T19:25:45.422Z'),
      endDate: new Date('2022-08-28T19:25:45.422Z')
    }
    const userid = 'b3dac166-4006-455f-a9c3-9e2a69568b6d';
    const posts = await controller.getLatestPostsByUser(paginationParams, userid);

    expect(posts).toHaveLength(2);
  });
});