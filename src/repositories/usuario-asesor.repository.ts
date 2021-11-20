import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UsuarioAsesor, UsuarioAsesorRelations} from '../models';

export class UsuarioAsesorRepository extends DefaultCrudRepository<
  UsuarioAsesor,
  typeof UsuarioAsesor.prototype.id,
  UsuarioAsesorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UsuarioAsesor, dataSource);
  }
}
