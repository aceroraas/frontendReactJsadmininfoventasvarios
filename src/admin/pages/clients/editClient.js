import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { ReactComponent as Iusuario } from "../../../media/icons/user-astronaut-solid.svg";
import "./clients.css";

function DataEditClient({ client }) {
  const token = window.localStorage.getItem("token");
  const [data, setData] = useState(client);
  return (
    <>
      <div className="base-client">
        <div className="base-client-top">
          <div className="base-client-letf">
            <div className="client-info">
              <table>
                <thead>
                  <tr>
                    <td className="text-primary">
                      {client.account_type ? "Empresa:" : "Nombre y Apellido:"}
                    </td>
                    <td className="text-secundary">
                      <input
                        id="first_name"
                        type="text"
                        size={client.first_name.length > 30 ?? 30}
                        defaultValue={client.first_name}
                        onInput={(e) => {
                          e.preventDefault();
                          setData({ ...data, first_name: e.target.value });
                        }}
                      />
                      <input
                        id="last_name"
                        type="text"
                        size={client.second_name.length > 30 ?? 30}
                        defaultValue={client.second_name}
                        onInput={(e) => {
                          e.preventDefault();
                          setData({ ...data, second_name: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">
                      {client.account_type ? "Rif:" : "Cedula:"}
                    </td>
                    <td className="text-secundary">
                      <input
                        type="text"
                        size={client.national_id > 11 ?? 12}
                        defaultValue={client.national_id}
                        onInput={(e) => {
                          e.preventDefault();
                          setData({ ...data, national_id: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Correo:</td>
                    <td className="text-secundary">{client.email}</td>
                  </tr>
                  <tr>
                    <td className="text-primary">Telefono:</td>
                    <td className="text-secundary">
                      <input
                        type="text"
                        defaultValue={client.number_phone}
                        size="16"
                        onInput={(e) => {
                          e.preventDefault();
                          setData({ ...data, number_phone: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Usuario:</td>
                    <td className="text-secundary">{client.user_name}</td>
                  </tr>
                  <tr>
                    <td className="text-primary">Dirección:</td>
                    <td className="text-secundary">
                      <input
                        type="text"
                        maxLength="190"
                        size={client.location.length}
                        defaultValue={client.location}
                        onInput={(e) => {
                          e.preventDefault();
                          setData({ ...data, location: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">
                      {client.account_type
                        ? "Aniversario Empresa:"
                        : "Fecha de Nacimiento:"}
                    </td>
                    <td className="text-secundary">
                      <input
                        type="date"
                        defaultValue={
                          client.date_of_birth_or_celebration_company
                        }
                        onInput={(e) => {
                          e.preventDefault();
                          setData({
                            ...data,
                            date_of_birth_or_celebration_company:
                              e.target.value,
                          });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                  <td className="text-primary">
                      <br/>
                      Tipo de Cuenta:
                    </td>
                    <td className='client-buttons'>
                    <br/>
                      <Link className='primary text-white'
                        onClick={(e) => {
                          e.preventDefault();
                          let a = !client.account_type;
                          console.log(a);
                          client.account_type= a;
                          setData({
                            ...data,
                            account_type: a
                          });
                        }}
                        to="#type"
                      >
                        {client.account_type ? "Empresa" : "Persona"}
                      </Link>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="base-client-right">
            <center>
              <div className="img-background ">
                <div className="img">
                  <Iusuario />
                </div>
              </div>
            </center>
          </div>
        </div>
        <hr />
        <center className="client-buttons">
          <Link
            className="secundary text-white "
            onClick={(e) => {
                e.preventDefault();
                toast.info("✍️ Modificando");
                let a = {data};
                console.log(a.data);
              axios
                .put("/clients/update",a.data, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((e) => {
                  toast.success("👍 Actualizado Exitosamente");
                  //window.location = `/clients/edit/${id}`;
                });
            }}
            to="#e"
          >
            Actualizar
          </Link>
        </center>
      </div>
    </>
  );
}

function EditClient() {
  const token = window.localStorage.getItem("token");
  const history = useHistory();
  const [dclient, setDclient] = useState({});
  const { id } = useParams();

  useEffect(() => {
    toast.info("🧐 Confirmando datos", { autoClose: 2500 });
    axios
      .get(`/clients/find/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setDclient(e.data);
        if (Object.keys(e.data).length === 0) {
          document.getElementById("info-page").innerText =
            "Este Cliente no existe";
          toast.error("🤷‍♂️ Cliente no existe");
        } else {
          toast.success("😎 Cliente Preparado");
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          toast.error(
            `🤦‍♂️ aff, ha ocurrido un error al pedir los datos del cliente`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        } else if (e.request) {
          toast.error(
            `💔, el servidor no me responde, ¿tienes internet? ¿y si lo intentas mas tarde?`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        } else {
          toast.error(
            `💔😰, a nooooo, ¿tienes internet? el navegador me dijo esto: ,${e.message}`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        }
      });
  }, [id, token]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback history={history} />
      {Object.keys(dclient).length !== 0 ? (
        <DataEditClient client={dclient} />
      ) : (
        <h1 id="info-page">Cargando datos</h1>
      )}
    </>
  );
}

export default withRouter(EditClient);
