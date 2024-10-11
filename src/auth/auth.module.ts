import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
            expiresIn: '24h',
        },
    }),
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
