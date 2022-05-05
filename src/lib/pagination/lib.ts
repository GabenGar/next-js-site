import type { IPaginationInit, IPaginationDB, IPagination } from "./types";

export function toPaginationDB({
  currentPage,
  limit = 25,
  totalCount,
}: IPaginationInit): IPaginationDB {
  return {
    currentPage,
    limit,
    offset: (currentPage - 1) * limit,
  };
}

export function toPagination(
  paginationDB: IPaginationDB,
  totalCount: number
): IPagination {
  const { currentPage, limit } = paginationDB;
  const totalPages = Math.ceil(totalCount / limit);

  const pagination: IPagination = {
    currentPage,
    limit,
    totalPages,
    totalCount,
  };

  return pagination;
}
