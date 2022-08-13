
import { InsertResult } from 'typeorm';
import ISeedUsersDTO from '../dtos/ISeedUsersDTO';
import User from './typeorm/entities/User';


interface IUserRepository {
  seed(data: ISeedUsersDTO[]): Promise<InsertResult>;
  listByName(userName: string): Promise<User | null>;
  listById(userid: string): Promise<User | null>;
}

export default IUserRepository;