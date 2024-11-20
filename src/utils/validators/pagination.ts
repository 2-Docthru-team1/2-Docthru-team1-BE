export function validatePaginationParams(page: string, limit: string) {

  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);


  return {
    pageInt: !Number.isNaN(pageInt) && pageInt > 0 ? pageInt : 1,
    limitInt: !Number.isNaN(limitInt) && limitInt > 0 ? limitInt : 10,
  };
}
