


export async function getHunterDomainSearchEmails(params) {
    let url = 'https://api.hunter.io/v2/domain-search'
    const apiKey = '23b573a4c16b3524d7b6a3852f9bcaf3aa2ca2f8'
    
    if(params.domain) {
        url += '?domain=' + params.domain;
      }
      
      url += '&api_key=' +  apiKey;
    const response = await fetch(url);
    console.log(response)
    return response.json();
    
}