import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderCreateRequest} from "../models/order-create-request.interface";
import {OrderListRequest} from "../models/order-list-request.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL: string = environment.BASE_URL;
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

  createOrder(request: OrderCreateRequest): Observable<any> {
    return this.httpClient.post(
      `${this.BASE_URL}/order/create`,
      request,
      this.requestOptions
    );
  }

  getOrders(request: OrderListRequest): Observable<any> {
    return this.httpClient.post(
      `${this.BASE_URL}/order/list`,
      request,
      this.requestOptions
    )
  }
}
