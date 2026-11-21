import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

/** Usado apenas no build: gera o HTML estático da página inicial. */
export function render(): string {
  return renderToString(createElement(App));
}
