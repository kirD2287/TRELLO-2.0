import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Авторизация и регистрация')
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService){}

@ApiOperation({ summary: 'Авторизация пользователя' })
@ApiResponse({ status: 200, type: UserDto })
@Post('/registration')
registration(@Body() dto: UserDto) {
    return this.authService.registration(dto)
}

@ApiOperation({ summary: 'Регистрация пользователя' })
@ApiResponse({ status: 200, type: UserDto })
@Post('/login')
login(@Body() dto: UserDto) {
    return this.authService.login(dto)
}
}
