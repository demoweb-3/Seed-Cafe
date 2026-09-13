export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
};

export type MenuCategory = {
  title: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    title: 'Coffee',
    items: [
      {
        name: 'Flat White',
        description: 'Double ristretto, silky steamed milk',
        price: 'LKR 650',
        image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        tag: 'Signature',
      },
      {
        name: 'Pour Over',
        description: 'Single-origin, hand-brewed, slow',
        price: 'LKR 850',
        image: 'https://images.pexels.com/photos/11562453/pexels-photo-11562453.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Cappuccino',
        description: 'Espresso, steamed milk, cocoa dust',
        price: 'LKR 600',
        image: 'https://images.pexels.com/photos/38729411/pexels-photo-38729411.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Espresso',
        description: 'Straight, bold, warm',
        price: 'LKR 450',
        image: 'https://images.pexels.com/photos/9254130/pexels-photo-9254130.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
    ],
  },
  {
    title: 'Breakfast',
    items: [
      {
        name: 'Avocado Toast',
        description: 'Sourdough, smashed avocado, poached egg',
        price: 'LKR 1,450',
        image: 'https://images.pexels.com/photos/793772/pexels-photo-793772.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        tag: 'Favourite',
      },
      {
        name: 'Morning Plate',
        description: 'Eggs, olives, fresh veg, warm bread',
        price: 'LKR 1,650',
        image: 'https://images.pexels.com/photos/35047345/pexels-photo-35047345.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Brunch Spread',
        description: 'Waffles, fruit, coffee, juice',
        price: 'LKR 1,950',
        image: 'https://images.pexels.com/photos/30199564/pexels-photo-30199564.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Vegan Toast',
        description: 'Avocado spread, eggs, fresh herbs',
        price: 'LKR 1,350',
        image: 'https://images.pexels.com/photos/27590337/pexels-photo-27590337.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
    ],
  },
  {
    title: 'Food',
    items: [
      {
        name: 'Garden Bowl',
        description: 'Seasonal greens, grains, herbs, house dressing',
        price: 'LKR 1,550',
        image: 'https://images.pexels.com/photos/4617829/pexels-photo-4617829.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Croissant & Coffee',
        description: 'Buttery croissant, fresh brew, morning light',
        price: 'LKR 950',
        image: 'https://images.pexels.com/photos/30359471/pexels-photo-30359471.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Breakfast Toast',
        description: 'Eggs, avocado, coffee — flat lay favourite',
        price: 'LKR 1,250',
        image: 'https://images.pexels.com/photos/5591658/pexels-photo-5591658.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Café Breakfast',
        description: 'Coffee, croissant, flowers on the table',
        price: 'LKR 1,750',
        image: 'https://images.pexels.com/photos/34052564/pexels-photo-34052564.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
    ],
  },
  {
    title: 'Desserts',
    items: [
      {
        name: 'Berry Tart',
        description: 'Fresh raspberries, blackberries, pastry cream',
        price: 'LKR 750',
        image: 'https://images.pexels.com/photos/28251609/pexels-photo-28251609.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        tag: 'Seasonal',
      },
      {
        name: 'Strawberry Pastry',
        description: 'Powdered sugar, fresh strawberry, blueberry',
        price: 'LKR 650',
        image: 'https://images.pexels.com/photos/17650199/pexels-photo-17650199.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate, fresh strawberries',
        price: 'LKR 850',
        image: 'https://images.pexels.com/photos/15823267/pexels-photo-15823267.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
      {
        name: 'Dessert Platter',
        description: 'Strawberries, macarons, a little of everything',
        price: 'LKR 1,200',
        image: 'https://images.pexels.com/photos/10368556/pexels-photo-10368556.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
    ],
  },
  {
    title: 'Specials',
    items: [
      {
        name: 'French Pastries',
        description: 'A selection of gourmet, freshly baked',
        price: 'LKR 950',
        image: 'https://images.pexels.com/photos/34844491/pexels-photo-34844491.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        tag: "Chef's Pick",
      },
      {
        name: 'Assorted Desserts',
        description: 'A variety of textures and flavours',
        price: 'LKR 1,100',
        image: 'https://images.pexels.com/photos/34563914/pexels-photo-34563914.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      },
    ],
  },
];
