# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

1. `npm install`
2. `npm start` to run front-end
3. `npm run dev:back` to run back-end

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## ToDos

- make "ctrl + s" keyboard shortcut not bring up the save menu

### ToDo Comments

- server/routers/auth.ts:10: @todo(nick-ng): use zod to validate request body
- server/routers/auth.ts:96: @todo(nick-ng): use zod to validate request
- server/routers/auth.ts:112: @todo(nick-ng): use zod to validate response from github?
- server/routers/auth.ts:125: @todo(nick-ng): use zod to validate response from github?
- server/utils/index.ts:1: @todo(nick-ng): write hmac function from scratch
- src/routes/+layout.svelte:20: @todo(nick-ng): can probably put client_id on front-end since they can see it in the url
- src/routes/+layout.svelte:21: @todo(nick-ng): include scope read:user
- src/routes/+layout.svelte:28: @todo(nick-ng): use zod to validate response
- src/routes/auth/+page.svelte:23: @todo(nick-ng): use zod to validate response body
