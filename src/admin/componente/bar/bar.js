import "./bar.css";
import { ReactComponent as Iexit } from "../../../media/icons/sign-out-alt-solid.svg";
import { ReactComponent as Isearch } from "../../../media/icons/search-solid.svg";
import { ReactComponent as Isettings } from "../../../media/icons/cog-solid.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Bar() {
  const [user, setUser] = useState(false)
  useEffect(() => {
    if (window.localStorage.user) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);
  return (
    <>
      <div className="bar-base">
        <div className="bar-icons">
          <div className="icon-exit">
            <NavLink to="/search">
              <Isearch />
            </NavLink>
          </div>
          {user? user.permits.users?  (
            <div className="icon-exit">
              <NavLink to="/settings">
                <Isettings />
              </NavLink>
            </div>
          ) : (
            ""
          ):""}
          <div className="icon-exit">
            <NavLink to="/logout">
              <Iexit />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default Bar;
