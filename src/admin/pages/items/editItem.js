import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
const CardItem = ({ props }) => {
  let img = JSON.parse(props.url_images).img_one;
  return (
    <>
      <div className="base-card-item">
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
      </div>
    </>
  );
};
function EditItem() {
  const [item, setItem] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`aitems/find/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setItem(e.data);
      });
  }, [id, token]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback history={history} />
      <div className="base-edit">
        <div className="base-edit-left">
          <div className="inputs">
            <div className="input-codigo">
              <label>
                Codigo:
                <input type="text" defaultValue={item.code}></input>
              </label>
            </div>
            <div className="input-title">
              <label>
                Titulo:
                <input type="text" defaultValue={item.title}></input>
              </label>
            </div>
            <div className="input-price">
              <label>
                Precio:
                <input type="text" defaultValue={item.price}></input>
              </label>
            </div>
            <div className="input-stock">
              <label>
                Stock:
                <input type="text" defaultValue={item.stock}></input>
              </label>
            </div>
            <div className="input-brand">
              <label>
                Marca:
                <input type="text" defaultValue={item.brand ?? ""}></input>
              </label>
            </div>
            <div className="category">
              <label>
                Categoria:
                <select>
                  <option selected>Categorias</option>
                </select>
              </label>
            </div>
          </div>
          <div className="imgs">
            <div className="base-edit-imgs">
              <div className="img-card">img1</div>
              <div className="img-card">img2</div>
              <div className="img-card">img3</div>
              <div className="img-card">img4</div>
            </div>
          </div>
          <div className="properties">
            <div className="property">
              <div className="property-input">
                <label>
                  Colores
                  <input type="checkbox"></input>
                </label>
                <input type="color"></input>
                <input type="color"></input>
                <input type="color"></input>
                <input type="color"></input>
              </div>
            </div>
            <div className="property">
              <div className="property-input">
                <label>
                  Talla
                  <input type="checkbox"></input>
                </label>
                <input type="text"></input>
              </div>
            </div>
            <div className="property">
              <div className="property-input">
                <label>
                  Dimensiones
                  <input type="checkbox"></input>
                </label>
                <input type="text"></input>
              </div>
            </div>
          </div>
          <div className="base-edit-right">
            <div className="card-background">
             <CardItem props={item} />
            </div>
          </div>
          <div className="bottom">
            <div className="base-textarea">
              <textarea />
            </div>
            <a href="#save">guardar</a>
            <br />
            <a href="#delete">eliminar</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(EditItem);
