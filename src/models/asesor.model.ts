import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {UsuarioAsesor} from './usuario-asesor.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cc: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Cliente, {keyTo: 'idasesor'})
  clientes: Cliente[];

  @hasOne(() => UsuarioAsesor, {keyTo: 'idasesor'})
  tieneun: UsuarioAsesor;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
