declare module "*.graphql" {
  import {DocumentNode} from "graphql";
  const Content: DocumentNode;
  export default Content;
}