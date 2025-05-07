const urlDatabase: Record<
  string,
  { longUrl: string; createdAt: Date; visits: number }
> = {};
let idCounter = 0;

function generateShortUrl(): string {
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

function encodeUrl(longUrl: string): string {
  const shortUrlPath = generateShortUrl();
  urlDatabase[shortUrlPath] = {
    longUrl: longUrl,
    createdAt: new Date(),
    visits: 0,
  };
  return shortUrlPath;
}

function decodeUrl(shortUrlPath: string): string | null {
  const entry = urlDatabase[shortUrlPath];
  if (entry) {
    entry.visits += 1; // Increment visit count
    return entry.longUrl;
  }
  return null;
}

function getUrlStatistics(
  shortUrlPath: string
): { longUrl: string; createdAt: Date; visits: number } | null {
  return urlDatabase[shortUrlPath] || null;
}

function createResponse<T = any>({
  statusCode = 200,
  message,
  data,
}: {
  statusCode?: number;
  message?: string;
  data?: T;
} = {}): { success: boolean; message?: string; data?: T } {
  const isSuccess = statusCode >= 200 && statusCode < 400;
  return {
    success: isSuccess,
    message: message
      ? message
      : isSuccess
      ? 'Operation Successful'
      : 'Error Processing Request',
    ...(data ? { data } : {}),
  };
}

export { encodeUrl, decodeUrl, getUrlStatistics, createResponse };
