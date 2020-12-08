import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, finalize, shareReplay } from 'rxjs/operators';

const CARS = ['volvo', 'saab', 'mercedes', 'audi'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly CARS = CARS;

  public options = this.formBuilder.group({
    disabled: false,
    required: false,
    multiple: false,
    selecteds: null,
  });

  public reacSyncForm = this.formBuilder.group({
    cars: null,
  });

  public reacAsyncForm = this.formBuilder.group({
    cars: null,
  });

  public templateModel = {
    cars: null,
  };

  public cars$: Observable<string[]>;
  public selectedCars: string[] = [];
  public loadingOptions = false;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    const synCarsControl = this.reacSyncForm.controls.cars;
    const asynCarsControl = this.reacAsyncForm.controls.cars;

    this.options.valueChanges.subscribe(value => {
      [synCarsControl, asynCarsControl].forEach(control => {
        value.disabled ? control.disable() : control.enable();
        control.setValidators(value.required ? [Validators.required] : null);
        control.updateValueAndValidity();
      });
    });

    this.loadOptions();
  }

  public loadOptions() {
    this.loadingOptions = true;
    this.cars$ = of(CARS).pipe(
      delay(2000),
      shareReplay(1),
      finalize(() => (this.loadingOptions = false))
    );
  }

  public reloadOptions(clean: boolean) {
    this.selectedCars = this.options.value.selecteds;
    if (clean) {
      this.reacSyncForm.setValue({ cars: null });
      this.reacAsyncForm.setValue({ cars: null });
      this.templateModel.cars = null;
    }
    this.loadOptions();
  }

  public submit(data) {
    alert(
      `${data?.cars}, ${
        !!data?.cars
          ? Array.isArray(data?.cars)
            ? 'array'
            : typeof data?.cars
          : 'falsy'
      }`
    );
  }

  public JSON = JSON;
}
