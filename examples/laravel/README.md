# Nutrient Web SDK Example – Laravel

This example shows how to integrate [Nutrient Web SDK](https://www.nutrient.io/sdk/web/) into a [Laravel](https://laravel.com/) app.

## Prerequisites

-   PHP
-   [Composer](https://getcomposer.org/download/)
-   [Laravel Installer](https://laravel.com/docs/8.x#the-laravel-installer)

You can install PHP via [XAMPP](https://www.mamp.info/en/mac/), [MAMP](https://www.apachefriends.org/index.html) or [Homebrew](https://formulae.brew.sh/formula/php).

## Support, Issues and License Questions

Nutrient offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/PSPDFKit/nutrient-web-examples.git

cd nutrient-web-examples/examples/laravel
```

2. Run `composer install` on your terminal.

3. Copy `.env.example` file to `.env` on the root folder.

-   For Windows, type `copy .env.example .env`
-   For Ubuntu, type `cp .env.example .env`

4. Generate your application encryption key using `php artisan key:generate`.

5. Install Nutrient Web SDK as a dependency:

```bash
npm install
```

## Running the Example

We are ready to launch the app! 🎉

```bash
npm run dev
php artisan serve
```

You can now open http://localhost:8000/ in your browser and enjoy!

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can accept your contributions.
