import React, {useState} from 'react'; 
import {Multiselect} from 'multiselect-react-dropdown'; 
import './filtros.css'

function Filtro() {
    const estados = [
        {Estado: 'São Paulo', id: 1},
        {Estado: 'Rio de Janeiro', id: 2},
        {Estado: 'Minas Gerais', id: 3},
        {Estado: 'Espírito Santo', id: 4}
    ]

    const [opcoes] = useState(estados);
  return (
    <div className='barra_filtros'>
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