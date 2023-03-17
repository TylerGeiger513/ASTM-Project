const urlHeader = `https://publicrecords.copyright.gov/advanced-search?records_per_page=10&subquery=`;

class Search {
    constructor (filters) {
        this.filters = filters;
    };

    addFilter(filter) {
        this.filters.push(filter);
    };

    getFilters() {
        return this.filters;
    };

    getUrlFromFilters() {
        let url = urlHeader;
        
        this.filters.forEach((filter, index, arr) => {
            url += filter.encodeFilter();
            if (index != arr.length - 1) { // Add string to all filters except the last
                url+='&subquery='
            }
        })
        url+='&date_field=representative_date&sort_field=representative_date&sort_order=desc';
        return url;
    };
}


class Filter {
    constructor(content, fieldHeading = 'Title', searchType = 'Contains', operatorType= 'AND') {
        this.operatorType = operatorType;
        this.fieldHeading = fieldHeading;
        this.searchType = searchType;
        this.content = content;
    };

    encodeFilter() {
        const params = 
        `{"queryTerm":"${this.content}",
        "operatorType":"${this.operatorType}",
        "fieldHeading":"${this.fieldHeading}",
        "searchType":"${this.searchType}",
        "searchTypeReverseLookup":{"exact":"Is (exact)","starts_with":"Starts with","contains":"Contains","phrase":"As a Phrase"}}`;
        return encodeURIComponent(params);
    };
}

class ClaimantFilter extends Filter {
    constructor(claimant) {
        super('ASTM International', "Claimants", "Is (exact)", "");
    }
}



module.exports = {Search, Filter, ClaimantFilter};




