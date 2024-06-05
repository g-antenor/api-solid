import { ChekInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface CheckInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface CheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchCheckInsUseCase {
  constructor(private checkInRepository: ChekInRepository) {}

  async execute({
    userId,
    page,
  }: CheckInHistoryUseCaseRequest): Promise<CheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
