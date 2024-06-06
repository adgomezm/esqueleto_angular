import { Component, Input } from '@angular/core';

@Component({
    selector: 'gc-card',
    templateUrl: './gc-card.component.html',
    styleUrls: ['./gc-card.component.scss'],
})
export class GcCardComponent {
    @Input() title?: string;
    @Input() message?: string;
    @Input() button?: string;
    @Input() button2?: string;
    @Input() btnClick?: () => void | Promise<void>;
    @Input() btnClick2?: () => void | Promise<void>;
}
