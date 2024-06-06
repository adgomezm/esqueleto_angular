import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { GcInputComponent } from '../gc-input/gc-input.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'gc-select',
    templateUrl: './gc-select.component.html',
    styleUrls: ['./gc-select.component.scss'],
})
export class GcSelectComponent<T> extends GcInputComponent implements OnInit, OnDestroy, OnChanges {
    @Input() options?: T[] = [];
    optionsFiltered: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);

    subscriptionSearch?: Subscription;
    searchForm: FormControl = new FormControl(null);
    @Input() multiple: boolean = false;

    searchExp: (t: T, value: string) => boolean = () => true;
    @Input() displayName: (t: T) => string = () => 'Falta displayName';
    @Input() displayValue: (t: T) => string | number | boolean | undefined = () => 'Falta displayKey';
    @Output() selectionChange: EventEmitter<string | number> = new EventEmitter();

    ngOnInit(): void {
        this.optionsFiltered.next((this.options ?? []).slice());
        this.searchExp = (t: T, value: string) =>
            this.displayName(t).toString().toLocaleLowerCase().includes(value.toString().toLocaleLowerCase());
        this.subscriptionSearch = this.searchForm.valueChanges.subscribe(value => {
            if (!value || !value.length) this.optionsFiltered.next((this.options ?? []).slice());
            else {
                this.optionsFiltered.next((this.options ?? []).filter(o => this.searchExp(o, value ?? '')));
            }
        });
    }
    ngOnDestroy(): void {
        if (this.subscriptionSearch) this.subscriptionSearch.unsubscribe();
        delete this.subscriptionSearch;
    }
    ngOnChanges(): void {
        this.optionsFiltered.next((this.options ?? []).slice());
    }
}
