import { Component, Input } from '@angular/core';

export type GcIconPosition = 'before' | 'after';

@Component({
    selector: 'gc-icon',
    templateUrl: './gc-icon.component.html',
    styleUrls: ['./gc-icon.component.scss'],
})
export class GcIconComponent {
    @Input() aligned?: string; // Material symbols estan desfasados. Alinear asi a la linea de texto
    @Input() size: 'small' | 'large' = 'large';
    @Input() semialigned?: string;
    @Input() bold?: string;
}
