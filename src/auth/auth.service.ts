import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/dto/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async registration(dto: UserDto){
        try {
            const user = await this.usersService.getUserByEmail(dto.email)
            if(user) {
                throw new HttpException(
                    'Пользователь с таким email существует',
                    HttpStatus.BAD_REQUEST
                )
            }
            const hashPassword = await bcrypt.hash(dto.password, 10)
            const newUser = await this.usersService.createUser({
                ...dto,
                password: hashPassword,
            })
            return newUser
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(dto: UserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = {
            email: user.email,
            id: user.id,
            password: user.password
        }
        return {
            token: this.jwtService.sign(payload),
        }
    }

    async validateUser(dto: UserDto) {
        const user = await this.usersService.getUserByEmail(dto.email)
        const passwordEquals = await bcrypt.compare(
            dto.password,
            user.password
        )
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({
            message: 'Некорректный емаил или пароль',
        })
    }
    } 
