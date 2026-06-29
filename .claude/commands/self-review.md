---
description: Self-review of all changes on the current branch vs main
allowed-tools: Bash(git diff:*), Bash(git log:*)
---

Run `git diff main...HEAD` to get all changes on this branch.
Also run `git log main...HEAD --oneline` for context.

Review the diff as if you were a senior engineer doing a code review:

1. **Logic errors and edge cases** — anything that could break
2. **Missing error handling** — unchecked nulls, unhandled rejections
3. **Naming and clarity** — confusing variable names, missing comments on complex logic
4. **Leftover debug code** — console.logs, TODOs, commented-out blocks
5. **Security concerns** — exposed secrets, injection risks

Be direct and specific. Group findings by file. If everything looks clean, say so.
