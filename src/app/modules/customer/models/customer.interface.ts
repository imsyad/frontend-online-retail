export interface Customer {
  customerId: number,
  customerCode: string,
  customerAddress: string,
  customerName: string,
  customerPhone: string,
  isActive: boolean,
  lastOrderDate: Date | null,
  pic: string
}
