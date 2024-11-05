import crearElemento from "../utils/crearElemento"
import triangleIcon from '/src/assets/triangle-alert.svg';

const alerta = (mensaje: string): HTMLElement => {
  const divAlerta = crearElemento('DIV', 'alerta flex items-center gap-4 p-4 mt-8 border border-[#ED1C24] bg-[#C41017] rounded-md max-w-[400px] fixed bottom-2 right-2')
  const triangleAlerta = crearElemento('IMG', 'triangle-alert')
  triangleAlerta.setAttribute('src', triangleIcon)
  const mensajeAlerta = crearElemento('P', 'text-gray-100 text-sm')
  mensajeAlerta.textContent = mensaje
  divAlerta.append(triangleAlerta, mensajeAlerta)
  return divAlerta
}

export default alerta