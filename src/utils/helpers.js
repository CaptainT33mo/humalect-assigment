export const getDiscountPrice = (price, discountPercentage) => {
  let discountAmount = (price * discountPercentage) / 100;
  let discountedPrice = price - discountAmount;
  return discountedPrice.toFixed(2);
};
