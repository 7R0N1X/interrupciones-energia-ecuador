import { APICnelEp } from '../types/cnelep';

export const consultarCortes = async (identificacion: string, empresa: string) => {
  if (empresa === 'cnel ep') {
    const url = `https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/${identificacion}/IDENTIFICACION`;
    try {
      const res = await fetch(url);
      const data: APICnelEp = await res.json();

      if (data.resp === 'ERROR') {
        return { status: 'ERROR', mensaje: data.mensaje };
      }
      if (data.resp === 'OK') {
        return { status: 'OK', notificaciones: data.notificaciones };
      }
    } catch (err) {
      console.error(err);
    }
  } else if (empresa === 'emel norte') {
    alert('Empresa no disponible por el momento.');
  }
};