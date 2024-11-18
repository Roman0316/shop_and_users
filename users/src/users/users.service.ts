import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async resolveIssues() {
    const affectedUsersCount = await this.usersRepository.resolveIssues();
    return { affectedUsersCount };
  }
}
