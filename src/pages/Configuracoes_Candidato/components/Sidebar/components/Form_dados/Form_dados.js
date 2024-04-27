import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
//import "./form_dados.css";

function Form_dados() {
    const [img, setImg] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };

    return (
        <div className="inputs_editar_dados">
            
            <label id="lbl_img" className="escolher_img">
                {img == null && <FontAwesomeIcon icon={ faUserCircle } size='4x' color='#e87f45' id='img_none' />}
                {img != null && <img id="img_perfilONG" src={img} alt="foto de perfil" className='rounded-full h-16 w-16' />}

                <div className='editar_fotoPerfil'>
                    <FontAwesomeIcon icon={ faCamera } color='white' />
                    <p>Escolha uma foto</p>
                    <input type="file" id="input" name="input" />
                </div>
            </label>

            <input type="text" placeholder="Nome completo" />
            <div className='flex_gap'>
                <input type="text" placeholder="CPF" />
                <input type="text" placeholder="08/06/2000" disabled />
            </div><div className='flex_gap'>
                <select>
                    <option value="">Gênero</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Não-binário</option>
                    <option>Outro</option>
                </select>
                <select>
                    <option value="">Escolaridade</option>
                    <option>Ensino fundamental incompleto</option>
                    <option>Ensino fundamental completo</option>
                    <option>Ensino médio incompleto</option>
                    <option>Ensino médio completo</option>
                    <option>Ensino superior incompleto</option>
                    <option>Ensino superior completo</option>
                </select>
            </div>
            <input type="text" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="Bairro" />
            </div><div className='flex_gap'>
                <input type="text" placeholder="Nome completo da mãe" />
                <input type="text" placeholder="Nome completo do pai (opcional)" />
            </div>
                <input type="text" placeholder="Logradouro" />
            <div className='flex_gap'>
                <input type="text" placeholder="Cidade" />
                <input type="text" placeholder="UF" style={{width: "20%"}} />
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Complemento" />
                <input type="text" placeholder="Nº" style={{width: "20%"}}/>      
            </div>
            <input type="text" placeholder="Telefone de contato" />
            <button className='botao_deletarConta'>DELETAR CONTA</button>
        </div>
  )
}

export default Form_dados