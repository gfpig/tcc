import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import "./cadastro_ong_form.css";

function Cadastro_ong_form() {

    const {register, setValue, setError, clearErrors, formState} = useForm();
    const { errors, isSubmitting } = formState;
    //const [erro, setErro] = useState(null);

    const pesquisaCEP = (e) => {
        //if (e.target.value == '') { return; }
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            clearErrors('apiError');
            document.getElementById("alerta_cep").style.display = "none"
            setValue('logradouro', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'
            setValue('logradouro', '');
            setValue('bairro', '');
            setValue('cidade', '');
            setValue('uf', '');
            //limpaCampos;
        });
    }

  return (
    <>
    <div className="container_inputs">
        <div className="inputs_esquerda">
            <input type="text"  placeholder="Nome da entidade" required />
            <input type="text" placeholder="CNPJ" required />
            <input type="email" placeholder="E-mail" required />
            <div className='flex_gap'>
                <input type="password" placeholder="Senha" required />
                <input type="password" placeholder="Confirmar senha" required />
            </div>
            <div className='flex_gap'>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias" required>
                    <option value="">Categoria</option>
                </select>
            </div>
        </div>
        <div className="inputs_direita">
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" onBlur={pesquisaCEP} required />
                <input type="text" {...register("bairro")} placeholder="Bairro" disabled />
            </div>

            {/*MENSAGEM DE ERRO CASO O CEP NÃO SEJA ENCONTRADO / SEJA INSERIDA UMA INFORMAÇÃO QUALQUER */}
            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep" style={{display: "none"}}>{errors.apiError?.message}</div>}
            
            <input type="text" {...register("logradouro")} placeholder="Logradouro" disabled />
            <div className='flex_gap'>
                <input type="text" {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} disabled />
                <input type="text" {...register("uf")} placeholder="UF" style={{width:"50px"}} disabled />
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Complemento" style={{width:"100%"}} />
                <input type="text" placeholder="Nº" style={{width:"50px"}} required />      
            </div>
            <input type="text" placeholder="Telefone de contato" required />
        </div>    
    </div>
    <div className='botao_cadastro'>
        <button className="btn_finalizarCadastro">Finalizar Cadastro</button>
    </div>
    </>    
  )
}

export default Cadastro_ong_form