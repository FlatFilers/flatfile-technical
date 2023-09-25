import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from '../entities/Card';
import { Repository } from 'typeorm';
import { SectionEntity } from '../entities/Section';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardsRepository: Repository<CardEntity>,
    @InjectRepository(SectionEntity)
    private readonly sectionsRepository: Repository<SectionEntity>
  ) {}

  create({ sectionId, title }: { sectionId: number; title: string }): Promise<CardEntity> {
    let card = new CardEntity();
    card.title = title;
    card.section_id = sectionId;
    card.order_index = 0;
    return this.cardsRepository.save(card);
  }

  async moveCard(cardId: number, destinationSectionId: number, destinationIndex: number): Promise<void> {
    // Fetch the card and destination section.
    const card = await this.cardsRepository.findOne(cardId);
    const destinationSection = await this.sectionsRepository.findOne(destinationSectionId, { relations: ['cards'] });

    if (!card || !destinationSection) {
      throw new Error(`Card or Section not found`);
    }

    // Update the card's section_id.
    card.section_id = destinationSectionId;

    // Reorder the cards in the destination section.
    destinationSection.cards.splice(destinationIndex, 0, card);

    // Save changes to the card and section.
    await this.cardsRepository.save(card);
    await this.sectionsRepository.save(destinationSection);
  }
}
