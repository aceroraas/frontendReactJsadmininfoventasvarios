import "./users.css";
import { Link, withRouter } from "react-router-dom";
import Nav from "../../componente/nav/nav";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Loading from "../../componente/load/loading";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function Users() {
  let [users, setUsers] = useState(false);
  useEffect(() => {
    const getAllUsers = axios.get("users/all", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    getAllUsers.then((e) => setUsers(e.data)).catch((e) => setUsers());
  }, []);
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <div className="btn-create-user">
          <Link to="/settings-users/new">CREAR USUARIO</Link>
        </div>
        <hr />
        {users ? (
          <div className="base-detail">
            <div>
              <table className="table-users">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Cargo</th>
                    <th>Ultima Modificación</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.user_name}</td>
                        <td>{e.position}</td>
                        <td>{new Date(e.updated_at).toLocaleString()}</td>
                        <td>
                          <Link to={`/settings-users/${e.id}`}>VER</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default withRouter(Users);
