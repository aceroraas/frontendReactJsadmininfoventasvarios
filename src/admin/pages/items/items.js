import { Link, useHistory, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./items.css";
import { ReactComponent as Isearch } from "../../../media/icons/search-solid.svg";
import { useEffect, useState } from "react";
import axios from "axios";

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
    })
    .catch((e) => {
      inf.innerText = "no se encontro nah";
    });
};

const getAllItems = (e, setItems, token) => {
  e.preventDefault();
  axios
    .get("aitems/all", { headers: { Authorization: `Bearer ${token}` } })
    .then((e) => {
      setItems(e.data);
    });
};
function Items() {
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
                  let query = document.getElementById("query");
                  if (query.value.length > 1) {
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
              <option selected defaultValue="all">
                Todas las categorias
              </option>
              {categories?.map((e) => {
                return <option key={e.id} defaultValue={e.id}>{e.category_name}</option>;
              })}
            </select>
          </div>
          <div className="search-btn">
            <a
              href="#search"
              onClick={(e) => {
                let query = document.getElementById("query");
                if (query.value.length > 1) {
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
        {searchitems?.map((e) => {
          return (
            <div key={e.id}>
              <CardItem props={e} />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default withRouter(Items);
