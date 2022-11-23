export default function Block({ gameClass, position, id}){
    return (
      <div
        className={`Block ${gameClass}`}
        onClick={()=>{console.log(position, id)}}
        id={id}
      >
      </div>
    )
}