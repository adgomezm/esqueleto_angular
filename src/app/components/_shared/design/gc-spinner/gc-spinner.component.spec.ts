import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcSpinnerComponent } from './gc-spinner.component';

describe('GcSpinnerComponent', () => {
    let component: GcSpinnerComponent;
    let fixture: ComponentFixture<GcSpinnerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcSpinnerComponent],
        });
        fixture = TestBed.createComponent(GcSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
