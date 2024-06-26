import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymsUseCaseRequest) {
    const gyms = await this.gymsRepository.findSearchGyms(query, page)

    return {
      gyms,
    }
  }
}
