import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GcInputComponent } from '../gc-input/gc-input.component';

@Component({
    selector: 'gc-autocomplete',
    templateUrl: './gc-autocomplete.component.html',
    styleUrls: ['./gc-autocomplete.component.scss'],
})
export class GcAutocompleteComponent extends GcInputComponent implements OnInit, OnDestroy {
    private changeListener?: Subscription;
    @Input() options?: unknown[] = [];
    optionsFiltered: string[] = [];

    ngOnInit(): void {
        this.optionsFiltered = Object.assign(this.options ?? [], []);
        this.changeListener = this.control.valueChanges.subscribe(value => {
            this.optionsFiltered = ((this.options ?? []) as string[]).filter(o =>
                o.toString().toLocaleLowerCase().includes(value.toString().toLocaleLowerCase())
            );
        });
    }
    ngOnDestroy(): void {
        if (this.changeListener) this.changeListener.unsubscribe();
        delete this.changeListener;
    }
}
