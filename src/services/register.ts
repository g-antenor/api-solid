import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserServices {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserServices) {
    const password_hash = await hash(password, 6)

    const checkExistEmail = await this.userRepository.findByEmail(email)

    if (checkExistEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
