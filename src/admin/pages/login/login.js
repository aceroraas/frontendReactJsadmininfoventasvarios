import React from "react";

import "./login.css";
import imagotipo from "../../../media/logos/imagotipo.svg";
import { Redirect } from "react-router-dom";
import { ReactComponent as Ipassword } from "../../../media/icons/key-solid.svg";
import { ReactComponent as Iuser } from "../../../media/icons/user-astronaut-solid.svg";
import axios from "axios";
import { toast } from "react-toastify";

function checkLogin(e, history) {
  e.preventDefault();
  toast.info("Verificando");
  let btn = document.getElementsByClassName("input-btn");
  let inputUser = document.getElementById("user");
  let inputPass = document.getElementById("pass");
  btn[0].children[0].text = "Verificando...";
  btn[0].children[0].style.backgroundColor = "#ec6f18";
  let data = {
    user_name: inputUser.value,
    password: inputPass.value,
  };
  axios
    .post("/auth/login", data)
    .then((response) => {
      let time = new Date();
      time.setSeconds(response.data.token_expire*1000);
      window.localStorage.setItem("expire",  time.getHours());
      btn[0].children[0].innerText = "EXCELENTE";
      window.localStorage.setItem("token", response.data.token);
      window.location = "/inicio";
    })
    .catch((e) => {
      if (e.response && e.response.status === 401) {
        btn[0].children[0].style.backgroundColor = "orange";
        btn[0].children[0].text = "INISIAR SESIÓN";
        inputUser.style.borderColor = "red";
        inputPass.style.borderColor = "red";
        toast.warning(`🤦‍♂️ aff, el usuario y la contraseña son incorrectos`, {
          autoClose: false,
          closeOnClick: true,
          draggable: true,
        });
      } else if (e.response && e.response.status === 400) {
        btn[0].children[0].style.backgroundColor = "orange";
        btn[0].children[0].text = "INICIAR SESIÓN";
        if (e.response.data.password) {
          inputPass.style.borderColor = "red";
        }
        if (e.response.data.user_name) {
          inputUser.style.borderColor = "red";
        }
        if (e.response.data.message) {
          toast.warning(e.response.data.message);
        }
        if (e.response.data.response) {
          toast.warning(e.response.data.response);
        }
        toast.warning(
          `🤦‍♂️ aff, te falto algo, en los campos de usuario y contraseña`,
          {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
          }
        );
      } else if (e.request) {
        btn[0].children[0].style.backgroundColor = "red";
        btn[0].children[0].text = "INTENTELO MAS TARDE";
        toast.error(
          `💔, el servidor no me responde, ¿tienes internet? ¿y si lo intentas mas tarde?`,
          {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
          }
        );
      } else {
        btn[0].children[0].style.backgroundColor = "red";
        btn[0].children[0].text = "INTENTELO MAS TARDE";
        toast.error(
          `😰, a nooooo, tengo un error inesperado, Error: ,${e.message}`,
          {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
          }
        );
      }
    });

  btn[0].children[0].text = "INICIAR SESIÓN";
  btn[0].children[0].style.backgroundColor = "#266f94";
}

function Login() {
  if (window.localStorage.getItem("token")) {
    return <Redirect to="/inicio" />;
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
            <button
              className="btn primary text-white"
              onClick={(e) => {
                checkLogin(e);
                e.target.innerText = "VERIFICANDO";
              }}
            >
              INICIAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
