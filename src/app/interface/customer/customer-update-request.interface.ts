export interface CustomerUpdateRequest {    
    customerId: number | null,
    customerCode: string,
    customerAddres: string,
    customerName: string,
    customerPhone: string,
    isActive: boolean,
    lastOrderDate: Date | null,
    pic: string
}
