export interface CustomerUpdateRequest {    
    customerId: number | null,
    customerName: string,
    customerAddress: string,
    customerCode: string,
    customerPhone: string,
    pic: string
}
