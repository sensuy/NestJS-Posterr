import { Test, TestingModule } from "@nestjs/testing";
import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import ICreatePostDTO from "../dtos/ICreatePostDTO";
import ICreateQuoteDTO from "../dtos/ICreateQuoteDTO";
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import { CreatePostSchema } from "../schemas/post-schema";
import PostService from "../services/post.service";
import PostController from "./post.controller"





describe('Testing PostController', () => {
  let controller: PostController;

  const mockPostService = {
    createPost: jest.fn((dto: ICreatePostDTO) => ({
      ...dto,
      postid: '613711df-713d-4e1d-b778-9124ce7a08b1',
      created_at: new Date()
    })),
    createRepost: jest.fn((dto: ICreateRepostDTO) => ({
      userid: dto.userid,
      content: '',
      reposts: [
        {
          postid: dto.postid,
          userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
          content: 'I love this post!',
          createdAt: '2022-08-11T07:07:07.188Z',
          reposts: []
        }
      ],
      postid: '84dd6d96-0b79-49c8-974f-f4d4c93277c1',
      createdAt: '2022-08-28T18:39:20.219Z'
    })),
    createQuote: jest.fn((dto: ICreateQuoteDTO) => ({
      userid: dto.userid,
      content: dto.content,
      quotes: [
        {
          postid: dto.postid,
          userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
          content: 'It\'s a beautiful day!',
          createdAt: '2022-08-21T00:57:49.065Z',
          quotes: []
        }
      ],
      postid: 'dd80f721-2a56-4060-998e-ec4abf2542d2',
      createdAt: '2022-08-28T19:25:45.422Z'
    }))

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{
        provide: PostService,
        useValue: mockPostService
      }]
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('PostController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to created a posts', async () => {
    const post = await controller.createPost({ userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86', content: 'test' });
    expect(post).toEqual({
      content: 'test',
      postid: '613711df-713d-4e1d-b778-9124ce7a08b1',
      userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86',
      created_at: expect.any(Date),
    });
  });

  it('Should be able to create a repost', async () => {
    const repost = await controller.createRepost({ userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe', postid: 'ea371e92-dec6-468f-aac5-c50df491da9e' });
    expect(repost).toEqual({
      userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
      content: '',
      reposts: [
        {
          postid: 'ea371e92-dec6-468f-aac5-c50df491da9e',
          userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
          content: 'I love this post!',
          createdAt: '2022-08-11T07:07:07.188Z',
          reposts: []
        }
      ],
      postid: '84dd6d96-0b79-49c8-974f-f4d4c93277c1',
      createdAt: '2022-08-28T18:39:20.219Z'
    });
  });

  it('Should be able to create a quote', async () => {
    const repost = await controller.createQuote({
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      postid: '1f2325e6-b2c1-4a7f-ac3d-49ee4aec9765',
      content: 'I\'m testing this post!'
    });
    expect(repost).toEqual({
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content: 'I\'m testing this post!',
      quotes: [
        {
          postid: '1f2325e6-b2c1-4a7f-ac3d-49ee4aec9765',
          userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
          content: 'It\'s a beautiful day!',
          createdAt: '2022-08-21T00:57:49.065Z',
          quotes: []
        }
      ],
      postid: 'dd80f721-2a56-4060-998e-ec4abf2542d2',
      createdAt: '2022-08-28T19:25:45.422Z'
    });
  });
});