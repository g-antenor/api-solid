import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { title } from 'process'

let gymsRepository: InMemoryGym
let sut: FetchNearbyGymsUseCase

describe('Fetch checkIns use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGym()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch chek-in history', async () => {
    await gymsRepository.create({
      title: 'Teste Gym',
      description: null,
      phone: null,
      latitude: -8.6763696,
      longitude: -63.9758746,
    })
    await gymsRepository.create({
      title: 'Teste2 Gym',
      description: null,
      phone: null,
      latitude: -8.7763696,
      longitude: -63.8758746,
    })

    const { gyms } = await sut.execute({
      userLatitude: -8.7763696,
      userLongitude: -63.8758746,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Teste2 Gym' })])
  })
})
