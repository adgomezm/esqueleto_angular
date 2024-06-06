import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'gc-dialog',
    templateUrl: './gc-dialog.component.html',
    styleUrls: ['./gc-dialog.component.scss'],
})
export class GcDialogComponent {
    constructor(private ref: MatDialogRef<GcDialogComponent>) {}

    @Input() title?: string;
    @Input() closeValue?: unknown;

    @Input() public close = () => this.ref.close(this.closeValue);
}
