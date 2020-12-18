import { Link, useHistory, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./items.css";
import { ReactComponent as Isearch } from "../../../media/icons/search-solid.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import NewItem from "./newItem";
import { toast } from "react-toastify";

const CardItem = ({ props }) => {
  let img = JSON.parse(props.url_images).img_one;
  return (
    <>
      <div className="base-card-item">
        <Link to={`items/edit/${props.id}`}>
          <div className="card-item-all">
            <div className="base-card-img">
              <img src={img} alt={props.title} />
            </div>
            <div className="card-item-title">
              <h4>{props.title}</h4>
            </div>
            <div className="card-item-price">
              <p>$ {props.price}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const searchItem = (e, setSearchItems, query, category, token) => {
  e.preventDefault();
  let inf = document.getElementById("info");
  axios
    .get(`aitems/search/${query}/${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((e) => {
      setSearchItems(e.data);
      if (e.data.length === 0) {
        toast.warning("🤧 No este producto en linea");
      } else {
        toast("🧐 creo que encontre lo que buscabas");
      }
    })
    .catch((e) => {
      toast.info("No lo encuentro");
    });
};

const getAllItems = (e, setItems, token) => {
  e.preventDefault();
  axios
    .get("aitems/all", { headers: { Authorization: `Bearer ${token}` } })
    .then((e) => {
      setItems(e.data);
      if (e.data.length === 0) {
        toast.warning("🤧 No tienes Productos en linea");
      } else {
        toast("🧐 creo que encontre lo que buscabas");
      }
    });
};
function Items() {
  const [show, setShow] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchitems, setSearchItems] = useState([]);
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("categories/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setCategories(e.data);
      });
  }, [token]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback history={history} />
      <div className="base-search">
        <div className="search">
          <div className="search-input">
            <input
              id="query"
              type="text"
              size="50"
              placeholder="Escriba el codigo o nombre del producto"
              onKeyPressCapture={(e) => {
                if (e.key === "Enter") {
                  setShow(false);
                  let query = document.getElementById("query");
                  if (query.value.length > 0) {
                    let thecategory = document.getElementById("thecategory")
                      .value;
                    query.style.color = "#266f94";
                    query.placeholder =
                      "Escriba el codigo o nombre del producto";
                    searchItem(
                      e,
                      setSearchItems,
                      query.value,
                      thecategory,
                      token
                    );
                  } else {
                    query.style.color = "red";
                    query.value = "";
                    query.placeholder = "Ups se le ha olvidado Escribir aqui";
                  }
                }
              }}
            ></input>
          </div>
          <div className="search-category">
            <select id="thecategory">
              <option defaultValue value="all">
                Todas las categorias
              </option>
              {categories?.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="search-btn">
            <a
              href="#search"
              onClick={(e) => {
                let query = document.getElementById("query");
                if (query.value.length > 0) {
                  setShow(false);

                  let thecategory = document.getElementById("thecategory")
                    .value;
                  query.style.color = "#266f94";
                  query.placeholder = "Escriba el codigo o nombre del producto";
                  searchItem(
                    e,
                    setSearchItems,
                    query.value,
                    thecategory,
                    token
                  );
                } else {
                  query.style.color = "red";
                  query.value = "";
                  query.placeholder = "Ups se le ha olvidado Escribir aqui";
                }
              }}
            >
              <Isearch />
            </a>
          </div>
          <div className="base-search-btn">
            <a
              href="#seeall"
              onClick={(e) => {
                setShow(false);

                getAllItems(e, setSearchItems, token);
              }}
            >
              ver todos
            </a>
          </div>
        </div>
        <hr />
      </div>
      <div className="base-page-item">
        {show ? <NewItem /> : ""}
        {searchitems?.map((e) => {
          return (
            <div key={e.id}>
              <CardItem key={e.id} props={e} />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default withRouter(Items);
