import styles from "./learning.css";

export function Learning() {
  const studies = [
    { name: "Html", courses: [
      "Basic HTML Structure", 
      "Semantic Tags",
      "HTML Forms",
      "Multimedia",
      "Advanced HTML and Accessibility"
    ] },
    { name: "Css", courses: [
      "CSS Selectors",
      "Box Model",
      "Flexbox",
      "Grid",
      "CSS Animations",
      "Responsive Design"
    ] },
    { name: "JavaScript", courses: [
      "Variables and Data Types",
      "Conditionals",
      "Loops",
      "Functions",
      "Objects and Arrays",
      "Object-Oriented Programming"
    ] },
    { name: "Nodejs", courses: [
      "Introduction to Node.js",
      "Handling Modules and Packages",
      "File System",
      "Events and Streams",
      "Express.js and Server Creation",
      "Middlewares",
      "Database Access with Node.js"
    ] },
    { name: "Databases", courses: [
      "Data Modeling",
      "Relational Databases (SQL)",
      "Non-Relational Databases (NoSQL)",
      "MongoDB",
      "MySQL",
      "Advanced Queries",
      "ORMs (Object-Relational Mapping)"
    ] },
    { name: "Security", courses: [
      "Principles of Computer Security",
      "Authentication and Authorization",
      "Protection Against Common Attacks (SQL Injection, XSS, CSRF, etc.)",
      "Session and Cookie Management",
      "HTTPS and TLS",
      "OWASP Top 10"
    ] }
  ];

  const generateTopics = (topics) => {
    let coursesContent = "";
    topics.forEach(title => {
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

  const createStudy = (study) => {
    let studiesContent = "";
    study.forEach((element, index) => {
      if (index === 3) {
        studiesContent += `<h3 class="${styles.h1}">Backend:</h3>`;
      } else if (index === 0) {
        studiesContent += `<h3 class="${styles.h1}">Frontend:</h3>`;
      }
      const coursesJSON = JSON.stringify(element.courses);
      studiesContent += `
        <div class='${styles.container} containerInfo'>
          <p>${element.name}</p>
          <button class="${styles.infoButton} studyButton" data-course='${coursesJSON}'>Info</button>
        </div>
      `;
    });
    return studiesContent;
  };

  const createContent = () => {
    let pageContent = document.createElement("div");
    pageContent.innerHTML = `
      <button id="btnCourses" class="${styles.initButton}">Learning Path</button>
      <button id="back" style="display: none; cursor: pointer;">⬅️</button>
      <div id="container-courses"></div>
      <div class='containerInfo ${styles.containers}' style="display: none;">
        ${createStudy(studies)}
      </div>
    `;
    return pageContent;
  };

  const container = createContent();

  const logic = () => {
    const containerInfo = document.querySelectorAll(".containerInfo");
    const coursesContainer = document.getElementById("container-courses");
    const btnCourses = document.getElementById("btnCourses");
    const back = document.getElementById("back");

    const hide = () => {
      containerInfo.forEach(element => {
        element.style.display = "none";
      });
    };
    hide();

    const show = () => {
      containerInfo.forEach(element => {
        element.style.display = "flex";
      });
    };

    const showCourses = (coursesHTML) => {
      coursesContainer.innerHTML = coursesHTML;
      coursesContainer.style.display = "block";
    };

    btnCourses.addEventListener("click", () => {
      btnCourses.style.display = "none";
      show();
      back.style.display = "block";
    });

    back.addEventListener("click", () => {
      btnCourses.style.display = "flex";
      back.style.display = "none";
      hide();
      coursesContainer.style.display = "none";
    });

    document.querySelectorAll(".studyButton").forEach(studyButton => {
      studyButton.addEventListener("click", (event) => {
        const coursesData = event.target.getAttribute("data-course");
        if (coursesData) {
          try {
            const courses = JSON.parse(coursesData);
            showCourses(generateTopics(courses));
            hide();
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("Data attribute 'data-course' is empty");
        }
      });
    });
  };

  return {
    pageContent: container.innerHTML,
    logic,
  };
}


