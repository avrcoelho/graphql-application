import User from '../infra/typeorm/entities/User.entity';
import ICreateUserDTO from '../dtos/ICreateUser.dto';

export default interface IUserRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
