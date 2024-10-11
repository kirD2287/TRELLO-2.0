import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ColumsModule } from './colums/colums.module';
import { CardsController } from './cards/cards.controller';
import { CardsService } from './cards/cards.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';





@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ColumsModule, UsersModule],
  controllers: [CardsController, CommentsController],
  providers: [CardsService, CommentsService, PrismaService],
})
export class AppModule {}
