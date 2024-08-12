import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Input } from "../../../@/components/ui/input";
import "./formularioAdd.css";
import { useNavigate } from "react-router-dom";

interface Option {
  value: number;
  label: string;
}

const Formulario = () => {
  const navigate = useNavigate();
  const [sku, setSku] = useState<string>("");
  const [skuVerified, setSkuVerified] = useState<boolean>(false);
  const [skuExists, setSkuExists] = useState<boolean | null>(null);
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
  const [exitDate, setExitDate] = useState<string>("1900-01-01");
  const [discontinued, setDiscontinued] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [departments, setDepartments] = useState<Option[]>([]);
  const [itemTypes, setItemTypes] = useState<Option[]>([]);
  const [families, setFamilies] = useState<Option[]>([]);

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
      setMessage("! Ingrese un nuevo sku para continuar con el resigtro");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/articles/validate-sku/${sku}`
      );
      setSkuExists(response.data);
      if (response.data) {
        setMessage("! Ingrese un nuevo sku, el articulo ya existe");
      } else {
        setSkuDisabled(true);
        setMessage(" ");
        setMessageDelete(true);
      }
    } catch (error) {
      console.error("Error al verificar SKU", error);
    }
  };

  const handleSubmit = async () => {
    if (
      !sku ||
      !brand ||
      !model ||
      department === 0 ||
      itemType === 0 ||
      family === 0 ||
      stock === 0 ||
      quantity === 0 ||
      !startDate
    ) {
      alert("¡Complete todos los campos!");
      return;
    }

    if (quantity > stock) {
      alert("¡La cantidad no puede ser mayor al stock, modificalo!");
      return;
    }

    const newArticle = {
      sku,
      brand,
      model,
      department,
      type: itemType,
      family,
      stock,
      quantity,
      startDate,
      exitDate,
      discontinued,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/articles`,
        newArticle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registro completado", response.data);
      setSkuExists(true);
      setIsSubmitted(true);
      setMessage("Registro completado");
    } catch (error) {
      console.error("Error al registrar el artículo", error);
      setMessage(
        "Ocurrió un error al registrar el artículo. Inténtelo de nuevo."
      );
    }
  };

  const handleCanceltoMain = () => {
    setSku("");
    setSkuVerified(false);
    setSkuExists(null);
    setSkuDisabled(false);
    setBrand("");
    setModel("");
    setDepartment(0);
    setItemType(0);
    setFamily(0);
    setStock(0);
    setQuantity(0);
    setStartDate(new Date().toISOString().split("T")[0]);
    setDiscontinued(0);
    setExitDate("1900-01-01");
    setMessage("desactivo");
    setMessageDelete(false);
    setIsSubmitted(false);
    navigate("/mainWindow");
  };

  const handleCancel = () => {
    setSku("");
    setSkuVerified(false);
    setSkuExists(null);
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
  };

  return (
    <div className="formularioAdd">
      <div className="unoAdd"></div>
      <div className="dosAdd">
        <h2 className="headerAdd">Alta de Artículos</h2>

        {isSubmitted === false && (
          <>
            <h1 className="labelAdd">Nuevo sku:</h1>
            <Input
              className="inputAdd"
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
              message === "desactivo" ? "messageSkuAdd" : "messageSkuAdd2"
            }
          >
            {message}
          </p>
        )}
        {isSubmitted && <p className={"messageSuccesAdd"}>{message}</p>}

        {skuExists === false && (
          <>
            <h1 className="labelAdd">Marca:</h1>
            <Input
              className="inputAdd"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ingresa la marca"
            />
            <h1 className="labelAdd">Modelo:</h1>
            <Input
              className="inputAdd"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Ingrese el modelo"
            />
            <h1 className="labelAdd">Departamento:</h1>
            <select
              className="inputAdd"
              value={department}
              onChange={(e) => setDepartment(Number(e.target.value))}
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
            <h1 className="labelAdd">Tipo:</h1>
            <select
              className="inputAdd"
              value={itemType}
              onChange={(e) => setItemType(Number(e.target.value))}
              disabled={department === 0}
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
            <h1 className="labelAdd">Familia:</h1>
            <select
              className="inputAdd"
              value={family}
              onChange={(e) => setFamily(Number(e.target.value))}
              disabled={itemType === 0}
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

            <div className="stockQuantityContainerAdd">
              <div>
                <h1 className="labelAdd">Stock:</h1>
                <Input
                  className="inputAdd inputAddHalf"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="Stock"
                />
              </div>
              <div>
                <h1 className="labelAdd">Cantidad:</h1>
                <Input
                  className="inputAdd inputAddHalf"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Cantidad"
                />
              </div>
            </div>
            <h1 className="labelAdd">Fecha Alta:</h1>
            <Input
              className="inputAdd"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Fecha de alta"
            />

            <button className="buttonHighAdd" onClick={handleSubmit}>
              Realizar Alta
            </button>
            <button className="buttonCancelAdd" onClick={handleCancel}>
              Cancelar
            </button>
          </>
        )}

        {skuExists !== false && isSubmitted === false && (
          <>
            <button className="buttonContinueAdd" onClick={handleClickButton}>
              Registrar
            </button>
            <button className="buttonCancelAdd" onClick={handleCanceltoMain}>
              Cancelar
            </button>
          </>
        )}
        {isSubmitted === true && (
          <>
            <button className="buttonContinueAdd" onClick={handleCancel}>
              Nueva Alta
            </button>
            <button className="buttonCancelAdd" onClick={handleCanceltoMain}>
              Salir
            </button>
          </>
        )}
      </div>
      <div className="tresAdd"></div>
    </div>
  );
};

export default Formulario;
