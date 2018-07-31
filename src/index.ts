import * as fp from "fp-ts";

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



