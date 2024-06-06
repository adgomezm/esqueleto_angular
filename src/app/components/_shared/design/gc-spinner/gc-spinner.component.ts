import { Component, Input } from '@angular/core';

@Component({
    selector: 'gc-spinner',
    templateUrl: './gc-spinner.component.html',
    styleUrls: ['./gc-spinner.component.scss'],
})
export class GcSpinnerComponent {
    @Input() size: 'large' | 'small' = 'large';
    @Input() color: 'light' | 'dark' = 'light';
    @Input() label?: string;
}
