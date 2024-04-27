import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faHandHoldingHeart, faCamera } from '@fortawesome/free-solid-svg-icons';
import "./form_dados.css";
import foto from './images/ffff.jpg'

function Form_dados() {
  return (
        <div className="inputs_editar_dados">

            <label id="lbl_img" className="escolher_img">
                <FontAwesomeIcon icon={ faHandHoldingHeart } size='4x' color='#e87f45' />
                <div className='editar_fotoPerfil'>
                    <FontAwesomeIcon icon={ faCamera } color='white' />
                    <img id="img_ponto" src={foto} alt="foto de perfil" />
                    <p>Escolha uma foto</p>
                    <input type="file" id="input" name="input_imagem" />
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

            {/*<script>
            {
                if (window.FileList && window.File && window.FileReader) {
                    const output = document.getElementById('img_ponto');
                    document.getElementById('input').addEventListener('change', event => {
                        output.src = '';
                        const file = event.target.files[0];
                        if (!file.type) {
                            return;
                        }
                        if (!file.type.match('image.*')) {
                            return;
                        }
                        const reader = new FileReader();
                        reader.addEventListener('load', event => {
                            output.src = event.target.result;
                        });
                        reader.readAsDataURL(file);
                    }); 
                }
            }
            </script>*/}
        </div>
  )  
}

function getSrc() {
    var img = document.getElementById('img_ponto'); 
    img.getAttribute("src");
    return img;
}

export default Form_dados