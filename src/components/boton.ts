import crearElemento from "../utils/crearElemento"

const boton = (funcion: Function, alimentador: string): HTMLElement => {
  const btn = crearElemento('BUTTON', 'flex flex-row-reverse justify-center items-center gap-2 text-gray-100 text-sm bg-neutral-800 p-2 rounded-md border border-[#FCD116]/20 hover:border-[#FCD116]/50 transition-colors duration-300 w-44 mt-6')
  btn.textContent = 'Sectores afectados'
  btn.onclick = () => funcion(alimentador)
  return btn
}