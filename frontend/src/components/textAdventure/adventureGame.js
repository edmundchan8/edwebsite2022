import React, { useState } from 'react';

function AdventureGame() {
  const [gameState, setGameState] = useState({
    currentRoom: 'startingRoom',
    inventory: [],
    rooms: {
      startingRoom: {
        description: 'You are in a dark room with a single door to the north.',
        directions: {
          north: 'northRoom',
        },
      },
      northRoom: {
        description: 'You are in a well-lit room with a chest in the corner.',
        directions: {
          south: 'startingRoom',
        },
        items: [
          {
            name: 'key',
            description: 'A rusty old key.',
          },
        ],
      },
    },
  });

  console.log(gameState);

  const handleCommand = (command) => {
    console.log(gameState);
    const { currentRoom, inventory, rooms } = gameState;
    const currentRoomData = rooms[currentRoom];

    // Check if the command is a valid direction
    if (currentRoomData.directions[command]) {
      const nextRoom = currentRoomData.directions[command];
      setGameState({
        ...gameState,
        currentRoom: nextRoom,
      });
    }

    // Check if the command is to pick up an item
    if (command === 'get') {
      if (currentRoomData.items && currentRoomData.items.length > 0) {
        const item = currentRoomData.items[0];
        setGameState({
          ...gameState,
          inventory: [...inventory, item],
          rooms: {
            ...rooms,
            [currentRoom]: {
              ...currentRoomData,
              items: currentRoomData.items.slice(1),
            },
          },
        });
      }
    }
  };

  return (
    <div>
      <h1>Text-Based Adventure Game</h1>
      <p>{gameState.rooms[gameState.currentRoom].description}</p>
      {gameState.rooms[gameState.currentRoom].items && gameState.rooms[gameState.currentRoom].items.length > 0 && (
        <p>There is a {gameState.rooms[gameState.currentRoom].items[0].name} here.</p>
      )}
      <p>What do you want to do?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(e.target.command.value);
          e.target.command.value = '';
        }}
      >
        <input type="text" name="command" />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default AdventureGame;
