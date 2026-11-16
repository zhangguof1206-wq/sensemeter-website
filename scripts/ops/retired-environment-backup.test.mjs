import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { execFileSync } from "node:child_process";

const url=new URL("./retired-environment-backup.mjs",import.meta.url);
const backup=existsSync(url)?await import(url):{};
function fixture(t) {
  const root=mkdtempSync(join(tmpdir(),"sensemeter-env-test-"));
  const parent=realpathSync(tmpdir());
  assert.ok(realpathSync(root).startsWith(parent+sep));
  const release=join(root,"retired-release"),destination=join(root,"private-backup");
  mkdirSync(release);mkdirSync(destination,{mode:0o700});
  t.after(()=>{
    assert.equal(realpathSync(root),resolve(root));
    assert.ok(realpathSync(root).startsWith(parent+sep));
    rmSync(root,{recursive:true,force:false});
  });
  return {release,destination,env:join(release,".env.production.local")};
}
const requireBackup=()=>{
  assert.equal(typeof backup.inspectEnvironment,"function","Missing environment inspection");
  assert.equal(typeof backup.preserveEnvironment,"function","Missing verified private backup");
};

test("configuration is copied privately and verified before detaching the untracked file",t=>{
  requireBackup();const f=fixture(t);
  const bytes=Buffer.from("EXAMPLE_PRIVATE_VALUE=not-a-real-secret\n");
  writeFileSync(f.env,bytes);
  assert.deepEqual(backup.inspectEnvironment(f.env),{exists:true,safe:true});
  const path=backup.preserveEnvironment(f.release,f.destination,true);
  assert.deepEqual(readFileSync(path),bytes);
  assert.equal(existsSync(f.env),false);
});
test("archive backup without detach leaves the original until archive removal",t=>{
  requireBackup();const f=fixture(t);writeFileSync(f.env,"EXAMPLE=1\n");
  const path=backup.preserveEnvironment(f.release,f.destination,false);
  assert.equal(readFileSync(path,"utf8"),readFileSync(f.env,"utf8"));
});
test("a backup collision does not overwrite data or detach the source",t=>{
  requireBackup();const f=fixture(t);writeFileSync(f.env,"EXAMPLE=1\n");
  backup.preserveEnvironment(f.release,f.destination,false);
  assert.throws(()=>backup.preserveEnvironment(f.release,f.destination,true));
  assert.equal(readFileSync(f.env,"utf8"),"EXAMPLE=1\n");
});
test("missing configuration is a no-op; a directory or oversized entry is refused",t=>{
  requireBackup();const f=fixture(t);
  assert.deepEqual(backup.inspectEnvironment(f.env),{exists:false,safe:true});
  assert.equal(backup.preserveEnvironment(f.release,f.destination,true),null);
  mkdirSync(f.env);
  assert.equal(backup.inspectEnvironment(f.env).safe,false);
  assert.throws(()=>backup.preserveEnvironment(f.release,f.destination,true));
});
test("oversized files are not read as an environment backup",t=>{
  requireBackup();const f=fixture(t);writeFileSync(f.env,Buffer.alloc(65537));
  assert.equal(backup.inspectEnvironment(f.env).safe,false);
  assert.throws(()=>backup.preserveEnvironment(f.release,f.destination,true));
  assert.ok(existsSync(f.env));
});

test("backed-up untracked config can be detached before normal worktree removal without force",t=>{
  requireBackup();const f=fixture(t),source=join(f.release,"..","source");
  mkdirSync(source);
  const git=(path,...args)=>execFileSync("git",["-C",path,...args],{encoding:"utf8",stdio:["ignore","pipe","pipe"]});
  git(source,"init","-q","-b","main");
  writeFileSync(join(source,".gitignore"),"node_modules/\n.next/\n");
  git(source,"add",".gitignore");
  git(source,"-c","user.name=CleanupTest","-c","user.email=cleanup@example.invalid","commit","-qm","fixture");
  git(source,"worktree","add","--detach",f.release,"HEAD");
  mkdirSync(join(f.release,"node_modules"));writeFileSync(join(f.release,"node_modules","ignored"),"fixture");
  writeFileSync(f.env,"EXAMPLE_PRIVATE_VALUE=fixture\n");
  assert.equal(git(f.release,"status","--porcelain=v1","--untracked-files=all","-z"),"?? .env.production.local\0");
  const copy=backup.preserveEnvironment(f.release,f.destination,true);
  git(source,"worktree","remove",f.release);
  assert.equal(existsSync(f.release),false);
  assert.equal(readFileSync(copy,"utf8"),"EXAMPLE_PRIVATE_VALUE=fixture\n");
});
