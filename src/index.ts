import * as fp from "fp-ts";
import * as ap from "./apollo";
import GetTweetsQuery from "../queries/GetTweets.graphql";
import * as GetTweets from "../queries/__generated__/GetTweets";

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


ap.executeGraphql<null, GetTweets.GetTweets>(
  GetTweetsQuery
  , null)
  .then(a => {
    if (a && a.data) {
    }
  })
  .catch(e => console.log(e.result))


