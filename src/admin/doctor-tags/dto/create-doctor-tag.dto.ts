import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDoctorTagDto {
  @ApiProperty({
    description: '名字',
  })
  @IsNotEmpty()
  name: string;
}
