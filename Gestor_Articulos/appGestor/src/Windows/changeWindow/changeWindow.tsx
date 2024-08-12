import "./changeWindow.css";
import FormularioChange from "../../formularios/Change/formularioChange";

const changeWindow = () => {
  return (
    <div className="containerChangeWindow">
      <div className="headerChangeWindow">
        <h1 className="logoChangeWindow">Coppel</h1>
      </div>
      <h2 className="spaceChangeWindow"></h2>
      <div className="containerFormChangeWindow">
        <FormularioChange></FormularioChange>
      </div>
    </div>
  );
};

export default changeWindow;
