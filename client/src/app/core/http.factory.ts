import {XHRBackend, Http, RequestOptions} from '@angular/http';
import {InterceptedHttp} from './http.interceptor';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

/**
 * Use custom implementation of http service. This is needed so that the slim
 * loading bar displays during xhr requests.
 *
 * @export
 * @param {XHRBackend} xhrBackend
 * @param {RequestOptions} requestOptions
 * @param {SlimLoadingBarService} slimLoadingBarService
 * @returns {Http}
 */
export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  slimLoadingBarService: SlimLoadingBarService
): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, slimLoadingBarService);
}
