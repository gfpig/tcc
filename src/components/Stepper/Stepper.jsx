import React, { useState } from 'react';
import "./stepper.css";

/* ICONS */
import search from '../../assets/icons/search.png';
import select from '../../assets/icons/select.png';
import info from '../../assets/icons/info.png';
import apply from '../../assets/icons/apply.png';
import done from '../../assets/icons/done.png';

const Stepper = () => {
    const steps = ["Cadastro", "Pesquisar", "Ver detalhes", "Candidatar-se", "Tudo Pronto!"];
    const descriptions = ["O primeiro passo é efetuar o cadastro na nossa plataforma. Preencha seus dados de acordo com o que é pedido",
                        "Depois, você pesquisa uma ONG de acordo com o que desejar. É possível utilizar nossos filtros para te ajuda a encontrar a ideal para você ;)",
                        "Caso se interesse por uma ONG, é possível ver mais informações sobre ela. Cada uma deixa à disposição suas informações de contato e possui uma timeline pública para publicar suas atividades.",
                        "Quando encontrar a ONG certa para você, é só clicar no botão 'Candidatar-se' e preencher o formulário de cadastro. Vale lembrar que esse formulário é válido apenas para esta ONG.",
                        "Agora é só esperar a resposta! Você pode acompanhar o andamento no seu perfil, na aba de solicitações!"];
    const icons = [search, select, info, apply, done];
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
        <div className="flex justify-between">
            {steps?.map((step, i) => (
                <div key={i} className={`step-item ${currentStep === i + 1 && "active"}`}>
                    <div className='step' onClick={() => {
                        setCurrentStep(i + 1);
                    }}>
                        <img src={icons[i]} alt={icons[i]} />
                    </div>
                    <p className="text-gray-500">{step}</p>
                </div>
            ))}  
        </div>
        <div className='card'>
            <p className="font-semibold">{steps[currentStep - 1]}</p>
            <p>{descriptions[currentStep - 1]}</p>
        </div>
        </>
    );
};

export default Stepper;