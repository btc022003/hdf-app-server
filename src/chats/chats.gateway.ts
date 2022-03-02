import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ cors: true })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // 类型中 c表示客户(患者) d表示医生
  private static allClients = new Map(); // 设置所有在线的客户端列表 { t: '类型', id: '' }

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(socket: Socket) {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
    // console.log(socket.handshake.query);
    ChatsGateway.allClients.set(socketId, {
      type: socket.handshake.query.t,
      id: socket.handshake.query.id,
    });
    // ChatWebsocketGateway.participants.set(socketId, '');
    this.broadCastOnLineDoctors();
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`Disconnection... socket id:`, socketId);
    // 如果是医生下线，那么向外广播要求更新在线医生列表
    if (ChatsGateway.allClients.get(socketId)?.t == 'd') {
      this.broadCastOnLineDoctors();
    }
    ChatsGateway.allClients.delete(socketId); // 从在线列表中删除客户端信息
  }

  async broadCastOnLineDoctors() {
    const doctorIds = [];
    ChatsGateway.allClients.forEach((item) => {
      if (item.type == 'd') {
        doctorIds.push(item.id);
      }
    });
    const doctors = await this.prisma.doctor.findMany({
      where: {
        id: {
          in: doctorIds,
        },
      },
    });
    this.server.emit('send_doctor_list', doctors);
  }

  // 医生上线
  @SubscribeMessage('to_work')
  toWork(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createChatDto: CreateChatDto,
  ) {
    //
    // console.log('医生上线, socketId: %s, info: %s', socket.id, createChatDto);
    ChatsGateway.allClients.set(socket.id, {
      type: 'd',
      id: createChatDto.doctor,
    });
    this.broadCastOnLineDoctors();
  }

  // 提问，从用户发给医生
  @SubscribeMessage('ask')
  async ask(@MessageBody() createChatDto: CreateChatDto) {
    // console.log(createChatDto.user);
    // 提问了，把问题转移给对应的医生
    const from = await this.prisma.user.findFirst({
      where: { id: createChatDto.user },
    });
    const to = await this.prisma.doctor.findFirst({
      where: { id: createChatDto.doctor },
    });

    let toSocketId = ''; // 需要接收消息的客户端的id
    const clients = await this.server.fetchSockets(); // 所有连接的客户端
    ChatsGateway.allClients.forEach((dItem, dKey) => {
      if (dItem.id == to.id) {
        //
        toSocketId = dKey;
      }
    });
    const client = clients.find((item) => item.id == toSocketId); // 接收消息的客户端信息
    // client.emit('')
    // 获取当前需要接收消息的客户端信息，向其派发消息
    client?.emit('ask', {
      from: from.nickName ? from.nickName : from.userName,
      to: to.name,
      user: createChatDto.user,
      content: createChatDto.content,
      date: Date.now(),
    });
    // 如果需要，可以存储聊天内容
    return { code: 1, data: '提问完成' };
  }

  // 回复，从医生发给用户
  @SubscribeMessage('reply')
  async reply(@MessageBody() createChatDto: CreateChatDto) {
    const to = await this.prisma.user.findFirst({
      where: { id: createChatDto.user },
    });
    const from = await this.prisma.doctor.findFirst({
      where: { id: createChatDto.doctor },
    });

    let toSocketId = ''; // 需要接收消息的客户端的id
    const clients = await this.server.fetchSockets(); // 所有连接的客户端
    ChatsGateway.allClients.forEach((dItem, dKey) => {
      if (dItem.id == to.id) {
        //
        toSocketId = dKey;
      }
    });
    const client = clients.find((item) => item.id == toSocketId); // 接收消息的客户端信息
    client?.emit('reply', {
      from: from.name,
      to: to.nickName ? to.nickName : to.userName,
      doctor: createChatDto.doctor,
      content: createChatDto.content,
      date: Date.now(),
    });

    return { code: 1, data: '回答完成' };
  }
}
