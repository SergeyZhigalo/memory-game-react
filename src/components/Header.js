export default function Header({ level, missScore }){
  return (
    <header className="Header">
      <div>Memory game</div>
      <div>Уровень {level}</div>
      <div>Оставшиеся промахи: {missScore} </div>
    </header>
  )
}