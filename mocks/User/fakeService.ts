import ISeedUsersDTO from "modules/user/dtos/ISeedUsersDTO";
import { makeCreateFakeUser } from "./factories";


export const mockUserService = {
  seedUsersTable: jest.fn((dto: ISeedUsersDTO) => (makeCreateFakeUser())),
  findUserByName: jest.fn((userName: string) => ({
      userid: "f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a",
      userName,
      interactions: 5,
      createdAt: '2023-01-02T03:28:42.399Z'
    }))
};