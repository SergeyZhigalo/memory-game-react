export default function Block({ gameClass, position, id, clickBlock }){
    return (
      <div
        className={`Block ${gameClass}`}
        onClick={()=>{clickBlock(id)}}
        id={id}
      >
      </div>
    )
}