import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'gc-tag',
    templateUrl: './gc-tag.component.html',
    styleUrls: ['./gc-tag.component.scss'],
})
export class GcTagComponent {
    @Input() label?: string;
    @Input() color: 'light' | 'dark' = 'light';
    @Input() state: boolean = false;

    @Output() stateChanged: EventEmitter<boolean> = new EventEmitter();

    public readonly click = () => {
        this.state = !this.state;
        this.stateChanged.emit(this.state);
    };
}
