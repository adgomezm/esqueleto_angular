import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'gc-slider',
    templateUrl: './gc-slider.component.html',
    styleUrls: ['./gc-slider.component.scss'],
})
export class GcSliderComponent {
    @Input() page: number = 1;
    @Input() pages: number = 1;
    @Input() relativeUp?: string;

    @Output() changed: EventEmitter<number> = new EventEmitter<number>();

    public readonly forward = () => {
        if (this.pages === 1) return;

        if (this.page + 1 > this.pages) {
            this.page = 1;
            this.changed.emit(this.page);
        } else {
            this.page = this.page + 1;
            this.changed.emit(this.page);
        }
    };

    public readonly backward = () => {
        if (this.pages === 1) return;

        if (this.page - 1 < 1) {
            this.page = this.pages;
            this.changed.emit(this.page);
        } else {
            this.page = this.page - 1;
            this.changed.emit(this.page);
        }
    };
}
