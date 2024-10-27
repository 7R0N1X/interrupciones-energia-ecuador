import triangleIcon from '/src/assets/triangle-alert.svg';

export const $ = (elem) => document.querySelector(elem)

const crearElemento = (tag, className, id) => {
  const el = document.createElement(tag)
  if (id) el.id = id
  if (className) el.className = className
  return el
}

export const crearSpinner = () => {
  const spinner = crearElemento("div", "sk-circle");

  for (let i = 1; i <= 12; i++) {
    const circle = crearElemento("div", `sk-circle${i} sk-child`);
    spinner.appendChild(circle);
  }

  return spinner;
}


export const validarCampos = (identificacion, empresa, tipoConsulta) => {
  if (empresa === '' || tipoConsulta === '' || identificacion.value === '') {
    return false
  }
  return true
}

export const limpiarResultados = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild)
  }
}

export const crearSeccionResultados = (notificaciones) => {
  const divResultados = crearElemento('DIV', '', 'resultados')
  const h2 = crearElemento('H2', 'text-[#FCD116] text-2xl font-bold mt-8')
  h2.textContent = 'Resultados de la consulta'
  divResultados.append(h2)
  const divPlanificaciones = crearElemento('DIV', 'flex max-sm:flex-col justify-between sm:gap-4 items-center')

  notificaciones.forEach(notificacion => {
    const { cuen, cuentaContrato, direccion, detallePlanificacion } = notificacion

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

    const h3 = crearElemento('H3', 'text-gray-100 font-bold my-6')
    h3.textContent = 'Interrupciones de energía programadas:'

    const ul = crearElemento('UL', 'events')
    detallePlanificacion.forEach(evento => {
      const { fechaCorte, horaDesde, horaHasta } = evento

      const li = crearElemento('LI', 'bg-[#232323] border border-[#ffeaa5]/20  text-gray-100 mb-3 sm:mb-2 p-4 rounded-md border-l-4 border-l-[#FCD116] hover:translate-x-1 transition-transform')
      li.textContent = `${fechaCorte}, de ${horaDesde} a ${horaHasta}`
      ul.appendChild(li)
    })
    divDetallePlanificacion.append(strongCuentaContrato, strongCUEN, strongDireccion, h3, ul)

    divPlanificaciones.append(divDetallePlanificacion)
  })
  divResultados.appendChild(divPlanificaciones)
  return divResultados
}

export const crearAlerta = (mensaje) => {
  const divAlerta = crearElemento('DIV', 'alerta flex items-center gap-4 p-4 mt-8 border border-[#ED1C24] bg-[#C41017] rounded-md max-w-[400px]')
  const triangleAlerta = crearElemento('IMG', 'triangle-alert')
  triangleAlerta.setAttribute('src', triangleIcon)
  const mensajeAlerta = crearElemento('P', 'text-gray-100 text-sm')
  mensajeAlerta.textContent = mensaje
  divAlerta.append(triangleAlerta, mensajeAlerta)
  return divAlerta
}