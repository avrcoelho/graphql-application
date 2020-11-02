import { EntityRepository } from 'typeorm';
import { uuid } from 'uuidv4';

import IUserRepository from '@modules/user/repositories/IUser.repository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUser.dto';
import User from '../../infra/typeorm/entities/User.entity';

@EntityRepository(User)
class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async createUser(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }
}

export default FakeUserRepository;
