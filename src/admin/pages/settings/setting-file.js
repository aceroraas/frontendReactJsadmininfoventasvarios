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

function Catalogos({ data, seTer }) {
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("catalogo/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        seTer(e.data);
      });
  }, [seTer, token]);
  return (
    <>
      <div className="basetable">
        <table className="catalogo-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>FECHA DE SUBIDA</th>
              <th>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 ? (
              data.map((e) => {
                const teid = e.id;
                return (
                  <tr key={teid}>
                    <td>
                      <a href={e.urlcatalogo}>{e.name}</a>
                    </td>
                    <td>{new Date(e.updated_at).toLocaleString()}</td>
                    <td>
                      <Link
                      className='btn red'
                      style={{color:'white'}}
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          axios
                            .delete(`catalogo/delete/${teid}`, {
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((e) => {
                             seTer(e.data);
                            });
                        }}
                      >Eliminar</Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Sfile() {
  const refe = useRef(null);
  const progressbAR = useRef();
  const progdiv = useRef();
  const btn = useRef();
  const h2 = useRef();
  const h3 = useRef();
  const [list, setList] = useState([]);
  const token = window.localStorage.getItem("token");
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const [link,setLink] =useState();
  const history = useHistory();

  useEffect(()=>{
    axios.get('catalogo/download').then((e)=>{
      setLink(e.data.link);
    })
  },[]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base-sett">
        <div className="subba">
          <div className="ba">
            <a href={link}>
              <div className="btncard primary text-white">
                <Ifiledown />
              </div>
            </a>
          </div>
          <div className="ba">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                refe.current.click();
                progdiv
                  ? (progdiv.current.style.visibility = "visible")
                  : console.log("f");
                progressbAR.current.value = 0;
                h3.current.innerText = "0%";
                h2.current.style.visibility = "hidden";
                progressbAR.current.style.visibility = "visible";
                btn.current.style.visibility = "visible";
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
        onClick={(e) => {
          setTimeout(() => {
            if (e.target.value === "") {
              toast.info("Operación Cancelada No se ha encontrado nada");
              progdiv.current.style.visibility = "hidden";
              e.target.value = "";
              progressbAR.current.value = 0;
              h3.current.innerText = "0%";
              h2.current.style.visibility = "hidden";
              history.go(0);
            }
          }, 180000);
        }}
        onInputCapture={(e) => {
          let data = new FormData();
          progdiv.current.style.visibility = "visible";
          data.append("file", refe.current.files[0]);
          let allowedExtensions = /(.pdf|.PDF)$/i;
          if (!allowedExtensions.exec(refe.current.value)) {
            toast.warning("solo se puede subir archivos PDF.");
            refe.current.value = "";
            return false;
          } else {
            axios
              .post("catalogo/upload", data, {
                headers: { Authorization: `Bearer ${token}` },
                onUploadProgress: function (progressEvent) {
                  progressbAR.current.value = 0;
                  h3.current.innerText = "0%";
                  let percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  progressbAR.current.value = percentCompleted;
                  h3.current.innerText = `${percentCompleted}%`;
                },
                cancelToken: source.token,
              })
              .then((e) => {
                setList(e.data);
                progressbAR.current.style.visibility = "hidden";
                btn.current.style.visibility = "hidden";
                h2.current.style.visibility = "visible";
                h2.current.style.color = "green";
              })
              .catch((e) => {
                history.go(0)
              });
          }
        }}
      />
      <center>
        <div ref={progdiv} style={{ visibility: "hidden" }}>
          <h3 ref={h3}>0%</h3>
          <progress
            ref={progressbAR}
            value="0"
            max="100"
            style={{ width: "40%", height: "40px" }}
          ></progress>
          <br />
          <div
            ref={btn}
            className="btn red white"
            style={{ marginLeft: "0px" }}
          >
            <Link
              style={{ color: "white" }}
              to="#"
              onClick={(e) => {
                source.cancel();
                progressbAR.current.value = 0;
                h3.current.innerText = "0%";
                progdiv.current.style.visibility = "hidden";
                refe.current.value = "";
                toast.warning("Operación Cancelada por el usuario");
              }}
            >
              Cancelar
            </Link>
          </div>
          <h2 ref={h2} style={{ visibility: "hidden" }}>
            Genial Se ha subido exitosamente
          </h2>
        </div>
        <Catalogos data={list} seTer={setList} />
      </center>
    </>
  );
}

export default withRouter(Sfile);
