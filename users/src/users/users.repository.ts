import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async resolveIssues(): Promise<number> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ issues: false })
      .where({ issues: true })
      .execute();

    return result.affected;
  }
}
