import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const source = join(process.cwd(), "public", "__forms.html");
const target = join(process.cwd(), ".next", "forms.html");

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
