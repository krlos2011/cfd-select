import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'option[cfdSelectOption]',
  host: {
    '[attr.selected]': 'selected || null',
  },
})
export class CfdOptionDirective {
  private _selected: boolean;
  @Input()
  get selected() {
    return this._selected;
  }
  set selected(value: any) {
    this._selected = coerceBooleanProperty(value);
  }
  @Input() value: any;
}

@Component({
  selector: 'cfd-select',
  templateUrl: './cfd-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CfdSelectComponent),
      multi: true,
    },
  ],
})
export class CfdSelectComponent
  implements ControlValueAccessor, AfterContentInit, OnChanges, OnDestroy {
  private childrenChangeSub: Subscription;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  private _disabled: boolean;
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _multiple: boolean;
  @Input()
  get multiple() {
    return this._multiple;
  }
  set multiple(value: any) {
    this._multiple = coerceBooleanProperty(value);
  }

  private _required: boolean;
  @Input()
  get required() {
    return this.control
      ? !!this.control.validator?.({} as AbstractControl)?.required
      : this._required;
  }
  set required(value: any) {
    this._required = coerceBooleanProperty(value);
  }

  @Output() blur = new EventEmitter();

  @ViewChild('selectSingle', { static: false })
  selectSingle: ElementRef<HTMLSelectElement>;
  @ViewChild('selectMultiple', { static: false })
  selectMulti: ElementRef<HTMLSelectElement>;

  @ContentChildren(CfdOptionDirective)
  childrenOptions: QueryList<CfdOptionDirective>;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  get control() {
    return (
      this.formControl ||
      (this.formControlName &&
        this.controlContainer.control.get(this.formControlName))
    );
  }

  // The internal data model
  private _value: any;
  get value(): any {
    return this._value;
  }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChangeCallback(this._value);
    }
  }

  constructor(
    private injector: Injector,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterContentInit() {
    this.childrenChangeSub = this.childrenOptions.changes.subscribe(() => {
      this.setSelectedValue();
    });

    this.setSelectedValue();
  }

  public ngOnChanges(changes: SimpleChanges) {
    const multipleChange = changes.multiple;
    if (
      multipleChange &&
      !multipleChange.firstChange &&
      this.value !== null &&
      this.value !== undefined
    ) {
      const { currentValue, previousValue } = multipleChange;
      if (!previousValue && currentValue) {
        this.value = [this.value];
      } else if (previousValue && !currentValue) {
        this.value = this.value.length ? this.value[0] : null;
      }
    }
  }

  public ngOnDestroy() {
    if (this.childrenChangeSub) {
      this.childrenChangeSub.unsubscribe();
    }
  }

  private setSelectedValue() {
    if (!this.childrenOptions?.length) {
      return;
    }

    if (this.value === undefined || this.value === null) {
      // If no value defined, set value as selected Element
      const value = this.childrenOptions
        .filter(option => option.selected)
        .map(option => option.value);

      if (value.length) {
        this.value = this.multiple ? value : value[0];
      }
    } else {
      // If value defined, set options.selected and selectedIndex
      this.childrenOptions.forEach(option => {
        option.selected = this.multiple
          ? this.value.includes(option.value)
          : this.value === option.value;
      });
    }

    // Clean selectedIndex if no value
    const options = (this.selectSingle || this.selectMulti)?.nativeElement
      .options;
    if (options && (this.value === undefined || this.value === null)) {
      options.selectedIndex = -1;
    }
  }

  public onBlur() {
    this.onTouchedCallback();
    this.blur.emit();
  }

  public writeValue(value: any) {
    // WORKAROUND: write value is always called a first time with null (https://github.com/angular/angular/issues/14988)
    if (this.value === undefined && value === null) {
      this.value = null;
      return;
    }

    if (value !== this._value) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
