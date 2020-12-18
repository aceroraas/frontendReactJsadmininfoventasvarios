import { useHistory, useParams, withRouter } from "react-router-dom";
import "./users.css";
import { ReactComponent as Iuser } from "../../../media/icons/user-astronaut-solid.svg";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserDatas({ userd, complements }) {
  const token = window.localStorage.getItem("token");
  let cargos = complements;

  const UpdateUser = (e, data) => {
    const token = window.localStorage.getItem("token");
    e.preventDefault();
    toast.info('✍️ ya estamos actualizando datos, por favor espere que se le confirme')
    axios
      .put(
        "/auth/update",
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
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((e) => {
        toast.success("Datos Actualizados Exitosamente");
        window.location = "/settings-users";
      })
      .catch((e) => console.log(e));
  };

  const deleteUser = (e, id) => {
    e.preventDefault();
    axios
      .delete(`users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        toast.info("el usuario ha sido eliminado",{autoClose:false});
      })
      .catch((e) => toast.error("no se ha podido elminar, intentelo mas tarde",{autoClose:false}));
  };

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

  if (userd.permits) {
    return (
      <>
        <div className="base-update">
          <div className="columns">
            <div className="base-update-data">
              <table className="base-usersUpdate-table">
                <tr>
                  <td className="th">Nombre:</td>
                  <td>
                    <input
                      id="first_name"
                      type="text"
                      defaultValue={userd.first_name}
                    />
                  </td>
                  <td>
                    <input
                      id="second_name"
                      type="text"
                      defaultValue={userd.second_name}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="th"> Cedula:</td>
                  <td>
                    <input
                      id="national_id"
                      type="text"
                      defaultValue={userd.national_id}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="th">Correo:</td>
                  <td>
                    <input id="email" type="text" defaultValue={userd.email} />
                  </td>
                </tr>
                <tr>
                  <td className="th">Telefono:</td>
                  <td>
                    <input
                      id="number_phone"
                      type="text"
                      defaultValue={userd.number_phone}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="th">Nombre de usuario:</td>
                  <td>{userd.user_name}</td>
                </tr>
                <tr>
                  <td className="th">Fecha de Nacimiento:</td>
                  <td>
                    <input
                      id="date_of_birth"
                      type="date"
                      defaultValue={userd.date_of_birth}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="th">Cargo:</td>
                  <td>
                    <select id="position">
                      <option defaultChecked>{userd.position}</option>
                      {cargos?.map((e, i) => {
                        return (
                          <option key={i} defaultValue={e.name}>
                            {e.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* <a href="#a">+</a> */}
                  </td>
                </tr>
              </table>
            </div>
            <div className="base-update-img">
              <div className="img-local">
                <div className="img-background">
                  <Iuser />
                </div>
                <div className="img-btn">
                  <a
                    className="delete"
                    href="#deleteuser"
                    onClick={(e) => {
                      deleteUser(e, userd.id);
                    }}
                  >
                    ELIMINAR
                  </a>
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
                        defaultChecked={userd.permits.coupons ?? false}
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
                      <input
                        id="orders"
                        type="checkbox"
                        defaultChecked={userd.permits.orders ?? false}
                        defaultValue="orders"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <label>
                      Administración de Anuncio
                      <input
                        id="ads"
                        type="checkbox"
                        defaultChecked={userd.permits.ads ?? false}
                        defaultValue="ads"
                      />
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
                        defaultChecked={userd.permits.clients ?? false}
                        defaultValue="clients"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <label>
                      Administración de usuarios del sistema
                      <input
                        id="users"
                        type="checkbox"
                        defaultChecked={userd.permits.users ?? false}
                        defaultValue="users"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      Administración de la tasa de cambio
                      <input
                        id="rates"
                        type="checkbox"
                        defaultChecked={userd.permits.rates ?? false}
                        defaultValue="rates"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <label>
                      Administración de Productos
                      <input
                        id="items"
                        type="checkbox"
                        defaultChecked={userd.permits.items ?? false}
                        defaultValue="items"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
              </table>
              <div className="btn-update">
                <a
                  href="#updateuser"
                  onClick={(e) => {
                    const new_infoUser = {
                      first_name: document.getElementById("first_name").value,
                      second_name: document.getElementById("second_name").value,
                      national_id: document.getElementById("national_id").value,
                      email: document.getElementById("email").value,
                      number_phone: document.getElementById("number_phone")
                        .value,
                      position: document.getElementById("position").value,
                      id: userd.id,
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
                    new_permits.items = document.getElementById(
                      "items"
                    ).checked;
                    new_permits.coupons = document.getElementById(
                      "coupons"
                    ).checked;
                    new_permits.clients = document.getElementById(
                      "clients"
                    ).checked;
                    new_permits.users = document.getElementById(
                      "users"
                    ).checked;
                    new_permits.ads = document.getElementById("ads").checked;
                    new_permits.rates = document.getElementById(
                      "rates"
                    ).checked;
                    UpdateUser(e, {
                      permits: new_permits,
                      userData: new_infoUser,
                    });
                  }}
                >
                  Actualizar datos y permisos
                </a>
              </div>
            </center>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <center>
          <h2>Cargando datos.</h2>
        </center>
      </>
    );
  }
}

function ErrorMessage({ error }) {
  let message;
  switch (error.response) {
    case 404:
      message = "Este usuario no existe";
      break;
    case 400:
      message = "Ha ocurrido un error o no hemos entendio tu petición";
      break;
    default:
      message = "UPS ALGO HA SALIDO MAL POR FAVOR INTENTELO MAS TARDE";
      break;
  }

  return (
    <>
      <center>
        <div>
          <h2>{message}</h2>
        </div>
      </center>
    </>
  );
}

function UpdateUsers() {
  const [userUpdate, setUserUpdate] = useState({});
  const [complements, setComplements] = useState([{}]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get(`/users/find/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setUserUpdate(e.data);
      })
      .catch((e) => {
        if (e.response !== undefined) {
          if (e.response.status === 404) {
            setUserUpdate({ response: 404 });
          } else if (e.response.status === 400) {
            setUserUpdate({ response: 400, message: e.response.data.response });
          }
        }
      });

    axios
      .get(`/positions/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setComplements(e.data);
      })
      .catch((e) => {
        console.log(e);
        setComplements([{ name: "cargando" }]);
      });
  }, [id]);
  return (
    <>
      <Nav />
      <Bar />
        <Goback history={history} />
      <div className="base-users">
        {userUpdate.response ? (
          <ErrorMessage error={userUpdate} />
        ) : (
          <UserDatas userd={userUpdate} complements={complements} />
        )}
      </div>
    </>
  );
}
export default withRouter(UpdateUsers);
