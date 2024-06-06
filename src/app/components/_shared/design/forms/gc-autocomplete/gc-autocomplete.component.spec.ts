import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcAutocompleteComponent } from './gc-autocomplete.component';

describe('GcAutocompleteComponent', () => {
    let component: GcAutocompleteComponent;
    let fixture: ComponentFixture<GcAutocompleteComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcAutocompleteComponent],
        });
        fixture = TestBed.createComponent(GcAutocompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
