import Axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
const AxiosConfig = {
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
};
function ListPositions() {
  const [listp, setListp] = useState([]);
  useEffect(() => {
    geter(setListp);
    const btnde = document.getElementById("btneliminarp");
    const selectde = document.getElementById("seliminar");
    btnde.addEventListener("click", (e) => {
      e.preventDefault();
      deleteP(selectde.value, setListp);
    });
  }, []);
  return (
    <>
      <div className="seliminarp">
        <select id="seliminar">
          {listp?.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <button
          id="btneliminarp"
          style={{ cursor: "pointer" }}
          className="btn red text-white"
        >
          Eliminar
        </button>
      </div>
    </>
  );
}

async function deleteP(id, seter) {
  await Axios.delete(`/positions/delete/${id}`, AxiosConfig)
    .then((e) => {
      toast.success("se ha eliminado con exito");
      seter(e.data);
    })
    .catch(() => {
      toast.error("no se ha podido eliminar");
    });
}

async function save(data, history) {
  await Axios.post(`/positions/new`, data, AxiosConfig)
    .then(() => {
      toast.success("se ha Guardado con exito");
      history.go(0);
    })
    .catch((e) => {
      toast.error("no se ha podido Guardar");
    });
}

async function geter(seter) {
  await Axios.get(`/positions/all`, AxiosConfig)
    .then((e) => {
      toast.success("Puestos Cargados");
      seter(e.data);
    })
    .catch(() => {
      toast.error("no se ha podido Comunicar con el servidor");
    });
}

function CreateP() {
  const history = useHistory();
  useEffect(() => {
    const btnup = document.getElementById("btnpositionnew");
    const inputp = document.getElementById("position");
    btnup.addEventListener("click", (e) => {
      e.preventDefault();
      if (inputp.value.length > 1) {
        let data = {
          name: inputp.value,
        };
        toast.info("enviando datos");
        save(data, history);
      }
    });
  }, []);
  return (
    <>
      <div>
        <input
          type="text"
          size="30"
          placeholder="Escriba el nombre del puesto"
          id="position"
        />
        <button
          id="btnpositionnew"
          style={{ cursor: "pointer" }}
          className="btn secundary text-white"
        >
          Crear
        </button>
      </div>
    </>
  );
}

function Position() {
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <h3>Puestos de trabajo</h3>
        <br />
        <CreateP />
        <br />
        <ListPositions />
      </div>
    </>
  );
}

export default withRouter(Position);
