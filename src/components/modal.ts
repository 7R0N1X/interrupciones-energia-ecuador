import crearElemento from "../utils/crearElemento"

const modal = (sectoresAfectados: string): HTMLElement => {
  const container = crearElemento('DIV', 'fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-neutral-900/50 flex justify-center items-center p-4')

  const modalContent = crearElemento('DIV', 'modal w-[700px] bg-neutral-900 border border-[#E8F0FE]/50 rounded-lg overflow-hidden')

  const modalHeader = crearElemento('HEADER', 'flex justify-between items-center p-4 border-b border-[#E8F0FE]/50')
  const modalTitle = crearElemento('H2', 'text-xl text-[#FCD116] font-bold')
  modalTitle.textContent = 'Sectores afectados'
  const modalClose = crearElemento('BUTTON', 'size-8 font-bold  rounded-lg cursor-pointer text-gray-100 flex justify-center items-center leading-none')
  modalClose.setAttribute('aria-label', 'Cerrar modal')
  modalClose.setAttribute('title', 'Cerrar ventana')
  modalClose.textContent = '✕'
  modalClose.onclick = () => { container.remove() }

  const modalBody = crearElemento('DIV', 'p-4 text-gray-100')
  const p = crearElemento('P', 'text-gray-100')
  p.textContent = `${sectoresAfectados}.`

  modalHeader.append(modalTitle, modalClose)
  modalBody.append(p)
  modalContent.append(modalHeader, modalBody)
  container.append(modalContent)
  
  return container
}

export default modal