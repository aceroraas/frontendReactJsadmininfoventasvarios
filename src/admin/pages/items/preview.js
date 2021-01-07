import Axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Goback from "../../componente/goback/goback";
import Loading from "../../componente/load/loading";
import Nav from "../../componente/nav/nav";
import "./preview.css";

function FotoPrincipal({ foto }) {
  useEffect(() => {
    const img = document.getElementById("principal");
    img.addEventListener("click", (e) => {
      e.preventDefault();
      toast("presione Esc para salir de pantalla completa");
      img.setAttribute("class", "overlay");
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Backspace") {
          img.removeAttribute("class");
        }
      });
    });
  }, []);
  return (
    <>
      <div className="imagen-principal">
        <img
          id="principal"
          loading="lazy"
          src={foto}
          alt={"foto"}
          onClick={(e) => {}}
        />
      </div>
    </>
  );
}

function FotosMiniaturas({ fotos, setTer }) {
  return (
    <>
      <div className="tumbnails">
        {fotos.img_one ? (
          <button
          id='img1'
            onClick={(e) => {
              e.preventDefault();
              setTer(fotos.img_one);
            }}
          >
            <img
              loading="lazy"
              src={fotos.img_one}
              alt="tumnail"
              width="100px"
              height="100px"
            />
          </button>
        ) : (
          ""
        )}

        {fotos.img_two ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setTer(fotos.img_two);
            }}
          >
            <img
              loading="lazy"
              src={fotos.img_two}
              alt="tumnail"
              width="100px"
              height="100px"
            />
          </button>
        ) : (
          ""
        )}
        {fotos.img_tree ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setTer(fotos.img_tree);
            }}
          >
            <img
              loading="lazy"
              src={fotos.img_tree}
              alt="tumnail"
              width="100px"
              height="100px"
            />
          </button>
        ) : (
          ""
        )}
        {fotos.img_four ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setTer(fotos.img_four);
            }}
          >
            <img
              src={fotos.img_four}
              alt="tumnail"
              width="100px"
              height="100px"
            />
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function AreaFotos({ imgs }) {
  const [imgMain, setImgMain] = useState(imgs.img_one);
  return (
    <>
      <FotoPrincipal foto={imgMain} />
      <FotosMiniaturas fotos={imgs} setTer={setImgMain} />
    </>
  );
}

function Información({ data }) {
  const history = useHistory();
  const [quanty, setQuanty] = useState(data.price);
  return (
    <>
      <div className="base-Informacion">
        <div className="Titulo">
          <h1>{data.title}</h1>
        </div>
        <div className="marca">
          {data.brand ? (
            <>
              Marca:<h2> {data.brand}</h2>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="precio-unidad">
          Precio: <h3> {parseFloat(data.price).toFixed(2)} $</h3>
        </div>
        {data.stock>0?
        <div className="cantidad">
          <label>
            CANTIDAD:
            <br />
            <input
              onClick={(e) => {
                setQuanty(
                  parseFloat(parseFloat(data.price) * parseInt(e.target.value))
                  );
              }}
              type="number"
              defaultValue={1}
              min={1}
              max={data.stock}
            />
          </label>
        </div>
        :<div className="cantidad"><h3 style={{color:'red'}}>No disponible</h3></div>}

        <div className="precio-total">
          <h3>Total: {parseFloat(quanty).toFixed(2)} $</h3>
        </div>
        <div className="button-price">
          <button
            onClick={(e) => {
              history.goBack();
              window.close()
            }}
          >
            Salir De vista Previa
          </button>
        </div>
      </div>
    </>
  );
}

function Description({ htmltext }) {
  useEffect(() => {
    const main = document.getElementById("captions");
    const template = document.createElement("div");
    template.innerHTML = htmltext;
    main.appendChild(template);
  }, [htmltext]);
  return (
    <>
      <div className="description-text">
        <div className="title-description">
          <b>Descripción</b>
        </div>
        <hr />
        <div id="captions" className="ttexdescription"></div>
      </div>
    </>
  );
}

function Preview() {
  const [cargando, setCargando] = useState(false);
  const [imgs, setImgs] = useState({});
  const [dataItem, setDataItem] = useState({});
  const { id } = useParams();
  const history= useHistory();
  useEffect(() => {
    async function callbackup() {
      const token = window.localStorage.getItem("token");
      await Axios.get(`aitems/find/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((e) => {
        saveOld = { ...saveOld, data: e.data };
        saveOld = { ...saveOld, imgs: e.data.url_images };
      })
    }
    document.querySelector(".base-goback").style.marginLeft = "0px";
    let saveOld = {
      data: "",
      imgs: "",
    };

    const preview = {
      data: JSON.parse(window.localStorage.getItem("data")),
      imgs: JSON.parse(window.localStorage.getItem("imgs")),
    };
    
    if (parseInt(id) > 0) {
     async function setbackup() {
       await callbackup()
        if (Object.keys(preview.data).length === 0) {
          await setDataItem(saveOld.data);
        }
        if (Object.keys(preview.imgs).length === 0) {
          callbackup();
          await setImgs(JSON.parse(saveOld.imgs));
          await setCargando(true);
          const auto = document.getElementById('img1');
          auto.click();
        }else if(Object.keys(preview.imgs).length > 0){
          let newPreview= Object.assign(JSON.parse(saveOld.imgs),preview.imgs);
          await setImgs(newPreview);
          await setCargando(true);
        }        
      }
      async function callALL() {
        await setDataItem(preview.data);
        await setbackup();
      }
      callALL();
    }else{
      async function callALL() {
        if(Object.keys(preview.imgs).length===0){
          toast.error('debe selecionar almenos una imagen');
          setTimeout(()=>{
            history.push('/items');
          },4000);
        }else{
          await setDataItem(preview.data);
          await setImgs(preview.imgs);
          setCargando(true);
        }
      }
      callALL();
    }

  }, [id,history]);
  return (
    <>
      <Nav />
      <Goback />
      <div className="base-items">
        <div className="main">
          <div className="base-imgs">
            <div className="card-imgs-pre">
              {cargando ? <AreaFotos imgs={imgs} /> : <Loading />}
            </div>
          </div>
          <div className="base-details-s">
            <div className="card-details-pre">
              {cargando ? <Información data={dataItem} /> : ""}
            </div>
          </div>
          <br />
          <div className="base-caption">
            <div className="card-caption-pre">
              {cargando ? <Description htmltext={dataItem.description} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Preview);
