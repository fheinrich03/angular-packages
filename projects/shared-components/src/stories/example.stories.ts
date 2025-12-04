import type { StoryObj } from '@storybook/angular';

import { ExampleComponent } from '../lib/example-component/example.component';

const meta = {
  title: 'Example/ExampleComponent',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {
    argument: {
        control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<ExampleComponent>;

export const Primary: Story = {
  args: {
    argument: 'ein wert',
  },
};
