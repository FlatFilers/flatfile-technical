import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CardEntity } from './Card'

@Entity({ name: 'sections' })
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => CardEntity, (card) => card.section)
  @JoinColumn({ referencedColumnName: 'section_id' })
  cards: CardEntity[]
}
