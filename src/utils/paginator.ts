const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
  const offset = page < 1 ? 0 : (page - 1) * limit;

  return { limit, offset };
};

const getPagingData = (data: any, count: number, page: number, size: number) => {
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(count / size);
  const hasNextPage = currentPage < totalPages - 1;
  return {
    totalItems: count,
    currentPage,
    totalPages,
    hasNextPage,
    data,
  };
};
export { getPagination, getPagingData };
