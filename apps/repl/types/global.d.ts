// Types for compiled templates
declare module 'limber/templates/*' {
  import type { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

type Injections = Array<object | undefined>;

type LazyTrackedArgs = {
  positional?: Array<unknown>;
  named?: Record<string, unknown>;
};

// provided by vendor/ember/ember-template-compiler.js (somehow)
declare module 'ember-template-compiler';

declare module '@glimmer/env';

declare module '@fortawesome/ember-fontawesome-components/fa-icon';
declare module '@ember/helper';
declare module '@ember/modifier';
declare module '@sentry/ember';
declare module 'babel-plugin-htmlbars-inline-precompile';
declare module '@babel/plugin-proposal-decorators';
declare module '@glimmerx/babel-preset';
declare module '@ember/template-compilation';
declare module '@ember/template-factory';
declare module 'ember-source/dist/ember-template-compiler';
declare module '@glimmer/babel-preset';
declare module 'highlightjs-glimmer';
declare module 'highlightjs-glimmer/vendor/highlight.js';
declare module 'highlightjs-glimmer/vendor/javascript.min';
declare module 'split-grid';
declare module 'unist-util-flatmap';

declare module '@ember/template-compilation' {
  export interface CompileOptions {
    moduleName: string;
    strictMode: boolean;
    locals: Array<unknown>;
    isProduction: boolean;
    meta: Record<string, unknown>;
    plugins: {
      ast: Array<unknown>;
    };
  }
  export function compileTemplate(template: string, options: CompileOptions): any;
}

declare module 'ember-headlessui/components/menu' {
  import { ComponentLike } from '@glint/template';

  export type Element<T extends HTMLButtonElement | HTMLAnchorElement> = ComponentLike<{
    Element: T;
    Args: { tagName?: 'button' };
    Blocks: { default: [] };
  }>;

  export type Item = ComponentLike<{
    Element: HTMLDivElement;
    Blocks: { default: [{ Element: Element }] };
  }>;

  export type Items = ComponentLike<{
    Element: HTMLDivElement;
    Blocks: { default: [{ Item: Item }] };
  }>;

  export interface Menu {
    isOpen: boolean;
    Items: Items;
    Button: ComponentLike<{
      Element: HTMLButtonElement;
      Blocks: { default: [] };
    }>;
  }

  export default ComponentLike<{
    Blocks: { default: [Menu] };
  }>;
}
