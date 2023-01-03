import { UserVerificationMiddleware } from './../../post/middleware/user-verification.middleware';
import { Test, TestingModule } from "@nestjs/testing";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import { mockUserService } from "../../../../mocks/User/fakeService";
import UserService from "../services/user.service";
import UserController from "./user.controller";

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('UserController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a list of users', async () => {
    const payload: [{ userName: string }] = [{ userName: 'John' }];

    const result = await controller.seedUsers(payload);

    expect(result[0]).toMatchObject({
      created_at: '2023-01-02T03:28:42.399Z',
      interactions: 0,
      userid: "55c644af-3597-4950-9bf6-c919e8e36867"
    });
  });

  it('should be able to list a user by name', async () => {
    let userName: string = 'John';
    const result = await controller.listByName(userName);
    expect(result).toMatchObject({
      userid: "f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a",
      userName,
      interactions: 5,
      createdAt: '2023-01-02T03:28:42.399Z'
    });
  });



});