import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(".\\node_modules\\.bin\\tsc", ["--noEmit"]);
run(".\\node_modules\\.bin\\vite", ["build"]);
