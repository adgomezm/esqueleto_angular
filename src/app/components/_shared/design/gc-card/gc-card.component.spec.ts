import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcCardComponent } from './gc-card.component';

describe('GcCardComponent', () => {
    let component: GcCardComponent;
    let fixture: ComponentFixture<GcCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcCardComponent],
        });
        fixture = TestBed.createComponent(GcCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
