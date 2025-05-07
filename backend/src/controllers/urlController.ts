import { Request, Response } from 'express';
import { UrlService } from '../services/urlService';
import { createResponse } from '../utils/encoder';

export class UrlController {
  private urlService: UrlService;

  constructor() {
    this.urlService = new UrlService();
  }

  public encodeUrl = (req: Request, res: Response): void => {
    const longUrl = req.body.longUrl;

    if (!longUrl) {
      res.status(400).json(
        createResponse({
          message: 'Invalid request payload',
          statusCode: 400,
        })
      );
      return;
    }

    const shortUrl = this.urlService.encodeUrl(longUrl);

    res
      .status(200)
      .json(
        createResponse({ message: 'URL encoded Successfully', data: shortUrl })
      );
  };

  public decodeUrl = async (req: Request, res: Response) => {
    const { urlPath } = req.params;
    const referrer = req.headers.referer || 'direct';
    const country = (req.headers['x-country'] || 'Unknown') as string;

    const longUrl = this.urlService.decodeUrl(urlPath, referrer, country);
    if (longUrl) {
      res
        .status(200)
        .json(
          createResponse({ message: 'URL decoded Successfully', data: longUrl })
        );

      return;
    }

    res.status(404).json(
      createResponse({
        message: 'URL not found',
        statusCode: 404,
      })
    );
  };

  public getUrlStatistics = (req: Request, res: Response): void => {
    const shortUrlPath = req.params.shortUrl;
    const statistics = this.urlService.getUrlStatistics(shortUrlPath);
    if (!statistics) {
      res.status(404).json(
        createResponse({
          message: 'URL Statistics not found',
          statusCode: 404,
        })
      );

      return;
    }

    res.status(200).json(
      createResponse({
        message: 'URL statistics obtained Successfully',
        data: statistics,
      })
    );
  };

  public listUrls = (req: Request, res: Response): void => {
    const urls = this.urlService.listUrls();
    res.status(200).json(
      createResponse({
        message: 'URLs obtained Successfully',
        data: urls,
      })
    );
  };
}
