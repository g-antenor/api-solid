import { describe, it, expect, beforeEach } from 'vitest'
import { string } from 'zod'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { GymUseCase } from './gym'

let gymsRepository: InMemoryGym
let sut: GymUseCase // "sut" = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGym()
    sut = new GymUseCase(gymsRepository)
  })

  it('should ', async () => {
    const { gym } = await sut.execute({
      title: 'Teste Gym',
      description: null,
      phone: null,
      latitude: -8.7763696,
      longitude: -63.8758746,
    })

    expect(gym.id).toEqual(expect.any(string))
  })
})
