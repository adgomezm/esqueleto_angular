import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcDialogComponent } from './gc-dialog.component';

describe('GcDialogComponent', () => {
    let component: GcDialogComponent;
    let fixture: ComponentFixture<GcDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GcDialogComponent],
        });
        fixture = TestBed.createComponent(GcDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
