import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { Host } from "./types.d.ts";
import { parseLine } from "./index.ts";

// Simple name and function, compact form, but not configurable
Deno.test("parseLine chariots", () => {
  const lines = [
    "Host chariot",
    "        Hostname chariot.local",
    "        IdentityFile ~/.ssh/id_rsa",
    "",
  ];
  let hosts: Array<Host> = [];
  let host: Host = {};

  for (let line of lines) {
    [host, hosts] = parseLine(line as string, host, hosts);
  }
  const [result] = hosts;
  assertEquals(result["Host"], "chariot");
  assertEquals(result["Hostname"], "chariot.local");
  assertEquals(result["IdentityFile"], "~/.ssh/id_rsa");
});

// Fully fledged test definition, longer form, but configurable (see below)
Deno.test({
  name: "parse dbcrs",
  fn: () => {
    const lines = [
      "Host dbcrs",
      "	Port 65422 ",
      "	User dbcrsp",
      "	Hostname aaa.bbb.ccc.com",
      "        IdentityFile ~/.ssh/id_rsa",
      "",
    ];
    let hosts: Array<Host> = [];
    let host: Host = {};

    for (let line of lines) {
      [host, hosts] = parseLine(line as string, host, hosts);
    }
    const [result] = hosts;
    assertEquals(result["Host"], "dbcrs");
    assertEquals(result["Hostname"], "aaa.bbb.ccc.com");
    assertEquals(result["Port"], "65422");
    assertEquals(result["User"], "dbcrsp");
    assertEquals(result["IdentityFile"], "~/.ssh/id_rsa");
  },
});
