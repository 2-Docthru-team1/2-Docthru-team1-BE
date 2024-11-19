export enum Order {
  earliestFirst = 'earliestFirst', // 생성 순 - 빠른 순
  latestFirst = 'latestFirst', // 생성 순 - 느린 순
  deadlineEarliest = 'deadlineEarliest', // 마감 기한 순 - 빠른 순
  deadlineLatest = 'deadlineLatest', // 마감 기한 순 - 느린 순
}

export enum SortBy {
  LIKES = 'likes',
  CREATED_AT = 'createdAt',
  TITLE = 'title',
}

export enum Category {
  Traditional = 'Traditional',
  SchoolFood = 'SchoolFood',
  Noodle = 'Noodle',
  BanChan = 'BanChan',
  Dessert = 'Dessert',
}