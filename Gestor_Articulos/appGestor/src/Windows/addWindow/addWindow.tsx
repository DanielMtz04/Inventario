import "./addWindow.css";
import FormularioAdd from "../../formularios/Add/formularioAdd";

const addWindow = () => {
  return (
    <div className="containerAddWindow">
      <div className="headerAddWindow">
        <h1 className="logoAddWindow">Coppel</h1>
      </div>
      <h2 className="spaceAddWindow"></h2>
      <div className="containerFormAddWindow">
        <FormularioAdd></FormularioAdd>
      </div>
    </div>
  );
};

export default addWindow;
