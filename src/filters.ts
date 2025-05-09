import CSMoneyItem from "./csmoney/csmoneyItem";

export const withoutStickersFilter = (items: CSMoneyItem[]): CSMoneyItem[] => {
  return items.filter((item: CSMoneyItem) => {
    return item.stickers === null || item.stickers.length === 0;
  });
};

export const bestDiscountFilter = (
  items: CSMoneyItem[],
  minDiscount: number = 0
): CSMoneyItem[] => {
  const good = items.filter((item: CSMoneyItem) => {
    return item.pricing.discount >= minDiscount;
  });

  if (good.length > 0) return good;

  return bestDiscountFilter(items, minDiscount - 0.05);
};
