import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcRadioComponent } from './gc-radio.component';

describe('GcRadioComponent', () => {
    let component: GcRadioComponent;
    let fixture: ComponentFixture<GcRadioComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcRadioComponent],
        });
        fixture = TestBed.createComponent(GcRadioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
