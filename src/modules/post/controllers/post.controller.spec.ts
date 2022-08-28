import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import PostService from "../services/post.service";
import PostController from "./post.controller"




describe('Testing post controller', () => {
  let controller: PostController;

  const mockPostService = {
    createPost: jest.fn((dto) => ({
      ...dto,
      postid: '613711df-713d-4e1d-b778-9124ce7a08b1',
      created_at: new Date()
    })),
    createRepost: jest.fn((dto) => ({
      ...dto,
    }))
    // .mockReturnValue({
    //   userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
    //   content: '',
    //   reposts: [
    //     {
    //       reposts: []
    //     }
    //   ],
    //   postid: '3ae4343d-639d-4d9d-a8d1-7921046e904c',
    //   created_at: new Date()
    // })
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

  it('should be defined', () => {
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
    const repost = await controller.createRepost({ userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe', postid: '' });
    expect(repost).toEqual({
      userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
      content: '',
      reposts: [
        {
          reposts: []
        }
      ],
      postid: '3ae4343d-639d-4d9d-a8d1-7921046e904c',
      created_at: expect.any(Date)
    });
  });
});