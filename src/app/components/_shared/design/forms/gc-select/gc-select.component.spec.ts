import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcSelectComponent } from './gc-select.component';

describe('GcSelectComponent', () => {
    let component: GcSelectComponent;
    let fixture: ComponentFixture<GcSelectComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcSelectComponent],
        });
        fixture = TestBed.createComponent(GcSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
