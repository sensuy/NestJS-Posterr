import ISeedUsersDTO from "modules/user/dtos/ISeedUsersDTO";

export const mockUserRepository = {
  seed: jest.fn((data: ISeedUsersDTO[]) => ({})),
  listByName: jest.fn((userName: string) => ({})),
  listById: jest.fn((userid: string) => ({})),
  incrementInteractions: jest.fn((userid: string) => ({})),
}