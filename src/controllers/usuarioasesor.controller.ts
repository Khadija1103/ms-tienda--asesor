import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuarioAsesor} from '../models';
import {UsuarioAsesorRepository} from '../repositories';

export class UsuarioasesorController {
  constructor(
    @repository(UsuarioAsesorRepository)
    public usuarioAsesorRepository : UsuarioAsesorRepository,
  ) {}

  @post('/usuario-asesors')
  @response(200, {
    description: 'UsuarioAsesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioAsesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsesor, {
            title: 'NewUsuarioAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioAsesor: Omit<UsuarioAsesor, 'id'>,
  ): Promise<UsuarioAsesor> {
    return this.usuarioAsesorRepository.create(usuarioAsesor);
  }

  @get('/usuario-asesors/count')
  @response(200, {
    description: 'UsuarioAsesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioAsesor) where?: Where<UsuarioAsesor>,
  ): Promise<Count> {
    return this.usuarioAsesorRepository.count(where);
  }

  @get('/usuario-asesors')
  @response(200, {
    description: 'Array of UsuarioAsesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioAsesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioAsesor) filter?: Filter<UsuarioAsesor>,
  ): Promise<UsuarioAsesor[]> {
    return this.usuarioAsesorRepository.find(filter);
  }

  @patch('/usuario-asesors')
  @response(200, {
    description: 'UsuarioAsesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsesor, {partial: true}),
        },
      },
    })
    usuarioAsesor: UsuarioAsesor,
    @param.where(UsuarioAsesor) where?: Where<UsuarioAsesor>,
  ): Promise<Count> {
    return this.usuarioAsesorRepository.updateAll(usuarioAsesor, where);
  }

  @get('/usuario-asesors/{id}')
  @response(200, {
    description: 'UsuarioAsesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioAsesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuarioAsesor, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioAsesor>
  ): Promise<UsuarioAsesor> {
    return this.usuarioAsesorRepository.findById(id, filter);
  }

  @patch('/usuario-asesors/{id}')
  @response(204, {
    description: 'UsuarioAsesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsesor, {partial: true}),
        },
      },
    })
    usuarioAsesor: UsuarioAsesor,
  ): Promise<void> {
    await this.usuarioAsesorRepository.updateById(id, usuarioAsesor);
  }

  @put('/usuario-asesors/{id}')
  @response(204, {
    description: 'UsuarioAsesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarioAsesor: UsuarioAsesor,
  ): Promise<void> {
    await this.usuarioAsesorRepository.replaceById(id, usuarioAsesor);
  }

  @del('/usuario-asesors/{id}')
  @response(204, {
    description: 'UsuarioAsesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioAsesorRepository.deleteById(id);
  }
}
