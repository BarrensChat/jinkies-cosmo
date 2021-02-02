
import { environment } from '../../environments/environment';

export class AppConstants {

  public static API_ENDPOINT = environment.api_endpoint;
  public static API_REQUEST_RETRY_COUNT = environment.api_request_retry_count;
  public static API_ENDPOINTS = {
    articles: {
      get_all: 'articles/all'
    },
    polly: {
      get_languages: 'polly/language-codes',
      get_voices: 'polly/voices',
      create: 'polly/create-polly',
      get_all: 'polly/all',
      delete: 'polly/delete'
    }
  }

}
