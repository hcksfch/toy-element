import type { App, Plugin } from "vue";

import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin & { name: string };
``;
export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) =>
    each(components, (component) => {
      app.use(component);
    });

  return installer as Plugin;
}

export const withInstall = <T>(component: T) => {
  const ccomp = component as SFCWithInstall<T>;
  ccomp.install = (app: App) => {
    app.component(ccomp.name, ccomp);
  };
  return ccomp;
};
