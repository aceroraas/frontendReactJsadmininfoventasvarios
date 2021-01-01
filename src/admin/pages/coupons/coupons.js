import { useHistory, withRouter } from "react-router-dom";
import "./coupons.css";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Axios from "axios";
import ReactDOM from 'react-dom';
const AxiosConfig = {
  headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}` },
};

function getcopupons(setTer) {
  Axios.get("coupons/all", AxiosConfig)
    .then((e) => {
      setTer(e.data);
    })
    .catch((e) => {
      console.log(e);
      if (e.response) {
      } else {
        toast.error(
          "Problemas al conectarnos al servidor, verifica tu internet"
        );
      }
    });
}

function sendandgetcoupons(data) {
  toast.info("creando cupon");
  Axios.post("coupons/create", data, AxiosConfig)
    .then(() => {
      const el=document.querySelector('.maintable');
      ReactDOM.unmountComponentAtNode(el);
      ReactDOM.render(<TableCoupons/>,el);
      toast.success("cupon " + data.code + " creado");
    })
    .catch((e) => {
      if(e.response && e.response.status){
        if(e.response.status === 400){
          if(e.response.data){
            if(e.response.data.code){
              toast.warning("El cupon ya existe");
            }
            else if(e.response.data.expire){
              toast.warning('la fecha de expiración es importante');
            }else if(e.response.data.discount){
              toast.warning('el valor de descuento es importante');

            }

          }
        }
        if(e.response.status === 401){
          toast.warning("Usted No tiene permisos para realizar esta accion");
        }
      }else{
        toast.error("ha ocurrido un error");
      }
    });
}

function deletecoupons(id, setTer) {
  Axios.delete(`coupons/delete/${id}`, AxiosConfig)
    .then((e) => {
      setTer(e.data);
    })
    .catch((e) => {
      console.log(e);
      if (e.response) {
      } else {
        toast.error(
          "Problemas al conectarnos al servidor, verifica tu internet"
        );
      }
    });
}

function DetailsCoupon() {
  const usuario = useRef();
  const articulo = useRef();
  const categoria = useRef();
  const [itemsdata, setItemsData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [selectFamily, setSelectFamily] = useState([]);

  useEffect(() => {
    Axios.get("clients/all", AxiosConfig).then((e) => {
      setUserData(e.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("aitems/all", AxiosConfig).then((e) => {
      setItemsData(e.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("categories/all", AxiosConfig).then((e) => {
      setSelectCategory(e.data);
    });

    Axios.get("categories/allsub", AxiosConfig).then((e) => {
      setSelectSubCategory(e.data);
    });
    Axios.get("categories/allfam", AxiosConfig).then((e) => {
      setSelectFamily(e.data);
    });
  }, []);

  useEffect(() => {
    const selectMain = document.getElementById("idcategorytype");
    selectMain.addEventListener("click", () => {
      const sEnd = document.getElementById("mainEndSelect");
      if (selectMain.value === "category") {
        if (sEnd) sEnd.remove();
        const selectEnd = document.createElement("select");
        selectEnd.setAttribute("id", "mainEndSelect");
        selectCategory.forEach((category) => {
          const option = document.createElement("option");
          option.setAttribute("id", category.id);
          option.setAttribute("value", category.category_name);
          option.innerText = category.category_name;
          selectEnd.appendChild(option);
        });
        selectMain.parentNode.appendChild(selectEnd);
      } else if (selectMain.value === "subcategory") {
        if (sEnd) sEnd.remove();
        const selectEnd = document.createElement("select");
        selectEnd.setAttribute("id", "mainEndSelect");
        selectSubCategory.forEach((category) => {
          const option = document.createElement("option");
          option.setAttribute("id", category.id);
          option.setAttribute("value", category.sub_name);
          option.innerText = category.sub_name;
          selectEnd.appendChild(option);
        });
        selectMain.parentNode.appendChild(selectEnd);
      } else if (selectMain.value === "family") {
        if (sEnd) sEnd.remove();
        const selectEnd = document.createElement("select");
        selectEnd.setAttribute("id", "mainEndSelect");
        selectFamily.forEach((category) => {
          const option = document.createElement("option");
          option.setAttribute("id", category.id);
          option.setAttribute("value", category.family);
          option.innerText = category.family;
          selectEnd.appendChild(option);
        });
        selectMain.parentNode.appendChild(selectEnd);
      }
    });
  }, [selectCategory, selectFamily, selectSubCategory]);

  useEffect(() => {
    let indexfocus = -1;
    function autoUser(data) {
      const inputuser = document.getElementById("idUser");
      inputuser.addEventListener("input", () => {
        const nid = inputuser.value;
        if (!nid) return false;
        closeList();
        //lista
        const userdiv = document.createElement("div");
        userdiv.setAttribute("id", inputuser.id + "-user");
        userdiv.setAttribute("class", "listAutoItems");
        inputuser.parentNode.appendChild(userdiv);

        //resutado
        if (data.length === 0) return false;
        data.forEach((user) => {
          if (user.national_id.substr(0, nid.length) === nid) {
            const list = document.createElement("div");
            list.innerHTML = `<strong>${user.national_id.substr(
              0,
              nid.length
            )}</strong>${user.national_id.substr(nid.length)} ${
              user.first_name
            } ${user.second_name}`;
            list.setAttribute("id", user.national_id);
            list.addEventListener("click", () => {
              inputuser.value = list.id;
              closeList();
              return false;
            });
            userdiv.appendChild(list);
          }
        });
      });
      inputuser.addEventListener("keydown", (e) => {
        const list = document.getElementById(inputuser.id + "-user");
        let items;
        if (list) {
          items = list.querySelectorAll("div");
          switch (e.key) {
            case "ArrowDown":
              indexfocus++;
              if (indexfocus > items.length - 1) indexfocus = items.length - 1;
              break;
            case "ArrowUp":
              indexfocus--;
              if (indexfocus < 0) indexfocus = 0;
              break;
            case "Enter":
              e.preventDefault();
              items[indexfocus].click();
              indexfocus = -1;
              break;
            default:
              break;
          }
          selected(items, indexfocus);
          return false;
        }
      });

      document.addEventListener("click", () => {
        closeList();
      });
    }

    function autoItems(data) {
      const inputItem = document.getElementById("idArticulo");
      inputItem.addEventListener("input", () => {
        const nid = inputItem.value;
        if (!nid) return false;
        closeList();
        //lista
        const itemdiv = document.createElement("div");
        itemdiv.setAttribute("id", inputItem.id + "-user");
        itemdiv.setAttribute("class", "listAutoItems");
        inputItem.parentNode.appendChild(itemdiv);

        //resutado
        if (data.length === 0) return false;
        data.forEach((item) => {
          if (item.code.substr(0, nid.length) === nid) {
            const list = document.createElement("div");
            list.innerHTML = `<strong>${item.code.substr(
              0,
              nid.length
            )}</strong>${item.code.substr(nid.length)} ${item.title}`;
            list.setAttribute("id", item.code);
            list.addEventListener("click", () => {
              inputItem.value = list.id;
              closeList();
              return false;
            });
            itemdiv.appendChild(list);
          } else if (item.title.substr(0, nid.length) === nid) {
            const list = document.createElement("div");
            list.innerHTML = `${item.code} <strong>${item.title.substr(
              0,
              nid.length
            )}</strong>${item.title.substr(nid.length)}`;
            list.setAttribute("id", item.code);
            list.addEventListener("click", () => {
              inputItem.value = list.id;
              closeList();
              return false;
            });
            itemdiv.appendChild(list);
          }
        });
      });
      inputItem.addEventListener("keydown", (e) => {
        const list = document.getElementById(inputItem.id + "-user");
        let items;
        if (list) {
          items = list.querySelectorAll("div");
          switch (e.key) {
            case "ArrowDown":
              indexfocus++;
              if (indexfocus > items.length - 1) indexfocus = items.length - 1;
              break;
            case "ArrowUp":
              indexfocus--;
              if (indexfocus < 0) indexfocus = 0;
              break;
            case "Enter":
              e.preventDefault();
              items[indexfocus].click();
              indexfocus = -1;
              break;
            default:
              break;
          }
          selected(items, indexfocus);
          return false;
        }
      });

      document.addEventListener("click", () => {
        closeList();
      });
    }

    function closeList() {
      const list = document.querySelectorAll(".listAutoItems");
      list.forEach((item) => {
        item.parentNode.removeChild(item);
      });
      indexfocus = -1;
    }

    function selected(items, indexfocus) {
      if (!items || indexfocus === -1) return false;
      items.forEach((x) => {
        x.classList.remove("autocomplete-active");
      });
      items[indexfocus].classList.add("autocomplete-active");
    }

    autoUser(userdata);
    autoItems(itemsdata);
  }, [userdata, itemsdata]);
  return (
    <>
      <div className="base-details">
        <div className="couponinputs inputs">
          <div className="cinput">
            <input
              type="radio"
              name="checktype"
              id="rusuario"
              value="idUser"
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
          <div className="cinput ">
            <input
              type="radio"
              name="checktype"
              id="rarticulo"
              value="idArticulo"
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
              value="idcategorytype"
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
              value="none"
              defaultChecked
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
              <div className="autocomplete">
                <input id="idUser" autoComplete="off" type="text" />
              </div>
            </div>
          </div>
          <div className="cinput">
            <div ref={articulo} className="cinput" style={{ display: "none" }}>
              <label>
                El nombre o codigo del articulo:
                <br />
              </label>
              <div className="autocomplete">
                <input id="idArticulo" autoComplete="off" type="text" />
              </div>
            </div>
          </div>
          <div className="cinput">
            <div ref={categoria} className="cinput" style={{ display: "none" }}>
              <label>
                Selecione el tipo de rango en categoria que desea:
                <br />
              </label>
              <div className="selects">
                <select id="idcategorytype">
                  <option value="category">POR CATEGORIA</option>
                  <option value="subcategory">POR SUBCATEGORIA</option>
                  <option value="family">POR FAMILIA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InputCounpon() {
  const Icode = useRef();
  return (
    <>
      <div className="couponinputs inputs">
        <div className="cinput">
          <label>Codigo de cupón:</label>
          <br />
          <input
            ref={Icode}
            id="icode"
            type="text"
            onKeyUp={(e) => {
              e.target.value = e.target.value.replace(/\s+/g, "").trim();
            }}
          />
        </div>
        <div className="cinput">
          <label>Fecha de expiración:</label>
          <br />
          <input id="iexpire" type="date" />
        </div>
        <div className="cinput">
          <label>Descuento: %</label>
          <br />
          <input id="idiscount" type="number" />
        </div>
      </div>
    </>
  );
}

function TableCoupons() {
  const [table, setTable] = useState([]);
  useEffect(() => {
    getcopupons(setTable);
  }, []);
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
              {table?.map((e) => {
                const id = e.id;
                return (
                  <tr key={id} style={{ textAlign: "center" }}>
                    <td>{e.code}</td>
                    <td>{e.discount}%</td>
                    <td>{e.expire}</td>
                    <td>
                      {e.userid ? `Usuario: ${e.userid}` : ""}
                      {e.itemid ? `Producto: ${e.itemid}` : ""}
                      {e.categorytype
                        ? e.categorytype==='category'? `Categoria: ${e.categoryid}`
                        :e.categorytype==='subcategory'?  `Sub-Categoria: ${e.categoryid}`:e.categorytype==='family'? `Familia: ${e.categoryid}`:'':''}
                      {e.itemid
                        ? ""
                        : e.userid
                        ? ""
                        : e.categorytype
                        ? ""
                        : "Cupon General"}
                    </td>
                    <td>
                      <button
                      style={{
                        backgroundColor:'red',
                        border:' none',
                        padding: '4px 10px',
                        borderRadius: '5px',
                        margin:'4px'
                    }}
                        className="text-white"
                        onClick={(e) => {
                          deletecoupons(id, setTable);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Coupons() {
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
          <button
          className='secundary text-white'
          style={{border:'none',borderRadius:'10px', padding:'10px'}}
            onClick={(e) => {
              e.preventDefault();
              const Icode = document.getElementById("icode");
              const Iexpire = document.getElementById("iexpire");
              const Idiscount = document.getElementById("idiscount");
              const f = document.getElementsByName("checktype");
              const dataSend = {};
              let check = "none";

              if (Icode.value === "") {
                Icode.focus({ preventScroll: false });
              } else if (Iexpire.value === "") {
                Iexpire.focus({ preventScroll: false });
              } else if (
                Idiscount.value === "" ||
                parseInt(Idiscount.value) === 0
              ) {
                Idiscount.focus({ preventScroll: false });
              } else {
                for (let i = 0; i < 4; i++) {
                  if (f[i].checked) {
                    check = f[i].value;
                  }
                }

                dataSend.expire = Iexpire.value;
                dataSend.discount = Idiscount.value;
                dataSend.code = Icode.value;

                switch (check) {
                  case "idUser":
                    dataSend.userid = document.getElementById(check).value;
                    sendandgetcoupons(dataSend);
                    break;

                  case "idArticulo":
                    dataSend.itemid = document.getElementById(check).value;
                    sendandgetcoupons(dataSend);

                    break;

                  case "idcategorytype":
                    dataSend.categorytype = document.getElementById(
                      check
                    ).value;
                    dataSend.categoryid = document.getElementById(
                      "mainEndSelect"
                    ).value;

                    sendandgetcoupons(dataSend);

                    break;

                  default:
                    sendandgetcoupons(dataSend);
                    break;
                }
              }
            }}
          >
            CREAR DESCUENTO
          </button>
        </center>
        <hr />
        <div className='maintable'>
        <TableCoupons />
        </div>
      </div>
    </>
  );
}
export default withRouter(Coupons);
