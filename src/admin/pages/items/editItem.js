import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./items.css";
const CardItem = ({ props }) => {
  let img = props.imgPrincipal;
  return (
    <>
      <div className="base-card-item">
        <a href="#a">
          <div className="card-item-all">
            <div className="base-card-img">
              <img src={img} alt={props.item.title} />
            </div>
            <div className="card-item-title">
              <a href="#a">
                <h4>{props.item.title}</h4>
              </a>
            </div>
            <div className="card-item-title">
              <a href="#a" style={{ color: "black" }}>
                <h4>{props.item.brand}</h4>
              </a>
            </div>
            <div className="card-item-price">
              <p>$ {props.item.price}</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################

function SelectFamily({ id_sub }) {
  const [family, setFamily] = useState([]);

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (id_sub !== 0) {
      axios
        .get(`/categories/fam/${id_sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((e) => {
          setFamily(e.data);
        })
        .catch((e) => {
          setFamily([{ name: "cargando" }]);
        });
    }
  }, [id_sub, token]);
  if (id_sub !== 0) {
    return (
      <>
        <div className="category">
          <label>
            Familia:
            <select id="iFamily">
              {family?.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.family}
                  </option>
                );
              })}
            </select>
          </label>
          {/* <MategoryM setTer={setCategories} /> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h6>Selecione una Sub Categoria</h6>
      </>
    );
  }
}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################

function SelectSubCategory({ id_category }) {
  const [subcategories, setSubcategories] = useState([]);
  const [issubcategory, setIssubcategory] = useState(0);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (id_category !== 0) {
      axios
        .get(`/categories/sub/${id_category}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((e) => {
          setSubcategories(e.data);
        })
        .catch((e) => {
          setSubcategories([{ name: "cargando" }]);
        });
    }
  }, [id_category, token]);
  if (id_category !== 0) {
    return (
      <>
        <div className="category">
          <label>
            Sub Categoria:
            <select
              id="isubcategory"
              onClick={(e) => {
                e.preventDefault();
                setIssubcategory(e.target.value);
              }}
            >
              {subcategories?.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.sub_name}
                  </option>
                );
              })}
            </select>
          </label>
          {/* <MategoryM setTer={setCategories} /> */}
        </div>
        {issubcategory !== 0 ? <SelectFamily id_sub={issubcategory} /> : ""}
      </>
    );
  } else {
    return (
      <>
        <h6>Selecione una Categoria</h6>
      </>
    );
  }
}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################

function SelectCategory() {
  const [categories, setCategories] = useState([]);
  const [iscategory, setIscategory] = useState(0);
  const Sc = useRef();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/categories/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setCategories(e.data);
      })
      .catch((e) => {
        setCategories([{ name: "cargando" }]);
      });
  }, [token]);

  return (
    <>
      <div className="category">
        <label>
          Categoria:
          <select
            ref={Sc}
            id="iCategory"
            onClick={(e) => {
              e.preventDefault();
              setIscategory(e.target.value);
            }}
          >
            {categories?.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.category_name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      {iscategory !== 0 ? <SelectSubCategory id_category={iscategory} /> : ""}
    </>
  );
}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################

function CardImg({ id_target, setTer, saveImg, allimg }) {
  return (
    <>
      <div
        id={`card-${id_target}`}
        className="img-card"
        style={{ backgroundImage: `` }}
      >
        <label>
          +
          <input
            id={id_target}
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => {
              e.preventDefault();
              const reader = new FileReader();
              const preview = document.getElementById(`card-${id_target}`);
              switch (id_target) {
                case "iImgP":
                  saveImg({ ...allimg, iImgP: e.target.files[0] });
                  break;
                case "iImgS":
                  saveImg({ ...allimg, iImgS: e.target.files[0] });
                  break;
                case "iImgT":
                  saveImg({ ...allimg, iImgT: e.target.files[0] });
                  break;
                case "iImgF":
                  saveImg({ ...allimg, iImgF: e.target.files[0] });
                  break;
                default:
                  toast.info(
                    "Disculpe Tenemos problemas al cargar ese archivo"
                  );
                  break;
              }
              if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function (e) {
                  if (setTer) {
                    setTer(e.target.result);
                  }
                  preview.style.backgroundImage = `url('${e.target.result}')`;
                };
              } else {
                reader.readAsDataURL(
                  "https://via.placeholder.com/800x800.png/eeeeee?text=noimage"
                );
                preview.style.backgroundImage = `ulr('https://via.placeholder.com/800x800.png/eeeeee?text=noimage')`;
              }
            }}
            type="file"
          />
        </label>
      </div>
    </>
  );
}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
function SelectImg({ setTer, saveImg, allimg }) {
  return (
    <>
      <CardImg
        id_target={"iImgP"}
        setTer={setTer}
        saveImg={saveImg}
        allimg={allimg}
      />
      <CardImg id_target={"iImgS"} saveImg={saveImg} allimg={allimg} />
      <CardImg id_target={"iImgT"} saveImg={saveImg} allimg={allimg} />
      <CardImg id_target={"iImgF"} saveImg={saveImg} allimg={allimg} />
    </>
  );
}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################

function EditItem() {
  const [item, setItem] = useState({});
  const [oldimg, setOlimg] = useState({});
  const [imgPrincipal, setImgPrincipal] = useState({});
  const [imgs, setImgs] = useState({});
  const [properties, setProperties] = useState({});
  // eslint-disable-next-line
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
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
        setOlimg(e.data.url_images);
        setImgPrincipal(JSON.parse(e.data.url_images).img_one);
      });

    axios
      .get(`/categories/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setCategories(e.data);
      })
      .catch((e) => {
        setCategories([{ name: "cargando" }]);
      });
  }, [id, token]);

  function uploadText(titem, token) {
    toast.info("💪 Creando nuevo Producto, porfavor Espere la confirmación", {
      autoClose: 4000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
    axios
      .put("aitems/update", titem, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        toast.success(
          `🥳 Genial Ya el producto ${item.title} esta en linea, verifica que este todo bien`,
          {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
          }
        );
        //history.go(0);
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          toast.warning(`🤦‍♂️ tienes un error en los campos`, {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
          });
        } else if (e.request) {
          axios
            .put(
              "/aitems/fail",
              { url_images: titem.url_images },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((e) => {
              console.log(e.data);
            });
          toast.error(
            `💔, el servidor no me responde, ¿tienes internet? ¿y si lo intentas mas tarde?`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        } else {
          toast.error(
            `💔😰, a nooooo, ¿tienes internet? el navegador me dijo esto: ,${e.message}`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        }
      });
  }

  function deleteoldImg(newimgs, oldimg) {
    const newi = JSON.parse(newimgs);
    const oldi = JSON.parse(oldimg);
    let result = {};
    for (const i in newi) {
      if (newi.hasOwnProperty(i)) {
        for (const e in oldi) {
          if (oldi.hasOwnProperty(e)) {
            if (i === e) {
              if (newi[i] !== oldi[e]) {
                result[i] = oldi[i];
              } else {
                result[i] = false;
              }
            }
          }
        }
      }
    }
    if (Object.keys(result).length !== 0) {
      let send = JSON.stringify(result);
      axios
        .put(
          "/aitems/fail",
          { url_images: send },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((e) => {
          console.log(e.data);
        });
    }
  }

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
                <input
                  id="iCode"
                  type="text"
                  onInput={(e) => {
                    e.preventDefault();
                    setItem({ ...item, code: e.target.value });
                  }}
                  defaultValue={item.code}
                ></input>
              </label>
            </div>
            <div className="input-title">
              <label>
                Titulo:
                <input
                  id="iTitle"
                  type="text"
                  onInput={(e) => {
                    e.preventDefault();
                    setItem({ ...item, title: e.target.value });
                  }}
                  defaultValue={item.title}
                ></input>
              </label>
            </div>
            <div className="input-price">
              <label>
                Precio:
                <input
                  id="iPrice"
                  type="number"
                  onInput={(e) => {
                    e.preventDefault();
                    setItem({ ...item, price: parseFloat(e.target.value) });
                  }}
                  defaultValue={item.price}
                ></input>
              </label>
            </div>
            <div className="input-stock">
              <label>
                Stock:
                <input
                  id="iStock"
                  type="number"
                  onInput={(e) => {
                    e.preventDefault();
                    setItem({ ...item, stock: e.target.value });
                  }}
                  defaultValue={item.stock}
                ></input>
              </label>
            </div>
            <div className="input-brand">
              <label>
                Marca:
                <input
                  id="iBrand"
                  type="text"
                  onInput={(e) => {
                    e.preventDefault();
                    setItem({ ...item, brand: e.target.value });
                  }}
                  defaultValue={item.brand}
                ></input>
              </label>
            </div>
            <div className="input-brand">
              <label>
                Popularidad:
                <input
                  id="isales"
                  type="number"
                  onInput={(e) => {
                    e.preventDefault();
                    setItem({ ...item, sales: parseInt(e.target.value) });
                  }}
                  defaultValue={item.sales}
                ></input>
              </label>
            </div>
            <SelectCategory />
          </div>
          <SelectImg setTer={setImgPrincipal} saveImg={setImgs} allimg={imgs} />
          {/* <div className="properties">
            <div className="property">
              <div className="property-input">
                <label>
                  Colores:
                  <input
                    onChange={(e) => {
                      if (e.target.checked === false) {
                        document.getElementsByClassName(
                          "colors"
                        )[0].style.visibility = "hidden";
                        document.getElementsByClassName(
                          "colors"
                        )[1].style.visibility = "hidden";
                        document.getElementsByClassName(
                          "colors"
                        )[2].style.visibility = "hidden";
                        document.getElementsByClassName(
                          "colors"
                        )[3].style.visibility = "hidden";
                      } else {
                        document.getElementsByClassName(
                          "colors"
                        )[0].style.visibility = "visible";
                        document.getElementsByClassName(
                          "colors"
                        )[1].style.visibility = "visible";
                        document.getElementsByClassName(
                          "colors"
                        )[2].style.visibility = "visible";
                        document.getElementsByClassName(
                          "colors"
                        )[3].style.visibility = "visible";
                      }
                    }}
                    id="checkColors"
                    type="checkbox"
                  ></input>
                </label>
                <input
                  style={{
                    visibility: item.properties
                      ? JSON.parse(item.properties).color
                        ? JSON.parse(item.properties).color[0]
                          ? "visible"
                          : "hidden"
                        : "hidden"
                      : "hidden",
                  }}
                  id="colo_one"
                  onClick={(e) => {
                    setColors([...colors, e.target.value]);
                  }}
                  className="colors"
                  defaultValue={
                    item.properties
                      ? JSON.parse(item.properties).color
                        ? JSON.parse(item.properties).color[0]
                        : "#ec6f18"
                      : "#ec6f18"
                  }
                  type="color"
                ></input>
                <input
                  id="colo_two"
                  onClick={(e) => {
                    setColors([...colors, e.target.value]);
                  }}
                  className="colors"
                  defaultValue={
                    item.properties
                      ? JSON.parse(item.properties).color
                        ? JSON.parse(item.properties).color[1]
                        : "#2a7fa9"
                      : "#2a7fa9"
                  }
                  type="color"
                ></input>
                <input
                  id="colo_tree"
                  className="colors"
                  onClick={(e) => {
                    setColors([...colors, e.target.value]);
                  }}
                  defaultValue={
                    item.properties
                      ? JSON.parse(item.properties).color
                        ? JSON.parse(item.properties).color[2]
                        : "#000000"
                      : "#000000"
                  }
                  type="color"
                ></input>
                <input
                  id="colo_Four"
                  onClick={(e) => {
                    setColors([...colors, e.target.value]);
                  }}
                  className="colors"
                  defaultValue={
                    item.properties
                      ? JSON.parse(item.properties).color
                        ? JSON.parse(item.properties).color[3]
                        : "#eeeeee"
                      : "#eeeeee"
                  }
                  type="color"
                ></input>
              </div>
            </div>
            <div className="property">
              <div className="property-input">
                <label>
                  Talla:
                  <input
                    defaultChecked={
                      item.properties
                        ? JSON.parse(item.properties).size
                          ? true
                          : false
                        : false
                    }
                    id="checkSize"
                    type="checkbox"
                  ></input>
                </label>
                <input
                  id="ipSize"
                  onChange={(e) => {
                    e.preventDefault();
                    let check = document.getElementById("checkSize").checked;
                    if (check) {
                      setProperties({ ...properties, size: e.target.value });
                    }
                  }}
                  defaultValue={
                    item.properties
                      ? JSON.parse(item.properties).size ?? ""
                      : ""
                  }
                  type="text"
                ></input>
              </div>
            </div>
            <div className="property">
              <div className="property-input">
                <label>
                  Dimensiones:
                  <input
                    defaultChecked={
                      item.properties
                        ? JSON.parse(item.properties).dimensions
                          ? true
                          : false
                        : false
                    }
                    id="checkDimensions"
                    type="checkbox"
                  ></input>
                </label>
                <input
                  id="ipDimensions"
                  onChange={(e) => {
                    e.preventDefault();
                    let check = document.getElementById("checkDimensions")
                      .checked;
                    if (check) {
                      setProperties({
                        ...properties,
                        dimensions: e.target.value,
                      });
                    }
                  }}
                  defaultValue={
                    item.properties
                      ? JSON.parse(item.properties).dimensions ?? ""
                      : ""
                  }
                  type="text"
                ></input>
              </div>
            </div>
          </div> */}
        </div>
        <div className="base-edit-right">
          <div className="card-background">
            {Object.keys(item).length !== 0 ? (
              <CardItem props={{ item, imgPrincipal }} />
            ) : (
              <h2>Cargando Vista Previa</h2>
            )}
          </div>
        </div>
        <div className="base-edit-bottom">
          <div className="base-textarea">
            <h3>Descripción</h3>
            <textarea
              id="iTexarea"
              onChange={(e) => {
                let a = document.getElementById("iTexarea").value;
                setItem({ ...item, description: a });
              }}
              value={item.description}
              placeholder="  Escribe una descripción breve del producto aqui"
            />
          </div>
          <a
            onClick={(e) => {
              e.preventDefault();
              if (Object.keys(item).length >= 12) {
                const fd = new FormData();
                let isUploadImg = false;
                let onlyText = true;
                let fail = false;
                const titem = item;
                if (Object.keys(properties).length > 0) {
                  let propiedades = properties;
                  if (colors.length > 0) {
                    propiedades.color = colors;
                    titem.properties = JSON.stringify(propiedades);
                  } else {
                    titem.properties = JSON.stringify(propiedades);
                  }
                }
                if (document.getElementById("iFamily")) {
                  titem.family_id = document.getElementById("iFamily").value;
                }

                if (Object.keys(imgs).length > 0) {
                  if (imgs.iImgP) {
                    fd.append("imgP", imgs.iImgP);
                  }
                  if (imgs.iImgS) {
                    fd.append("imgS", imgs.iImgS);
                  }
                  if (imgs.iImgT) {
                    fd.append("imgT", imgs.iImgT);
                  }
                  if (imgs.iImgF) {
                    fd.append("imgF", imgs.iImgF);
                  }
                  fd.append("id", id);
                  axios
                    .post("aitems/saveimg", fd, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((e) => {
                      if (e.data.img_one) {
                        titem.url_images = JSON.stringify(e.data);
                        deleteoldImg(titem.url_images, oldimg);
                        uploadText(titem, token);
                      }
                    })
                    .catch((e) => {
                      toast.warning(
                        "Disculpe las imagenes no se han podido guardar por favor intentelo mas tarde"
                      );
                    });
                } else {
                  uploadText(titem, token);
                  toast.warning("Actualizando Producto sin imagen nueva");
                }
              }
            }}
            className="btn-save"
            href="#save"
          >
            Guardar
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              axios
                .delete(`aitems/delete/${item.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((e) => {
                  toast.info("Se ha eliminado con exito");
                  history.goBack();
                });
            }}
            href="#delete"
          >
            Eliminar
          </a>
        </div>
      </div>
    </>
  );
}

export default withRouter(EditItem);
