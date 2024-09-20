export type Product = {
  _id: string;
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
