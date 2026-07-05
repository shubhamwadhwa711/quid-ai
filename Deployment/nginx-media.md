# Serving media / static behind Plesk nginx

The backend (`api.quidai.org`) runs in Docker behind Plesk's nginx, which proxies
everything to `127.0.0.1:8006`. With `DEBUG=False` Django does **not** serve
`/media/` (see `core/urls.py`), so uploaded company logos (`/media/logo/*.png`)
must be served by nginx directly — otherwise they 404 and images break on the site.

Add the following to **Plesk → Domains → api.quidai.org → Apache & nginx Settings →
Additional nginx directives** (do NOT hand-edit `vhost_nginx.conf`; Plesk regenerates it):

```nginx
location /media/ {
    alias /var/www/vhosts/quidai.org/api.Quidai.org/Backend/media/;
    expires 30d;
    access_log off;
}

location /static/ {
    alias /var/www/vhosts/quidai.org/api.Quidai.org/Backend/staticfiles/;
    expires 30d;
    access_log off;
}

location / {
    proxy_pass http://127.0.0.1:8006;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $server_name;
    proxy_set_header X-Forwarded-Proto $scheme;   # lets Django emit https URLs
}
```

Notes:
- Trailing slashes on both `location /media/` and its `alias` are required.
- `X-Forwarded-Proto $scheme` pairs with `SECURE_PROXY_SSL_HEADER` in
  `core/settings.py` so the API returns `https://` media URLs (no mixed-content).
- `DEBUG` must stay `False` in production. Do not force it on to serve media.
