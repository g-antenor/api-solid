import { CheckIn, Prisma } from '@prisma/client'
import { ChekInRepository } from '../check-in-repository'
import { prisma } from '@/lib'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements ChekInRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // Pega a data no inicio do dia
    const endOfTheDay = dayjs(date).endOf('date') // Pega a data no final do dia

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // Filtra pela data maior ou igual ao inicio do dia
          lte: endOfTheDay.toDate(), // Filtra pela data menor ou igual ao fim do dia
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIn = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // Indica quantos itens eu quero trazer
      skip: (page - 1) * 20, // A depender do numero da pagina ele calcula e retorna 20 items por pagina
    })

    return checkIn
  }

  async countCheckinByUserId(userId: string) {
    const checkIn = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
