import { Component, Input, ViewChild } from '@angular/core';
import { GcInputComponent } from '../gc-input/gc-input.component';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
    selector: 'gc-datepicker',
    templateUrl: './gc-datepicker.component.html',
    styleUrls: ['./gc-datepicker.component.scss'],
})
export class GcDatepickerComponent extends GcInputComponent {
    @Input() max?: Date;
    @Input() min?: Date;
    @ViewChild('picker') picker?: MatDatepicker<Date>;

    toggle = () => (this.picker ? this.picker.open() : undefined);
}
