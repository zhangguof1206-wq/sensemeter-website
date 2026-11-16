import { execFileSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { createCleanupPlan, validateRetained, within } from "./retired-release-plan.mjs";

const root="/var/www/sensemeter-website-release-";
const expected=Object.freeze([
  [509725,"20260820",3100],[515150,"20260821-5e2344b",3101],
  [584722,"20260901-e0a7979",3102],[792307,"20260918-094748-8268420",3103],
  [881579,"20260928-091404-f3542ea",3199],[882673,"20260928-102909-317c669",3201]
].map(([pid,name,port])=>({pid,cwd:root+name,port})));
const refuse=message=>{throw new Error("PREVIEW_REFUSED: "+message);};

function processStat(pid) {
  try {
    const text=readFileSync(`/proc/${pid}/stat`,"utf8");
    const end=text.lastIndexOf(")"),fields=text.slice(end+1).trim().split(/\s+/);
    return {name:text.slice(text.indexOf("(")+1,end),state:fields[0],ppid:Number(fields[1]),startTicks:fields[19]};
  } catch(error) {if(["ENOENT","ESRCH"].includes(error.code))return null;throw new Error(`PREVIEW_REFUSED: process stat ${pid}`);}
}
const owners=line=>[...line.matchAll(/pid=(\d+)/g)].map(match=>Number(match[1]));
function sockets(mode) {
  try {return execFileSync("ss",["-H",mode],{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:15000}).trim().split("\n").filter(Boolean);}
  catch {throw new Error("PREVIEW_REFUSED: socket inspection failed");}
}

export function inspectListeners(pid,tcp,unix) {
  const rows=tcp.filter(line=>owners(line).includes(pid));
  return {
    ports:[...new Set(rows.map(line=>Number(line.trim().split(/\s+/)[3].match(/:(\d+)$/)?.[1])))],
    exclusive:rows.every(line=>owners(line).every(owner=>owner===pid)),
    unixListener:unix.some(line=>owners(line).includes(pid))
  };
}

export function readPreviewEvidence(base) {
  const tcp=sockets("-ltnp"),unix=sockets("-lxnp"),previewProcesses=[];
  for(const item of expected) {
    const stat=processStat(item.pid);
    if(!stat || stat.state === "Z")continue;
    let cwd,exe;
    try {cwd=realpathSync(`/proc/${item.pid}/cwd`);exe=realpathSync(`/proc/${item.pid}/exe`);}
    catch {throw new Error(`PREVIEW_REFUSED: process identity ${item.pid}`);}
    previewProcesses.push({
      pid:item.pid,...stat,cwd,exe,...inspectListeners(item.pid,tcp,unix)
    });
  }
  return {...base,previewProcesses};
}

export function prepareRetiredCleanup(e) {
  validateRetained(e);
  if(!Array.isArray(e.nginxPorts) || !Array.isArray(e.previewProcesses))refuse("missing backend/process evidence");
  if(new Set(e.previewProcesses.map(p=>p.pid)).size!==e.previewProcesses.length)refuse("duplicate process identity");
  for(const p of e.previewProcesses) {
    const known=expected.find(item=>item.pid===p.pid);
    if(!known || p.cwd!==known.cwd || p.exe!=="/usr/bin/node" || p.ppid!==1 || !p.name?.startsWith("next-server") || !/^\d+$/.test(p.startTicks))refuse(`unexpected identity for ${p.pid}`);
    if(p.ports.length!==1 || p.ports[0]!==known.port || !p.exclusive || p.unixListener)refuse(`unexpected listener for ${p.pid}`);
    if(e.nginxPorts.includes(known.port) || e.apps.some(app=>app.pid===p.pid))refuse(`managed or routed process ${p.pid}`);
    const managed=[...e.apps,...e.savedApps].some(app=>within(app.cwd,known.cwd)||within(app.script,known.cwd));
    if(managed)refuse(`managed directory for ${p.pid}`);
  }
  // Ignore only these verified previews for planning; actual deletion rechecks all references after they exit.
  const sources=new Set(e.previewProcesses.map(p=>`process ${p.pid}`));
  const cleanup=createCleanupPlan({...e,references:e.references.filter(ref=>!sources.has(ref.source))});
  return {previews:e.previewProcesses.map(p=>({...p})),cleanup};
}

export async function stopRetiredPreviews({apply=false,collect,health,sendTerm,waitForExit,report}) {
  const plan=prepareRetiredCleanup(await collect());
  report({event:"previews",previews:plan.previews,plan:plan.cleanup});
  if(!apply)return plan;
  await health();
  for(const original of plan.previews) {
    const fresh=prepareRetiredCleanup(await collect()).previews.find(p=>p.pid===original.pid);
    if(!fresh)continue;
    if(fresh.startTicks!==original.startTicks)refuse(`PID reused: ${original.pid}`);
    await sendTerm(fresh);
    await waitForExit(fresh);
    report({event:"stopped",pid:fresh.pid,port:fresh.ports[0]});
  }
  await health();
  return plan;
}

export async function waitForPreviewExit(snapshot) {
  for(let n=0;n<30;n++) {
    const stat=processStat(snapshot.pid);
    if(!stat || stat.state==="Z" || stat.startTicks!==snapshot.startTicks)return;
    await delay(500);
  }
  refuse(`process ${snapshot.pid} did not exit; no SIGKILL sent`);
}
