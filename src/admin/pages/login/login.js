import React, { useEffect } from 'react';

import "./login.css";
import imagotipo from "../../../media/logos/imagotipo.svg";
import { Link, Redirect } from "react-router-dom";
import { ReactComponent as Ipassword } from "../../../media/icons/key-solid.svg";
import { ReactComponent as Iuser } from "../../../media/icons/user-astronaut-solid.svg";
import axios from "axios";

 function checkLogin(e) {
  e.preventDefault();
  let btn = document.getElementsByClassName("input-btn");
  let inputUser = document.getElementsByClassName("input-user")[0].children[2];
  let inputPass = document.getElementsByClassName("input-password")[0].children[2];
  btn[0].children[0].text = "Verificando...";
  btn[0].children[0].style.backgroundColor = "#ec6f18";
  let data = {
    user: document.getElementById("user").value,
    password: document.getElementById("pass").value,
  };
    axios
   .post(
     "/auth/login",
       {
         user_name: data.user,
         password: data.password,
       },
       )
       .then((response) => {
         btn[0].children[0].text = "EXCELENTE...";
         btn[0].children[0].style.backgroundColor = "#266f94";
 
         window.localStorage.token = response.data.token;
         window.localStorage.permits = JSON.stringify(response.data.permits);
         window.localStorage.expire = response.data.token_expire;
         window.location = "/inicio";
       })
       .catch((error) => {
         btn[0].children[0].style.backgroundColor = "red";
         btn[0].children[0].text = "NOP...";
         alert('esta direccion ip no pertenece al entorno de desarrollo');
  });
        /* alert(
          "error para el programador: " + error.response.data.message ||
          error.response.data.response
        );
        switch (error.response.status) {
          case 401:
            alert("usuario o contraseña incorrecto");
            inputUser.style.borderColor='red';
            inputPass.style.borderColor='red';
            break;
            case 400:
              inputPass.style.borderColor='red';
              alert(
                "tienes un problema en los campos de usuarios o contraseña. \n Toma en cuenta que: \n *Ambos Campos requeridos \n *Deben ser mayor a 6 digitos"
          );
          break;

        default:
          alert(
            "error para el programador: " + error.response.data.message ||
            error.response.data.response
          );
          break;
      } */
  btn[0].children[0].text = "INICIAR SESIÓN";
  btn[0].children[0].style.backgroundColor = "#266f94";

}

function Login(){

  if(window.localStorage.getItem('token')){
    return <Redirect to='/inicio' />
  }
  return (
    <>
      <div className="login-base">
        <div className="login-logo">
          <img height="72" src={imagotipo} alt="info ventas varios logos" />
          <p>Bienvenido al sistema, ingresa tu usuario y contraseña</p>
        </div>
        <div className="login-input-base">
          <div className="login-input">
            <div className="input-user">
              <label>
                <Iuser />
                usuario
              </label>
              <br />
              <input id="user" type="text"></input>
            </div>
            <div className="input-password">
              <label>
                <Ipassword />
                contraseña
              </label>
              <br />
              <input id="pass" type="password"></input>
            </div>
          </div>
          <div className="input-btn">
            <Link to="#a" onClick={checkLogin}>
              INICIAR SESIÓN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
