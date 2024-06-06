import { Component, EventEmitter, Input, Output } from '@angular/core';

export type GcButtonType = 'primary' | 'icon';
export type GcButtonSize = 'large' | 'small';
export type GcButtonPosition = 'left' | 'right';
export type GcButtonColor = 'light' | 'dark';

export type GcButton = {
    Type: GcButtonType;
    Size: GcButtonSize;
    Text: string;
    Icon: string;
    IconPosition: GcButtonPosition;
    Color: GcButtonColor;
    Tooltip?: string;
    Click: () => void;
};

@Component({
    selector: 'gc-button',
    templateUrl: './gc-button.component.html',
    styleUrls: ['./gc-button.component.scss'],
})
export class GcButtonComponent {
    @Output() clicked: EventEmitter<PointerEvent | MouseEvent> = new EventEmitter<PointerEvent | MouseEvent>();

    @Input() icon?: string;
    @Input() size: GcButtonSize = 'large';
    @Input() type: GcButtonType = 'primary';
    @Input() iconPosition?: GcButtonPosition = 'left';
    @Input() color: GcButtonColor = 'dark';
    @Input() disabled?: string; // Para facilitar uso en template html. cuando === '' => true, cuando undefined => false
    @Input() stylesBtn?: string;
    @Input() aligned?: string;
    @Input() semialigned?: string;
    @Input() bold?: string;

    public readonly disable = () => (this.disabled = '');
    public readonly enable = () => delete this.disabled;
}
