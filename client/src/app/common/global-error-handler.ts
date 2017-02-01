import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.log('error', error);
    alert(error.status + ': ' + error.statusText);
  }
}
