import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in'
import { ValidadeCheckInUseCase } from './validate-checkIn'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateValidationCheckIn } from './errors/late-checkIn-error'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidadeCheckInUseCase // "sut" = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidadeCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should ', async () => {
    const checkInCreated = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkIn_id: checkInCreated.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should ', async () => {
    await expect(() =>
      sut.execute({
        checkIn_id: 'checkInCreated',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should ', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const checkInCreated = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const minutesInMs = 1000 * 60 * 21

    await expect(() =>
      sut.execute({
        checkIn_id: 'checkInCreated',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
