import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ColumnsService } from 'src/colums/columns.service';
import { ColumnDto } from 'src/colums/dto/colum.dto';






@Injectable()
export class CardsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly columnsService: ColumnsService
    ) {}

    async createCard(req: any, columnId: number, dto: ColumnDto) {
        try {
                const userId = await this.tokenUserId(req)
                const column = await this.columnsService.getColumnById(req, columnId)
                if (!column) {
                    throw new HttpException('Column not found', HttpStatus.NOT_FOUND)
                  }
                const card = await this.prisma.cards.create({
                    data: {
                        name: dto.name,
                        column: {
                            connect: {
                                id: column?.id
                            }
                        },
                        user: {
                            connect: {
                                id: userId
                            }  
                        }
                    },

                })
                return card
        
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    async getCards(req: Request, columnId: number) {
        const userId = await this.tokenUserId(req)
        const cards = await this.prisma.cards.findMany({
            where: {
                columnId: columnId,
                userId: userId,
            },

        })
        return cards
    }

    async getCardById(req: Request, cardId: number) {
        const userId = await this.tokenUserId(req)
        const card = await this.prisma.cards.findFirst({
            where: {
                id: cardId,
                userId: userId,     
            },
            include: {
                comments: true
            }
        })
        if(!card) {
            throw new HttpException(
                'Карточка не найдена',
                HttpStatus.BAD_REQUEST
            )
        }
        return card
    }

    async deleteCard(req: Request, columnId: number, cardId: number) {
        const userId = await this.tokenUserId(req)
        await this.prisma.comments.deleteMany({
            where: {
                cardId: cardId,
                userId: userId,
            },
        })
        const card = await this.prisma.cards.delete({
            where: {
                id: cardId,
                columnId:  columnId,
                userId: userId,
            },
        })
        return card
    }

    private async tokenUserId(req: Request) {
        const token = await req.headers.authorization.split(' ')[1]
        const user = await this.jwtService.verify(token)
        return user.id
    }
}
