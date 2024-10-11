import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CommentsDto } from './dto/comments.dto';
import { Request } from 'express';
import { CardsService } from 'src/cards/cards.service';


@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly cardsService: CardsService
    ) {}

    async createComment(req: any, cardId: number, dto: CommentsDto) {
        try {
                const userId = await this.tokenUserId(req)
                const card = await this.cardsService.getCardById(req, cardId)
                if (!card) {
                    throw new HttpException('Card not found', HttpStatus.NOT_FOUND)
                  }
                const comment = await this.prisma.comments.create({
                    data: {
                        text: dto.text,
                        card: {
                            connect: {
                                id: card?.id
                            }
                        },
                        user: {
                            connect: {
                                id: userId
                            }  
                        }
                    },

                })
                return comment
        
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    async getComments(req: any, cardId: number) {
        const userId = await this.tokenUserId(req)
        const comments = await this.prisma.comments.findMany({
            where: {
                cardId: cardId,
                userId: userId,
            },
        })
        return comments
    }

    async deleteComment(req: any, cardId: number, commentId: number) {
        const userId = await this.tokenUserId(req)
        const comment = await this.prisma.comments.delete({
            where: {
                id: commentId,
                cardId: cardId,
                userId: userId
            }
        })

        return comment
    }

    private async tokenUserId(req: Request) {
        const token = await req.headers.authorization.split(' ')[1]
        const user = await this.jwtService.verify(token)
        return user.id
    }
}
