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
    ] }
  ];

  const generalTemas = (temas) => {
    let coursesContent = "";
    temas.forEach(title => {
      coursesContent += `
        <div class="${styles.course}">
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
    estudio.forEach((element) => {
      const cursosJSON = JSON.stringify(element.cursos);
      estudiosContent += `
        <div class='${styles.contenedor} contenedorInfo'>
          <p>${element.nombre}</p>
          <button class="btnEstudio" data-curso='${cursosJSON}'>Info</button>
        </div>
      `;
    });
    return estudiosContent;
  };

  const crearContenido = () => {
    let pageContent = document.createElement("div");
    pageContent.innerHTML = `
      <button id="btnFrontEnd">Frontend</button>
      <button id="btnBackend">Backend</button>
      <button id="back" style="display: none;"><=</button>
      <div id="container-courses"></div>
      <div class='contenedorInfo ${styles.prueba}'>
        ${crearEstudio(estudios)}
      </div>
    `;
    return pageContent;
  };

  const cursosHTML = generalTemas(estudios.find(estudio => estudio.nombre === "Html")?.cursos || []);
  const cursosCSS = generalTemas(estudios.find(estudio => estudio.nombre === "Css")?.cursos || []);
  const cursosJavaScript = generalTemas(estudios.find(estudio => estudio.nombre === "JavaScript")?.cursos || []);

  const container = crearContenido();

  const logic = () => {
    const contenedorInfo = document.querySelectorAll(".contenedorInfo");
    const coursesContainer = document.getElementById("container-courses");
    const btnFrontEnd = document.getElementById("btnFrontEnd");
    const btnBackend = document.getElementById("btnBackend")
    const back = document.getElementById("back");

    const esconder = () => {
      contenedorInfo.forEach(element => {
        element.style.display = "none";
      });
    };
    esconder()

    const mostrar = () => {
      contenedorInfo.forEach(element => {
        element.style.display = "flex";
      });
    };

    const mostrarCursos = (cursosHTML) => {
      coursesContainer.innerHTML = cursosHTML;
      coursesContainer.style.display = "block";
    };

    btnFrontEnd.addEventListener("click", () => {
      btnFrontEnd.style.display = "none";
      btnBackend.style.display = "none";
      mostrar();
      back.style.display = "block";
    });

    back.addEventListener("click", () => {
      btnFrontEnd.style.display = "block";
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

