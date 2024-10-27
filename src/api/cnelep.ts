import { APICnelEp } from '../types/cnelep';

export const consultarCortesCnelEp = async (identificacion: string, empresa: string, tipoConsulta: string) => {
  
  if (empresa === 'cnel-ep') {
    switch (tipoConsulta) {
      case 'codigo-unico':
        const urlCodigoUnico = `https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/${identificacion}/CUEN`;
        try {
          const res = await fetch(urlCodigoUnico);
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
        break;
      case 'cuenta-contrato':
        const urlCuentaContrato = `https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/${identificacion}/CUENTA_CONTRATO`;
        try {
          const res = await fetch(urlCuentaContrato);
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
        break;
      case 'numero-de-identificaion':
        const urlNumeroIdentificacion = `https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/${identificacion}/IDENTIFICACION`;
        try {
          const res = await fetch(urlNumeroIdentificacion);
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
        break;
    }

  } else if (empresa === 'emel-norte') {
    alert('Empresa no disponible por el momento.');
  }
};