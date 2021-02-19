import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { ReactComponent as Iuser } from "../../../media/icons/user-astronaut-solid.svg";

import "./users.css";
import axios from "axios";
import { toast } from "react-toastify";

function NewUser() {
  const user = JSON.parse(window.localStorage.user);
  let [complements, setComplements] = useState([]);
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`/positions/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setComplements(e.data);
      });
  }, [token]);


  function createUser(data) {
    toast.info('✍️ ya estamos registrando el usuario, por favor espere que se le confirme')

    axios
      .post(
        `/users/new`,
        {
          date_of_birth: data.userData.date_of_birth,
          email: data.userData.email,
          first_name: data.userData.first_name,
          id: data.userData.id,
          national_id: data.userData.national_id,
          number_phone: data.userData.number_phone,
          position: data.userData.position,
          second_name: data.userData.second_name,
          permits: JSON.stringify(data.permits),
          account_status: true,
          password_confirmation: data.userData.password_confirmation,
          password: data.userData.password,
          user_name: data.userData.user_name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((e) => {
       toast.success('El usuario se ha creado correctamente');
      }).catch((e)=>{
        toast.error('El usuario no se ha creado, intentelo mas tarde',{autoClose:false});
      });
  }

  const ifAllPermits = (e) => {
    document.getElementById("orders").checked = !document.getElementById(
      "orders"
    ).checked;
    document.getElementById("items").checked = !document.getElementById("items")
      .checked;
    document.getElementById("coupons").checked = !document.getElementById(
      "coupons"
    ).checked;
    document.getElementById("clients").checked = !document.getElementById(
      "clients"
    ).checked;
    document.getElementById("users").checked = !document.getElementById("users")
      .checked;
    document.getElementById("ads").checked = !document.getElementById("ads")
      .checked;
    document.getElementById("rates").checked = !document.getElementById("rates")
      .checked;
  };

  return (
    <>
      <Nav position={user.position} userName={user.user_name} />
      <Bar />
        <Goback history={history} />
      <div className="base">
      </div>
      <div className="base-update">
        <div className="columns">
          <div className="base-update-data">
            <table className="base-usersUpdate-table">
              <tr>
                <td className="th">Nombre:</td>
                <td>
                  <input id="first_name" type="text" />
                </td>
                <td>
                  <input id="second_name" type="text" />
                </td>
              </tr>
              <tr>
                <td className="th"> Cedula:</td>
                <td>
                  <input id="national_id" type="text" />
                </td>
              </tr>
              <tr>
                <td className="th">Correo:</td>
                <td>
                  <input id="email" type="text" />
                </td>
              </tr>
              <tr>
                <td className="th">Telefono:</td>
                <td>
                  <input id="number_phone" type="text" />
                </td>
              </tr>
              <tr>
                <td className="th">Nombre de usuario:</td>
                <td>
                  <input id="user_name" type="text" />
                </td>
              </tr>
              <tr>
                <td className="th">Fecha de Nacimiento:</td>
                <td>
                  <input id="date_of_birth" type="date" />
                </td>
              </tr>
              <tr>
                <td className="th">Cargo:</td>
                <td>
                  <select id="position">
                    {complements?.map((e, i) => {
                      return (
                        <option key={i} defaultValue={e.name}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="th">contraseña:</td>
                <td>
                  <input id="password" type="password" />
                </td>
              </tr>
              <tr>
                <td className="th">Confirme la contraseña:</td>
                <td>
                  <input id="password_confirmation" type="password" />
                </td>
              </tr>
            </table>
          </div>
          <div className="base-update-img">
            <div className="img-local">
              <div className="img-background">
                <Iuser />
              </div>
            </div>
          </div>
        </div>
        <div className="base-update-modules">
          <center>
            <div>
              <h3>Modulos Disponibles:</h3>
            </div>
            <table className="base-table-permits">
              <tr>
                <td>
                  <label>
                    Todos los Modulos
                    <input
                      id="all_permits"
                      onChange={ifAllPermits}
                      type="checkbox"
                      defaultValue="all"
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label>
                    Gestion de Cupones
                    <input
                      id="coupons"
                      type="checkbox"
                      defaultValue="coupons"
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Gestion de Pedidos
                    <input id="orders" type="checkbox" defaultValue="orders" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label>
                    Administración de Anuncio
                    <input id="ads" type="checkbox" defaultValue="ads" />
                    <span className="checkmark"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Administración de clientes
                    <input
                      id="clients"
                      type="checkbox"
                      defaultValue="clients"
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label>
                    Administración de usuarios del sistema
                    <input id="users" type="checkbox" defaultValue="users" />
                    <span className="checkmark"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Administración de la tasa de cambio
                    <input id="rates" type="checkbox" defaultValue="rates" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label>
                    Administración de Productos
                    <input id="items" type="checkbox" defaultValue="items" />
                    <span className="checkmark"></span>
                  </label>
                </td>
              </tr>
            </table>
            <div className="btn-update">
              <a
                href="#updateuser"
                onClick={(e) => {
                  e.preventDefault()
                  const new_infoUser = {
                    first_name: document.getElementById("first_name").value,
                    second_name: document.getElementById("second_name").value,
                    national_id: document.getElementById("national_id").value,
                    user_name: document.getElementById("user_name").value,
                    password: document.getElementById("password").value,
                    password_confirmation: document.getElementById("password_confirmation").value,
                    email: document.getElementById("email").value,
                    number_phone: document.getElementById("number_phone").value,
                    position: document.getElementById("position").value,
                    date_of_birth: document.getElementById("date_of_birth")
                      .value,
                  };

                  const new_permits = {
                    orders: false,
                    items: false,
                    coupons: false,
                    clients: false,
                    users: false,
                    ads: false,
                    rates: false,
                  };
                  new_permits.orders = document.getElementById(
                    "orders"
                  ).checked;
                  new_permits.items = document.getElementById("items").checked;
                  new_permits.coupons = document.getElementById(
                    "coupons"
                  ).checked;
                  new_permits.clients = document.getElementById(
                    "clients"
                  ).checked;
                  new_permits.users = document.getElementById("users").checked;
                  new_permits.ads = document.getElementById("ads").checked;
                  new_permits.rates = document.getElementById("rates").checked;
                  createUser( {
                    permits: new_permits,
                    userData: new_infoUser,
                  });
                }}
              >
                Crear Usuario
              </a>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default withRouter(NewUser);
