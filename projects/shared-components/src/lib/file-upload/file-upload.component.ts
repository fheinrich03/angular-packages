import { Component, EventEmitter, Output } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: "lib-yfile-upload",
  standalone: true,
  imports: [MatIcon, MatRadioModule],
  templateUrl: "./file-upload.component.html",
  styleUrl: "./file-upload.component.css",
})
export class FileUploadComponent {
  @Output() file: EventEmitter<File> = new EventEmitter<File>();

  constructor() { /* empty */ }

  private provideFile(file: File | undefined): void {
    if (file != undefined) {
      this.file.emit(file);
    }
  }

  drop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    this.provideFile(file);
  }

  dragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file: File | undefined = input?.files?.[0];

    if (file) {
      this.provideFile(file);
    }
  }
}
