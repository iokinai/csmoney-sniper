export default interface CSMoneyPricing {
  default: number;
  priceBeforeDiscount: number;
  discount: number;
  computed: number;
  basePrice: number;
  priceCoefficient: number;
}
