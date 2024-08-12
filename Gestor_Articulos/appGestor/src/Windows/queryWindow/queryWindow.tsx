import "./queryWindow.css";
import FormularioQuery from "../../formularios/Query/formularioQuery";

const queryWindow = () => {
  return (
    <div className="containerQueryWindow">
      <div className="headerQueryWindow">
        <h1 className="logoQueryWindow">Coppel</h1>
      </div>
      <h2 className="spaceQueryWindow"></h2>
      <div className="containerFormQueryWindow">
        <FormularioQuery></FormularioQuery>
      </div>
    </div>
  );
};

export default queryWindow;
