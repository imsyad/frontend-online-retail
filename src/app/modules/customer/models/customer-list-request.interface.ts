export interface CustomerListRequest {
  startDate: string,
  endDate: string,
  sortBy: string,
  sortDir: string,
  pageNumber: number,
  pageSize: number,
  search: string
}
