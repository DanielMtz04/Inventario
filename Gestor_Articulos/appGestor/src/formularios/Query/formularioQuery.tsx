import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Input } from "../../../@/components/ui/input";
import "./formularioQuery.css";
import { useNavigate } from "react-router-dom";

interface Option {
  value: number;
  label: string;
}

const Formulario = () => {
  const navigate = useNavigate();
  const [sku, setSku] = useState<string>("");
  const [skuVerified, setSkuVerified] = useState<boolean>(false);
  const [skuExists, setSkuExists] = useState<boolean>(false);
  const [skuDisabled, setSkuDisabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("desactivo");
  const [messageDelete, setMessageDelete] = useState<boolean>(false);
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [department, setDepartment] = useState<number>(0);
  const [itemType, setItemType] = useState<number>(0);
  const [family, setFamily] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [exitDate, setExitDate] = useState<string>("");
  const [discontinued, setDiscontinued] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Option[]>([]);
  const [itemTypes, setItemTypes] = useState<Option[]>([]);
  const [families, setFamilies] = useState<Option[]>([]);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products/departments"
        );
        setDepartments(
          response.data.map((dep: any) => ({
            value: dep.id,
            label: dep.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (department) {
      const fetchItemTypes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/products/classes",
            {
              params: { departmentId: department },
            }
          );
          setItemTypes(
            response.data.map((type: any) => ({
              value: type.id,
              label: type.name,
            }))
          );
        } catch (error) {
          console.error("Error fetching item types:", error);
        }
      };
      fetchItemTypes();
    }
  }, [department]);

  useEffect(() => {
    if (department && itemType) {
      const fetchFamilies = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/products/families",
            {
              params: { departmentId: department, classId: itemType },
            }
          );
          setFamilies(
            response.data.map((fam: any) => ({
              value: fam.id,
              label: fam.description,
            }))
          );
        } catch (error) {
          console.error("Error fetching families:", error);
        }
      };
      fetchFamilies();
    }
  }, [department, itemType]);

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
      setMessage("! Ingrese un SKU para realizar la consulta");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/articles/query/${sku}`
      );

      if (response.data) {
        setSkuExists(true);
        setMessageDelete(true);
        const articleData = response.data;
        setBrand(articleData.brand);
        setModel(articleData.model);
        setDepartment(articleData.department);
        setItemType(articleData.type);
        setFamily(articleData.family);
        setStock(articleData.stock);
        setQuantity(articleData.quantity);
        setStartDate(articleData.startDate);
        setExitDate(articleData.exitDate);
        setDiscontinued(articleData.discontinued);
        setSkuDisabled(true);
      } else {
        setMessage("¡El SKU ingresado no existe!");
        setSkuExists(false);
      }
    } catch (error) {
      console.error("Error al verificar SKU", error);
      setMessage("¡Error al verificar SKU!");
    }
  };

  const handleCanceltoMain = () => {
    setSku("");
    setSkuVerified(false);
    setSkuExists(false);
    setSkuDisabled(false);
    setBrand("");
    setModel("");
    setDepartment(0);
    setItemType(0);
    setFamily(0);
    setStock(0);
    setQuantity(0);
    setStartDate(new Date().toISOString().split("T")[0]);
    setExitDate("1900-01-01");
    setDiscontinued(0);
    setMessage("desactivo");
    setMessageDelete(false);
    setIsSubmitted(false);
    navigate("/mainWindow");
  };

  const handleCancel = () => {
    setSku("");
    setSkuVerified(false);
    setSkuExists(false);
    setSkuDisabled(false);
    setMessage("desactivo");
    setMessageDelete(false);
    setIsSubmitted(false);
  };

  return (
    <div className="formularioQuery">
      <div className="unoQuery"></div>
      <div className="dosQuery">
        <h2 className="headerQuery">Consulta de Artículos</h2>

        {isSubmitted === false && (
          <>
            <h1 className="labelQuery">Sku:</h1>
            <Input
              className="inputQuery"
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
        {messageDelete === false && (
          <p
            className={
              message === "desactivo" ? "messageSkuQuery" : "messageSkuQuery2"
            }
          >
            {message}
          </p>
        )}
        {isSubmitted && <p className={"messageSuccesQuery"}>{message}</p>}

        {skuExists === true && (
          <>
            <div className="horizontalContainerQuery">
              <div className="horizontalItemChange">
                <h1 className="labelQuery">Marca:</h1>
                <Input
                  className="inputQuery"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  disabled={isFormDisabled}
                  placeholder="Ingresa la marca"
                />
              </div>
              <div className="horizontalItemQuery">
                <h1 className="labelQuery">Modelo:</h1>
                <Input
                  className="inputQuery"
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={isFormDisabled}
                  placeholder="Ingrese el modelo"
                />
              </div>
            </div>
            <h1 className="labelQuery">Departamento:</h1>
            <select
              className="inputQuery"
              value={department}
              onChange={(e) => setDepartment(Number(e.target.value))}
              disabled={isFormDisabled}
            >
              <option value={0} disabled>
                Seleccione un departamento
              </option>
              {departments.map((dep) => (
                <option key={dep.value} value={dep.value}>
                  {dep.label}
                </option>
              ))}
            </select>
            <h1 className="labelQuery">Tipo:</h1>
            <select
              className="inputQuery"
              value={itemType}
              onChange={(e) => setItemType(Number(e.target.value))}
              disabled={isFormDisabled}
            >
              <option value={0} disabled>
                Seleccione un tipo
              </option>
              {itemTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <h1 className="labelQuery">Familia:</h1>
            <select
              className="inputQuery"
              value={family}
              onChange={(e) => setFamily(Number(e.target.value))}
              disabled={isFormDisabled}
            >
              <option value={0} disabled>
                Seleccione una familia
              </option>
              {families.map((fam) => (
                <option key={fam.value} value={fam.value}>
                  {fam.label}
                </option>
              ))}
            </select>

            <div className="stockQuantityContainerQuery">
              <div>
                <h1 className="labelQuery">Stock:</h1>
                <Input
                  className="inputQuery inputQueryHalf"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  disabled={isFormDisabled}
                  placeholder="Stock"
                />
              </div>
              <div>
                <h1 className="labelQuery">Cantidad:</h1>
                <Input
                  className="inputQuery inputQueryHalf"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  disabled={isFormDisabled}
                  placeholder="Cantidad"
                />
              </div>
            </div>
            <h1 className="labelQuery">Fecha Alta:</h1>
            <Input
              className="inputQuery"
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isFormDisabled}
              placeholder="Fecha de alta"
            />
            <div className="discontinuedExitDateContainerQuery">
              <div>
                <h1 className="labelChange">Descontinuado:</h1>
                <Input
                  className="inputChange inputChangeHalf"
                  type="number"
                  value={discontinued}
                  placeholder="Fecha de alta"
                  onChange={(e) => setDiscontinued(Number(e.target.value))}
                  disabled={isFormDisabled}
                />
              </div>

              <div>
                <h1 className="labelChange">Fecha Baja:</h1>
                <Input
                  className="inputQuery"
                  type="text"
                  value={exitDate}
                  onChange={(e) => setExitDate(e.target.value)}
                  placeholder="Fecha de baja"
                  disabled={isFormDisabled}
                />
              </div>
            </div>
          </>
        )}

        {skuExists === false && isSubmitted === false && (
          <>
            <button className="buttonContinueQuery" onClick={handleClickButton}>
              Validar
            </button>
            <button className="buttonCancelQuery" onClick={handleCanceltoMain}>
              Cancelar
            </button>
          </>
        )}
        {skuExists === true && (
          <>
            <button className="buttonHighQuery" onClick={handleCancel}>
              Nueva Consulta
            </button>
            <button className="buttonCancelQuery" onClick={handleCanceltoMain}>
              Salir
            </button>
          </>
        )}
      </div>
      <div className="tresQuery"></div>
    </div>
  );
};

export default Formulario;
