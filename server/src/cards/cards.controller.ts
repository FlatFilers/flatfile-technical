import { Controller, Post, Logger, Patch, Body } from '@nestjs/common';
import { CardEntity } from '../entities/Card';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name);

  constructor(private readonly cardsService: CardsService) {}

  @Post()
  addCard(@Body() card: { sectionId: number; title: string }): Promise<CardEntity> {
    this.logger.log("POST /card")
    return this.cardsService.create(card);
  }

  @Patch('/move')
  moveCard(@Body() data: { cardId: number; destinationSectionId: number; destinationIndex: number }): Promise<void> {
    this.logger.log("PATCH /move")
    this.logger.log(data)
    return this.cardsService.moveCard(data.cardId, data.destinationSectionId, data.destinationIndex);
  }
}