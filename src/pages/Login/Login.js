import React from "react";
import Menu_ from '../../components/Menu_/Menu_'
import Form_login from "../../components/Login_form/Form_login";
import Login_cadastrar from "../../components/Login_cadastrar/Login_cadastrar";

const Login = () => {
    return (
        
        <>
            <Menu_ />
            <div style={{display:"flex", height:"100%"}}>
                <Login_cadastrar />
                <Form_login />
            </div>
        </>
    )
}

export default Login;