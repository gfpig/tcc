import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faHandHoldingHeart, faCamera } from '@fortawesome/free-solid-svg-icons';
import "./form_dados.css";

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

            <input type="text" placeholder="Nome da entidade" required />
            <input type="text" placeholder="CNPJ" required />
            <input type="email" placeholder="E-mail" required />
            <input type='text' placeholder='Site da instituição' required />
            <div className='flex_gap'>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias" required>
                    <option value="">Categoria</option>
                </select>
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" required />
                <input type="text" placeholder="Bairro" />
            </div>
                <input type="text" placeholder="Logradouro" />
            <div className='flex_gap'>
                <input type="text" placeholder="Cidade" />
                <input type="text" placeholder="UF" style={{width: "20%"}} />
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Complemento" />
                <input type="text" placeholder="Nº" style={{width: "20%"}} required />      
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Telefone de contato" required />
                <input type="text" placeholder='WhatsApp' />
            </div>
            <textarea className='digitar_descricao' placeholder="Descrição sobre a instituição" />
            <button className='botao_deletarConta'>DELETAR CONTA</button>
        </div>
    )   
}

export default Form_dados