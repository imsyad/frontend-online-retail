import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../../../environments/environment.development';
import {BaseResponse} from "../../../shared/models/base-response.interface";
import {Observable} from 'rxjs';
import {ItemListRequest} from "../models/item-list-request.interface";
import {ItemListResponse} from "../models/item-list-response.interface";
import {ItemUpdateRequest} from "../models/item-update-request.interface";
import {ItemDeleteRequest} from "../models/item-delete-request.interface";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private BASE_URL = environment.BASE_URL;
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  private requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }

  constructor(private httpClient: HttpClient) {
  }

  getItems(request: ItemListRequest): Observable<BaseResponse<ItemListResponse>> {
    return this.httpClient.post(
      `${this.BASE_URL}/item/list`,
      request,
      this.requestOptions
    )
  }

  updateItem(request: ItemUpdateRequest, action: string): Observable<BaseResponse<any>> {
    return this.httpClient.post(
      `${this.BASE_URL}/item/${action}`,
      request,
      this.requestOptions
    )
  }

  deleteCustomer(request: ItemDeleteRequest): Observable<BaseResponse<any>> {
    return this.httpClient.post(
      `${this.BASE_URL}/item/delete`,
      request,
      this.requestOptions
    )
  }
}
