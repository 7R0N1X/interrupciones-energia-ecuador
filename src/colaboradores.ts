import { obtenerColaboradores } from "./api/github";
import { crearCardContribuyentes, crearSpinner } from "./utils/domHelpers";

document.addEventListener('DOMContentLoaded', async () => {
  const $contribuciones = document.querySelector('#contribuciones ')
  const spinner = crearSpinner()
  $contribuciones?.append(spinner)
  const data = await obtenerColaboradores()
  spinner.remove()
  data.forEach(contribuidor => {
    const { avatar_url, html_url, login, contributions } = contribuidor
    const card = crearCardContribuyentes(avatar_url, html_url, login, contributions);
    $contribuciones?.append(card)
  });
})


