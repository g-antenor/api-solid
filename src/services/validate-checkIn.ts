import { ChekInRepository } from '@/repositories/check-in-repository'
import { GymsRepository } from '@/repositories/gym-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateValidationCheckIn } from './errors/late-checkIn-error'

interface ValidateCheckInUseCaseRequest {
  checkIn_id: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidadeCheckInUseCase {
  constructor(private checkInRepository: ChekInRepository) {}

  async execute({
    checkIn_id,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkIn_id)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const maxTimeForValidationCheckIn = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (maxTimeForValidationCheckIn > 20) {
      throw new LateValidationCheckIn()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
