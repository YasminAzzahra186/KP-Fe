/**
 * Generic API response wrapper.
 * Standardize how the backend sends data.
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

/**
 * Paginated API response.
 */
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * Generic API error shape.
 */
export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}
