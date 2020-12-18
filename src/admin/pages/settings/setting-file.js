import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { ReactComponent as Ifiledown } from "../../../media/icons/file-download-solid.svg";
import { ReactComponent as Ifileup } from "../../../media/icons/file-upload-solid.svg";
import "./setting.css";

function Sfile() {
  const refe = useRef(null);
  const token = window.localStorage.getItem("token");

  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base-sett">
        <div className="subba">
          <div className="ba">
            <Link to="#">
              <div className="btncard primary text-white">
                <Ifiledown />
              </div>
            </Link>
          </div>
          <div className="ba">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                refe.current.click();
              }}
            >
              <div className="btncard primary text-white">
                <Ifileup />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="application/pdf"
        ref={refe}
        style={{ visibility: "hidden" }}
      />
    </>
  );
}

export default withRouter(Sfile);
