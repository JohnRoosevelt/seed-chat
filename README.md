# Seed Chat
This is a project built using cloudflare and svelte technologies,  aims to provide an autonomous and controllable alternative to online communication.

## Create progress

Command steps

1, create project
```bash
pnpm create cloudflare@latest
```
select web app named seed-chat to install.

2, create project worker
```bash
cd seed-chat
pnpm create cloudflare@latest
```
select durable object example named worker

3, setting the wrangler.toml,  note the **script_name**
```wrangler.toml
[durable_objects]
bindings = [
  { name = "test", class_name = "Test", script_name = 'worker' },
]
```



note: do not use vpn to deploy the network.

## Developing

```bash
pnpm run dev

# cd worker
pnpm run dev
```

## Building & Deploy

To create a production version of your app:

```bash
pnpm run deploy
cd worker
pnpm run deploy
```

## Features
>Use unocss

```bash
pnpm i -D unocss @unocss/extractor-svelte @unocss/svelte-scoped
```

Import in +layout.svelte
```javascript
import "uno.css";
```


>Use svelte5
```bash
pnpm i svelte@next
```

>[*Use AtoUI*](https://ato-ui.vercel.app/docs/get-started/1-installation)

>[*Use Superforms*](https://superforms.rocks/get-started)

>[*Use PUG*](https://kit.svelte.dev/docs/integrations#preprocessors-svelte-preprocess)


