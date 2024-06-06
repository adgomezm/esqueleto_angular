import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'gc-checkbox',
    templateUrl: './gc-checkbox.component.html',
    styleUrls: ['./gc-checkbox.component.scss'],
})
export class GcCheckboxComponent {
    @Input() label?: string;
    @Input() control: FormControl = new FormControl(false);
}
