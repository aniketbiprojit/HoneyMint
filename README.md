## HoneyMint

### Before migrating rename .env.example to .env

Put value for APP_KEY, DB_PASSWORD, and MAIL_* values
Also create the database DB_DATABASE

## Running instructions

`composer.phar install`
`php artisan serve`
`php artisan migrate:refresh`