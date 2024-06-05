import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users'
import { hash } from 'bcryptjs'
import { UserProfileUseCase } from './profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: UserProfileUseCase // "sut" = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserProfileUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const newUser = await usersRepository.create({
      name: 'Joe',
      email: 'teste@testando.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: newUser.id,
    })

    expect(user.name).toEqual('Joe')
  })

  it('should hash user password upon registration', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-exist-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
