import * as fp from "fp-ts";
import * as ap from "./apollo";
import query from "../queries/GetTweets.graphql";

function toNumber(value) {
  const number = Number(value);
  if (!isNaN(number)) {
    return fp.option.some(number);
  } else {
    return fp.option.none;
  }
}
console.log(query)
ap.executeQuery(
  query
  , null)
  .then(a => console.log(a))


