import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UsuarioAsesor} from './usuario-asesor.model';
import {Cliente} from './cliente.model';

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

  @hasOne(() => UsuarioAsesor)
  usuarioAsesor: UsuarioAsesor;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasMany(() => Cliente, {keyTo: 'idasesor'})
  clientes: Cliente[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
