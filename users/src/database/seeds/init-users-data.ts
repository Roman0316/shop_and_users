import { DataSource, DeepPartial } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Gender, User } from '../../users/entities/user.entity';

export default class UsersInitData implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    const users = this.generateData();
    for (let i = 0; i < 100; i++) {
      await repository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();
    }
  }

  private generateData(): DeepPartial<User>[] {
    const users: DeepPartial<User>[] = [];
    const user: DeepPartial<User> = {
      firstName: 'Ryan',
      lastName: 'Gosling',
      age: 43,
      gender: Gender.Male,
      issues: false,
    };
    for (let i = 0; i < 10000; i++) {
      users.push(user);
    }
    return users;
  }
}
