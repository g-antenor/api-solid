import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in'
import { beforeEach, describe, expect, it } from 'vitest'
import { CountCheckInsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInRepository
let sut: CountCheckInsUseCase

describe('Fetch checkIns use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new CountCheckInsUseCase(checkInsRepository)
  })

  it('Should be able to fetch chek-in history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const checkInCount = await sut.execute({
      userId: 'user_01',
    })

    expect(checkInCount).toEqual(2)
  })
})
