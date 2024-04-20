import React, {useState} from 'react'
import './timeline_sobre.css'
import Timeline from './components/Timeline/Timeline';
import Sobre from './components/Sobre/Sobre';

function Timeline_Sobre() {
    const opcoes = [<Timeline />, <Sobre />];
    const [opcaoAtual, setOpcaoAtual] = useState(0);
  return (
    <>
        <div className='timeline_sobre' style={{display: "flex", width: "150px", justifyContent:"space-between"}}>
            <button className={`${opcaoAtual === 0 && 'opcao_selecionada'}`} onClick={() => {
              setOpcaoAtual(0);
            }}>TIMELINE</button>
            <button className={`${opcaoAtual === 1 && 'opcao_selecionada'}`} onClick={() => {
              setOpcaoAtual(1);
            }}>SOBRE</button>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
           {opcoes[opcaoAtual]}
        </div>
    </>
  )
}

export default Timeline_Sobre