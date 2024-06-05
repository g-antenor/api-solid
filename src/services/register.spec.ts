import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { string } from 'zod'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase // "sut" = System Under Test

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Joe',
      email: 'teste@testando.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(string))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Joe',
      email: 'teste@testando.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'teste@testando.com'

    await sut.execute({
      name: 'Joe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Joe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
