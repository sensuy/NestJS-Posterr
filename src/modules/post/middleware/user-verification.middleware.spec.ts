import { Test, TestingModule } from "@nestjs/testing";
import { NextFunction } from 'express';
import { mockUserRepository } from "../../../../mocks/User/fakeRepository";
import { UserVerificationMiddleware } from "./user-verification.middleware";

describe('UserVerificationMiddleware', () => {
  let midleWare: UserVerificationMiddleware;
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserVerificationMiddleware,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository
        },
      ],
    })
      .compile();

    midleWare = module.get<UserVerificationMiddleware>(UserVerificationMiddleware);
  });

  it('should be able to defined midleWare', () => {
    expect(midleWare).toBeDefined();
  });

  it('should be able to throw a error if userid is not defined', () => {

    const req: any = {
      body: {
        useri: '123'
      }
    };
    const result = async () => await midleWare.use(req, null, null);

    expect(result).rejects.toThrowError('userid is a required field');
  });

  it('should return bad request if userid is not a uuid', () => {
    const req: any = {
      body: {
        userid: 'not-a-uuid',
        postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
        content: 'I love this post!'
      }
    };
    
    const result = async () => await midleWare.use(req, null, null);

    expect(result).rejects.toThrowError('userid must be a valid uuid');
  
  });


  it('it should be able to trhow a error if user was not found', () => {
    const req: any = {
      body: {
        userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      }
    };

    jest.spyOn(mockUserRepository, 'listById').mockImplementationOnce(() => (null));
    
    const result = async () => await midleWare.use(req, null, null);

    expect(result).rejects.toThrowError('User does not exist.');
  
  });

  it('should be able to pass through middleware without erros', () => {
    const req: any = {
      body: {
        userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      }
    };

    jest.spyOn(mockUserRepository, 'listById').mockImplementationOnce(() => (true));

    const nextFunction: NextFunction = () => {
      return true;
    };
    
    const result = async () => await midleWare.use(req, null, nextFunction);

    expect(result).not.toThrowError();
  
  });


});