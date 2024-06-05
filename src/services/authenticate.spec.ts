import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { string } from 'zod'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase // "sut" = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    await usersRepository.create({
      name: 'Joe',
      email: 'teste@testando.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'teste@testando.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(string))
  })

  it('should hash user password upon registration', async () => {
    await expect(() =>
      sut.execute({
        email: 'teste@testando.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
