const API_URL = process.env['API_URL'] || '';

export const fetchApi = async <T>(
  endpoint: string,
  params?: Record<string, string | number>,
  options: RequestInit = {},
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const searchParams = params
    ? `?${Object.entries(params)
        .filter(([_, value]) => value !== undefined) // undefinedの値を持つエントリーをフィルタリング
        .map(([key, value]) => {
          return `${key}=${value}`;
        })
        .join('&')}`
    : '';

  const response = await fetch(`${API_URL}${endpoint}${searchParams}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};
