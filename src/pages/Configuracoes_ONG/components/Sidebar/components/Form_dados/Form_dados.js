import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faHandHoldingHeart, faCamera } from '@fortawesome/free-solid-svg-icons';
import "./form_dados.css";
import foto from './images/ffff.jpg'

function Form_dados() {
    const [img, setImg] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };

    return (
        <div className="inputs_editar_dados">

            <label id="lbl_img" className="escolher_img">
                {img == null && <FontAwesomeIcon icon={ faHandHoldingHeart } size='4x' color='#e87f45' id='img_none' />}
                {img != null && <img id="img_perfilONG" src={img} alt="foto de perfil" className='rounded-full h-16 w-16' />}
                <div className='editar_fotoPerfil'>
                    <FontAwesomeIcon icon={ faCamera } color='white' />
                    <p>Escolha uma foto</p>
                    <input type="file" id="input" name="input_imagem" onChange={onImageChange} />
                </div>
            </label>

            <input type="text" placeholder="Nome da entidade" />
            <input type="text" placeholder="CNPJ" />
            <input type="email" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
            </div>
            <input type='text' placeholder='Site da instituição' />
            <div className='flex_gap'>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias">
                    <option value="">Categoria</option>
                </select>
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="Bairro" />
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
            <div className='flex_gap'>
                <input type="text" placeholder="Telefone de contato" />
                <input type="text" placeholder='WhatsApp' />
            </div>
            <textarea className='digitar_descricao' placeholder="Digite seu post" />
            <button className='botao_deletarConta'>DELETAR CONTA</button>
        </div>
    )   
}

export default Form_dados