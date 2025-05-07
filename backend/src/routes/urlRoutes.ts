import { Router } from 'express';
import { UrlController } from '../controllers/urlController';

const router = Router();
const urlController = new UrlController();

export function setRoutes(app: Router) {
  app.post('/api/encode', urlController.encodeUrl.bind(urlController));
  app.get('/api/decode/:urlPath', urlController.decodeUrl.bind(urlController));
  app.get(
    '/api/statistics/:shortUrl',
    urlController.getUrlStatistics.bind(urlController)
  );
  app.get('/api/list', urlController.listUrls.bind(urlController));
}
