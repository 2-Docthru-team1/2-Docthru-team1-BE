

export function validatePaginationParams(page: string, limit: string) {
  
  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);

  
  return {
    pageInt: Number.isNaN(pageInt) || pageInt < 1 ? 1 : pageInt,
    limitInt: Number.isNaN(limitInt) || limitInt < 1 ? 10 : limitInt,
  };
}  
