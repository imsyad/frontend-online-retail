export interface BaseResponse<T> {
  code?: string,
  message?: string,
  icon?: string
  result?: T | null
}
