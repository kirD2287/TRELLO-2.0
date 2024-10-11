import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ColumnDto } from './dto/colum.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ColumnsService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}


    async createColumn(req: Request, dto: ColumnDto) {
        const userId = await this.tokenUserId(req)
        const column = await this.prisma.columns.create({
            data: {
                name: dto.name,
                user: {
                    connect: {
                        id: userId
                    }
                },
            },
        })
        return column
    }
    async getColumns(req: Request) {
        const userId = await this.tokenUserId(req)
        const columns = await this.prisma.columns.findMany({
            where: {
                userId: userId,
            },
        })
        return columns
    }
 
    async getColumnById(req: Request, columnId: number) {

        const userId = await this.tokenUserId(req)
        const column = await this.prisma.columns.findFirst({where: {
            id: columnId,
            userId: userId,
        }},)
        if(!column) {
            throw new HttpException(
                'Колонка не найдена',
                HttpStatus.BAD_REQUEST
            )
        }
        return column
    }

    async deleteColumn(req: Request, columnId: number) {
        const userId = await this.tokenUserId(req)
        await this.prisma.comments.deleteMany({
            where: {
                card: {
                    columnId: columnId,
                    userId: userId,
                },
            },
        })
        await this.prisma.cards.deleteMany({
            where: {
                columnId: columnId,
                userId: userId,
            },
        })
        const colunm = await this.prisma.columns.delete({
            where: {
                id: columnId,
                userId: userId,
            },
        })
        return colunm
    }

    private async tokenUserId(req: Request) {
        const token = await req.headers.authorization.split(' ')[1]
        const user = await this.jwtService.verify(token)
        return user.id
    }
}
