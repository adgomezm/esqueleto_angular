import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { events } from 'src/app/utils/events';

@Component({
    selector: 'gc-file-input',
    templateUrl: './gc-file-input.component.html',
    styleUrls: ['./gc-file-input.component.scss'],
})
export class GcFileInputComponent implements OnInit, OnDestroy {
    @Input() fileClass: string = 'gc_file_input';
    @Input() label?: string;
    @Input() multiple?: string;

    public ficheros: File[] = [];
    public upload?: Subscription;

    public readonly open_file_picker = (id: string) => document.getElementById(id)?.click();
    public readonly clear_fotos = (evt: any) => {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        this.ficheros = [];
    };
    public readonly file_selected = (evt: any) => {
        evt.preventDefault();
        evt.stopPropagation();
        const classesName = [this.fileClass];
        const elemento = document.createElement('div');
        elemento.className = classesName.join(' ');

        for (const file of evt.target.files)
            events.file.file_uploaded_with_classnames.emit({ File: file, Classes: elemento.classList });
    };

    ngOnInit() {
        this.upload = events.file.file_uploaded_with_classnames.subscribe(file => {
            if (file.Classes.contains(this.fileClass))
                this.multiple !== undefined ? this.ficheros.push(file.File) : (this.ficheros = [file.File]);
        });
    }
    ngOnDestroy() {
        if (this.upload) this.upload.unsubscribe();
        delete this.upload;
    }
}
