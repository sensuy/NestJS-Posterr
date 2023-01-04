import ISeedUsersDTO from 'modules/user/dtos/ISeedUsersDTO';

export const mockUserRepository = {
  seed: jest.fn((data: ISeedUsersDTO[]) => {
    const usersAdded: Object[] = [];
    data.forEach(() => {
      const response = {
        userid: '8d27c1bb-5534-4b02-9c67-bee7aae4ad86',
        interactions: 0,
        created_at: new Date()
      }
      usersAdded.push(response)
    });

    return {
      raw: usersAdded
    }
  }),
  listByName: jest.fn((userName: string) => ({
    userid: '90892996-a4c7-4d4c-99f8-f5ef6ca80143',
    userName,
    interactions: 2,
    createdAt: '2023-01-04T14:42:00.583Z'
  })),
  listById: jest.fn((userid: string) => ({})),
  incrementInteractions: jest.fn((userid: string) => ({})),
}