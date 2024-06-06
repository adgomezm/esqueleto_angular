import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcFileInputComponent } from './gc-file-input.component';

describe('GcFileInputComponent', () => {
    let component: GcFileInputComponent;
    let fixture: ComponentFixture<GcFileInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcFileInputComponent],
        });
        fixture = TestBed.createComponent(GcFileInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
