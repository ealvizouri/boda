---
description: Read staged changes and write a commit message (user will commit manually)
allowed-tools: Bash(git diff:*), Bash(git status:*)
---

Run `git diff --staged` to see all staged changes.

Write a conventional commit message:

- First line: type(scope): short summary under 50 chars
- Blank line
- Body: what changed and why, not how. Bullet points if multiple changes.

Do NOT run `git commit`. Just output the message so I can commit myself.
