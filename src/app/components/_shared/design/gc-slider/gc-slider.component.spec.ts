import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcSliderComponent } from './gc-slider.component';

describe('GcSliderComponent', () => {
    let component: GcSliderComponent;
    let fixture: ComponentFixture<GcSliderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcSliderComponent],
        });
        fixture = TestBed.createComponent(GcSliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
