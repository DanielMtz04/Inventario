# Gestor de Artículos API

## Requisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

**[Java JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)** (versión 17.0.2 recomendada)

**[IntelliJ IDEA](https://www.jetbrains.com/idea/download/)** (Community Edition o Ultimate Edition)

## Instalación y Configuración

**1.-Descargar e Instalar IntelliJ IDEA**

- Ve a la [página de descargas de IntelliJ IDEA](https://www.jetbrains.com/idea/download/).
- Descarga e instala la versión de tu elección (Community Edition es gratuita y suficiente para la mayoría de los proyectos Java).

**2.-Descargar e Instalar Java JDK 17**

- Ve a la [página de descargas de Oracle JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).
- Descarga e instala el JDK 17.0.2.

**3.-Clonar el Repositorio**

```javascript
git clone https://github.com/DanielMtz04/Inventario.git
```

**4.-Abrir poryecto en IntelliJ IDEA**

- Selecciona "Open Project"
- Selecciona el proyecto clonado

**5.-Configurar JDK**

- Ir a File > Project Structure
- Selecciona Project
- En el campo "Project SDK", selecciona el JDK 17 que instalaste

**6.-Configurar CORS**

- Ve a WebConfig.java
- Ruta: CRUD>src>main>java>com.example.CRUD>CORS>
- Modifica el método addCorsMappings
- Cambia http://localhost:5175 por el puerto local en el que se ejecuta la interfaz

**7.-Ejecutar la Aplicación**

Haz clic en el botón Run (el ícono de reproducción verde) en la esquina superior derecha
