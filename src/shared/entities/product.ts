export type ProductFormats = 'digital'
export type ProductDeliveryTime = 'imediato'

export type Product = {
  id: number;
  name: string;
  originalPrice: number;
  currentPrice: number;
  producer: string;
  format: ProductFormats;
  deliveryTime: ProductDeliveryTime;
};
