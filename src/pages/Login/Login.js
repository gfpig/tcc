import React from "react";
import Menu from "../../components/Menu/Menu";
import Form_login from "../../components/Login_form/Form_login";
import Login_cadastrar from "../../components/Login_cadastrar/Login_cadastrar";

const Login = () => {
    return (
        
        <>
            <Menu />
            <div style={{display:"flex", height:"100%"}}>
            <Login_cadastrar />
            <Form_login />

            </div>
        </>
    )
}

export default Login;