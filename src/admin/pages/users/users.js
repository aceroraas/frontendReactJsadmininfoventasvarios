import "./users.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import Nav from "../../componente/nav/nav";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  let [users, setUsers] = useState([]);
  let user = JSON.parse(window.localStorage.user);
  const history = useHistory();

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
      <Nav position={user.position} userName={user.user_name} />
      <Bar />
      <Goback history={history} />
      <div className="base-users">
        <div className="btn-create-user">
          <Link to="/settings-users/new">CREAR USUARIO</Link>
        </div>
        <hr />
        <center>
          <table className="table-users">
            <thead>
              <tr>
                <th>
                  Usuario
                  <hr />
                </th>
                <th>
                  Cargo
                  <hr />
                </th>
                <th>
                  Ultima Modificación
                  <hr />
                </th>
                <th>
                  Acción
                  <hr />
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      {e.user_name}
                      <hr />
                    </td>
                    <td>
                      {e.position}
                      <hr />
                    </td>
                    <td>
                      {new Date(e.updated_at).toLocaleString()}
                      <hr />
                    </td>
                    <td>
                      <Link to={`/settings-users/${e.id}`}>VER</Link>
                      <hr />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </div>
    </>
  );
}

export default withRouter(Users);
