import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import "./cadastro_ong_form.css";
import { clear } from '@testing-library/user-event/dist/clear';

function Cadastro_ong_form() {

    const {register, setValue, setError, clearErrors, reset, formState} = useForm();
    const { errors, isSubmitting } = formState;
    //const [erro, setErro] = useState(null);

    const pesquisaCEP = (e) => {
        if (e.target.value == '') { return; }
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            return res.json();
            //reset()
            //clearErrors('errors.apiError')
            //console.log(res)
            //setError('apiError', null);
        })
        .then(data => {
            //console.log(data);
            //setError(null);
            clearErrors('apiError');
            document.getElementById("alerta_cep").style.display = "none" 
            //console.log(errors.apiError?.message, '- vindo do data');
            setValue('logradouro', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            //console.log(errors.apiError?.message, '- vindo do erro');
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'
            setValue('logradouro', '');
            setValue('bairro', '');
            setValue('cidade', '');
            setValue('uf', '');
        });
    }

  return (
    <>
    <div className="container_inputs">
        <div className="inputs_esquerda">
            <input type="text"  placeholder="Nome da entidade" />
            <input type="text" placeholder="CNPJ" />
            <input type="email" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
            </div>
            <div className='flex_gap'>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias">
                    <option value="">Categoria</option>
                </select>
            </div>
        </div>
        <div className="inputs_direita">
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" onBlur={pesquisaCEP} />
                <input type="text" {...register("bairro")} placeholder="Bairro" disabled />
            </div>

            {/*MENSAGEM DE ERRO CASO O CEP NÃO SEJA ENCONTRADO / SEJA INSERIDA UMA INFORMAÇÃO QUALQUER */}
            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep">{errors.apiError?.message}</div>}
            


            <input type="text" {...register("logradouro")} placeholder="Logradouro" disabled />
            <div className='flex_gap'>
                <input type="text" {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} disabled />
                <input type="text" {...register("uf")} placeholder="UF" style={{width:"50px"}} disabled />
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Complemento" style={{width:"100%"}} />
                <input type="text" placeholder="Nº" style={{width:"50px"}} />      
            </div>
            <input type="text" placeholder="Telefone de contato" />
        </div>    
    </div>
    <div className='botao_cadastro'>
        <button className="btn_finalizarCadastro">Finalizar Cadastro</button>
    </div>

    {/*errors.apiError ?
        (
            //document.getElementById("alerta_cep").style.display = 'block'
            console.log(errors.apiError?.message)
        ) 
        : (
            //document.getElementById("alerta_cep").style.display = "none" 
            console.log("sem erros")
        )
        //09572470
    */}
    </>    
  )
}

export default Cadastro_ong_form