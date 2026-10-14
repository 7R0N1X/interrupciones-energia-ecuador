<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![HTML5][html-shield]][html-url]
[![CSS3][css-shield]][css-url]
[![JavaScript][js-shield]][js-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<img width="100" height="100" alt="cortes-luz-ecuador" src="https://github.com/user-attachments/assets/c6e21639-f76c-46d1-951c-8857edeea776" />
  <h3 align="center">Interrupciones de Energía en Ecuador </h3>

  <p align="center">
  Consulta los horarios de cortes de luz programados de CNEL EP mediante <br />
  código único, cuenta contrato o número de identificación.
</p>
</div>

<!-- ABOUT THE PROJECT -->

## Acerca del proyecto

**Interrupciones de Energía en Ecuador** es una aplicación web que permite consultar las notificaciones de cortes de luz programados de CNEL EP. Consulta directamente la API oficial de la empresa, sin necesidad de crear una cuenta ni registrarse.

Este proyecto fue realizado con el propósito de **aprender desarrollo web vanilla** (HTML, CSS y JavaScript puro), ideal para quienes están incursionando en el desarrollo frontend.

<!-- GETTING STARTED -->

## Primeros pasos

Para tener una copia local funcionando sigue estos pasos.

### Prerrequisitos

- Node.js 18+ y pnpm (o npm/yarn).
  ```sh
  npm install -g pnpm
  ```
- Tu número de cuenta CNEL y el tipo de consulta.

### Instalación

1. Entra a la carpeta del proyecto
   ```sh
   cd interrupciones-energia-ecuador
   ```
2. Instala las dependencias
   ```sh
   pnpm install
   ```
3. Inicia el servidor de desarrollo
   ```sh
   pnpm dev
   ```
4. Abre tu navegador en la URL que se muestra en terminal (por defecto `http://localhost:5173`)

### Build para producción

```sh
pnpm build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

<!-- USAGE EXAMPLES -->

## Uso

1. Selecciona el tipo de consulta (Código Único, Cuenta Contrato, Número de identificación).
2. Ingresa el número correspondiente.
3. Haz clic en **Consultar**.
4. Revisa los resultados.

<!-- LICENSE -->

## Licencia

Este proyecto es de código abierto bajo la licencia [MIT](https://github.com/7R0N1X/interrupciones-energia-ecuador/blob/main/LICENSE)

<!-- MARKDOWN LINKS & IMAGES -->

[html-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/es/docs/Web/HTML
[css-shield]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/es/docs/Web/CSS
[js-shield]: https://img.shields.io/badge/javascript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=white
[js-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
