import { EntityRepository, MongoRepository } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUser.repository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUser.dto';
import User from '../entities/User.entity';

@EntityRepository(User)
class UserRepository extends MongoRepository<User> implements IUserRepository {
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async createUser(userData: ICreateUserDTO): Promise<User> {
    const user = this.create(userData);

    await this.save(user);

    return user;
  }
}

export default UserRepository;
