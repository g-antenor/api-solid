import { ChekInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface CheckInCountUseCaseRequest {
  userId: string
}

interface CheckInCountUseCaseResponse {
  countCheckIns: number
}

export class CountCheckInsUseCase {
  constructor(private checkInRepository: ChekInRepository) {}

  async execute({
    userId,
  }: CheckInCountUseCaseRequest): Promise<CheckInCountUseCaseResponse> {
    const countCheckIns =
      await this.checkInRepository.countCheckinByUserId(userId)

    return {
      countCheckIns,
    }
  }
}
