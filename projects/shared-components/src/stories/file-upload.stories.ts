import type { StoryObj } from '@storybook/angular';

import { FileUploadComponent } from '../lib/file-upload/file-upload.component';

const meta = {
  title: 'Components/lib-file-upload',
  component: FileUploadComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Primary: Story = {};
