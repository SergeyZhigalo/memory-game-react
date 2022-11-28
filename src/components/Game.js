import {useEffect, useState} from "react";
import Block from "./Block";
import Button from "./Button";
import Modal from "./Modal";

export default function Game({ blocks, gameClass, modal, modalText, clickBlock }){

  return (
    <div className='Game'>
      {modal && <Modal text={modalText} />}
      {
        blocks.map((block, index) => {
          return <Block
            key={index}
            id={block.id}
            gameClass={gameClass}
            position={block.position}
            clickBlock={clickBlock}
          />
        })
      }
    </div>
  )
}