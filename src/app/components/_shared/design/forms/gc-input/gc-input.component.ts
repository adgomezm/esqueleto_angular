import { AfterViewInit, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { GcIconPosition } from '../../gc-icon/gc-icon.component';

@Component({
    selector: 'gc-input',
    templateUrl: './gc-input.component.html',
    styleUrls: ['./gc-input.component.scss'],
})
export class GcInputComponent implements AfterViewInit {
    @Input() control: FormControl | AbstractControl = new FormControl<string>('');
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() required?: string;
    @Input() password?: string;
    @Input() number?: string;
    @Input() readonly?: string;
    @Input() value?: string | number;
    @Input() iconPosition?: GcIconPosition = 'before';
    @Input() icon?: string;
    @Input() size: 'small' | 'large' = 'large';
    @Input() autocomplete?: string;
    @Input() hint?: string;
    @Input() errors: Map<string, string> = new Map([
        ['required', 'El campo es obligatorio'],
        ['requiredTrue', 'Debe marcar este campo'],
        ['min', 'El valor está por debajo del mínimo'],
        ['max', 'El valor está por encima del máximo'],
        ['elementExists', 'Este valor no es válido'],
        ['mismoNIF', 'El NIF del proveedor y de la sociedad no pueden ser el mismo'],
        ['passwordMatch', 'Las contraseñas no coinciden'],
        ['email', 'El email no tiene el formato correcto'],
        ['pattern', 'El formato introducido no es el correcto'],
        ['facturaRepetida', 'Ya existe una factura con este número y año para este proveedor'],
    ]);
    public readonly getControl = () => this.control as FormControl;
    public readonly formErrors = (): string[] => Object.keys(this.control?.errors ?? {});

    ngAfterViewInit(): void {
        if (this.value) this.control.setValue(this.value.toString());
    }
}
