import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import { ISection } from './types/section'

import './App.css'

export const BoardContainer = styled.div`
  background-color: rgb(49, 121, 186);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  position: absolute;
  padding: 5px;
  align-items: flex-start;
`

function App() {
  const [sections, setSections] = useState<ISection[]>([])

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: ISection, b: ISection) => a.id - b.id)
      setSections(sortedSections)
    })
  })

  const onCardSubmit = (ISectiond: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { ISectiond, title }
    }).then((response) => {
      let sectionsClone: ISection[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: ISection = sectionsClone[i]
        if (section.id == ISectiond) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: ISectiond
          })
          setSections(sectionsClone)
        }
      }
    })
  }

  return (
    <BoardContainer>
      {sections.map((section: ISection) => {
        return <Section section={section} onCardSubmit={onCardSubmit}></Section>
      })}
    </BoardContainer>
  )
}

export default App
