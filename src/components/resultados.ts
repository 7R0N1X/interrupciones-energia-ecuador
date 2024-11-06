import { Notificacione } from "../types/cnelep"
import crearElemento from "../utils/crearElemento"
import mapPinned from '/src/assets/map-pinned.svg';

const resultado = (notificaciones: Notificacione[], funcion: Function): HTMLElement => {
  const contenedorResultados = crearElemento('DIV', '', 'resultados')

  const h2 = crearElemento('H2', 'text-[#FCD116] text-2xl font-bold mt-8')
  h2.textContent = 'Resultados de la consulta'
  contenedorResultados.append(h2)

  const contenedorProgramaciones = crearElemento('DIV', 'flex max-sm:flex-col justify-between sm:gap-4 items-center')

  notificaciones.forEach(notificacion => {
    const { cuen, cuentaContrato: ctaContrato, direccion: domicilio, detallePlanificacion, alimentador } = notificacion

    const contenedorProgramacion = crearElemento('DIV', 'w-full')

    const cuentaContrato = crearElemento('STRONG', 'text-gray-100 mt-8 block')
    cuentaContrato.textContent = 'Cuenta contrato:'
    const spanCuentaContrato = crearElemento('SPAN', 'font-normal', 'cuenta-contrato')
    spanCuentaContrato.textContent = ` ${ctaContrato}`
    cuentaContrato.appendChild(spanCuentaContrato)

    const codigoUnico = crearElemento('STRONG', 'text-gray-100 block')
    codigoUnico.textContent = 'Código único:'
    const spanCodigoUnico = crearElemento('SPAN', 'font-normal', 'cuen')
    spanCodigoUnico.textContent = ` ${cuen}`
    codigoUnico.appendChild(spanCodigoUnico)

    const direccion = crearElemento('STRONG', 'text-gray-100 block')
    direccion.textContent = 'Dirección:'
    const spanDireccion = crearElemento('SPAN', 'font-normal', 'direccion')
    spanDireccion.textContent = ` ${domicilio}`
    direccion.appendChild(spanDireccion)

    const botonSectoresAfectados = crearElemento('BUTTON', 'flex flex-row-reverse justify-center items-center gap-2 text-gray-100 text-sm bg-neutral-800 p-2 rounded-md border border-[#FCD116]/20 hover:border-[#FCD116]/50 transition-colors duration-300 w-44 mt-6')
    botonSectoresAfectados.textContent = 'Sectores afectados'
    botonSectoresAfectados.onclick = () => funcion(alimentador)
    const iconMapPinned = crearElemento('IMG', 'w-4 h-4 inline-block float-left')
    iconMapPinned.setAttribute('src', mapPinned)
    iconMapPinned.setAttribute('alt', 'Mapa de sectores afectados')
    botonSectoresAfectados.appendChild(iconMapPinned)

    const h3 = crearElemento('H3', 'text-gray-100 font-bold my-6')
    h3.textContent = 'Interrupciones de energía programadas:'

    const ul = crearElemento('UL', 'events')

    detallePlanificacion.forEach(evento => {
      const { fechaCorte, horaDesde, horaHasta } = evento
      const li = crearElemento('LI', 'bg-[#232323] border border-[#ffeaa5]/20  text-gray-100 mb-3 sm:mb-2 p-4 rounded-md border-l-4 border-l-[#FCD116] hover:translate-x-1 transition-transform')
      li.textContent = `${fechaCorte}, de ${horaDesde} a ${horaHasta}`
      ul.appendChild(li)
    })
    contenedorProgramacion.append(cuentaContrato, codigoUnico, direccion, botonSectoresAfectados, h3, ul)
    contenedorProgramaciones.append(contenedorProgramacion)
  })
  contenedorResultados.appendChild(contenedorProgramaciones)
  return contenedorResultados
}

export default resultado