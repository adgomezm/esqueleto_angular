import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcCheckboxComponent } from './gc-checkbox.component';

describe('GcCheckboxComponent', () => {
    let component: GcCheckboxComponent;
    let fixture: ComponentFixture<GcCheckboxComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcCheckboxComponent],
        });
        fixture = TestBed.createComponent(GcCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
