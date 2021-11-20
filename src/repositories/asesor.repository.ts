import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Asesor, AsesorRelations, UsuarioAsesor, Cliente} from '../models';
import {UsuarioAsesorRepository} from './usuario-asesor.repository';
import {ClienteRepository} from './cliente.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly usuarioAsesor: HasOneRepositoryFactory<UsuarioAsesor, typeof Asesor.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioAsesorRepository') protected usuarioAsesorRepositoryGetter: Getter<UsuarioAsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Asesor, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.usuarioAsesor = this.createHasOneRepositoryFactoryFor('usuarioAsesor', usuarioAsesorRepositoryGetter);
    this.registerInclusionResolver('usuarioAsesor', this.usuarioAsesor.inclusionResolver);
  }
}
