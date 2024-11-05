const crearElemento = (tag: string, className: string, id?: string): HTMLElement => {
  const el = document.createElement(tag)
  if (id) el.id = id
  if (className) el.className = className
  return el
}

export default crearElemento