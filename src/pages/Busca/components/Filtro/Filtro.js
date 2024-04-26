import React, {useState} from 'react'; 
//import Select from "react-select";
//import {Multiselect} from 'multiselect-react-dropdown'; 
import './filtros.css'

function Filtro() {
    const estados = [
        {value: 'São Paulo', label: 'São Paulo'},
        {value: 'Rio de Janeiro', label: 'Rio de Janeiro'},
        {value: 'Minas Gerais', label: 'Minas Gerais'},
        {value: 'Espírito Santo', label: 'Espírito Santo'}
    ]

    {/*const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption);
    }*/}

    const [opcoes] = useState(estados);
  return (
    <div className='barra_filtros'>
        {/*
        <Multiselect options={opcoes} displayValue={"Estado"} className="multiselect" />
        <select>
            <option>Estado</option>
            <option>
                <span>
                    <input type="checkbox" id="vagas" />
                    <label for="vagas">São Paulo</label>
                </span>
            </option>
            <option>
                <span>
                    <input type="checkbox" id="vagas" />
                    <label for="vagas">Rio de Janeiro</label>
                </span>
            </option>
        </select>*/}
        <select>
            <option>Estado</option>
            <option>Espírito Santo</option>
            <option>Minas Gerais</option>
            <option>Rio de Janeiro</option>
            <option>São Paulo</option>  
        </select>
        <select>
            <option>Cidade</option>
        </select>
        <select>
            <option>Bairro</option>
        </select>
        <select>
            <option>Categoria</option>
        </select>
        <span>
            <input type="checkbox" id="vagas" />
            <label for="vagas">Vagas Abertas</label>
        </span>
    </div>
  )
}

export default Filtro