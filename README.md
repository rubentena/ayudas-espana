# AyudasEspaña: Buscador Inteligente de Prestaciones Sociales

![AyudasEspaña Hero](https://via.placeholder.com/1200x630.png?text=Buscador+Inteligente+de+Ayudas+Sociales)

**AyudasEspaña** es una herramienta web de código abierto, desarrollada para simplificar el acceso a la información sobre ayudas y prestaciones sociales en España. A través de un cuestionario dinámico e inteligente, la aplicación guía a los usuarios para que descubran, de forma rápida, anónima y sencilla, las ayudas estatales y autonómicas a las que podrían tener derecho.

**Enlace al proyecto en producción:** [`\[URL DE TU PROYECTO EN VERCEL\]`](https://ayudas-espana.vercel.app/)

---

## 🎯 Motivación

El sistema de protección social en España es complejo y fragmentado. Encontrar información clara y consolidada sobre qué ayudas se pueden solicitar puede ser una tarea abrumadora, especialmente para personas en situaciones de vulnerabilidad.

Este proyecto nace con el objetivo de **empoderar a los ciudadanos**, proporcionando un punto de acceso único y unificado que elimine barreras informativas. La misión de AyudasEspaña es ofrecer una primera orientación clara, fiable y directa, basada exclusivamente en fuentes oficiales.

---

## ✨ Características Principales

-   **Cuestionario Inteligente y Adaptativo**: El sistema utiliza lógica condicional para mostrar únicamente las preguntas relevantes para el usuario, creando un flujo rápido y personalizado que evita la fatiga del formulario.
-   **Base de Datos Exhaustiva**: Compila decenas de ayudas estatales y autonómicas, incluyendo prestaciones para situaciones de desempleo, familia, vivienda, discapacidad, dependencia, inmigración y colectivos específicos (familias numerosas, monoparentales, víctimas de violencia de género, etc.).
-   **Resultados Claros y Accionables**: Al finalizar, el usuario recibe una lista de las ayudas compatibles, cada una con su descripción, la cuantía estimada, el organismo gestor y un enlace directo a la fuente oficial para iniciar el trámite.
-   **Interfaz Rápida y Accesible**: Desarrollada con HTML, CSS y JavaScript puro (Vanilla JS), garantizando un rendimiento óptimo y una carga rápida en cualquier dispositivo, sin depender de librerías o frameworks pesados.
-   **100% Anónimo y Gratuito**: No se recopilan ni almacenan datos personales. Toda la lógica se ejecuta en el navegador del cliente, garantizando la privacidad total del usuario.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto ha sido construido con un enfoque minimalista y eficiente, utilizando las tecnologías fundamentales de la web:

-   **HTML5**: Para la estructura semántica del contenido.
-   **CSS3**: Para el diseño y la maquetación responsive, utilizando Flexbox y Grid.
-   **JavaScript (ES6+)**: Para toda la lógica de la aplicación:
    -   Motor del cuestionario dinámico.
    -   Manipulación del DOM.
    -   Motor de filtrado de la base de datos.
-   **JSON**: Utilizado como base de datos estática para almacenar toda la información de las ayudas.

---

## 🚀 Cómo Empezar

Para ejecutar este proyecto de forma local, solo necesitas un navegador web.

1.  **Clona el repositorio:**
    ```
    git clone https://github.com/tu-usuario/ayudas-espana-web.git
    ```
2.  **Navega a la carpeta del proyecto:**
    ```
    cd ayudas-espana-web
    ```
3.  **Abre `index.html` en tu navegador.**
    -   **Recomendación:** Para evitar posibles problemas con la carga del archivo `ayudas.json` a través del protocolo `file://`, es recomendable usar un servidor local. Si tienes Visual Studio Code, puedes usar la extensión **Live Server**.

---

## 📁 Estructura del Proyecto

El proyecto está organizado de la siguiente manera para facilitar su mantenimiento:

/
|-- css/
| |-- styles.css # Hoja de estilos principal
|
|-- js/
| |-- main.js # Controlador principal de la aplicación
| |-- questionnaire.js # Lógica y preguntas del cuestionario
| |-- results.js # Lógica para mostrar los resultados
|
|-- data/
| |-- ayudas.json # Base de datos con todas las ayudas
|
|-- index.html # Estructura principal de la página
|
|-- README.md # Este archivo

text

---

## ⚖️ Licencia

Este proyecto se distribuye bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👤 Autor

Este proyecto ha sido ideado, diseñado y desarrollado por **Ruben Tena Martinez**.

-   **LinkedIn**: [www.linkedin.com/in/rubén-t-17b238a2](https://www.linkedin.com/in/rub%C3%A9n-t-17b238a2)