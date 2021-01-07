import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Modal, ModalTransition, useModal } from "react-simple-hook-modal";
import { toast } from "react-toastify";
import "./items.css";

const MategoryM = ({ setTer }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [cate, setCate] = useState([]);
  const token = window.localStorage.getItem("token");
  // eslint-disable-next-line
  const history = useHistory();
  useEffect(() => {
    axios
      .get("/categories/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setTer(e.data);
        setCate(e.data);
      });
  }, [setTer, token]);
  return (
    <>
      <Link
        onClick={openModal}
        to="#"
        className="btn text-white secundary"
        style={{ width: "1px", marginLeft: "10px" }}
      >
        +
      </Link>
      <Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
        <Link
          onClick={closeModal}
          to="#"
          className="btn text-white red"
          style={{ width: "1px", marginLeft: "0px" }}
        >
          x
        </Link>
        <h2 style={{ display: "inline", marginLeft: "20px" }}>
          Nueva Categoria
        </h2>
        <br />
        <br />
        <center>
          <div className="modal-base">
            <div>
              <div style={{ marginLeft: "0", width: "100%" }}>
                <input id="newcate" type="text" />
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Creando nueva Categoria");
                    axios
                      .post(
                        "/categories/new",
                        {
                          category_name: document.getElementById("newcate")
                            .value,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then(() => {
                        axios
                          .get("/categories/all", {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setTer(e.data);
                            setCate(e.data);
                            toast.success("Categoria Creada");
                          });
                      });
                  }}
                  className="btn text-white primary"
                  style={{ width: "150px", marginLeft: "10px" }}
                >
                  Agregar Categoria
                </Link>
              </div>
              <div>
                <br />
                <div className="category">
                  <label>
                    Categoria:
                    <select id="MiCategory">
                      {cate?.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <Link
                    to="#"
                    className="btn text-white primary"
                    style={{ width: "150px", marginLeft: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Eliminando Categoria");

                      let a = document.getElementById("MiCategory").value;
                      axios
                        .delete(`/categories/delete/${a}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                        .then(() => {
                          axios
                            .get("/categories/all", {
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((e) => {
                              setTer(e.data);
                              setCate(e.data);
                              toast.info("Se ha eliminado con exito");
                            });
                        });
                    }}
                  >
                    Eliminar Categoria
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </center>
      </Modal>
    </>
  );
};
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################

const Msubcategory = ({ setTer }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [cate, setCate] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(6);
  const [selectedCategoryname, setSelectedCategoryname] = useState("");
  const token = window.localStorage.getItem("token");
  // eslint-disable-next-line
  const history = useHistory();
  useEffect(() => {
    axios
      .get("/categories/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setCate(e.data);
      });
    axios
      .get(`/categories/sub/${selectedCategory}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setSubcategory(e.data);
      });
  }, [selectedCategory, token]);
  return (
    <>
      <Link
        onClick={openModal}
        to="#"
        className="btn text-white secundary"
        style={{ width: "1px", marginLeft: "10px" }}
      >
        +
      </Link>
      <Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
        <Link
          onClick={closeModal}
          to="#"
          className="btn text-white red"
          style={{ width: "1px", marginLeft: "0px" }}
        >
          x
        </Link>
        <h2 style={{ display: "inline", marginLeft: "20px" }}>
          Crear Nueva Sub-Categoria
        </h2>
        <br />
        <br />
        <center>
          <div className="modal-base">
            <div>
              <div className="category">
                <label>
                  Selecione una Categoria:
                  <select
                    id="Category"
                    onClick={(e) => {
                      e.preventDefault();
                      let f = e.target.options[e.target.selectedIndex].text;
                      setSelectedCategoryname(f);
                      setSelectedCategory(e.target.value);
                      toast.info(`Se ha selecionado la Categoria ${f}`);
                    }}
                  >
                    {cate?.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.category_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <br />
              <div style={{ marginLeft: "0", width: "100%" }}>
                <input id="newsubcate" type="text" />
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    let f = document.getElementById("newsubcate").value;
                    if (f !== "") {
                      toast.info(
                        `Creando sub Categoria ${f} en la categoria ${selectedCategoryname}`
                      );
                    }
                    axios
                      .post(
                        "/categories/newsub",
                        {
                          sub_name: f,
                          category_id: selectedCategory,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then(() => {
                        axios
                          .get(`/categories/sub/${selectedCategory}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setTer(e.data);
                            setSubcategory(e.data);
                            toast.success("Categoria Creada");
                          });
                      })
                      .catch((e) => {
                        if (e.response) {
                          if (e.response.data.sub_name) {
                            toast.warning(
                              "tenemos un Problema, esa subcategoria ya existe, verifica",
                              { autoClose: false }
                            );
                          } else {
                            toast.error(
                              "Error inesperado: error: " +
                                e.response.data.toString(),
                              { autoClose: false }
                            );
                          }
                        } else if (e.request) {
                          toast.error(
                            "No podemos conectarnos al Servidor, verifica tu conexión",
                            { autoClose: false }
                          );
                        } else {
                          toast.error("Error, inesperado:" + e.toString(), {
                            autoClose: false,
                          });
                        }
                      });
                  }}
                  className="btn text-white primary"
                  style={{ width: "150px", marginLeft: "10px" }}
                >
                  Agregar Nueva Sub Categoria
                </Link>
              </div>
              <div>
                <br />
                <div className="category">
                  <label>
                    SubCategoria:
                    <select id="misub">
                      {subcategory?.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.sub_name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <Link
                    to="#"
                    className="btn text-white primary"
                    style={{ width: "150px", marginLeft: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Eliminando Categoria");

                      let a = document.getElementById("misub").value;
                      axios
                        .delete(`/categories/delete/sub/${a}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                        .then(() => {
                          axios
                            .get(`/categories/sub/${selectedCategory}`, {
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((e) => {
                              setTer(e.data);
                              setSubcategory(e.data);
                              toast.success("Se ha eliminado con exito");
                            })
                            .catch((e) => {
                              if (e.request) {
                                toast.error(
                                  "No podemos conectarnos al Servidor, verifica tu conexión",
                                  { autoClose: false }
                                );
                              } else {
                                toast.error(
                                  "Error, inesperado:" + e.toString(),
                                  { autoClose: false }
                                );
                              }
                            });
                        });
                    }}
                  >
                    Eliminar SubCategoria
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </center>
      </Modal>
    </>
  );
};
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################

const Mfamilia = ({ setTer }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [cate, setCate] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [familia, setFamilia] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(6);
  const [selectedSubCategory, setSelectedSubCategory] = useState(68);
  // eslint-disable-next-line
  const [selectedCategoryname, setSelectedCategoryname] = useState("");
  const [selectedSubCategoryname, setSelectedSubCategoryname] = useState("");
  const token = window.localStorage.getItem("token");
  // eslint-disable-next-line
  const history = useHistory();
  useEffect(() => {
    axios
      .get("/categories/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setCate(e.data);
      });
    axios
      .get(`/categories/sub/${selectedCategory}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setSubcategory(e.data);
      });
    axios
      .get(`/categories/fam/${selectedSubCategory}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setFamilia(e.data);
      });
  }, [selectedSubCategory, selectedCategory, token]);
  return (
    <>
      <Link
        onClick={openModal}
        to="#"
        className="btn text-white secundary"
        style={{ width: "1px", marginLeft: "10px" }}
      >
        +
      </Link>
      <Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
        <Link
          onClick={closeModal}
          to="#"
          className="btn text-white red"
          style={{ width: "1px", marginLeft: "0px" }}
        >
          x
        </Link>
        <h2 style={{ display: "inline", marginLeft: "20px" }}>
          Crear Nueva Familia
        </h2>
        <br />
        <br />
        <center>
          <div className="modal-base">
            <div>
              <div className="category">
                <label>
                  Selecione una Categoria:
                  <select
                    id="Category"
                    onClick={(e) => {
                      e.preventDefault();
                      let f = e.target.options[e.target.selectedIndex].text;
                      setSelectedCategoryname(f);
                      setSelectedCategory(e.target.value);
                      toast.info(`Se ha selecionado la Categoria ${f}`);
                    }}
                  >
                    {cate?.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.category_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <br />
              <div className="category">
                <label>
                  Selecione una Sub-Categoria:
                  <select
                    id="Subcategoria"
                    onClick={(e) => {
                      e.preventDefault();
                      let f = e.target.options[e.target.selectedIndex].text;
                      setSelectedSubCategoryname(f);
                      setSelectedSubCategory(e.target.value);
                      toast.info(`Se ha selecionado la Sub-Categoria ${f}`);
                    }}
                  >
                    {subcategory?.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.sub_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <br />
              <div style={{ marginLeft: "0", width: "100%" }}>
                <input id="newsubcate" type="text" />
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    let f = document.getElementById("newsubcate").value;
                    if (f !== "") {
                      toast.info(
                        `Creando Familia ${f} en la Sub-categoria ${selectedSubCategoryname}`
                      );
                    }
                    axios
                      .post(
                        "/categories/newfam",
                        {
                          family: f,
                          sub_category_id: selectedSubCategory,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then(() => {
                        axios
                          .get(`/categories/fam/${selectedSubCategory}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setTer(e.data);
                            setFamilia(e.data);
                            toast.success("familia Creada");
                          });
                      })
                      .catch((e) => {
                        if (e.response) {
                          if (e.response.data.family) {
                            toast.warning(
                              "tenemos un Problema, esa familia ya existe, verifica",
                              { autoClose: false }
                            );
                          } else {
                            toast.error(
                              "Error inesperado: error: " +
                                e.response.data.toString(),
                              { autoClose: false }
                            );
                          }
                        } else if (e.request) {
                          toast.error(
                            "No podemos conectarnos al Servidor, verifica tu conexión",
                            { autoClose: false }
                          );
                        } else {
                          toast.error("Error, inesperado:" + e.toString(), {
                            autoClose: false,
                          });
                        }
                      });
                  }}
                  className="btn text-white primary"
                  style={{ width: "150px", marginLeft: "10px" }}
                >
                  Agregar Nueva Familia
                </Link>
              </div>
              <div>
                <br />
                <div className="category">
                  <label>
                    Familia:
                    <select id="mifamily">
                      {familia?.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.family}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <Link
                    to="#"
                    className="btn text-white primary"
                    style={{ width: "150px", marginLeft: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Eliminando familia");

                      let a = document.getElementById("mifamily").value;
                      axios
                        .delete(`/categories/delete/fam/${a}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                        .then(() => {
                          axios
                            .get(`/categories/fam/${selectedSubCategory}`, {
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((e) => {
                              setTer(e.data);
                              setFamilia(e.data);
                              toast.success("Se ha eliminado con exito");
                            })
                            .catch((e) => {
                              if (e.request) {
                                toast.error(
                                  "No podemos conectarnos al Servidor, verifica tu conexión",
                                  { autoClose: false }
                                );
                              } else {
                                toast.error(
                                  "Error, inesperado:" + e.toString(),
                                  { autoClose: false }
                                );
                              }
                            });
                        });
                    }}
                  >
                    Eliminar Familia
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </center>
      </Modal>
    </>
  );
};
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################
//################################################################################

const CardItem = ({ props }) => {
  useEffect(() => {
    window.localStorage.setItem('data',JSON.stringify(props.item));
    window.localStorage.setItem('imgs',JSON.stringify(props.Uimgs));
  }, [props]);
  let img = props.imgPrincipal;
  return (
    <>
      <div className="base-card-item">
        <Link to="/items/preview/0" target="_blank">
          <div className="card-item-all">
            <div className="base-card-img">
              <img
                src={
                  Object.keys(img).length !== 0
                    ? img
                    : "https://via.placeholder.com/100x100.png/eeeeee?text=noimage"
                }
                alt={props.item.title}
              />
            </div>
            <div className="card-item-title">
              <h4>{props.item.title}</h4>
            </div>
            <div className="card-item-brand">
              <h4>{props.item.brand}</h4>
            </div>
            <div className="card-item-price">
              <p>$ {parseFloat(props.item.price).toFixed(2)}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

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
            * Familia:
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
          <Mfamilia setTer={setFamily} />
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
            * Sub Categoria:
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
          <Msubcategory setTer={setSubcategories} />
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
          * Categoria:
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
        <MategoryM setTer={setCategories} />
      </div>
      {iscategory !== 0 ? <SelectSubCategory id_category={iscategory} /> : ""}
    </>
  );
}

function NewItem() {
  const [item, setItem] = useState({});
  const [imgPrincipal, setImgPrincipal] = useState({});
  const [imgs, setImgs] = useState({});
  const [Uimgs, setUImgs] = useState({});
  // eslint-disable-next-line
  const [properties, setProperties] = useState({});
  // eslint-disable-next-line
  const [colors, setColors] = useState([]);
  const token = window.localStorage.getItem("token");

  return (
    <>
      <div className="base-edit">
        <div className="base-edit-left">
          <div className="inputs">
            <div className="input-codigo">
              <label>
                * Codigo:
                <input
                  id="iCode"
                  type="text"
                  onInput={(e) => {
                    let a = document.getElementById("iCode").value;
                    e.preventDefault();
                    setItem({ ...item, code: a });
                  }}
                  defaultValue={item.code}
                ></input>
              </label>
            </div>
            <div className="input-title">
              <label>
                * Titulo:
                <input
                  id="iTitle"
                  type="text"
                  onInput={(e) => {
                    let a = document.getElementById("iTitle").value;
                    e.preventDefault();
                    setItem({ ...item, title: a });
                  }}
                  defaultValue={item.title}
                ></input>
              </label>
            </div>
            <div className="input-price">
              <label>
                * Precio:
                <input
                  min="0"
                  id="iPrice"
                  type="number"
                  onInput={(e) => {
                    let a = document.getElementById("iPrice").value;
                    e.preventDefault();
                    setItem({ ...item, price: a });
                  }}
                  defaultValue={item.price}
                ></input>
              </label>
            </div>
            <div className="input-stock">
              <label>
                * Stock:
                <input
                  min="0"
                  id="iStock"
                  type="number"
                  onInput={(e) => {
                    let a = document.getElementById("iStock").value;
                    e.preventDefault();
                    setItem({ ...item, stock: a });
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
                    setItem({ ...item, brand: e.target.value });
                  }}
                  defaultValue={item.brand}
                ></input>
              </label>
            </div>
            <div className="input-brand">
              <label>
                * Popularidad:
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
          <div className="imgs">
            <div className="base-edit-imgs">
              <div
                id="img-card-one"
                className="img-card"
                style={{ backgroundColor: "#266f94" }}
              >
                <label>
                  +
                  <input
                    id="iImgP"
                    accept="image/x-png,image/gif,image/jpeg"
                    onInput={(e) => {
                      setImgs({ ...imgs, imgP: e.target.files[0] });
                      e.preventDefault();
                      let reader = new FileReader();
                      let preview = document.getElementById("img-card-one");
                      if (e.target.files[0]) {
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onload = function (e) {
                          setUImgs({ ...Uimgs, img_one:e.target.result});
                          setImgPrincipal(e.target.result);
                          preview.style.backgroundImage = `url(${e.target.result})`;
                        };
                      } else {
                        preview.style.backgroundImage = `ulr('https://via.placeholder.com/100x100.png/eeeeee?text=noimage')`;
                      }
                    }}
                    type="file"
                  />
                </label>
              </div>
              <div id="img-card-two" className="img-card">
                <label>
                  +
                  <input
                    accept="image/x-png,image/gif,image/jpeg"
                    id="iImgS"
                    onInput={(e) => {
                      setImgs({ ...imgs, imgS: e.target.files[0] });
                      let reader = new FileReader();
                      let preview = document.getElementById("img-card-two");
                      if (e.target.files[0]) {
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onload = function (e) {
                          setUImgs({ ...Uimgs, img_two:e.target.result});
                          preview.style.backgroundImage = `url(${e.target.result})`;
                        };
                      } else {
                        preview.style.backgroundImage = `ulr('https://via.placeholder.com/100x100.png/eeeeee?text=noimage')`;
                      }
                    }}
                    type="file"
                    />
                </label>
              </div>
              <div id="img-card-tree" className="img-card">
                <label>
                  +
                  <input
                    accept="image/x-png,image/gif,image/jpeg"
                    id="iImgT"
                    onInput={(e) => {
                      setImgs({ ...imgs, imgT: e.target.files[0] });
                      let reader = new FileReader();
                      let preview = document.getElementById("img-card-tree");
                      if (e.target.files[0]) {
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onload = function (e) {
                          setUImgs({ ...Uimgs, img_tree:e.target.result});
                          preview.style.backgroundImage = `url(${e.target.result})`;
                        };
                      } else {
                        preview.style.backgroundImage = `ulr('https://via.placeholder.com/100x100.png/eeeeee?text=noimage')`;
                      }
                    }}
                    type="file"
                  />
                </label>
              </div>
              <div id="img-card-four" className="img-card">
                <label>
                  +
                  <input
                    accept="image/x-png,image/gif,image/jpeg"
                    id="iImgF"
                    type="file"
                    onInput={(e) => {
                      setImgs({ ...imgs, imgF: e.target.files[0] });
                      let reader = new FileReader();
                      let preview = document.getElementById("img-card-four");
                      if (e.target.files[0]) {
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onload = function (e) {
                          setUImgs({ ...Uimgs, img_four:e.target.result});
                          preview.style.backgroundImage = `url(${e.target.result})`;
                        };
                      } else {
                        preview.style.backgroundImage = `ulr('https://via.placeholder.com/100x100.png/eeeeee?text=noimage')`;
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="base-edit-right">
          <div className="card-background">
            {Object.keys(item).length !== 0 ? (
              <CardItem props={{ item, imgPrincipal, Uimgs }} />
            ) : (
              <h2>Cargando Vista Previa</h2>
            )}
          </div>
        </div>
        <div className="base-edit-bottom">
          <div className="base-textarea">
            <h3>* Descripción</h3>
            <textarea
              id="iTexarea"
              onInput={(e) => {
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
              if (item.code && item.code !== "") {
                if (item.title && item.title !== "") {
                  if (item.description && item.description !== "") {
                    if (item.price && parseFloat(item.price) > 0) {
                      if (item.stock && parseInt(item.stock) >= 0) {
                        if (Object.keys(item).length >= 6) {
                          const titem = item;
                          const fd = new FormData();

                          if (Object.keys(properties).length > 0) {
                            const propiedades = properties;
                            if (colors.length > 0) {
                              propiedades.color = colors;
                              titem.properties = JSON.stringify(propiedades);
                            } else {
                              titem.properties = JSON.stringify(propiedades);
                            }
                          }
                          if (document.getElementById("iFamily")) {
                            titem.family_id = document.getElementById(
                              "iFamily"
                            ).value;
                          } else {
                            titem.family_id = 217;
                          }
                          if (Object.keys(imgs).length > 0) {
                            fd.append("imgP", imgs.imgP);
                            fd.append("imgS", imgs.imgS);
                            fd.append("imgT", imgs.imgT);
                            fd.append("imgF", imgs.imgF);

                            toast.info(
                              "💪 Creando nuevo Producto, porfavor Espere la confirmación",
                              {
                                autoClose: 4000,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            axios
                              .post("aitems/saveimg", fd, {
                                headers: { Authorization: `Bearer ${token}` },
                              })
                              .then((e) => {
                                titem.url_images = JSON.stringify(e.data);
                                axios
                                  .post("aitems/new", titem, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  })
                                  .then((e) => {
                                    toast.success(
                                      `🥳 Genial Ya el producto ${item.title} esta en linea`,
                                      {
                                        autoClose: false,
                                        closeOnClick: true,
                                        draggable: true,
                                      }
                                    );
                                  })
                                  .catch((e) => {
                                    axios
                                      .put(
                                        "/aitems/fail",
                                        { url_images: titem.url_images },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((e) => {
                                        console.log(e.data);
                                      });
                                    if (
                                      e.response &&
                                      e.response.status === 400
                                    ) {
                                      toast.error(
                                        `🤦‍♂️ aff, tienes un error en los campos ingresado, verifica que todo es bien`,
                                        {
                                          autoClose: false,
                                          closeOnClick: true,
                                          draggable: true,
                                        }
                                      );
                                    } else if (e.request) {
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
                              })
                              .catch((e) => {
                                if (e.response && e.response.status === 400) {
                                  toast.error(
                                    `🤦‍♂️ aff, creo que enviaste la imagen que no era, porque me salio error`,
                                    {
                                      autoClose: false,
                                      closeOnClick: true,
                                      draggable: true,
                                    }
                                  );
                                } else if (e.request) {
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
                          } else {
                            toast.warning(
                              "😬 La imagen principal es importante, agregala selecionando la tarjeta de color azul",
                              {
                                autoClose: false,
                                hideProgressBar: true,
                                closeOnClick: true,
                                draggable: true,
                              }
                            );
                          }
                        } else {
                          toast.warning(
                            "😬Recuerda llenar los datos marcados con * y debes ingresar una imagen selecionando la tarjeta de color azul",
                            {
                              autoClose: false,
                              hideProgressBar: true,
                              closeOnClick: true,
                              draggable: true,
                            }
                          );
                        }
                      } else {
                        toast.warning("😬El Campo Stock es importante");
                      }
                    } else {
                      toast.warning("😬El Campo Precio es importante");
                    }
                  } else {
                    toast.warning(
                      "😬El Campo Descripcion es importante es importante"
                    );
                  }
                } else {
                  toast.warning("😬El Campo Titulo es importante");
                }
              } else {
                toast.warning("😬El Campo Codigo es importante");
              }
            }}
            className="btn-save"
            href="#save"
          >
            crear
          </a>
        </div>
      </div>
    </>
  );
}

export default withRouter(NewItem);
