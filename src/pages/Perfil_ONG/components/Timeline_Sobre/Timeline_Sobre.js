import React from 'react'
import Timeline from './components/Timeline/Timeline';

function Timeline_Sobre() {
    const opcoes = [<Timeline />];
  return (
    <>
        <div style={{display: "flex", width: "150px", justifyContent:"space-between"}}>
            <button>TIMELINE</button>
            <button>SOBRE</button>
        </div>
        <Timeline />
    </>
  )
}

export default Timeline_Sobre