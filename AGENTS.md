# Website publishing notes

This repository is a static website served from `index.html`, `styles.css`, `app.js`, and `assets/`.

## Publish changes

After editing the website, run:

```sh
./scripts/publish.sh "Describe the website update"
```

The script stages the repository changes, creates a commit, and pushes the current branch to `origin` over SSH. A successful push only confirms that GitHub received the changes. The repository currently has no checked-in hosting or deployment configuration; confirm the GitHub hosting integration before describing the site as deployed.

The remote is configured as `git@github.com:ruinuomiao/ruinuoart.git`. If SSH authentication is unavailable, ask the user to complete the one-time GitHub SSH key setup, then retry the publish command.
