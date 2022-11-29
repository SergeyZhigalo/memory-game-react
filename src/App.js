import {useState} from "react";
import {useMemoryGames} from "./hooks/memoryGame";
import Game from "./components/Game";
import Button from "./components/Button";
import Header from "./components/Header";
import './App.css';

function App() {
  const {
    level,
    blocks,
    missScore,
    size,
    gameClass,
    isModal,
    modalText,
    textButton,
    setBlocks,
    setGameClass,
    setMissScore,
    getGameClass,
    dataField,
    clickBlock,
    activate,
  } = useMemoryGames();

  useState(() => {
    setBlocks(dataField(size));
    setGameClass(getGameClass(size));
    setMissScore(Math.ceil((level+1)/3));
  }, []);

  return (
    <div className="App">
      <Header
        level={level}
        missScore={missScore}
      />
      <Game
        blocks={blocks}
        gameClass={gameClass}
        modal={isModal}
        modalText={modalText}
        clickBlock={clickBlock}
      />
      <Button
        id="startButton"
        text={textButton}
        onClick={activate}
      />
    </div>
  );
}

export default App;