import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in'
import { FetchCheckInsUseCase } from './fetch-checkIn-history'
import { beforeEach, describe, expect, it } from 'vitest'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchCheckInsUseCase

describe('Fetch checkIns use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchCheckInsUseCase(checkInsRepository)
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

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('Should be able to fetch chek-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})