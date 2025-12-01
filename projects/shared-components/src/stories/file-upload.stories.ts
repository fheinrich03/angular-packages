import type { StoryObj } from '@storybook/angular';

import { FileUploadComponent } from '../lib/file-upload/file-upload.component';

const meta = {
  title: 'Components/FileUploadComponent',
  component: FileUploadComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Primary: Story = {};
