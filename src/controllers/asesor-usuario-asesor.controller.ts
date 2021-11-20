import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Asesor,
  UsuarioAsesor,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorUsuarioAsesorController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/usuario-asesor', {
    responses: {
      '200': {
        description: 'Asesor has one UsuarioAsesor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsuarioAsesor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UsuarioAsesor>,
  ): Promise<UsuarioAsesor> {
    return this.asesorRepository.tieneun(id).get(filter);
  }

  @post('/asesors/{id}/usuario-asesor', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioAsesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsesor, {
            title: 'NewUsuarioAsesorInAsesor',
            exclude: ['id'],
            optional: ['idasesor']
          }),
        },
      },
    }) usuarioAsesor: Omit<UsuarioAsesor, 'id'>,
  ): Promise<UsuarioAsesor> {
    return this.asesorRepository.tieneun(id).create(usuarioAsesor);
  }

  @patch('/asesors/{id}/usuario-asesor', {
    responses: {
      '200': {
        description: 'Asesor.UsuarioAsesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsesor, {partial: true}),
        },
      },
    })
    usuarioAsesor: Partial<UsuarioAsesor>,
    @param.query.object('where', getWhereSchemaFor(UsuarioAsesor)) where?: Where<UsuarioAsesor>,
  ): Promise<Count> {
    return this.asesorRepository.tieneun(id).patch(usuarioAsesor, where);
  }

  @del('/asesors/{id}/usuario-asesor', {
    responses: {
      '200': {
        description: 'Asesor.UsuarioAsesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UsuarioAsesor)) where?: Where<UsuarioAsesor>,
  ): Promise<Count> {
    return this.asesorRepository.tieneun(id).delete(where);
  }
}
