import { faPassport } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required(),
    nameMother: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string()
                .min(8, "A senha deve ter no mínimo 8 caracteres")
                .uppercase("A senha deve conter pelo menos uma letra maiúscula")
                .required(),
    CEP: yup.string().required(),
    bairro: yup.string().required(),
    logradouro: yup.string().required(),
    cidade: yup.string().required(),
    uf: yup.string().required(),
    complemento: yup.string().required(),
    numero: yup.string().required(),
    telefone: yup.string().required()
});
