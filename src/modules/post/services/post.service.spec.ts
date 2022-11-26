import { HttpException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import DateFormatService from "shared/utils/date-format.service";
import { mockPostRepository } from "../../../../mocks/Post/fakeRepository";
import { mockUserRepository } from "../../../../mocks/User/fakeRepository";
import { CreatePostDto } from "../dtos/createPost.dto";
import { CreateRepostDTO } from "../dtos/createRepost.dto";
import PostService from "./post.service";



describe('PostService', () => {
  let service: PostService;
  let dateFormatService: DateFormatService;

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
          useValue: mockUserRepository
        },
        DateFormatService
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    dateFormatService = module.get<DateFormatService>(DateFormatService);
  });

  it('PostService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(PostService.prototype.createPost, () => {

    const postDto: CreatePostDto = {
      content: 'test',
      userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86'
    }

    it('should be able to create a new post', async () => {

      const post = await service.createPost(postDto);

      expect(post).toHaveProperty('postid');
      expect(post).toHaveProperty('createdAt');
    });

    it('it should be able to trhow a error if user was not found', async () => {

      jest.spyOn(mockUserRepository, 'listById').mockImplementationOnce(() => (null));

      const post = async () => await service.createPost(postDto);

      expect(mockUserRepository.listById).toHaveBeenCalled();
      expect(mockUserRepository.listById).toHaveBeenCalledWith(postDto.userid);
      expect(mockUserRepository.listById).toHaveBeenCalledTimes(1);
      expect(post).rejects.toThrowError('User does not exist.');
    });

    it('it should be able to trhow a error if user exceed the limit post per day', async () => {

      jest.spyOn(mockPostRepository, 'countUserPostByDate').mockImplementationOnce(() => 5);

      const post = async () => await service.createPost(postDto);

      expect(mockPostRepository.countUserPostByDate).toHaveBeenCalled();
      expect(mockPostRepository.countUserPostByDate).toHaveBeenCalledTimes(1);
      expect(post).rejects.toThrowError('You have reached the limit of posts per day');
    });
  });

  describe.only(PostService.prototype.createRepost, () => {

    const repostDto: CreateRepostDTO = {
      postid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86',
      userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86'
    }

    it.only('should be able to create a new repost', async () => {

      const repost = await service.createRepost(repostDto);

      expect(repost).toHaveProperty('postid');
      expect(repost).toHaveProperty('createdAt');
    });

    it('it should be able to trhow a error if user was not found', async () => {

      jest.spyOn(mockUserRepository, 'listById').mockImplementationOnce(() => (null));

      const post = async () => await service.createRepost(repostDto);

      // expect(mockUserRepository.listById).toHaveBeenCalled();
      expect(mockUserRepository.listById).toHaveBeenCalledWith(repostDto.userid);
      // expect(mockUserRepository.listById).toHaveBeenCalledTimes(1);
      expect(post).rejects.toThrowError('User does not exist.');
    });

    it('it should be able to trhow a error if user exceed the limit post per day', async () => {

      jest.spyOn(mockPostRepository, 'countUserPostByDate').mockImplementationOnce(() => 5);

      const post = async () => await service.createRepost(repostDto);

      expect(mockPostRepository.countUserPostByDate).toHaveBeenCalled();
      expect(mockPostRepository.countUserPostByDate).toHaveBeenCalledTimes(1);
      expect(post).rejects.toThrowError('You have reached the limit of posts per day');
    });
  });


})