


export async function getHunterDomainSearchEmails(params) {
    let url = 'https://api.hunter.io/v2'
    const apiKey = '23b573a4c16b3524d7b6a3852f9bcaf3aa2ca2f8'
    if(params.firstName && params.lastName) {
        url += '/email-finder'
    } else {
        url += '/domain-search'
    }

    if(params.domain) {
        url += '?domain=' + params.domain;
    }

    if(params.firstName && params.lastName) {
        url += '&first_name=' + params.firstName + '&last_name=' + params.lastName;
    }
    
      
      url += '&api_key=' +  apiKey;
    const response = await fetch(url);
    console.log(response)
    return response.json();
    
}

export async function getHunterEmailFinderEmails(params) {
    let url = 'https://api.hunter.io/v2/email-finder'
    const apiKey = '23b573a4c16b3524d7b6a3852f9bcaf3aa2ca2f8'
    if(params.domain) {
        url += '?domain=' + params.domain;
    }

    if(params.firstName && params.lastName) {
        url += '&first_name=' + params.firstName + '&last_name=' + params.lastName;
    }
    
      
    url += '&api_key=' +  apiKey;
    const response = await fetch(url);
    console.log(response)
    return response.json();
    
}