export class Pagination {
  public per_page: number;
  public current_page: number;
  public from: number;
  public last_page: number;
  public last_page_url: string;
  public next_page_url: string;
  public prev_page_url: string;
  public to: number;
  public total: number;
  public path: string;
  public links: [];

  constructor(requestResponse: any) {
    this.per_page = requestResponse.per_page || 10;
    this.current_page = requestResponse.current_page || 1;
    this.from = requestResponse.from || 0;
    this.to = requestResponse.to || 0;
    this.last_page = requestResponse.last_page || 0;
    this.last_page_url = requestResponse.last_page_url || '';
    this.next_page_url = requestResponse.next_page_url || '';
    this.prev_page_url = requestResponse.prev_page_url || '';
    this.total = requestResponse.total || 0;
    this.path = requestResponse.path || '';
    this.links = requestResponse.links || [];
  }

  public getQueryParams = function (): string {
    let params = new URLSearchParams();

    for (const key in this){
      if(!(this[key] instanceof Function)) {
        params.set(key, this[key]);
      }
    }

    return '?' + params;
  }
}


