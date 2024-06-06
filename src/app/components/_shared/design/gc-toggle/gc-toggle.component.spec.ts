import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcToggleComponent } from './gc-toggle.component';

describe('GcToggleComponent', () => {
    let component: GcToggleComponent;
    let fixture: ComponentFixture<GcToggleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcToggleComponent],
        });
        fixture = TestBed.createComponent(GcToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
