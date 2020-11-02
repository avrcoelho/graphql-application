import { EntityRepository, MongoRepository, getMongoRepository } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUser.repository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUser.dto';
import User from '../entities/User.entity';

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = getMongoRepository(User, 'mongo');
  }
  
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
