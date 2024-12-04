import { MonthlyType } from '@prisma/client';

export const isValidMonth = (month: string): month is MonthlyType => {
  const validMonths = Object.values(MonthlyType);
  return validMonths.includes(month as MonthlyType);
};

export const getCurrentMonth = (): MonthlyType => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // 0부터 시작
  return MonthlyType[Object.keys(MonthlyType)[currentMonthIndex] as keyof typeof MonthlyType];
};
