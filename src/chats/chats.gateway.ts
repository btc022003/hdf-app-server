import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatsService } from './chats.service';
import {
  CreateChatDto,
  getSocketTypeKey,
  OnLineDoctor,
} from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private static onLineDoctors: OnLineDoctor[] = [];

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly prisma: PrismaService,
  ) {}

  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
    // ChatWebsocketGateway.participants.set(socketId, '');
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`Disconnection... socket id:`, socketId);
    const index = ChatsGateway.onLineDoctors.findIndex(
      (item) => item.socketId == socketId,
    );
    if (index > -1) {
      ChatsGateway.onLineDoctors.splice(index, 1); // 断开连接的时候，从在线列表中删除信息
    }
    // const roomId = ChatWebsocketGateway.participants.get(socketId);
    // const room = ChatWebsocketGateway.rooms.get(roomId);
    // if (room) {
    //   room.participants.get(socketId).connected = false;
    //   this.server.emit(
    //     `participants/${roomId}`,
    //     Array.from(room.participants.values()),
    //   );
    // }
  }

  // 获取在线的医生
  @SubscribeMessage('load_online_doctors')
  loadOneLineDoctors() {
    // 获取在线的医生列表
    // 查询数据库，获取在线的医生信息
    return this.prisma.doctor.findMany({
      where: {
        id: {
          in: ChatsGateway.onLineDoctors.map((item) => item.doctorId),
        },
      },
    });
  }

  // 医生上线
  @SubscribeMessage('to_work')
  toWork(socket: Socket, @MessageBody() createChatDto: CreateChatDto) {
    //
    console.log('医生上线, socketId: %s, info: %s', socket.id, createChatDto);
    if (
      ChatsGateway.onLineDoctors.findIndex(
        (item) => item.socketId == socket.id,
      ) < 0
    ) {
      // 医生上线
      ChatsGateway.onLineDoctors.push({
        socketId: socket.id,
        doctorId: createChatDto.doctor,
      });
    }
  }

  // 提问
  @SubscribeMessage('ask')
  ask(@MessageBody() createChatDto: CreateChatDto) {
    // 提问了，把问题转移给对应的医生
    this.server.emit('ask/' + getSocketTypeKey(createChatDto), {
      content: '',
      date: Date.now(),
    });
    // 如果需要，可以存储聊天内容
    return { code: 1, data: '提问完成' };
  }

  // 回复
  @SubscribeMessage('reply')
  reply(@MessageBody() createChatDto: CreateChatDto) {
    this.server.emit('ask/' + getSocketTypeKey(createChatDto), {
      content: '',
      date: Date.now(),
    });
    return { code: 1, data: '回答完成' };
  }
}
