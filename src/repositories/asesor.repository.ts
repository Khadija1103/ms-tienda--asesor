import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Asesor, AsesorRelations, Cliente, UsuarioAsesor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {UsuarioAsesorRepository} from './usuario-asesor.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Asesor.prototype.id>;

  public readonly tieneun: HasOneRepositoryFactory<UsuarioAsesor, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UsuarioAsesorRepository') protected usuarioAsesorRepositoryGetter: Getter<UsuarioAsesorRepository>,
  ) {
    super(Asesor, dataSource);
    this.tieneun = this.createHasOneRepositoryFactoryFor('tieneun', usuarioAsesorRepositoryGetter);
    this.registerInclusionResolver('tieneun', this.tieneun.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
