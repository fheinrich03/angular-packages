import { applicationConfig, type Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { MatIconRegistry } from "@angular/material/icon";
import { provideHttpClient } from "@angular/common/http";
import { inject, provideAppInitializer } from "@angular/core";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideAppInitializer(() => {
          const iconRegistry = inject(MatIconRegistry);
          iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
        }),
      ],
    }),
  ],
};

export default preview;
