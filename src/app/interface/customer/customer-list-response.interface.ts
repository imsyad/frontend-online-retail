import { PageResponse } from "../common/page-response.interface";
import { Customer } from "./customer.interface";

export interface CustomerListResponse extends PageResponse {
    customerList: Customer[]
}
