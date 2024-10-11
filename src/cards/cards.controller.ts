import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardDto } from './dto/card.dto';


@ApiTags('Карточки')
@Controller('/:columnId/cards')
export class CardsController {
    constructor(private cardsService: CardsService){}

    @ApiOperation({ summary: 'Создание карточки' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Post()
    async createCard(
        @Request() req: any,
        @Param('columnId') columnId: number,
        @Body() dto: CardDto
    ) {
        const card = await this.cardsService.createCard(
            req,
            Number(columnId),
            dto
        )
        return card
    }

    @ApiOperation({ summary: 'Получение карточек' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Get()
    async getCards(@Request() req, @Param('columnId') columnId) {
        const cards = await this.cardsService.getCards(
            req,
            Number(columnId)
        )
        return cards
    }

    @ApiOperation({ summary: 'Получение карточки по ID' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Get(':cardId')
    async getCard(@Request() req, @Param('cardId') cardId) {
        const card = await this.cardsService.getCardById(
            req,
            Number(cardId)
        )
        return card
    }



    @ApiOperation({ summary: 'Удаление карточки' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Delete(':cardId')
    async deleteCard(
        @Request() req: any,
        @Param('columnId') columnId: number,
        @Param('cardId') cardId: number
    ) {
        const card = await this.cardsService.deleteCard(
            req,
            Number(columnId),
            Number(cardId)
        )
        return card
    }
}
