import styles from "./aprendizaje.css";

export function Aprendizaje() {
  const estudios = [
    { nombre: "Html", cursos: [
      "Estructura Básica de HTML", 
      "Etiquetas Semánticas",
      "Formularios HTML",
      "Multimedia",
      "HTML Avanzado y Accesibilidad"
    ] },
    { nombre: "Css", cursos: [
      "Selectores CSS",
      "Modelo de Caja",
      "Flexbox",
      "Grid",
      "Animaciones CSS",
      "Responsive Design"
    ] },
    { nombre: "JavaScript", cursos: [
      "Variables y Tipos de Datos",
      "Condicionales",
      "Bucles",
      "Funciones",
      "Objetos y Arrays",
      "Programación Orientada a Objetos"
    ] },
    { nombre: "Nodejs", cursos: [
      "Introducción a Node.js",
      "Manejo de módulos y paquetes",
      "Sistema de archivos",
      "Eventos y streams",
      "Express.js y creación de servidores",
      "Middlewares",
      "Acceso a bases de datos con Node.js"
    ] },
    { nombre: "Bases de Datos", cursos: [
      "Modelado de datos",
      "Bases de datos relacionales (SQL)",
      "Bases de datos no relacionales (NoSQL)",
      "MongoDB",
      "MySQL",
      "Queries avanzadas",
      "ORMs (Object-Relational Mapping)"
    ] },
    { nombre: "Seguridad", cursos: [
      "Principios de seguridad informática",
      "Autenticación y autorización",
      "Protección contra ataques comunes (SQL Injection, XSS, CSRF, etc.)",
      "Gestión de sesiones y cookies",
      "HTTPS y TLS",
      "OWASP Top 10"
    ] }
  ];

  const generalTemas = (temas) => {
    let coursesContent = "";
    temas.forEach(title => {
      coursesContent += `
        <div class="${styles.course }">
          <div class="course-info">
            <h2>${title}</h2>
            <progress value="0" max="100"></progress>
          </div>
        </div>
      `;
    });
    return coursesContent;
  };

  const crearEstudio = (estudio) => {
    let estudiosContent = "";
    estudio.forEach((element, index) => {
      if (index === 3) {
        estudiosContent += `<h3 class="${styles.h1}" >Backend:</h3>`;
      } else if (index === 0) {
        estudiosContent += `<h3 class="${styles.h1}" >Frontend:</h3>`;
      }
      const cursosJSON = JSON.stringify(element.cursos);
      estudiosContent += `
        <div class='${styles.contenedor} contenedorInfo'>
          <p>${element.nombre}</p>
          <button class="${styles.botonInfo} btnEstudio" data-curso='${cursosJSON}'>Info</button>
        </div>
      `;
    });
    return estudiosContent;
  };

  const crearContenido = () => {
    let pageContent = document.createElement("div");
    pageContent.innerHTML = `
      <button id="btnCursos" class="${styles.botonInit}" >Ruta de aprendizaje</button>
      <button id="back" style="display: none;cursor: pointer;">⬅️</button>
      <div id="container-courses"></div>
      <div class='contenedorInfo ${styles.conetenedores}' style="display: none;">
        ${crearEstudio(estudios)}
      </div>
    `;
    return pageContent;
  };

 
  const container = crearContenido();

  const logic = () => {
    const contenedorInfo = document.querySelectorAll(".contenedorInfo");
    const coursesContainer = document.getElementById("container-courses");
    const btnCursos = document.getElementById("btnCursos");
    const back = document.getElementById("back");

    const esconder = () => {
      contenedorInfo.forEach(element => {
        element.style.display = "none";
      });
    };
    esconder();

    const mostrar = () => {
      contenedorInfo.forEach(element => {
        element.style.display = "flex";
      });
    };

    const mostrarCursos = (cursosHTML) => {
      coursesContainer.innerHTML = cursosHTML;
      coursesContainer.style.display = "block";
    };

    btnCursos.addEventListener("click", () => {
      btnCursos.style.display = "none";
      mostrar();
      back.style.display = "block";
    });
  
    back.addEventListener("click", () => {
      btnCursos.style.display = "flex";
      back.style.display = "none";
      esconder();
      coursesContainer.style.display = "none";
    });

    document.querySelectorAll(".btnEstudio").forEach(btnEstudio => {
      btnEstudio.addEventListener("click", (event) => {
        const cursosData = event.target.getAttribute("data-curso");
        if (cursosData) {
          try {
            const cursos = JSON.parse(cursosData);
            mostrarCursos(generalTemas(cursos));
            esconder();
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("Data attribute 'data-curso' is empty");
        }
      });
    });
  };

  return {
    pageContent: container.innerHTML,
    logic,
  };
}


