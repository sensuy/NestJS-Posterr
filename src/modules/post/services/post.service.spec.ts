import { Test, TestingModule } from "@nestjs/testing";
import DateFormatService from "shared/utils/date-format.service";
import { Repository } from "typeorm";
import { mockPostRepository } from "../../../../mocks/Post/fakeRepository";
import Post from "../repositories/typeorm/entities/Post";
import PostService from "./post.service";



describe('PostService', () => {
  let service: PostService;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: 'IPostRepository',
          useValue: mockPostRepository
        },
        {
          provide: 'IUserRepository',
          useValue: mockPostRepository
        },
        {
          provide: DateFormatService,
          useValue: mockPostRepository
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a post', async () => {
  //   const dto = makeFakePost();
  //   const post = await service.create(dto);
  //   expect(post).toEqual(makeFakePost());
  // });
})