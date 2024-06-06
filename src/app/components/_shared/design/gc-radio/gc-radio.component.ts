import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export type GcRadioOption = { value: unknown; name: string };

@Component({
    selector: 'gc-radio',
    templateUrl: './gc-radio.component.html',
    styleUrls: ['./gc-radio.component.scss'],
})
export class GcRadioComponent {
    @Input() control: FormControl = new FormControl();
    @Input() options: GcRadioOption[] = [];
}
