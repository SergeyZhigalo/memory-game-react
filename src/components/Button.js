export default function Button({ id, text, onClick }){
  return (
      <div
        id={id}
        className="Button"
        onClick={onClick}
      >
        { text }
      </div>
    )
}