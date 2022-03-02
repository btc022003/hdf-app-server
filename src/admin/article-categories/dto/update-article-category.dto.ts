import { PartialType } from '@nestjs/swagger';
import { CreateArticleCategoryDto } from './create-article-category.dto';

export class UpdateArticleCategoryDto extends PartialType(CreateArticleCategoryDto) {}
