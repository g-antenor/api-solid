import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { string } from 'zod'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { Decimal } from '@prisma/client/runtime/library'
import { GymUseCase } from './gym'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGym
let sut: CheckInUseCase // "sut" = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGym()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Teste Gym',
      description: '',
      phone: '',
      latitude: -8.7763696,
      longitude: -63.8758746,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should ', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.7763696,
      userLongitude: -63.8758746,
    })

    expect(checkIn.id).toEqual(expect.any(string))
  })

  it('should ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.7763696,
      userLongitude: -63.8758746,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -8.7763696,
        userLongitude: -63.8758746,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.7763696,
      userLongitude: -63.8758746,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.7763696,
      userLongitude: -63.8758746,
    })

    expect(checkIn.id).toEqual(expect.any(string))
  })

  it('should ', async () => {
    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Teste Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.7351099),
      longitude: new Decimal(-63.871502),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -8.7763696,
        userLongitude: -63.8758746,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
