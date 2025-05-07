export class UrlService {
  // In-memory storage for URLs
  private urlDatabase: Map<
    string,
    {
      longUrl: string;
      createdAt: Date;
      visits: number;
      lastAccessed: Date | null;
      referrers: { domain: string; count: number }[];
      geoDistribution: { country: string; count: number }[];
    }
  > = new Map();

  private generateShortUrl(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
      shortUrl += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return shortUrl;
  }

  public encodeUrl(longUrl: string): string {
    const shortUrlPath = this.generateShortUrl();
    this.urlDatabase.set(shortUrlPath, {
      longUrl,
      createdAt: new Date(),
      visits: 0,
      lastAccessed: null,
      referrers: [],
      geoDistribution: [],
    });
    return shortUrlPath;
  }

  public decodeUrl(
    shortUrlPath: string,
    referrer: string,
    country: string
  ): string | null {
    const entry = this.urlDatabase.get(shortUrlPath);

    if (entry) {
      // Increment visit count
      entry.visits += 1;

      // Update last accessed time
      entry.lastAccessed = new Date();

      // Update referrers
      const referrerIndex = entry.referrers.findIndex(
        (r) => r.domain === referrer
      );
      if (referrerIndex !== -1) {
        entry.referrers[referrerIndex].count += 1;
      } else {
        entry.referrers.push({ domain: referrer, count: 1 });
      }

      // Update geo distribution
      const geoIndex = entry.geoDistribution.findIndex(
        (g) => g.country === country
      );
      if (geoIndex !== -1) {
        entry.geoDistribution[geoIndex].count += 1;
      } else {
        entry.geoDistribution.push({ country, count: 1 });
      }

      return entry.longUrl;
    }
    return null;
  }

  public getUrlStatistics(shortUrlPath: string): {
    longUrl: string;
    createdAt: Date;
    visits: number;
    lastAccessed: Date | null;
    referrers: { domain: string; count: number }[];
    geoDistribution: { country: string; count: number }[];
  } | null {
    const entry = this.urlDatabase.get(shortUrlPath);
    if (entry) {
      return {
        longUrl: entry.longUrl,
        createdAt: entry.createdAt,
        visits: entry.visits,
        lastAccessed: entry.lastAccessed,
        referrers: entry.referrers,
        geoDistribution: entry.geoDistribution,
      };
    }
    return null;
  }

  public listUrls(): Array<{
    shortUrl: string;
    longUrl: string;
    createdAt: Date;
    visits: number;
    lastAccessed: Date | null;
    referrers: { domain: string; count: number }[];
    geoDistribution: { country: string; count: number }[];
  }> {
    const urls: Array<{
      shortUrl: string;
      longUrl: string;
      createdAt: Date;
      visits: number;
      lastAccessed: Date | null;
      referrers: { domain: string; count: number }[];
      geoDistribution: { country: string; count: number }[];
    }> = [];
    this.urlDatabase.forEach((value, key) => {
      urls.push({
        shortUrl: key,
        longUrl: value.longUrl,
        createdAt: value.createdAt,
        visits: value.visits,
        lastAccessed: value.lastAccessed,
        referrers: value.referrers,
        geoDistribution: value.geoDistribution,
      });
    });
    return urls;
  }
}
