import FormularioMain from "../../formularios/Main/formularioMain";
import "./mainWindow.css";

const mainWindow = () => {
  return (
    <div className="containerMainWindow">
      <div className="headerMainWindow">
        <h1 className="logoMainWindow">Coppel</h1>
      </div>
      <h2 className="spaceMainWindow"></h2>
      <div className="containerFormMainWindow">
        <FormularioMain></FormularioMain>
      </div>
    </div>
  );
};

export default mainWindow;
