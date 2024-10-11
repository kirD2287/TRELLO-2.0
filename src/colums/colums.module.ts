import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CardsService } from 'src/cards/cards.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService, PrismaService, CardsService],
  imports: [
    JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
            expiresIn: '24h',
        },
    }),
    ],

  exports:[ColumnsService]
})
export class ColumsModule {}