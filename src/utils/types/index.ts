import { User } from 'firebase/auth';

// <--------------Auth-------------->
type AuthUser = {
  email: string;
  password: string;
};

type AuthStateChangeCallback = (user: User | null) => void;

// <--------------Products-------------->
enum Categories {
  Hats = 'Hats',
  Jackets = 'Jackets',
  Sneakers = 'Sneakers',
  Mens = 'Mens',
  Womens = 'Womens',
}

type Rating = {
  rate: number;
  count: number;
};

type ProductData = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: Categories;
  rating: Rating;
};

type Product = ProductData & {
  uuid: string;
};

type ProductsList = Product[];

export type {
  AuthUser,
  AuthStateChangeCallback,
  ProductData,
  Product,
  ProductsList,
  Rating,
  Categories,
};
