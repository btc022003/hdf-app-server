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
import {
  CreateChatDto,
  getSocketTypeKey,
  OnLineDoctor,
} from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // private static onLineDoctors: OnLineDoctor[] = [];
  private static onLineDoctors: Map<string, OnLineDoctor> = new Map();

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(socket: Socket) {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
    // ChatWebsocketGateway.participants.set(socketId, '');
    this.broadCastOnLineDoctors();
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`Disconnection... socket id:`, socketId);
    ChatsGateway.onLineDoctors.delete(socketId);
  }

  async broadCastOnLineDoctors() {
    const doctorIds = [];
    ChatsGateway.onLineDoctors.forEach((item) => doctorIds.push(item.doctorId));
    const doctors = await this.prisma.doctor.findMany({
      where: {
        id: {
          in: doctorIds,
        },
      },
    });
    this.server.emit('send_doctor_list', doctors);
  }

  // 获取在线的医生
  // @SubscribeMessage('load_online_doctors')
  // loadOneLineDoctors() {
  //   // 获取在线的医生列表
  //   // 查询数据库，获取在线的医生信息
  //   const doctorIds = [];
  //   ChatsGateway.onLineDoctors.forEach((item) => doctorIds.push(item.doctorId));
  //   return this.prisma.doctor.findMany({
  //     where: {
  //       id: {
  //         in: doctorIds,
  //       },
  //     },
  //   });
  // }

  // 医生上线
  @SubscribeMessage('to_work')
  toWork(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createChatDto: CreateChatDto,
  ) {
    //
    console.log('医生上线, socketId: %s, info: %s', socket.id, createChatDto);
    ChatsGateway.onLineDoctors.set(socket.id, {
      socketId: socket.id,
      doctorId: createChatDto.doctor,
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

    // console.log(1111);

    //
    ChatsGateway.onLineDoctors.get('');
    // 需要优化一下，向单个被提问的人发送消息
    // this.server.fetchSockets().then((d) => {
    //   // console.log(d.find(item => item.id == ));
    // });

    this.server.emit('ask/' + getSocketTypeKey(createChatDto), {
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
    this.server.emit('reply/' + getSocketTypeKey(createChatDto), {
      from: from.name,
      to: to.nickName ? to.nickName : to.userName,
      doctor: createChatDto.doctor,
      content: createChatDto.content,
      date: Date.now(),
    });
    return { code: 1, data: '回答完成' };
  }
}
