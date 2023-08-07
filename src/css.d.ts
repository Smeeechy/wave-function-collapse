declare module "*.css" {
  interface IClassNames {
    [classname: string]: string
  }
  const classnames: IClassNames
  export = classnames
}