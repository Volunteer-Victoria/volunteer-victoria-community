# Site map

## Pages

### Login

`/login`

No design for this page. Will be similar to https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=9%3A227

### Signup

`/signup`

https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=9%3A227

### Opportunities

`/opportunities`

https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=3%3A218

All filters persisted as query params for shareability, e.g. `/opportunities?keyword=foo%20bar&sort=date_ascending`.

The tab to [My Posts](https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=20%3A1240) will be a query param `&mine=true`

### Create opportunity

`/opportunities/create`

https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=13%3A710

### Individual opportunity

`/opportunity/{id}`

https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=13%3A282

Express interest is just a modal on this page.

### People who participated

`/opportunity/{id}/participants`

https://www.figma.com/file/zHLwwgXkNgYFRl9J9jAr39/Mockups?node-id=23%3A1657

Page will be gated based on if the user is an admin or if they created the opportunity

### Admin stuff

TBD

## Redirects

If you're not logged in, you're redirected to login

```
/** & not loggedin => /login

As we have no homepage, redirect homepage to opportunities
```

/ => /opportunities

```

Redirect all 404s to home
```

/\*\* & no match => /

```


```
