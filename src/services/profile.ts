import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UserProfileRequest {
  userId: string
}

interface UserProfileResponse {
  user: User
}

export class UserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: UserProfileRequest): Promise<UserProfileResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
