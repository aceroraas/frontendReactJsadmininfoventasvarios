import { useHistory, withRouter } from "react-router-dom";
import "./coupons.css";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { useRef } from "react";

function DetailsCoupon() {
  const usuario = useRef();
  const articulo = useRef();
  const categoria = useRef();
  return (
    <>
      <div className="base-details">
        <div className="couponinputs inputs">
          <div className="cinput">
            <input
              type="radio"
              name="checktype"
              id="rusuario"
              onChange={(e) => {
                if (e.target.checked) {
                  usuario.current.style.display = "block";
                  categoria.current.style.display = "none";
                  articulo.current.style.display = "none";
                }
              }}
            />
            <label>USUARIO</label>
          </div>
          <div className="cinput">
            <input
              type="radio"
              name="checktype"
              id="rarticulo"
              onChange={(e) => {
                if (e.target.checked) {
                  articulo.current.style.display = "block";
                  usuario.current.style.display = "none";
                  categoria.current.style.display = "none";
                }
              }}
            />
            <label>Articulo</label>
          </div>
          <div className="cinput">
            <input
              type="radio"
              name="checktype"
              id="rtypecategory"
              onChange={(e) => {
                if (e.target.checked) {
                  categoria.current.style.display = "block";
                  usuario.current.style.display = "none";
                  articulo.current.style.display = "none";
                }
              }}
            />
            <label>CATEGORIA</label>
          </div>
          <div className="cinput">
            <input
              type="radio"
              name="checktype"
              id="rnone"
              onChange={(e) => {
                if (e.target.checked) {
                  categoria.current.style.display = "none";
                  usuario.current.style.display = "none";
                  articulo.current.style.display = "none";
                }
              }}
            />
            <label>Ninguna</label>
          </div>
        </div>
        <hr />
        <div className="couponinputs inputs">
          <div className="cinput">
            <div ref={usuario} className="cinput" style={{ display: "none" }}>
              <label>
                Escriba la cedula o rif del usuario:
                <br />
              </label>
              <input type="text" style={{ width: "350px" }}></input>
            </div>
          </div>
          <div className="cinput">
            <div ref={articulo} className="cinput" style={{ display: "none" }}>
              <label>
                El nombre o codigo del articulo:
                <br />
              </label>
              <input type="text" style={{ width: "350px" }}></input>
            </div>
          </div>
          <div className="cinput">
            <div ref={categoria} className="cinput" style={{ display: "none" }}>
              <label>
                Selecione el tipo de rango en categoria que desea:
                <br />
              </label>
              <select>
                <option>POR CATEGORIA</option>
                <option>POR SUBCATEGORIA</option>
                <option>POR FAMILIA</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InputCounpon() {
  return (
    <>
      <div className="couponinputs inputs">
        <div className="cinput">
          <label>Codigo de cupón:</label>
          <br />
          <input type="text"></input>
        </div>
        <div className="cinput">
          <label>Fecha de expiración:</label>
          <br />
          <input type="date"></input>
        </div>
        <div className="cinput">
          <label>Descuento: %</label>
          <br />
          <input type="number"></input>
        </div>
      </div>
    </>
  );
}

function TableCoupons() {
  return (
    <>
      <div className="couponinputs">
        <div className="basetable">
          <table className="catalogo-table">
            <thead>
              <tr>
                <th>CODIGO DE CUPÓN</th>
                <th>DESCUENTO</th>
                <th>FECHA DE EXPIRACIÓN</th>
                <th>META DATA</th>
                <th>ACCION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>f</td>
                <td>f</td>
                <td>f</td>
                <td>f</td>
                <td>f</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Coupons() {
  //const user = JSON.parse(window.localStorage.user);
  //const token = window.localStorage.getItem("token");
  //const history = useHistory();
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <InputCounpon />
        <hr />
        <DetailsCoupon />
        <center>
          <button>CREAR DESCUENTO</button>
        </center>
        <hr />
        <TableCoupons />
      </div>
    </>
  );
}
export default withRouter(Coupons);
