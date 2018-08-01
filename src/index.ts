import * as fp from "fp-ts";
import * as ap from "./apollo";
import query from "../queries/GetTweets.graphql";

function toNumber(value: any): fp.option.Option<number> {
  const number = Number(value);
  if (!isNaN(number)) {
    return fp.option.some(number);
  } else {
    return fp.option.none;
  }
}

const strOpt = fp.option.fromNullable(10000);
const numberValueOpt = strOpt.chain(toNumber);

const number = numberValueOpt.getOrElse(0);

console.log(number);

function hoge(arg: number) {
  console.log(arg);
}


ap.executeQuery<null, null>(
  query
  , null)
  .then(a => console.log(a))
  .catch(e => console.log(e.result))


