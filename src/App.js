import {useState} from "react";
import Game from "./components/Game";
import './App.css';
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  // уровень
  const [level, setLevel] = useState(1);
  // размер поля (size*size)
  const [size, setSize] = useState(2);
  // промахи
  const [missScore, setMissScore] = useState(0);
  // массив блоков
  const [blocks, setBlocks] = useState([]);
  // класс для поля
  const [gameClass, setGameClass] = useState('');
  // массив с активными блоками
  const [activeBlock, setActiveBlock] = useState([]);
  // массив с открытыми блоками
  const [openBlock, setOpenBlock] = useState([]);
  // индикатор начала игры (false - игра началась)
  const [isActivate, setIsActivate] = useState(true);
  // индикатор видимости модального окна
  const [isModal, setIsModal] = useState(true);
  // текст модального окна
  const [modalText, setModalText] = useState(`Memory Game`);
  // текст модального кнопки
  const [textButton, setTextButton] = useState('Н А Ч А Т Ь');

  // создает игровое поле
  function dataField(n){
    let newBlocks = [];
    let id = 1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++, id++){
        newBlocks.push({
          id: id,
          position: [i, j],
        });
      }
    }
    return newBlocks
  }

  // добвляет класс к блокам
  function getGameClass(n){
    // eslint-disable-next-line default-case
    switch (n) {
      case 2:
        return 'block2';
      case 3:
        return 'block3';
      case 4:
        return 'block4';
      case 5:
        return 'block5';
    }
  }

  // генерирует случайную последовательность блоков
  function startGame(level){
    let fieldSize = size * size
    let res = []
    while (res.length < level){
      let rand = Math.floor(Math.random() * fieldSize) + 1;
      if (!res.includes(rand)){
        res.push(rand)
      }
    }
    setActiveBlock(res)
    startSequence(res)
  }

  // проигрывает последовательность блоков
  function startSequence(n){
    let i = 0, j = 0
    let time = setInterval(() => {
      if (i % 2 === 0){
        document.getElementById(n[j]).style.backgroundColor = 'red';
      }else{
        document.getElementById(n[j]).style.backgroundColor = 'grey';
        j++
      }
      i+=1
    }, 500);
    setTimeout(() => {clearInterval(time)}, 1000 * n.length)
  }

  // запускает игру
  function activate(){
    if (isActivate){
      document.getElementById("startButton").style.backgroundColor = 'grey';
      setIsModal(true)
      setModalText(`Уровень ${level}`);
      setTimeout(() => {
        setModalText(``);
        startGame(level)
        setIsActivate(false)
        setTimeout(() => {
          setIsModal(false)
        }, 1000 * level)
      }, 1000);
    }
  }

  // обрабатывает клик по блоку
  function clickBlock(id){
    if (activeBlock.includes(id)){
      document.getElementById(id).style.backgroundColor = 'green';
      setOpenBlock([...openBlock, id])
      if (activeBlock.sort().toString() === [...openBlock, id].sort().toString()){
        nextLevel()
      }
    }else{
      if (missScore-1 < 0){
        restartLevel()
      }else{
        setMissScore(missScore-1)
      }
      document.getElementById(id).style.backgroundColor = 'red';
      setTimeout(() => {
        document.getElementById(id).style.backgroundColor = 'grey';
      }, 500)
    }
  }

  function restartLevel(){
    activeBlock.map((item) => document.getElementById(item).style.backgroundColor = 'grey')
    setIsModal(true)
    setModalText(`Вы допустили слишком много ошибок`);
    setTextButton(`ПЕРЕЗАПУСТИТЬ`);
    setOpenBlock([])
    setMissScore(Math.ceil((level)/3));
    document.getElementById("startButton").style.backgroundColor = 'green';
    setIsActivate(true)
  }

  function nextLevel(){
    activeBlock.map((item) => document.getElementById(item).style.backgroundColor = 'grey')
    setIsModal(true)
    setModalText(`Уровень ${level + 1}`);
    setTextButton(`Н А Ч А Т Ь`);
    setOpenBlock([])
    setMissScore(Math.ceil((level+1)/3));
    if ((level+1) < 8 && (level+1) % 2 === 1 ){
      setBlocks(dataField(size+1));
      setGameClass(getGameClass(size+1));
      setSize(size+1);
    }
    document.getElementById("startButton").style.backgroundColor = 'green';
    setLevel(level + 1)
    setIsActivate(true)
  }

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