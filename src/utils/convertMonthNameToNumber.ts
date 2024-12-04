import { MonthlyType } from '@prisma/client';

export default function convertMonthNameToNumber(month: MonthlyType) {
  switch (month) {
    case MonthlyType.January:
      return 1;
    case MonthlyType.February:
      return 2;
    case MonthlyType.March:
      return 3;
    case MonthlyType.April:
      return 4;
    case MonthlyType.May:
      return 5;
    case MonthlyType.June:
      return 6;
    case MonthlyType.July:
      return 7;
    case MonthlyType.August:
      return 8;
    case MonthlyType.September:
      return 9;
    case MonthlyType.October:
      return 10;
    case MonthlyType.November:
      return 11;
    case MonthlyType.December:
      return 12;
    default:
      return 0;
  }
}
