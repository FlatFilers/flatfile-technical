import { ICard } from './card'

export interface ISection {
  id: number
  title: string
  cards: ICard[]
}
