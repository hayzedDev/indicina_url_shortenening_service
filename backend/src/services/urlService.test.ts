import { UrlService } from './urlService';

describe('UrlService', () => {
  let urlService: UrlService;

  beforeEach(() => {
    urlService = new UrlService();
  });

  describe('encodeUrl', () => {
    it('should generate unique short URLs for different long URLs', () => {
      const longUrl1 = 'https://example1.com';
      const longUrl2 = 'https://example2.com';

      const shortUrl1 = urlService.encodeUrl(longUrl1);
      const shortUrl2 = urlService.encodeUrl(longUrl2);

      expect(shortUrl1).not.toBe(shortUrl2);
    });

    it('should handle encoding the same long URL multiple times', () => {
      const longUrl = 'https://example.com';

      const shortUrl1 = urlService.encodeUrl(longUrl);
      const shortUrl2 = urlService.encodeUrl(longUrl);

      expect(shortUrl1).not.toBe(shortUrl2); // Each call generates a unique short URL
    });
  });

  describe('decodeUrl', () => {
    it('should handle decoding when referrer and country are not provided', () => {
      const longUrl = 'https://example.com';
      const shortUrl = urlService.encodeUrl(longUrl);

      const decodedUrl = urlService.decodeUrl(shortUrl, '', '');

      expect(decodedUrl).toBe(longUrl);

      const storedUrl = urlService['urlDatabase'].get(shortUrl);
      expect(storedUrl?.referrers).toEqual([{ domain: '', count: 1 }]);
      expect(storedUrl?.geoDistribution).toEqual([{ country: '', count: 1 }]);
    });

    it('should not update statistics for an invalid short URL', () => {
      const invalidShortUrl = 'invalidShortUrl';
      const decodedUrl = urlService.decodeUrl(
        invalidShortUrl,
        'google.com',
        'United States'
      );

      expect(decodedUrl).toBeNull();
    });
  });

  describe('getUrlStatistics', () => {
    it('should return accurate statistics after multiple visits', () => {
      const longUrl = 'https://example.com';
      const shortUrl = urlService.encodeUrl(longUrl);

      urlService.decodeUrl(shortUrl, 'google.com', 'United States');
      urlService.decodeUrl(shortUrl, 'facebook.com', 'United States');
      urlService.decodeUrl(shortUrl, 'google.com', 'Canada');

      const stats = urlService.getUrlStatistics(shortUrl);

      expect(stats).toBeDefined();
      expect(stats?.visits).toBe(3);
      expect(stats?.referrers).toEqual([
        { domain: 'google.com', count: 2 },
        { domain: 'facebook.com', count: 1 },
      ]);
      expect(stats?.geoDistribution).toEqual([
        { country: 'United States', count: 2 },
        { country: 'Canada', count: 1 },
      ]);
    });

    it('should return null for statistics of an invalid short URL', () => {
      const stats = urlService.getUrlStatistics('invalidShortUrl');
      expect(stats).toBeNull();
    });
  });

  describe('listUrls', () => {
    it('should return an empty list when no URLs are stored', () => {
      const urls = urlService.listUrls();
      expect(urls).toHaveLength(0);
    });

    it('should return all stored URLs with correct details', () => {
      const longUrl1 = 'https://example1.com';
      const longUrl2 = 'https://example2.com';

      const shortUrl1 = urlService.encodeUrl(longUrl1);
      const shortUrl2 = urlService.encodeUrl(longUrl2);

      const urls = urlService.listUrls();

      expect(urls).toHaveLength(2);
      expect(urls).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            shortUrl: shortUrl1,
            longUrl: longUrl1,
            visits: 0,
            lastAccessed: null,
          }),
          expect.objectContaining({
            shortUrl: shortUrl2,
            longUrl: longUrl2,
            visits: 0,
            lastAccessed: null,
          }),
        ])
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle URLs with special characters', () => {
      const longUrl = 'https://example.com/path?query=param&another=value#hash';
      const shortUrl = urlService.encodeUrl(longUrl);

      const decodedUrl = urlService.decodeUrl(
        shortUrl,
        'google.com',
        'United States'
      );

      expect(decodedUrl).toBe(longUrl);
    });

    it('should handle very long URLs', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000); // 1000-character URL
      const shortUrl = urlService.encodeUrl(longUrl);

      const decodedUrl = urlService.decodeUrl(
        shortUrl,
        'google.com',
        'United States'
      );

      expect(decodedUrl).toBe(longUrl);
    });

    it('should handle empty referrer and country gracefully', () => {
      const longUrl = 'https://example.com';
      const shortUrl = urlService.encodeUrl(longUrl);

      const decodedUrl = urlService.decodeUrl(shortUrl, '', '');

      expect(decodedUrl).toBe(longUrl);

      const stats = urlService.getUrlStatistics(shortUrl);
      expect(stats?.referrers).toEqual([{ domain: '', count: 1 }]);
      expect(stats?.geoDistribution).toEqual([{ country: '', count: 1 }]);
    });
  });
});
