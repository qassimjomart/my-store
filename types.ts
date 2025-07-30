import React from 'react';

export enum Language {
  RU = 'ru',
  KK = 'kk',
}

export enum ProductGender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex',
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export interface ProductColor {
  ru: string;
  kk: string;
}

export interface Product {
  id: number;
  name: { [lang in Language]: string };
  sku: string;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  availability: 'in-stock' | 'on-order';
  stockCount?: number;
  brand: string;
  category: string;
  gender?: ProductGender; // For kids' items
  description: { [lang in Language]: string };
  specs: { [key: string]: { [lang in Language]: string } };
  isNewArrival: boolean;
  isBestSeller: boolean;
  dateAdded: string; // ISO date string
  colors?: ProductColor[]; // e.g., [{ru: 'Красный', kk: 'Қызыл'}]
  sizes?: string[]; // e.g., ['S', 'M', 'L', '46', '48']
}

export interface Category {
  id: string;
  name: { [lang in Language]: string };
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface CartItem extends Product {
  cart_item_id: string; // Unique ID for this cart item from the database
  quantity: number;
  selectedSize?: string;
  selectedColor?: string; // Stored as the 'ru' name for consistency
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Store {
  id: number;
  address: string;
  hours: string;
  maps: {
    '2gis': string;
    yandex: string;
  };
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    city: string;
    addressLine: string;
    postalCode: string;
}

// Types for new Mega Menu Navigation
export interface MegaMenuLink {
  name: { [lang in Language]: string };
  path: string;
}

export interface MegaMenuColumn {
  title: { [lang in Language]: string };
  links: MegaMenuLink[];
  path?: string; // Optional path for the column title itself
}

export interface NavigationCategory {
  id: string;
  name: { [lang in Language]: string };
  path: string;
  megaMenu: MegaMenuColumn[];
}