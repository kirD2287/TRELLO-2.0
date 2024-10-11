import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { ColumnDto } from './dto/colum.dto';



@ApiTags('Колонки')
@Controller('/columns')
export class ColumnsController {
    constructor(private columnService: ColumnsService) {}


    @ApiOperation({ summary: 'Создание колонки' })
    @ApiResponse({ status: 200, type: ColumnDto })
    @ApiBearerAuth()
    
    @Post()
    async createColumn(@Request() req, @Body() dto: ColumnDto) {
        const column = await this.columnService.createColumn(req, dto)
        return column
    }

    @ApiOperation({ summary: 'Получение колонки по id' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @ApiParam({
        name: 'columnId',
        description: 'Column ID',
        required: true,
        type: Number,
    })
    @Get(':columnId')
    async getColumn(@Request() req, @Param('columnId') columnId: number) {
        const  column = await this.columnService.getColumnById(
            req,
            Number(columnId)
        )
        return  column
    }


    @ApiOperation({ summary: 'Удаление колонки' })
    @ApiResponse({ status: 200 })
    @ApiParam({
        name: 'columnId',
        description: 'Column ID',
        required: true,
        type: Number,
    })
    @ApiBearerAuth()
    @Delete(':columnId')
    async deleteColumn(@Request() req, @Param('columnId') columnId: number) {
        const column = await this.columnService.deleteColumn(
            req,
            Number(columnId)
            
        )
        return column
    }
}
