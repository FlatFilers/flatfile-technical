import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd'

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
const addCardToSection = (
  sections: ISection[],
  sectionId: number,
  cardId: number,
  cardTitle: string
): ISection[] => {
  const sectionsClone: ISection[] = [...sections];
  const targetSection = sectionsClone.find((section) => section.id === sectionId);

  if (targetSection) {
    targetSection.cards.push({
      id: cardId,
      title: cardTitle,
      section_id: sectionId,
    });
  }

  return sectionsClone;
};

function App() {
  const [sections, setSections] = useState<ISection[]>([])
  // add state var to remember sections and set order of sections

  useEffect(() => {
    // Refresh section order after every render
    axios.get('http://localhost:3001/sections').then((response) => {
      // Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: ISection, b: ISection) => a.id - b.id)
      setSections(sortedSections)
    })
  })

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title },
    }).then((response) => {
      const updatedSections = addCardToSection(
        sections,
        sectionId,
        response.data.id,
        response.data.title
      );
      setSections(updatedSections);
    });
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same section
      const section = sections.find((sec) => sec.id === Number(source.droppableId))
      if (section) {
        const reorderedCards = Array.from(section.cards)
        const [movedCard] = reorderedCards.splice(source.index, 1)
        reorderedCards.splice(destination.index, 0, movedCard)
        section.cards = reorderedCards

        // Update state with new card order
        const newSections: ISection[] = sections.map((sec) =>
          sec.id === section.id ? section : sec
        )
        setSections(newSections)

        // Send a request to update the backend
      }
    } else {
      // Move card to another section
      const sourceSection = sections.find((sec) => sec.id === Number(source.droppableId));
      const destinationSection = sections.find((sec) => sec.id === Number(destination.droppableId));

      if (sourceSection && destinationSection) {
        const [movedCard] = sourceSection.cards.splice(source.index, 1);

        const updatedSections = addCardToSection(
          sections,
          destinationSection.id,
          movedCard.id,
          movedCard.title
        );

        setSections(updatedSections);

        // Send a request to update the backend
      }
    };
  }

  const renderDroppableSection = (provided: DroppableProvided, section: ISection, onCardSubmit: Function) => {
    return (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        <Section section={section} onCardSubmit={onCardSubmit} />
        {provided.placeholder}
      </div>
    );
  };

  const renderBoard = (sections: ISection[], onCardSubmit: Function) => {
    return sections.map((section: ISection) => (
      <Droppable droppableId={String(section.id)} key={section.id}>
        {(provided) => renderDroppableSection(provided, section, onCardSubmit)}
      </Droppable>
    ));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <BoardContainer>
        {renderBoard(sections, onCardSubmit)}
      </BoardContainer>
    </DragDropContext>
  );
}
export default App
