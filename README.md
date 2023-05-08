# manager

Vendor name for publishing : PGVirtual\Manager\ManagerServiceProvider

```php
"require": {
        ...
        "pgvirtual/manager": "dev-dev"
},
```

```php
"repositories": {
        "pgvirtual/manager": {
            "type": "vcs",
            "url": "https://gitlab+deploy-token-**:*********@git.xpegma.eu/pgvirtual/manager.git"
        }
    },
```

Once installed proceed publishing:

`php artisan vendor:publish`

`php artisan vendor:publish --provider="PGVirtual\Manager\ManagerServiceProvider"`

and selecting `public` assets.

Populate the database using seeds:
`php artisan db:seed --class=ManagerUsersSeeder`

## MUI v3 - Building frondend

1. yarn set version berry;
2. yarn install
3. yarn prod (production build)|| yarn dev (developers version)


# dev build
- run the sh file -   ./dev/linux/build.sh
- run pint - ./vendor/bin/pint - lint
- run codesniffer - vendor/bin/phpcs -v src
- run fix sniffer - vendor/bin/phpcbf --standard=PSR12 src
