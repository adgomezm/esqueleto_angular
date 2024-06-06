import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcDatepickerComponent } from './gc-datepicker.component';

describe('GcDatepickerComponent', () => {
    let component: GcDatepickerComponent;
    let fixture: ComponentFixture<GcDatepickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcDatepickerComponent],
        });
        fixture = TestBed.createComponent(GcDatepickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
