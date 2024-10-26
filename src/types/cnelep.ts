export interface APICnelEp {
  resp: string;
  mensaje: null;
  mensajeError: null;
  extra: null;
  notificaciones: Notificacione[];
}

export interface Notificacione {
  idUnidadNegocios: number;
  cuentaContrato: string;
  alimentador: string;
  cuen: string;
  direccion: string;
  fechaRegistro: Date;
  detallePlanificacion: DetallePlanificacion[];
}

export interface DetallePlanificacion {
  alimentador: string;
  fechaCorte: string;
  horaDesde: string;
  horaHasta: string;
  comentario: string;
  fechaRegistro: Date;
  fechaHoraCorte: string;
}
