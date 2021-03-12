declare module "*.css" {
  declare const css: Record<string, undefined|string>
  export = css
}
