import { Notificacione } from '../types/cnelep';
import { consultarSectoresAfectadosCnelEp } from '../api/cnelep';
import triangleIcon from '/src/assets/triangle-alert.svg';
import mapPinned from '/src/assets/map-pinned.svg';

export const $ = (elem: string): HTMLElement | null => document.querySelector(elem)

const crearElemento = (tag: string, className: string, id?: string): HTMLElement => {
  const el = document.createElement(tag)
  if (id) el.id = id
  if (className) el.className = className
  return el
}

const crearModal = (sectoresAfectados: string): HTMLElement => {
  const container = crearElemento('DIV', 'fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-neutral-900/50 flex justify-center items-center p-4')

  const modalContent = crearElemento('DIV', 'modal w-[700px] bg-neutral-900 border border-[#E8F0FE]/50 rounded-lg overflow-hidden')

  const modalHeader = crearElemento('HEADER', 'flex justify-between items-center p-4 border-b border-[#E8F0FE]/50')
  const modalTitle = crearElemento('H2', 'text-xl text-[#FCD116] font-bold')
  modalTitle.textContent = 'Sectores afectados'
  const modalClose = crearElemento('BUTTON', 'size-8 font-bold  rounded-lg cursor-pointer text-gray-100 flex justify-center items-center leading-none')
  modalClose.setAttribute('aria-label', 'Cerrar modal')
  modalClose.setAttribute('title', 'Cerrar ventana')
  modalClose.textContent = '✕'
  modalClose.onclick = () => {
    container.remove()
  }

  const modalBody = crearElemento('DIV', 'p-4 text-gray-100')
  const p = crearElemento('P', 'text-gray-100')
  p.textContent = `${sectoresAfectados}.`

  modalHeader.append(modalTitle, modalClose)
  modalBody.append(p)
  modalContent.append(modalHeader, modalBody)
  container.append(modalContent)
  return container
}

export const mostrarModal = async (alimentador: string): Promise<any> => {
  const sectoresAfectados = await consultarSectoresAfectadosCnelEp(alimentador)
  const body = $('body')
  if (sectoresAfectados) body?.append(crearModal(sectoresAfectados))
}

export const crearSpinner = (): HTMLElement => {
  const spinner = crearElemento("div", "sk-circle");

  for (let i = 1; i <= 12; i++) {
    const circle = crearElemento("div", `sk-circle${i} sk-child`);
    spinner.appendChild(circle);
  }

  return spinner;
}

export const validarCampos = (identificacion: String, empresa: string, tipoConsulta: string): Boolean => {
  if (empresa === '' || tipoConsulta === '' || identificacion === '') {
    return false
  }
  return true
}

export const limpiarResultados = (elem: HTMLElement): any => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild)
  }
}

export const crearSeccionResultados = (notificaciones: Notificacione[]): HTMLElement => {
  const divResultados = crearElemento('DIV', '', 'resultados')
  const h2 = crearElemento('H2', 'text-[#FCD116] text-2xl font-bold mt-8')
  h2.textContent = 'Resultados de la consulta'
  divResultados.append(h2)
  const divPlanificaciones = crearElemento('DIV', 'flex max-sm:flex-col justify-between sm:gap-4 items-center')

  notificaciones.forEach(notificacion => {
    const { cuen, cuentaContrato, direccion, detallePlanificacion, alimentador } = notificacion

    const divDetallePlanificacion = crearElemento('DIV', 'w-full')

    const strongCuentaContrato = crearElemento('STRONG', 'text-gray-100 mt-8 block')
    strongCuentaContrato.textContent = 'Cuenta contrato:'
    const spanCuentaContrato = crearElemento('SPAN', 'font-normal', 'cuenta-contrato')
    spanCuentaContrato.textContent = ` ${cuentaContrato}`
    strongCuentaContrato.appendChild(spanCuentaContrato)

    const strongCUEN = crearElemento('STRONG', 'text-gray-100 block')
    strongCUEN.textContent = 'Código único:'
    const spanCodigoUnico = crearElemento('SPAN', 'font-normal', 'cuen')
    spanCodigoUnico.textContent = ` ${cuen}`
    strongCUEN.appendChild(spanCodigoUnico)

    const strongDireccion = crearElemento('STRONG', 'text-gray-100 block')
    strongDireccion.textContent = 'Dirección:'
    const spanDireccion = crearElemento('SPAN', 'font-normal', 'direccion')
    spanDireccion.textContent = ` ${direccion}`
    strongDireccion.appendChild(spanDireccion)

    const btnSectorsAfectados = crearElemento('BUTTON', 'flex flex-row-reverse justify-center items-center gap-2 text-gray-100 text-sm bg-neutral-800 p-2 rounded-md border border-[#FCD116]/20 hover:border-[#FCD116]/50 transition-colors duration-300 w-44 mt-6')
    btnSectorsAfectados.textContent = 'Sectores afectados'
    btnSectorsAfectados.onclick = () => mostrarModal(alimentador)

    const iconMapPinned = crearElemento('IMG', 'w-4 h-4 inline-block float-left')
    iconMapPinned.setAttribute('src', mapPinned)
    btnSectorsAfectados.appendChild(iconMapPinned)


    const h3 = crearElemento('H3', 'text-gray-100 font-bold my-6')
    h3.textContent = 'Interrupciones de energía programadas:'

    const ul = crearElemento('UL', 'events')
    detallePlanificacion.forEach(evento => {
      const { fechaCorte, horaDesde, horaHasta } = evento

      const li = crearElemento('LI', 'bg-[#232323] border border-[#ffeaa5]/20  text-gray-100 mb-3 sm:mb-2 p-4 rounded-md border-l-4 border-l-[#FCD116] hover:translate-x-1 transition-transform')
      li.textContent = `${fechaCorte}, de ${horaDesde} a ${horaHasta}`
      ul.appendChild(li)
    })
    divDetallePlanificacion.append(strongCuentaContrato, strongCUEN, strongDireccion, btnSectorsAfectados, h3, ul)
    divPlanificaciones.append(divDetallePlanificacion)
  })
  divResultados.appendChild(divPlanificaciones)
  return divResultados
}

export const crearAlerta = (mensaje: string): HTMLElement => {
  const divAlerta = crearElemento('DIV', 'alerta flex items-center gap-4 p-4 mt-8 border border-[#ED1C24] bg-[#C41017] rounded-md max-w-[400px] fixed bottom-2 right-2')
  const triangleAlerta = crearElemento('IMG', 'triangle-alert')
  triangleAlerta.setAttribute('src', triangleIcon)
  const mensajeAlerta = crearElemento('P', 'text-gray-100 text-sm')
  mensajeAlerta.textContent = mensaje
  divAlerta.append(triangleAlerta, mensajeAlerta)
  return divAlerta
}