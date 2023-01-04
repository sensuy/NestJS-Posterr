import { Test, TestingModule } from "@nestjs/testing";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import DateFormatService from "shared/utils/date-format.service";
import { makeFakeArrayPosts, makeFakePost, makeFakeQuote, makeFakeRepost } from "../../../../mocks/Post/factories";
import { mockPostRepository } from "../../../../mocks/Post/fakeRepository";
import { mockUserRepository } from "../../../../mocks/User/fakeRepository";
import { CreatePostDto } from "../dtos/createPost.dto";
import { CreateQuoteDto } from "../dtos/createQuote.dto";
import { CreateRepostDTO } from "../dtos/createRepost.dto";
import PostService from "./post.service";


const makePayloadListUserPost = (dataRange?: boolean) => {
  const userid = '8d27c1bb-5534-4b02-9c67-bee7aae4ad86'; 
  const queryParams: IPaginationByDate = {
    limit: 10,
    page: 1
  }

  if(dataRange){
   Object.assign(queryParams, {startDate: new Date('2021-01-01'), endDate: new Date('2021-01-02')});
  }
  return {userid, queryParams};
}

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
          useValue: mockUserRepository
        },
        DateFormatService
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('PostService should be defined', () => {
    expect(service).toBeDefined();
  });


  describe(PostService.prototype.listUserPosts, () => {
    it('should return posts without limit dates params', async () => {
      const {userid, queryParams} = makePayloadListUserPost();

      const posts = await service.listUserPosts(userid, queryParams);
      expect(posts).toEqual(makeFakeArrayPosts());
    });

    it('should return posts with limit dates params', async () => {
      const {userid, queryParams} = makePayloadListUserPost(true);

      const posts = await service.listUserPosts(userid, queryParams);
      expect(posts).toEqual(makeFakeArrayPosts());
    });

    it('should able to return a error if listUserPosts fail', async () => {
      const {userid, queryParams} = makePayloadListUserPost(true);

      jest.spyOn(mockPostRepository, 'listPostsByUserId')
        .mockImplementationOnce(() => { throw new Error() });

      const posts = async () => await service.listUserPosts(userid, queryParams);

      expect(posts).rejects.toThrowError('List users posts failed.');
    });
  })

  describe(PostService.prototype.listLatestPosts, () => {
    it('should return posts without limit dates params', async () => {
      const posts = await service.listLatestPosts({
        limit: 10,
        page: 1
      });
      expect(posts).toEqual(makeFakeArrayPosts());
    });

    it('should return posts with limit dates params', async () => {
      const posts = await service.listLatestPosts({
        limit: 10,
        page: 1,
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-02')
      });
      expect(posts).toEqual(makeFakeArrayPosts());
    });

    it('should able to return a error if listLatestPosts fail', async () => {
      jest.spyOn(mockPostRepository, 'listLatestPosts')
        .mockImplementationOnce(() => { throw new Error() });

      const posts = async () => await service.listLatestPosts({
        limit: 10,
        page: 1
      });

      expect(posts).rejects.toThrowError('List posts failed.');
    });
  })

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

    it('Shoul be able to trhow a error if post creation faild', async () => {
      jest.spyOn(mockPostRepository, 'save')
        .mockImplementationOnce(() => { throw new Error() });

      const post = async () => await service.createPost(postDto);

      expect(post).rejects.toThrowError('Post creation failed');
    });

    it('Shoul be able to trhow a error if user increment interactions faild ', async () => {
      jest.spyOn(mockUserRepository, 'incrementInteractions')
        .mockImplementationOnce(() => { throw new Error() });

      const post = async () => await service.createPost(postDto);

      expect(post).rejects.toThrowError('Post creation failed');
    });
  });

  describe(PostService.prototype.createRepost, () => {

    const repostDto: CreateRepostDTO = {
      postid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86',
      userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86'
    }

    it('should be able to create a new repost', async () => {

      jest.spyOn(mockPostRepository, 'save').mockImplementationOnce(() => (makeFakeRepost(repostDto)));
      const repost = await service.createRepost(repostDto);

      expect(repost).toHaveProperty('postid');
      expect(repost).toHaveProperty('createdAt');
      expect(repost.userid).toEqual(repostDto.userid);
      expect(repost.reposts[0].postid).toEqual(repostDto.postid);
    });

    it('should be able to trhow a error if post was not found', async () => {

      jest.spyOn(mockPostRepository, 'verifyRepostById').mockImplementationOnce(() => (null));

      const post = async () => await service.createRepost(repostDto);

      expect(post).rejects.toThrowError('Post does not exist.');
    });

    it('Shoul be able to trhow a error if user try to repost a repost', async () => {

      jest.spyOn(mockPostRepository, 'verifyRepostById').mockImplementationOnce(() => (makeFakeRepost(repostDto)));

      const post = async () => await service.createRepost(repostDto);

      expect(post).rejects.toThrowError('You can not repost a repost');
    });

    it('Shoul be able to trhow a error if user try to repost the his posts', async () => {
      jest.spyOn(mockPostRepository, 'verifyRepostById')
        .mockImplementationOnce(() => (makeFakePost({ userid: repostDto.userid, content: 'test' })));

      const post = async () => await service.createRepost(repostDto);

      expect(post).rejects.toThrowError('You cannot repost your own post');
    });

    it('Shoul be able to trhow a error if repost creation faild', async () => {
      jest.spyOn(mockPostRepository, 'save')
        .mockImplementationOnce(() => { throw new Error() });

      const post = async () => await service.createRepost(repostDto);

      expect(post).rejects.toThrowError('Repost creation failed');
    });

    it('Shoul be able to trhow a error if user increment interactions faild ', async () => {
      jest.spyOn(mockUserRepository, 'incrementInteractions')
        .mockImplementationOnce(() => { throw new Error() });

      const post = async () => await service.createRepost(repostDto);

      expect(post).rejects.toThrowError('Repost creation failed');
    });
  });

  describe(PostService.prototype.createQuote, () => {

    const quoteDto: CreateQuoteDto = {
      postid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86',
      userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86',
      content: 'test'
    }

    it('should be able to create a new quote', async () => {

      jest.spyOn(mockPostRepository, 'save').mockImplementationOnce(() => (makeFakeQuote(quoteDto)));
      const quote = await service.createQuote(quoteDto);

      expect(quote).toHaveProperty('postid');
      expect(quote).toHaveProperty('createdAt');
      expect(quote.userid).toEqual(quoteDto.userid);
      expect(quote.content).toEqual(quoteDto.content);
      expect(quote.quotes[0].postid).toEqual(quoteDto.postid);
    });

    it('should be able to trhow a error if post was not found', async () => {

      jest.spyOn(mockPostRepository, 'verifyQuoteById').mockImplementationOnce(() => (null));

      const post = async () => await service.createQuote(quoteDto);

      expect(post).rejects.toThrowError('Post does not exist.');
    });

    it('Shoul be able to trhow a error if user try to quote another quote', async () => {

      jest.spyOn(mockPostRepository, 'verifyQuoteById').mockImplementationOnce(() => (makeFakeQuote(quoteDto)));

      const post = async () => await service.createQuote(quoteDto);

      expect(post).rejects.toThrowError('You can not quote a quote');
    });

    it('Shoul be able to trhow a error if user try to quote his own post', async () => {
      jest.spyOn(mockPostRepository, 'verifyQuoteById')
        .mockImplementationOnce(() => (makeFakePost({ userid: quoteDto.userid, content: 'test' })));

      const post = async () => await service.createQuote(quoteDto);

      expect(post).rejects.toThrowError('You cannot quote your own post');
    });

    it('Shoul be able to trhow a error if repost creation faild', async () => {
      jest.spyOn(mockPostRepository, 'save')
        .mockImplementationOnce(() => { throw new Error() });

      const post = async () => await service.createQuote(quoteDto);

      expect(post).rejects.toThrowError('Quote creation failed');
    });

    it('Shoul be able to trhow a error if user increment interactions faild ', async () => {
      jest.spyOn(mockUserRepository, 'incrementInteractions')
        .mockImplementationOnce(() => { throw new Error() });

      const post = async () => await service.createQuote(quoteDto);

      expect(post).rejects.toThrowError('Quote creation failed');
    });
  });


})