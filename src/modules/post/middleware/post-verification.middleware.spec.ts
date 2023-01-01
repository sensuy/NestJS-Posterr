import { Test, TestingModule } from "@nestjs/testing";
import { mockUserRepository } from "../../../../mocks/User/fakeRepository";
import { PostVerificationMiddleware } from "./post-verification.middleware";
import DateFormatService from "shared/utils/date-format.service";
import { mockPostRepository } from "../../../../mocks/Post/fakeRepository";
import { NextFunction } from "express";

describe('PostVerificationMiddleware', () => {
  let midleWare: PostVerificationMiddleware;
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PostVerificationMiddleware,
        DateFormatService,
        {
          provide: 'IPostRepository',
          useValue: mockPostRepository
        }
      ],
    })
      .compile();

    midleWare = module.get<PostVerificationMiddleware>(PostVerificationMiddleware);
  });

  it('should be able to defined midleWare', () => {
    expect(midleWare).toBeDefined();
  });

  it('should be able to trhow a error if user exceed the limit post per day', () => {
      
      const req: any = {
        body: {
          useri: '123'
        }
      };

      jest.spyOn(mockPostRepository, 'countUserPostByDate').mockImplementationOnce(() => 5);
      const result = async () => await midleWare.use(req, null, null);

      expect(result).rejects.toThrowError('You have reached the limit of posts per day');

    });

    it('should be able to pass through middleware without erros', () => {
      const req: any = {
        body: {
          userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
        }
      };
  
      const nextFunction: NextFunction = () => {
        return true;
      };
      
      const result = async () => await midleWare.use(req, null, nextFunction);
  
      expect(result).not.toThrowError();
    
    });


});