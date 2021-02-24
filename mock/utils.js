function parseSearchParams(searchParamsString){
    return searchParamsString.split('?').slice(1,).join('').split('&').reduce((searchParams, curKV)=>{
        const [k, v] = curKV.split('=').map(decodeURIComponent);
        searchParams[k] = v;
        return searchParams;
    }, {});
}

export  { 
    parseSearchParams,
}