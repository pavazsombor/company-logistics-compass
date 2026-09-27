<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Design system: dark-only "Diagonal kinetic glass" ops theme (tokens in `src/styles.css`); all colors oklch semantic tokens (`--ink/--panel/--line/--frost/--mist/--signal/--warn/--danger`), fonts Anton / Inter / JetBrains Mono loaded via `<link>` in `__root.tsx`. Never hardcode colors in components.
- Routes: `/` dispatch board, `/requests`, `/directory`; shared header in `src/components/ops-header.tsx`. Demo data is inline in route files — no backend connected.
