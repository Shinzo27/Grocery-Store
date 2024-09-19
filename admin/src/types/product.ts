export type Product = {
  imgUrl: string;
  name: string;
  category: {
    name: string;
    _id: string;
  };
  description: string;
  quantity: string;
  price: number;
};
