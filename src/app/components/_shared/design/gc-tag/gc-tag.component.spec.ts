import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcTagComponent } from './gc-tag.component';

describe('GcTagComponent', () => {
    let component: GcTagComponent;
    let fixture: ComponentFixture<GcTagComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcTagComponent],
        });
        fixture = TestBed.createComponent(GcTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
