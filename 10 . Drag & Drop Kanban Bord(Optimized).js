import React, { useMemo, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FixedSizeList as List } from "react-window";

const makeData = () => {
  const cols = {};
  const order = [];
  let id = 1;
  for (let c = 0; c < 5; c++) {
    const colId = `col-${c}`;
    order.push(colId);
    cols[colId] = {
      id: colId,
      title: `Column ${c + 1}`,
      cards: Array.from({ length: 10000 }, () => ({
        id: `card-${id}`,
        text: `Card ${id++}`
      }))
    };
  }
  return { columns: cols, columnOrder: order };
};

const Card = React.memo(({ card, provided, style }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      ...style,
      ...provided.draggableProps.style,
      background: "white",
      padding: 8,
      marginBottom: 8,
      borderRadius: 4,
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
    }}
  >
    {card.text}
  </div>
));

const Column = React.memo(({ column }) => (
  <div style={{ width: 250, marginRight: 16, background: "#f4f5f7", padding: 8 }}>
    <h4>{column.title}</h4>
    <Droppable droppableId={column.id} mode="virtual"
      renderClone={(provided, _, rubric) => (
        <Card card={column.cards[rubric.source.index]} provided={provided} />
      )}
    >
      {(provided) => {
        const Row = ({ index, style }) => {
          const card = column.cards[index];
          return (
            <Draggable draggableId={card.id} index={index} key={card.id}>
              {(dragProvided) => (
                <Card card={card} provided={dragProvided} style={style} />
              )}
            </Draggable>
          );
        };
        return (
          <List
            height={500}
            itemCount={column.cards.length}
            itemSize={60}
            width="100%"
            outerRef={provided.innerRef}
          >
            {Row}
          </List>
        );
      }}
    </Droppable>
  </div>
));

export default function App() {
  const [state, setState] = React.useState(() => makeData());

  const onDragEnd = useCallback(({ source, destination }) => {
    if (!destination) return;
    setState((prev) => {
      const srcCol = prev.columns[source.droppableId];
      const destCol = prev.columns[destination.droppableId];
      const srcCards = [...srcCol.cards];
      const [moved] = srcCards.splice(source.index, 1);
      const destCards = [...destCol.cards];
      destCards.splice(destination.index, 0, moved);
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [srcCol.id]: { ...srcCol, cards: srcCards },
          [destCol.id]: { ...destCol, cards: destCards }
        }
      };
    });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", padding: 16, overflowX: "auto" }}>
        {state.columnOrder.map((colId) => (
          <Column key={colId} column={state.columns[colId]} />
        ))}
      </div>
    </DragDropContext>
  );
}