import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionEntity } from '../entities/Section';
import { CardEntity } from '../entities/Card';

@Injectable()
export class SectionsService {
  private readonly logger = new Logger(SectionsService.name);

  constructor(
    @InjectRepository(SectionEntity)
    private sectionsRepository: Repository<SectionEntity>,
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) { }

  async findAll(): Promise<SectionEntity[]> {
    return this.sectionsRepository.find({ relations: ['cards'] });
  }
  async reorderCards(sectionId: number, sourceIndex: number, destinationIndex: number): Promise<SectionEntity> {
    const section = await this.sectionsRepository.findOne({ where: { id: sectionId }, relations: ['cards'] });

    if (!section || !section.cards) return;

    // Reorder the cards in-memory
    const [movedCard] = section.cards.splice(sourceIndex, 1);
    section.cards.splice(destinationIndex, 0, movedCard);

    // Update the order_index in the database
    for (let i = 0; i < section.cards.length; i++) {
      const card = section.cards[i];
      card.order_index = i;
      await this.cardsRepository.save(card);
    }

    return await this.sectionsRepository.findOne({ where: { id: sectionId }, relations: ['cards'] });
  }
}
