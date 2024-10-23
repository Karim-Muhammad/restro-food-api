import { Model, Document, Schema } from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: [Schema.Types.ObjectId];
  brand: Schema.Types.ObjectId;
  images: [string];
  colors: [
    {
      name: string;
      hexCode: string;
      quantity?: number;
    }
  ];

  quantity: number;
  sold: number;
  ratings: [
    {
      stars: number;
      review: string;
      user: Schema.Types.ObjectId;
    }
  ];

  averageRatings: number;
  reviewsCount: number;

  tags: [string];
}

export interface IProductMethods {
  updateAverageRatings: () => Promise<void>;
}

export interface IProductDocument extends IProduct, Document, IProductMethods {}

export interface IProductModel extends Model<IProductDocument> {
  findBySlug(slug: string): Promise<IProductDocument | null>;
}
