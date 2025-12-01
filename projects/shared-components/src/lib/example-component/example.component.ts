import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-example',
  imports: [],
  template: `
    <p>
      example works!
    </p>
    <p>display an argument: {{ argument }}</p>
  `,
  styles: ``
})
export class ExampleComponent {
  @Input() argument = '';

}
