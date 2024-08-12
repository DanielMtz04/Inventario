import { useNavigate } from "react-router-dom";
import "./formularioMain.css";
import { useState } from "react";
import { Input } from "../../../@/components/ui/input";

const Formulario = () => {
  const [acción, setAcción] = useState("");
  const navigate = useNavigate();

  const handleClickButton = async () => {
    switch (acción) {
      case "opcion1":
        navigate("/queryWindow");
        break;
      case "opcion2":
        navigate("/addWindow");
        break;
      case "opcion3":
        navigate("/deleteWindow");
        break;
      case "opcion4":
        navigate("/changeWindow");
        break;
      default:
        console.log("Selecciona una opción válida");
        break;
    }
  };

  return (
    <div className="formularioMain">
      <div className="unoMain"></div>
      <div className="dosMain">
        <h2 className="headerMain">Gestor de Artículos</h2>
        <h1 className="labelMain"></h1>
        <select
          className="inputMain"
          value={acción}
          onChange={(e) => setAcción(e.target.value)}
        >
          <option value="">Selecciona una acción</option>
          <option value="opcion1">Realizar Consulta</option>
          <option value="opcion2">Realizar Alta</option>
          <option value="opcion3">Realizar Baja</option>
          <option value="opcion4">Realizar Cambio</option>
        </select>

        <button className="buttonContinueMain" onClick={handleClickButton}>
          Continuar
        </button>
      </div>
      <div className="tresMain"></div>
    </div>
  );
};

export default Formulario;
