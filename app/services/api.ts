const API_KEY = '0572db2b99msh35199b03ec1ea91p144d45jsno432572b5231';
const API_HOST = 'screenshot-api1.p.rapidapi.com';

export async function takeScreenshot(url: string): Promise<string> {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(`https://${API_HOST}/?url=${encodeURIComponent(url)}`, options);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw error;
  }
}