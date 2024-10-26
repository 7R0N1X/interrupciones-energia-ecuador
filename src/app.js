import { consultarCortes } from './api/cnelep'
import { $, validarCampos, limpiarResultados, crearSeccionResultados } from './utils/domHelpers'

document.addEventListener('DOMContentLoaded', () => {
  const $identificacion = $('#identificacion')
  const $btnConsultar = $('#consultar')
  const $resultados = $('#resultados')
  const $empresa = $('#empresa')

  let identificacion
  let empresaSeleccionada

  const mostrarResultados = async () => {
    limpiarResultados($resultados)
    const formulario = document.querySelector('form')
    const consulta = await consultarCortes(identificacion, empresaSeleccionada)

    if (consulta) {
      if (consulta.status === 'ERROR') {
        alert(consulta.mensaje);
      } else if (consulta.status === 'OK') {
        const { notificaciones } = consulta
        $resultados.appendChild(crearSeccionResultados(notificaciones))
      }
    }
    formulario.reset()
  }

  $btnConsultar.addEventListener('click', (e) => {
    e.preventDefault()
    identificacion = $identificacion.value
    empresaSeleccionada = $empresa.value
    if (validarCampos(identificacion, empresaSeleccionada)) mostrarResultados()
  })
})