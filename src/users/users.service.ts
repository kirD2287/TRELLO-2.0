import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) {}


async createUser(dto: UserDto) {

    const user = await this.prisma.users.findUnique({
        where: {
            email: dto.email,
        },
    })

    if (user) {
        throw new Error('Пользователь с таким email уже существует')
    }

    const newUser = await this.prisma.users.create({
        data: {
            email: dto.email,
            password: dto.password
        }
    })

    return newUser
} 

async getAllUsers() {
    const users = await this.prisma.users.findMany()
    return users
}

async getUserByEmail(email: string) {
    const user = await this.prisma.users.findFirst({
      where: { email },
      include: {
        columns: {
          include: {
            cards: true,
          },
        },
        cards: {
          include: {
            comments: true,
          },
        },
        comments: true,
      },
    });
  
    if (!user) {
      return null;
    }
  
    return user;
  }

async updateUser(id: number, updatedUser: UserDto) {
    const user = await this.prisma.users.update({
        where: {id},
        data: updatedUser,
    })
    if (!user) {
        throw new Error(`User with ID ${id} not found`)
    }
    return user
}

async deleteUser(id: number) {
    const user = await this.prisma.users.delete({where: {id}})
    if(!user) {
        throw new Error(`User with ID ${id} not found`)
    }
    return user
}

}
