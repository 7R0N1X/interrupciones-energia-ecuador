import crearElemento from "../utils/crearElemento"

const cardColaboradores = (avatar_url: string, html_url: string, login: string, contributions: number): HTMLElement => {
  const article = crearElemento('ARTICLE', 'bg-[#242424] w-full sm:w-[346px] lg:w-[302px] rounded-lg overflow-hidden p-4 bg-[#242424] border-[#333333] hover:bg-[#2A2A2A] transition-colors duration-150')

  const header = crearElemento('header', 'flex gap-4 mb-4')
  const avatar = crearElemento('IMG', 'size-12 rounded-full')
  avatar.setAttribute('src', `${avatar_url}`)
  avatar.setAttribute('alt', `Avatar del perfil de ${login}`)

  const contenedorInformacion = crearElemento('DIV', '')
  const nombreUsuario = crearElemento('P', 'text-lg font-semibold text-gray-100')
  nombreUsuario.textContent = login
  const numeroContribuciones = crearElemento('P', 'text-sm text-[#999999]')
  numeroContribuciones.textContent = `${contributions} contribuciones`
  
  const footer = crearElemento('FOOTER', 'w-full')
  const enlaceVerPerfil = crearElemento('A', 'h-9 flex justify-center items-center gap-2 text-sm font-semibold border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors rounded-md px-3')
  enlaceVerPerfil.setAttribute('href', `${html_url}`)
  enlaceVerPerfil.setAttribute('target', '_blank')
  enlaceVerPerfil.setAttribute('rel', 'noopener noreferrer')
  enlaceVerPerfil.innerHTML = `Ver Perfil <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link w-4 h-4 ml-2" data-id="18"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>`
  
  contenedorInformacion.append(nombreUsuario, numeroContribuciones)
  header.append(avatar, contenedorInformacion)
  footer.append(enlaceVerPerfil)
  article.append(header, footer)

  return article
}

export default cardColaboradores