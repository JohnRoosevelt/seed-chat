import extractorSvelte from '@unocss/extractor-svelte';
import { presetForms } from '@julr/unocss-preset-forms';
import {
  defineConfig,

  // presets
  presetAttributify,
  presetUno,
  presetWind,
  presetWebFonts,
  presetTypography,
  presetIcons,
  toEscapedSelector,
  // transformers
  transformerAttributifyJsx,
  transformerVariantGroup,
  transformerDirectives
} from 'unocss';

import { presetAtoUI } from 'ato-ui/preset';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'


export default defineConfig({
  extractors: [extractorSvelte()],
  // ...UnoCSS options
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector }) => {
      const selector = toEscapedSelector(rawSelector)
      if (name.includes('noscrollbar')) {
        return `
          ${selector}::-webkit-scrollbar {
            display: none;
          }
        `
      }
    }],
  ],
  shortcuts: [
    ['flex-bc', 'flex justify-between items-center'],
    ['flex-ec', 'flex justify-end items-center'],
    ['flex-cc', 'flex justify-center items-center'],
    ['flex-ce', 'flex justify-center items-end'],
    ['flex-cx', 'flex justify-center'],
    ['flex-cy', 'flex items-center'],
    ['scroll-y', 'overflow-y-auto custom-noscrollbar'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      scale: 1,
      warn: true,
      collections: {
        icons: FileSystemIconLoader('./static/icons'),
      },
      customizations: {
        transform(svg, collection, icon) {
          // do not apply fill to this icons on this collection
          if (collection === 'custom' && icon === 'my-icon')
            return svg
          return svg.replace(/#fff/, 'currentColor')
        },
      },
    }),
    presetWind(),
    presetAtoUI(),
    presetForms()
  ],
  transformers: [
    transformerAttributifyJsx(),
    transformerVariantGroup(), 
    transformerDirectives()
  ],
  preflights: [
    {
      getCSS: ({ theme }) => {
        // const t = theme;

        return `
          html {
            scroll-behavior: smooth;
            height: 100%;
          }
        `;
      },
    }
  ],
});