/**
 * The pagination coming from client.
 */
export interface IPaginationInit {
  currentPage: number;
  totalCount?: number;
  limit?: number;
}

/**
 * Pagination used for DB.
 */
export interface IPaginationDB {
  currentPage: number;
  offset: number;
  limit: number;
}

/**
 * The resulting pagination.
 */
export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}
