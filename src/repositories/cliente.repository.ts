import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Asesor, Mascota} from '../models';
import {AsesorRepository} from './asesor.repository';
import {MascotaRepository} from './mascota.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly idaseso: BelongsToAccessor<Asesor, typeof Cliente.prototype.id>;

  public readonly dueño_mascota: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Cliente, dataSource);
    this.dueño_mascota = this.createHasManyRepositoryFactoryFor('dueño_mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('dueño_mascota', this.dueño_mascota.inclusionResolver);
    this.idaseso = this.createBelongsToAccessorFor('idaseso', asesorRepositoryGetter,);
    this.registerInclusionResolver('idaseso', this.idaseso.inclusionResolver);
  }
}
