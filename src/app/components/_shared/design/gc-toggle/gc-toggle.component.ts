import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'gc-toggle',
    templateUrl: './gc-toggle.component.html',
    styleUrls: ['./gc-toggle.component.scss'],
})
export class GcToggleComponent implements OnInit {
    @Input() label?: string;
    @Input() control: FormControl | AbstractControl = new FormControl();
    @Input() disabled?: string;
    @Input() size: 'large' | 'small' = 'large';
    public status: 'active' | '' = '';

    public readonly click = () => {
        this.status = this.status ? '' : 'active';
        this.control.patchValue(this.status ? true : false);
    };

    ngOnInit(): void {
        this.status = this.control.value ? 'active' : '';
        if (this.disabled !== undefined) this.control.disable();
        this.disabled = this.control.disabled ? '' : undefined;
    }
}
