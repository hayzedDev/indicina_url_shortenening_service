import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  shortUrl: string;
  longUrl: string;
  createdAt: Date;
  visits: number;
  lastAccessed: Date | null; // Track the last time the URL was accessed
  referrers: { domain: string; count: number }[]; // Track top referrers
  geoDistribution: { country: string; count: number }[]; // Track visits by country
}

const UrlSchema: Schema = new Schema({
  shortUrl: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: null },
  referrers: { type: [{ domain: String, count: Number }], default: [] },
  geoDistribution: { type: [{ country: String, count: Number }], default: [] },
});

export const UrlModel = mongoose.model<IUrl>('Url', UrlSchema);
