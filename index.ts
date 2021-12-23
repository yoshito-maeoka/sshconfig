#!/usr/bin/env deno run --allow-env --allow-read

import * as Colors from "https://deno.land/std/fmt/colors.ts";
import { readLines } from "https://deno.land/std@0.89.0/io/mod.ts";
import { Host } from "./types.d.ts";

function usage() {
  console.log(Colors.green("Usage:"));
  console.log("sshconf hostname, ...");
}

export function parseLine(
  line: string,
  hostObj: Host,
  hostsArray: Host[],
): [Host, Host[]] {
  let result = { ...hostObj };
  if (line.match(/^Host/)) {
    result = {};
  } else if (line.match(/^$/)) {
    if (Object.keys(hostObj).length > 0) {
      hostsArray.push(hostObj);
    }
    return [hostObj, hostsArray];
  }
  const [key, value] = line.trim().split(/[ ]+/).map((i) => i.trim()); // @ts-ignore
  result[key] = value;
  return [result, hostsArray];
}

async function main(hostname?: string) {
  if (hostname) {
    const configFile = `${
      Deno.env.get("HOME") ?? "/home/yoshito-maeoka"
    }/.ssh/config`;
    let fileReader = await Deno.open(configFile);

    let hosts: Array<Host> = [];
    let host: Host = {};

    for await (let line of readLines(fileReader)) {
      [host, hosts] = parseLine(line as string, host, hosts);
    }
    return hosts.find((i) => i["Host"] === hostname);
  } else {
    usage();
  }
}
const [hostname] = Deno.args;
const result = await main(hostname);
console.log(result ?? "alias not found");
