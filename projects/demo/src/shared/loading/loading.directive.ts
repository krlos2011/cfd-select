import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appLoading]',
  host: {
    '[class.app-loading]': 'loading',
  },
})
export class LoadingDirective {
  @Input('appLoading') loading: boolean;

  constructor() {}
}
