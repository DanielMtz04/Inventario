import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Input } from "../../../@/components/ui/input";
import "./formularioDelete.css";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
  const navigate = useNavigate();
  const [sku, setSku] = useState<string>("");
  const [skuVerified, setSkuVerified] = useState<boolean>(false);
  const [skuExists, setSkuExists] = useState<boolean>(false);
  const [skuDisabled, setSkuDisabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("desactivo");
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleSku = (e: ChangeEvent<HTMLInputElement>): void => {
    const newSku = e.target.value;
    if (newSku.length <= 6) {
      setSku(newSku);
      setMessage("desactivo");
      setSkuVerified(true);
    }
    if (newSku === "") {
      setSkuVerified(false);
    }
  };

  const handleFocus = () => {
    setMessage("desactivo");
  };

  const handleClickButton = async () => {
    if (skuVerified !== true) {
      setMessage("! Ingrese el Sku del artículo para eliminarlo!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/articles/validate-sku/${sku}`
      );
      console.log(response.data);

      if (response.data) {
        setSkuDisabled(true);
        setMessage("Artículo válido");
        setSkuExists(true);
      } else {
        setMessage("! Ingrese otro SKU, el artículo no existe");
      }
    } catch (error) {
      console.error("Error al verificar SKU", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este artículo?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/articles/${sku}`
      );
      console.log("Baja completada", response.data);
      setIsDeleted(true);
      setMessage("Baja completada");
    } catch (error) {
      console.error("Error al eliminar el artículo", error);
      setMessage("La baja no se completo");
    }
  };

  const handleCanceltoMain = () => {
    setSku("");
    setSkuVerified(false);
    setSkuExists(false);
    setSkuDisabled(false);
    setMessage("desactivo");
    setIsDeleted(false);
    navigate("/mainWindow");
  };

  const handleCancel = () => {
    setSku("");
    setSkuVerified(false);
    setSkuExists(false);
    setSkuDisabled(false);
    setMessage("desactivo");
    setIsDeleted(false);
  };

  return (
    <div className="formularioDelete">
      <div className="unoDelete"></div>
      <div className="dosDelete">
        <h2 className="headerDelete">Baja de Artículos</h2>

        {isDeleted === false && (
          <>
            <h1 className="labelDelete">Sku:</h1>
            <Input
              className="inputDelete"
              type="number"
              value={sku}
              onChange={handleSku}
              onFocus={handleFocus}
              placeholder="Ingrese un número de hasta 6 dígitos"
              min={0}
              disabled={skuDisabled}
            ></Input>
          </>
        )}
        {!isDeleted && (
          <p
            className={
              message === "desactivo"
                ? "messageSkuDelete"
                : message === "Artículo válido"
                ? "messageSkuValidDelete"
                : "messageSkuDelete2"
            }
          >
            {message}
          </p>
        )}
        {isDeleted && <p className={"messageSuccesDelete"}>{message}</p>}

        {skuExists === false && (
          <>
            <button
              className="buttonValidateDelete"
              onClick={handleClickButton}
            >
              Validar Sku
            </button>
            <button className="buttonCancelDelete" onClick={handleCanceltoMain}>
              Cancelar
            </button>
          </>
        )}

        {skuExists === true && isDeleted === false && (
          <>
            <button className="buttonContinueDelete" onClick={handleDelete}>
              Eliminar
            </button>
            <button className="buttonCancelDelete" onClick={handleCanceltoMain}>
              Cancelar
            </button>
          </>
        )}
        {isDeleted === true && (
          <>
            <button className="buttonContinueDelete" onClick={handleCancel}>
              Eliminar otro Sku
            </button>
            <button className="buttonCancelDelete" onClick={handleCanceltoMain}>
              Salir
            </button>
          </>
        )}
      </div>
      <div className="tresDelete"></div>
    </div>
  );
};

export default Formulario;
