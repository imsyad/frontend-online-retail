import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../shared/models/base-response.interface";
import {CustomerListRequest} from "../models/customer-list-request.interface";
import {CustomerUpdateRequest} from "../models/customer-update-request.interface";
import {CustomerListResponse} from "../models/customer-list-response.interface";
import {CustomerDeleteRequest} from "../models/customer-delete-request.interface";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }
  private BASE_URL = environment.BASE_URL;
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }


  getCustomer(request: CustomerListRequest): Observable<BaseResponse<CustomerListResponse>> {
    return this.httpClient.post(
      `${this.BASE_URL}/customer/list`,
      request,
      this.requestOptions
    );
  }

  updateCustomer(request: CustomerUpdateRequest, action: string): Observable<BaseResponse<any>> {
    const url: string = action === 'add' ? `${this.BASE_URL}/customer/add` : `${this.BASE_URL}/customer/edit`;
    return this.httpClient.post(
      url,
      request,
      this.requestOptions
    )
  }

  deleteCustomer(request: CustomerDeleteRequest) {
    return this.httpClient.post(
      `${this.BASE_URL}/customer/delete`,
      request,
      this.requestOptions
    )
  }
}
