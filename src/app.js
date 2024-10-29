import { inject } from "@vercel/analytics"
import { consultarCortesCnelEp } from './api/cnelep'
import { $, validarCampos, limpiarResultados, crearSeccionResultados, crearSpinner, crearAlerta } from './utils/domHelpers'

document.addEventListener('DOMContentLoaded', () => {
  inject()
  const $identificacion = $('#identificacion')
  const $btnConsultar = $('#consultar')
  const $resultados = $('#resultados')
  const $body = $('body')
  const $empresa = $('#empresa')
  const $tipoConsulta = $('#tipo-consulta')

  let identificacion
  let empresaSeleccionada
  let tipoConsulta
  let existeAlerta

  const mostrarResultados = async () => {
    limpiarResultados($resultados)
    const formulario = $('form')
    $resultados.appendChild(crearSpinner())
    const consulta = await consultarCortesCnelEp(identificacion, empresaSeleccionada, tipoConsulta)

    if (consulta) {
      limpiarResultados($resultados)
      if (consulta.status === 'ERROR') {
        if (!existeAlerta) {
          $body.appendChild(crearAlerta(consulta.mensaje))
          setTimeout(() => {
            $body.querySelector('.alerta').remove()
          }, 3000)
        }
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
    tipoConsulta = $tipoConsulta.value
    empresaSeleccionada = $empresa.value
    existeAlerta = $('.alerta')

    if (validarCampos(identificacion, empresaSeleccionada, tipoConsulta)) {
      mostrarResultados()
    } else {
      if (!existeAlerta) {
        $body.appendChild(crearAlerta('Todos los campos son obligatorios.'))
        setTimeout(() => {
          $body.querySelector('.alerta').remove()
        }, 3000)
      }
    }
  })
})