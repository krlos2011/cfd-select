# CfdSelect

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

# cfd-select component

## Overview

`cfd-select` is a form control for selecting a value from a set of options, similar to the native `<select>`.

To add options, add `<option cfdSelectOption>` elements. Each option has a `value` property that can be used to set the value that will be selected if the user chooses this option. The content of the `<option cfdSelectOption>` is what will be shown to the user.

The options can be added with an async load. After the async load ends, it the form control has null or undefined value, the options using the `selected` attribute as true, will be set as the value of the form control.

## API

### cfdSelect

Selector: `cfd-select`

| Name                       | Description                                                                                                   |
| :------------------------- | :------------------------------------------------------------------------------------------------------------ |
| @Input() disabled:boolean; | Whether the component is disabled.                                                                            |
| @Input() multiple:boolean; | Whether the user should be allowed to select multiple options. Values in form control will be set in an array |
| @Input() required:boolean; | Whether the component is required.                                                                            |

### cfdSelectOption

Selector: `option[cfdSelectOption]`

| Name                       | Description                     |
| :------------------------- | :------------------------------ |
| @Input() selected:boolean; | Whether the option is selected. |
| @Input() value:any;        | Value of the option.            |

## Examples of Use

```html
<cfd-select
  id="template"
  [(ngModel)]="templateModel.cars"
  name="cars"
  [disabled]="options.value.disabled"
  [required]="options.value.required"
  [multiple]="options.value.multiple"
>
  <option
    cfdSelectOption
    *ngFor="let car of (cars$ | async)"
    [value]="car"
    [selected]="selectedCars?.includes(car)"
  >
    {{car}}
  </option>
</cfd-select>
```

# Project structure

## projects/cfd-select

A library with the **cfd-select component**

## projects/demo

Demo application

## Development server

Run `npm start demo` for a dev server with the demo application. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build [project]` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
