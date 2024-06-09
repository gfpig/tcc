import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import './timeline_sobre.css'
import Timeline from './components/Timeline/Timeline';
import Sobre from './components/Sobre/Sobre';
import { LocationProvider } from '../../../../components/Context';

function Timeline_Sobre() {
  const opcoes = [<Timeline />, <Sobre />];
  const [opcaoAtual, setOpcaoAtual] = useState(0);
  const location = useLocation();
  //const instituicao = location.state

  return (
    <>
      <LocationProvider>
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
      </LocationProvider>
    </>
  )
}

export default Timeline_Sobre