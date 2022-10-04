import { PartialType } from '@nestjs/swagger';
import { CreateShopCartDto } from './create-shop-cart.dto';

export class UpdateShopCartDto extends PartialType(CreateShopCartDto) {}
