import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Input } from "../../../@/components/ui/input";
import "./formularioChange.css";
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
  const [articleId, setArticleId] = useState<string>("");
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
  const [discontinued, setDiscontinued] = useState<boolean>(false);
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
      setMessage("! Ingrese el SKU del articulo para realizar cambios");
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
        setArticleId(articleData.articleId);
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

  const handleSubmit = async () => {
    if (quantity > stock) {
      alert("¡La cantidad no puede ser mayor al stock, modificalo!");
      return;
    }

    const newArticle = {
      articleId,
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
      discontinued: discontinued ? 1 : 0,
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
      console.log("Articulo Actualizado", response.data);
      setSkuExists(false);
      setIsSubmitted(true);
      setMessage("Articulo Actualizado");
    } catch (error) {
      console.error("Error al registrae el artículo", error);
      setMessage(
        "Ocurrió un error al registrar el artículo. Inténtelo de nuevo."
      );
    }
  };
  const handleDiscontinuedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setDiscontinued(isChecked);
    if (isChecked) {
      setExitDate(new Date().toISOString().split("T")[0]);
    } else {
      setExitDate("1900-01-01");
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
    setDiscontinued(false);
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
    setBrand("");
    setModel("");
    setDepartment(0);
    setItemType(0);
    setFamily(0);
    setStock(0);
    setQuantity(0);
    setStartDate(new Date().toISOString().split("T")[0]);
    setExitDate("1900-01-01");
    setDiscontinued(false);
    setMessage("desactivo");
    setMessageDelete(false);
    setIsSubmitted(false);
  };

  return (
    <div className="formularioChange">
      <div className="unoChange"></div>
      <div className="dosChange">
        <h2 className="headerChange">Cambio en Artículos</h2>

        {isSubmitted === false && (
          <>
            <h1 className="labelChange">Sku:</h1>
            <Input
              className="inputChange"
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
              message === "desactivo" ? "messageSkuChange" : "messageSkuChange2"
            }
          >
            {message}
          </p>
        )}
        {isSubmitted && <p className={"messageSuccesChange"}>{message}</p>}

        {skuExists === true && (
          <>
            <div className="horizontalContainerChange">
              <div className="horizontalItemChange">
                <h1 className="labelChange">Marca:</h1>
                <Input
                  className="inputChange"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ingresa la marca"
                />
              </div>
              <div className="horizontalItemChange">
                <h1 className="labelChange">Modelo:</h1>
                <Input
                  className="inputChange"
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Ingrese el modelo"
                />
              </div>
            </div>

            <h1 className="labelChange">Departamento:</h1>
            <select
              className="inputChange"
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
            <h1 className="labelChange">Tipo:</h1>
            <select
              className="inputChange"
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
            <h1 className="labelChange">Familia:</h1>
            <select
              className="inputChange"
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

            <div className="stockQuantityContainerChange">
              <div>
                <h1 className="labelChange">Stock:</h1>
                <Input
                  className="inputChange inputChangeHalf"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="Stock"
                />
              </div>
              <div>
                <h1 className="labelChange">Cantidad:</h1>
                <Input
                  className="inputChange inputChangeHalf"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Cantidad"
                />
              </div>
            </div>
            <h1 className="labelChange">Fecha Alta:</h1>
            <Input
              className="inputChange"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Fecha de alta"
              disabled={true}
            />

            <div className="discontinuedExitDateContainerChange">
              <div>
                <h1 className="labelChange">Descontinuado:</h1>
                <Input
                  className="inputChange inputChangeHalf"
                  type="checkbox"
                  value={startDate}
                  placeholder="Fecha de alta"
                  checked={discontinued}
                  onChange={handleDiscontinuedChange}
                />
              </div>

              <div>
                <h1 className="labelChange">Fecha de Baja:</h1>
                <Input
                  className="inputChange inputChangeHalf"
                  type="date"
                  value={exitDate}
                  onChange={(e) => setExitDate(e.target.value)}
                  placeholder="Fecha de baja"
                  disabled={true}
                />
              </div>
            </div>
          </>
        )}

        {skuExists === false && isSubmitted === false && (
          <>
            <button
              className="buttonContinueChange"
              onClick={handleClickButton}
            >
              Validar
            </button>
            <button className="buttonCancelChange" onClick={handleCanceltoMain}>
              Cancelar
            </button>
          </>
        )}
        {skuExists === true && (
          <>
            <button className="buttonHighChange" onClick={handleSubmit}>
              Actualizar
            </button>
            <button className="buttonCancelChange" onClick={handleCancel}>
              Cancelar
            </button>
          </>
        )}

        {isSubmitted === true && (
          <>
            <button className="buttonContinueChange" onClick={handleCancel}>
              Nueva Actualización
            </button>
            <button className="buttonCancelChange" onClick={handleCanceltoMain}>
              Salir
            </button>
          </>
        )}
      </div>
      <div className="tresChange"></div>
    </div>
  );
};

export default Formulario;
