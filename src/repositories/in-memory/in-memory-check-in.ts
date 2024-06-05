import { Prisma, CheckIn } from '@prisma/client'
import { ChekInRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements ChekInRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // Pega a data no inicio do dia
    const endOfTheDay = dayjs(date).endOf('date') // Pega a data no final do dia

    const checkInOnSameDate = this.items.find((chekIn) => {
      const chekInDate = dayjs(chekIn.created_at) // Converte o dado em data para ser usado
      const isOnSameDate =
        chekInDate.isAfter(startOfTheDay) && chekInDate.isAfter(endOfTheDay) // Compara para saber se a data etá entre o inicio e fim do dia

      return chekIn.user_id === userId && isOnSameDate // Retorna True se ambas as comparações forem true
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countCheckinByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }
}
