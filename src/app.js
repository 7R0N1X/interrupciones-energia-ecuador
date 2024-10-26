import { consultarCortes } from './api/cnelep'
import { $, validarCampos, limpiarResultados, crearSeccionResultados, crearSpinner } from './utils/domHelpers'

document.addEventListener('DOMContentLoaded', () => {
  const $identificacion = $('#identificacion')
  const $btnConsultar = $('#consultar')
  const $resultados = $('#resultados')
  const $empresa = $('#empresa')

  let identificacion
  let empresaSeleccionada

  const mostrarResultados = async () => {
    limpiarResultados($resultados)
    const formulario = $('form')
    $resultados.appendChild(crearSpinner())
    const consulta = await consultarCortes(identificacion, empresaSeleccionada)

    if (consulta) {
      limpiarResultados($resultados)
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