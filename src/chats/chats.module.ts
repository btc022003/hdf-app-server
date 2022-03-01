import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatsGateway, ChatsService, PrismaService],
})
export class ChatsModule {}
