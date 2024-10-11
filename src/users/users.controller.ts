import { Body, Request, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './dto/user.model';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt-auth-guard';
import { ColumnsService } from 'src/colums/columns.service';

@ApiTags('CRUD Пользователей')
@Controller('/users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private columnService: ColumnsService
    ) {}
    
@ApiOperation({ summary: 'Создание пользователя' })
@ApiResponse({ status: 200, type: User })
@Post()
create(dto: UserDto) {
    return this.userService.createUser(dto)
}

@ApiOperation({ summary: 'Получение списка пользователей' })
@ApiResponse({ status: 200, type: [User] })
@UseGuards(JWTAuthGuard)
@Get()
getAll() {
    return this.userService.getAllUsers()
}

@ApiOperation({ summary: 'Получение пользователя по id' })
@ApiResponse({ status: 200, type: User })
@Get(':email')
getById(@Param('email') email: string) {
    return this.userService.getUserByEmail(email)
}

@ApiOperation({ summary: 'Обновление пользователя по id' })
@ApiResponse({ status: 200, type: User })
@Put(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedUser: UserDto
    ) {
        return this.userService.updateUser(id, updatedUser)
    }

@ApiOperation({ summary: 'Удаление пользователя по id' })
@ApiResponse({ status: 200, type: User })
@Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }

    @ApiOperation({ summary: 'Получение списка колонок' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()

    @Get(':id/columns')
    async getColumns(@Request() req) {
        const columns = await this.columnService.getColumns(req)
        return columns
    }
}
