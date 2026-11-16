import { chmodSync, closeSync, constants, fstatSync, lstatSync, openSync, readFileSync, realpathSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { PRIVATE_CONFIG } from "./retired-release-plan.mjs";

export function inspectEnvironment(path) {
  let stat;
  try {stat=lstatSync(path);} catch(error) {if(error.code==="ENOENT")return {exists:false,safe:true};throw error;}
  if(stat.isSymbolicLink()) {
    try {if(realpathSync(path)!==PRIVATE_CONFIG)return {exists:true,safe:false};}
    catch {return {exists:true,safe:false};}
  } else if(!stat.isFile())return {exists:true,safe:false};
  const file=statSync(path);
  return {exists:true,safe:file.isFile() && file.size<=65536};
}

export function preserveEnvironment(release, backupDirectory, detach=false) {
  const path=join(release,".env.production.local");
  const info=inspectEnvironment(path);
  if(!info.exists)return null;
  if(!info.safe)throw new Error("ENV_BACKUP_REFUSED: unexpected environment entry");
  const parent=lstatSync(backupDirectory);
  if(!parent.isDirectory() || parent.isSymbolicLink() || realpathSync(backupDirectory)!==resolve(backupDirectory))throw new Error("ENV_BACKUP_REFUSED: unsafe backup directory");
  const source=lstatSync(path).isSymbolicLink()?PRIVATE_CONFIG:path;
  const fd=openSync(source,constants.O_RDONLY|(constants.O_NOFOLLOW||0));
  let bytes;
  try {
    const stat=fstatSync(fd);
    if(!stat.isFile() || stat.size>65536)throw new Error("ENV_BACKUP_REFUSED: environment changed");
    bytes=readFileSync(fd);
  } finally {closeSync(fd);}
  const target=join(backupDirectory,basename(release)+".env.production.local");
  writeFileSync(target,bytes,{flag:"wx",mode:0o600});
  chmodSync(target,0o600);
  if(!readFileSync(target).equals(bytes) || !readFileSync(path).equals(bytes))throw new Error("ENV_BACKUP_REFUSED: backup verification failed or source changed");
  if(detach)unlinkSync(path);
  return target;
}
