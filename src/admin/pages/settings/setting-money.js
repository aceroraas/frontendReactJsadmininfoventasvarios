import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./setting.css";


function Money() {
  const [confmoney, setConfmoney] = useState({});
  const history=useHistory()
  const token = window.localStorage.getItem("token");
  useEffect(() => {
      axios
      .get("/conf/money", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setConfmoney(e.data);
      });
  },[token]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base-sett">
        <div className="inputs">
          <table>
            <thead>
              <tr>
                <th>SIMBOLO DE DIVISA:</th>
                <th>
                  <input id='divisa' type="text" defaultValue={confmoney.currency_symbol} />
                </th>
              </tr>
              <tr>
                <th> SIMBOLO DE MONEDA NACIONAL :</th>
                <th>
                  <input id='national' type="text" defaultValue={confmoney.national_currency_symbol}/>
                </th>
              </tr>
              <tr>
                <th>TASA DE CAMBIO:</th>
                <th>
                  <input id='rate' type="number" defaultValue={confmoney.rates}/>
                </th>
              </tr>
              <tr>
                <th>IVA:</th>
                <th>
                  <input id='iva' type="number" defaultValue={confmoney.iva1} />%
                </th>
              </tr>
            </thead>
          </table>
          <br />
          <Link
            onClick={(e) => {
              e.preventDefault();
              const data ={
                iva1 : document.getElementById('iva').value,
                rates: document.getElementById('rate').value,
                national_currency_symbol: document.getElementById('national').value,
                currency_symbol: document.getElementById('divisa').value
              }
              axios.post('/conf/money',data,{headers:{Authorization:`Bearer ${token}`}}).then((e)=>{
                toast.success('Actualizado Correctamente');
                history.go(0);
            });
            }}
            className="btn secundary text-white"
          >
            APLICAR CAMBIOS
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Money);
