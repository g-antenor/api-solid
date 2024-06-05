import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { SearchGymsUseCase } from './search-gyms'
import { title } from 'process'

let gymsRepository: InMemoryGym
let sut: SearchGymsUseCase // "sut" = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGym()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should ', async () => {
    await gymsRepository.create({
      title: 'Teste Gym',
      description: null,
      phone: null,
      latitude: -8.7763696,
      longitude: -63.8758746,
    })

    await gymsRepository.create({
      title: 'Teste2 Gym',
      description: null,
      phone: null,
      latitude: -8.7763696,
      longitude: -63.8758746,
    })

    const { gyms } = await sut.execute({
      query: 'Teste Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Teste Gym' })])
  })

  it('should ', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Teste Gym ${i}`,
        description: null,
        phone: null,
        latitude: -8.7763696,
        longitude: -63.8758746,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Teste Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Teste Gym 21' }),
      expect.objectContaining({ title: 'Teste Gym 22' }),
    ])
  })
})
