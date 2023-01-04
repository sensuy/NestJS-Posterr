import { Test, TestingModule } from "@nestjs/testing";
import { mockUserRepository } from "../../../../mocks/User/fakeRepository";
import UserService from "./user.service";


const payload = [{userName: 'Developer'},{userName: 'Manager'}]

describe('UserService', () => {
  let service: UserService;


  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('PostService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(UserService.prototype.seedUsersTable, () => {
    it('should be able to seed an array of users', async () => {
      
      const users = await service.seedUsersTable(payload);

      expect(users.length).toBe(payload.length);
      expect(users[0]).toHaveProperty('userid')
      expect(users[0]).toHaveProperty('interactions')
      expect(users[0]).toHaveProperty('created_at')
      expect(users[0]).not.toHaveProperty('userName')
    });

    it('should be able to trhow a error if seed user repository fails', () => {
      
      jest.spyOn(mockUserRepository, 'seed').mockImplementationOnce(() => { throw new Error() })

      const users = async () => await service.seedUsersTable(payload);
      

      expect(users).rejects.toThrowError('User creation failed');
    })
  })

  describe(UserService.prototype.findUserByName, () => {

    it('should be able to find a user by name', async () => {
      const nameExample = 'Reviewer';

      const user = await service.findUserByName(nameExample);
      
      expect(user).toMatchObject({
        userid: '90892996-a4c7-4d4c-99f8-f5ef6ca80143',
        userName: nameExample,
        interactions: 2,
        createdAt: 'Jan 04, 2023'
      })
    });

    it('should be able to trhow a error if list method that list user by name fails', async () => {
      const nameExample = 'Reviewer';

      jest.spyOn(mockUserRepository, 'listByName').mockImplementationOnce(() => { throw new Error() })

      const user = async () => await service.findUserByName(nameExample);

      expect(user).rejects.toThrowError('User could not be found');
    });
    it('should be able to trhow a error if a is not found', async () => {
      const nameExample = 'Reviewer';

      jest.spyOn(mockUserRepository, 'listByName').mockImplementationOnce(() => null)

      const user = async () => await service.findUserByName(nameExample);

      expect(user).rejects.toThrowError('User not found.');
    });

  })
});


