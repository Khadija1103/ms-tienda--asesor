import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioAsesor extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
  })
  idasesor?: string;

  @property({
    type: 'string',
  })
  asesorId?: string;

  constructor(data?: Partial<UsuarioAsesor>) {
    super(data);
  }
}

export interface UsuarioAsesorRelations {
  // describe navigational properties here
}

export type UsuarioAsesorWithRelations = UsuarioAsesor & UsuarioAsesorRelations;
