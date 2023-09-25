import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd'

import Section from './components/section'
import { ISection } from './types/section'
import { ICard } from './types/card'

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
): void => {
  const targetSection = sections.find((section) => section.id === sectionId);

  if (targetSection) {
    targetSection.cards.push({
      id: cardId,
      title: cardTitle,
      section_id: sectionId,
    });
  }
};

const reorderCardsInSameSection = (
  sections: ISection[],
  sectionId: number,
  sourceIndex: number,
  destinationIndex: number
): void => {
  const targetSection = sections.find((section) => section.id === sectionId);

  if (targetSection) {
    const reorderedCards: ICard[] = Array.from(targetSection.cards);
    const [movedCard] = reorderedCards.splice(sourceIndex, 1);
    reorderedCards.splice(destinationIndex, 0, movedCard);
    targetSection.cards = reorderedCards;
  }
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
    axios.post('http://localhost:3001/cards', { sectionId, title }).then((response) => {
      addCardToSection(sections, sectionId, response.data.id, response.data.title);
      setSections([...sections]); // Trigger a re-render
    });
  };

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same section
      reorderCardsInSameSection(
        sections,
        Number(source.droppableId),
        source.index,
        destination.index
      );

      const response = await axios.patch(`http://localhost:3001/sections/reorder`, {
        sectionId: Number(source.droppableId),
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
      setSections([response.data]);

    } else {
      // Move card to another section
      const sourceSection = sections.find((sec) => sec.id === Number(source.droppableId));
      const destinationSection = sections.find((sec) => sec.id === Number(destination.droppableId));

      if (sourceSection && destinationSection) {
        const [movedCard] = sourceSection.cards.splice(source.index, 1);
        destinationSection.cards.splice(destination.index, 0, movedCard);

        await axios.patch(`http://localhost:3001/cards/move`, {
          cardId: movedCard.id,
          destinationSectionId: destinationSection.id,
          destinationIndex: destination.index,
        });
      }
    }

    // Trigger a re-render with the modified state
    setSections([...sections]);
  };

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
