import { stringify } from 'querystring';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/pagination.constant';
import { Result } from '../infra/result';
import { Material } from '../models/entities/Material';
import { ParamPaginate } from '../models/types/paginate.types';
import { materialsFeature } from './../constants/features.constant';
import HttpService from './base/api.service';

export class MaterialsService {
  static async paginate(options: ParamPaginate): Promise<any> {
    const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE, filter = {} } = options;
    const parametersObject = { page, limit: pageSize, ...filter };

    const stringifyParameters = stringify(parametersObject);
    const result = await HttpService.get(`/${materialsFeature}?${stringifyParameters}`).then(
      (response) => response.data,
    );

    return result;
  }

  static async save(material: Material): Promise<Result<Material>> {
    const request = await HttpService.post(`/${materialsFeature}`, material)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return request;
  }

  static async update(id: string, material: Material): Promise<Result<Material>> {
    const request = await HttpService.put(`/${materialsFeature}/${id}`, material)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return request;
  }

  static async findById(id: string): Promise<Result<Material>> {
    const request = await HttpService.get(`/${materialsFeature}/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return request;
  }

  static async remove(id: string): Promise<Result<Material>> {
    const request = await HttpService.delete(`/${materialsFeature}/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return request;
  }
}
