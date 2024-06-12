import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CustomerListRequest } from '../../../interface/customer/customer-list-request.interface';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../interface/common/base-response.interface';
import { CustomerListResponse } from '../../../interface/customer/customer-list-response.interface';

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
}
