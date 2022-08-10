const API_URL = 'https://www.page2api.com/api/v1/scrape';

export async function fetchIndeedJobs() {
  const payload = {
    api_key: '4e44a15f409930d35b15f499e802a8d317b110ff',
    url: 'https://www.indeed.com/viewjob?jk=1e9bb2cae582950f',
    parse: {
      name: 'h1 >> text',
      company: '.jobsearch-InlineCompanyRating a >> text',
      rating: 'meta[itemprop=ratingValue] >> content',
      reviews_count: 'meta[itemprop=ratingCount] >> content',
      description: '#jobDescriptionText >> text'
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });


  return response.json();
}