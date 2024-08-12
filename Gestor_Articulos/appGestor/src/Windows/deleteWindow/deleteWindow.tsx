import "./deleteWindow.css";
import FormularioDelete from "../../formularios/Delete/formularioDelete";

const deleteWindow = () => {
  return (
    <div className="containerDeleteWindow">
      <div className="headerDeleteWindow">
        <h1 className="logoDeleteWindow">Coppel</h1>
      </div>
      <h2 className="spaceDeleteWindow"></h2>
      <div className="containerFormDeleteWindow">
        <FormularioDelete></FormularioDelete>
      </div>
    </div>
  );
};

export default deleteWindow;
