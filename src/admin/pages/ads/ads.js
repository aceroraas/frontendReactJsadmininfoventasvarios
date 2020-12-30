import Axios from "axios";
import { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import settingFile from "../settings/setting-file";
import "./ads.css";
function Ads() {
  const token = window.localStorage.getItem("token");
  //const history = useHistory();
  //title
  const [titleText, setTitleText] = useState("titulo de prueba");
  const [sizeTitle, setSizeTitle] = useState(90);
  const [colorTitle, setColorTitle] = useState("#000");
  //subtitle
  const [subtitleText, setSubTitleText] = useState("subtitulo de prueba");
  const [sizeSubTitle, setSizeSubTitle] = useState(24);
  const [colorSubTitle, setColorSubTitle] = useState("#000");
  //caption
  const [captionText, setCaptionText] = useState("descripcion de prueba");
  const [sizeCaption, setSizeCaption] = useState(25);
  const [colorCaption, setColorCaption] = useState("#000");
  //buttton
  const [buttonText, setButtonText] = useState("Boton de prueba");
  const [sizeButton, setSizeButton] = useState(16);
  const [colorButton, setColorButton] = useState("#000");
  const [textColorButton, setTextColorButton] = useState("#FFF");
  const [urlButton, setUrlButton] = useState("https://infoventasvarios.com.ve");

  //imgbag
  const [img, setImg] = useState("http://via.placeholder.com/1257x480");
  const [imgfile, setImgFile] = useState();

  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <div className="base-ads">
          <div className="inputs">
            <label>
              Titulo:
              <input
                type="text"
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setTitleText(e.target.value);
                  } else {
                    setTitleText("titulo de prueba");
                  }
                }}
              />
            </label>
            <input
              type="color"
              onInput={(e) => {
                setColorTitle(e.target.value);
              }}
            />
            <label>
              Tamaño:
              <input
                value={sizeTitle}
                type="number"
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 100) {
                    if (parseInt(e.target.value) >= 20) {
                      setSizeTitle(parseInt(e.target.value));
                    } else {
                      setSizeTitle(20);
                    }
                  } else {
                    setSizeTitle(100);
                  }
                }}
              />
            </label>
            <br />
            <label>
              Subtitulo:
              <input
                type="text"
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setSubTitleText(e.target.value);
                  } else {
                    setSubTitleText("Subtitulo de prubea");
                  }
                }}
              />
            </label>
            <input
              type="color"
              onInput={(e) => {
                setColorSubTitle(e.target.value);
              }}
            />
            <label>
              Tamaño:
              <input
                value={sizeSubTitle}
                type="number"
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 50) {
                    if (parseInt(e.target.value) >= 20) {
                      setSizeSubTitle(parseInt(e.target.value));
                    } else {
                      setSizeSubTitle(20);
                    }
                  } else {
                    setSizeSubTitle(50);
                  }
                }}
              />
            </label>
            <br />
            <label>
              Descripción / Precio:
              <input
                type="text"
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setCaptionText(e.target.value);
                  } else {
                    setCaptionText("Descripción de prueba");
                  }
                }}
              />
            </label>
            <input
              type="color"
              onInput={(e) => {
                setColorCaption(e.target.value);
              }}
            />
            <label>
              Tamaño:
              <input
                value={sizeCaption}
                type="number"
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 35) {
                    if (parseInt(e.target.value) >= 20) {
                      setSizeCaption(parseInt(e.target.value));
                    } else {
                      setSizeCaption(20);
                    }
                  } else {
                    setSizeCaption(35);
                  }
                }}
              />
            </label>
            <br />
            <label>
              boton:
              <input
                type="text"
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setButtonText(e.target.value);
                  } else {
                    setButtonText("Boton de prueba");
                  }
                }}
              />
            </label>
            <input
              type="color"
              onInput={(e) => {
                setColorButton(e.target.value);
              }}
            />
            <input
              type="color"
              onInput={(e) => {
                setTextColorButton(e.target.value);
              }}
            />
            <label>
              Tamaño:
              <input
                value={sizeButton}
                type="number"
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 60) {
                    if (parseInt(e.target.value) >= 14) {
                      setSizeButton(parseInt(e.target.value));
                    } else {
                      setSizeButton(14);
                    }
                  } else {
                    setSizeButton(60);
                  }
                }}
              />
            </label>
            <label>
              Enlace:
              <input type="text" />
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
                    reader.onload = function (i) {
                      setImg(i.target.result);
                    };
                  }
                }}
              />
            </label>
          </div>
          <br />
          <div className="base-preview">
            <div className="img" style={{ backgroundImage: `url('${img}')` }}>
              <div className="text">
                <div className="container">
                  <div className="title">
                    <h1 style={{ fontSize: sizeTitle, color: colorTitle }}>
                      {titleText}
                    </h1>
                  </div>
                  <div className="subtitle">
                    <h2
                      style={{ fontSize: sizeSubTitle, color: colorSubTitle }}
                    >
                      {subtitleText}
                    </h2>
                  </div>
                  <div className="caption">
                    <p style={{ fontSize: sizeCaption, color: colorCaption }}>
                      {" "}
                      {captionText}
                    </p>
                  </div>
                  <div className="boton">
                    <a
                      style={{
                        fontSize: sizeButton,
                        color: textColorButton,
                        backgroundColor: colorButton,
                      }}
                      href={urlButton}
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button">
            <a
              href="##"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Preparando Anuncio");
                const data = new FormData();
                data.append("title", titleText);
                data.append("color_title", colorTitle);
                data.append("size_title", sizeTitle);
                data.append("subtitle", subtitleText);
                data.append("color_subtitle", colorSubTitle);
                data.append("size_subtitle", sizeSubTitle);
                data.append("description", captionText);
                data.append("color_description", colorCaption);
                data.append("size_description", sizeCaption);
                data.append("button", buttonText);
                data.append("color_button", colorButton);
                data.append("color_text_button", textColorButton);
                data.append("size_button", sizeButton);
                data.append("url_button", urlButton);
                if (imgfile !== undefined && imgfile !== null) {
                  data.append("img", imgfile);
                  Axios.post("ads/pub", data, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                    .then(() => {
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
              }}
            >
              PUBLICAR
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Ads);
