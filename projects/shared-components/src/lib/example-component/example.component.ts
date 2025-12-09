import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-example',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './example.component.html',
  styles: ``
})
export class ExampleComponent {
  @Input() argument = '';

}
