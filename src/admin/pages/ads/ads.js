import Axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./ads.css";

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

function Ads() {
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  //const history = useHistory();
  const [urlButton, setUrlButton] = useState("https://infoventasvarios.com.ve");
  const [idSelected, setIdSelected] = useState(false);
  //imgFile
  const [imgfile, setImgFile] = useState();

  useEffect(() => {
    async function getAdsData() {
      await Axios.get("public/ads").then((e) => {
        setData(e.data);
      });
    }
    getAdsData();
  }, []);

  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <div className="base-ads">
          <div className="inputs">
            <label>
              Accion:
              <select
                defaultValue={"true"}
                onInput={(e) => {
                  setIdSelected(e.target.value);
                }}
              >
                <option value="true" disabled>
                  Selecione una Acción
                </option>
                <option value="0">Nuevo Anuncio</option>
                {data?.map((e, i) => {
                  return (
                    <option key={i} value={e.id}>
                      Modificar Anuncio {e.id}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Enlace:
              <input
                onInput={(e) => {
                  setUrlButton(e.target.value);
                }}
                type="text"
              />
            </label>
            <br />
            <label>
              Imagen:
              <input
                type="file"
                accept="image/gif,image/jpg,image/jpeg,image/png"
                onInput={(e) => {
                  const reader = new FileReader();
                  if (e.target.files[0]) {
                    reader.readAsDataURL(e.target.files[0]);
                    setImgFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
          <br />
          <div style={{ textAlign: "center", width: "100%" }}>
            <table className="catalogo-table" style={{ width: "100%" }}>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Enlace</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {data?.map((e, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td>{e.id}</td>
                        <td>
                          <img
                            width="80px"
                            height="80px"
                            src={e.urlimg}
                            alt="publicidad"
                          />
                        </td>
                        <td>
                          {e.button.isButton ? (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={e.button.to}
                            >
                              {e.button.to}
                            </a>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <a
                            href="#a"
                            onClick={() => {
                              Axios.delete(`ads/delete/${e.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              }).then((e) => {
                                setData(e.data.original);
                              });
                            }}
                            className="text-white btn red"
                          >
                            Eliminar
                          </a>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <br />
          <div
            className="button"
            style={idSelected ? {} : { backgroundColor: "c4c4c4" }}
          >
            <a
              style={
                idSelected
                  ? {}
                  : { pointerEvents: "none", cursor: "not-allowed" }
              }
              className={idSelected ? "btn" : "gray"}
              href="##"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Preparando Anuncio");
                const data = new FormData();
                data.append("url_button", urlButton);
                if (idSelected !== false) {
                  if (idSelected !== 0) {
                    data.append("id", idSelected);
                  }
                  if (imgfile !== undefined && imgfile !== null) {
                    data.append("img", imgfile);
                    Axios.post("ads/pub", data, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                      .then((e) => {
                        setData(e.data.original);
                        toast.success("Anuncio Publicado");
                      })
                      .catch((e) => {
                        if (e.response && e.response.data) {
                          toast.warning("Por favor complete todos los datos");
                        } else {
                          toast.error("NO PODEMOS CONECTARNOS AL SERVIDOR");
                        }
                      });
                  } else {
                    toast.warning("Debe selecionar una foto");
                  }
                } else {
                  toast.error("Debe selecionar una Acción");
                }
              }}
            >
              PUBLICAR
            </a>
          </div>
          <div className="base-preview">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              pagination
              direction="horizontal"
            >
              {data?.map((e, i) => {
                return (
                  <SwiperSlide>
                    <div
                      onClick={() => {
                        if (e.button.isButton) {
                          window.open(e.button.to);
                        }
                      }}
                      className="img"
                      key={i}
                      style={{ backgroundImage: `url('${e.urlimg}')` }}
                    ></div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Ads);
