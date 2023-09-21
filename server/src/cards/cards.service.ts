import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from '../entities/Card'
import { Repository } from 'typeorm'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>
  ) {}

  create({ sectionId, title }: { sectionId: number; title: string }): Promise<CardEntity> {
    let card = new CardEntity()
    card.title = title
    card.section_id = sectionId
    return this.cardsRepository.save(card)
  }
}
