import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsDto } from './dto/comments.dto';
import { CommentsService } from './comments.service';


@ApiTags('Комментарии')
@Controller(':cardId/comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ){}

    @ApiOperation({ summary: 'Создание комментария' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Post()
    async createComment(
        @Request() req: any,
        @Param('cardId') cardId: number,
        @Body() dto: CommentsDto
    ) {
        const task = await this.commentsService.createComment(
            req,
            Number(cardId),
            dto
        )
        return task
    }

    @ApiOperation({ summary: 'Получение комментариев' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Get()
    async getComments(
        @Request() req: any,
        @Param('cardId') cardId: number,
    ) {
        const comments = await this.commentsService.getComments(
            req,
            Number(cardId),
        )
        return comments
    }

    @ApiOperation({ summary: 'Удаление комментария' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Delete('/:commentId')
    async deleteComment(
        @Request() req: any,
        @Param('cardId') cardId: number,
        @Param('commentId') commentId: number,
    ) {
        const task = await this.commentsService.deleteComment(
            req,
            Number(cardId),
            Number(commentId)
        )
        return task
    }
}
