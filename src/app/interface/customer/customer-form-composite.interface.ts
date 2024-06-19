import { CustomerUpdateRequest } from "./customer-update-request.interface";

export interface CustomerFormComposite {
    action: string,
    formData: CustomerUpdateRequest
}