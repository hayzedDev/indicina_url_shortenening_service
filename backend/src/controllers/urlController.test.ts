import { Request, Response } from 'express';
import { UrlController } from './urlController';
import { UrlService } from '../services/urlService';

jest.mock('../services/urlService'); // Mock the UrlService

describe('UrlController', () => {
  let urlController: UrlController;
  let mockUrlService: jest.Mocked<UrlService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockUrlService = new UrlService() as jest.Mocked<UrlService>;
    urlController = new UrlController();
    (urlController as any).urlService = mockUrlService; // Replace the service with the mocked one

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('encodeUrl', () => {
    it('should encode a long URL and return a short URL', () => {
      const longUrl = 'https://example.com';
      const shortUrl = 'abc123';
      mockRequest.body = { longUrl };
      mockUrlService.encodeUrl.mockReturnValue(shortUrl);

      urlController.encodeUrl(mockRequest as Request, mockResponse as Response);

      expect(mockUrlService.encodeUrl).toHaveBeenCalledWith(longUrl);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true, // Added success field
        message: 'URL encoded Successfully',
        data: shortUrl,
      });
    });

    it('should handle missing longUrl in the request body', () => {
      mockRequest.body = {};

      urlController.encodeUrl(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid request payload',
        success: false,
      });
    });
  });

  describe('decodeUrl', () => {
    it('should decode a short URL and return the long URL', async () => {
      const shortUrl = 'abc123';
      const longUrl = 'https://example.com';
      mockRequest.params = { urlPath: shortUrl };
      mockRequest.headers = {
        referer: 'google.com',
        'x-country': 'United States',
      };
      mockUrlService.decodeUrl.mockReturnValue(longUrl);

      await urlController.decodeUrl(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockUrlService.decodeUrl).toHaveBeenCalledWith(
        shortUrl,
        'google.com',
        'United States'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'URL decoded Successfully',
        data: longUrl,
      });
    });

    it('should return 404 if the short URL does not exist', async () => {
      const shortUrl = 'invalidShortUrl';
      mockRequest.params = { urlPath: shortUrl };
      mockRequest.headers = {
        referer: 'google.com',
        'x-country': 'United States',
      };
      mockUrlService.decodeUrl.mockReturnValue(null);

      await urlController.decodeUrl(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockUrlService.decodeUrl).toHaveBeenCalledWith(
        shortUrl,
        'google.com',
        'United States'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false, // Replaced statusCode with success
        message: 'URL not found',
      });
    });
  });

  describe('getUrlStatistics', () => {
    it('should return statistics for a valid short URL', () => {
      const shortUrl = 'abc123';
      const statistics = {
        longUrl: 'https://example.com',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        visits: 10,
        lastAccessed: new Date('2023-01-02T00:00:00Z'),
        referrers: [{ domain: 'google.com', count: 5 }],
        geoDistribution: [{ country: 'United States', count: 7 }],
      };

      mockRequest.params = { shortUrl };
      mockUrlService.getUrlStatistics.mockReturnValue(statistics);

      urlController.getUrlStatistics(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockUrlService.getUrlStatistics).toHaveBeenCalledWith(shortUrl);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'URL statistics obtained Successfully',
        data: statistics,
      });
    });

    it('should return 404 if statistics for the short URL do not exist', () => {
      const shortUrl = 'invalidShortUrl';
      mockRequest.params = { shortUrl };
      mockUrlService.getUrlStatistics.mockReturnValue(null);

      urlController.getUrlStatistics(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockUrlService.getUrlStatistics).toHaveBeenCalledWith(shortUrl);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'URL Statistics not found',
      });
    });
  });

  describe('listUrls', () => {
    it('should return a list of all stored URLs', () => {
      const urls = [
        {
          shortUrl: 'abc123',
          longUrl: 'https://example1.com',
          createdAt: new Date('2023-01-01T00:00:00Z'),
          visits: 10,
          lastAccessed: new Date('2023-01-02T00:00:00Z'),
          referrers: [{ domain: 'google.com', count: 5 }],
          geoDistribution: [{ country: 'United States', count: 7 }],
        },
      ];
      mockUrlService.listUrls.mockReturnValue(urls);

      urlController.listUrls(mockRequest as Request, mockResponse as Response);

      expect(mockUrlService.listUrls).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'URLs obtained Successfully',
        data: urls,
      });
    });

    it('should return an empty list if no URLs are stored', () => {
      mockUrlService.listUrls.mockReturnValue([]);

      urlController.listUrls(mockRequest as Request, mockResponse as Response);

      expect(mockUrlService.listUrls).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'URLs obtained Successfully',
        data: [],
      });
    });
  });
});
