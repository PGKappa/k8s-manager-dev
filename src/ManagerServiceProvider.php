<?php

namespace PGVirtual\Manager;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\ServiceProvider;

class ManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //wewe
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->booted(function () {
            $this->configureMiddleware();
            include __DIR__ . '/routes.php';
        });
        // $this->loadViewsFrom(__DIR__.'/views', 'manager');
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        // $this->loadTranslationsFrom(__DIR__.'/lang', 'manager');
        // $this->publishes([__DIR__.'/assets' => public_path('manager-assets'),'assets']);
        $this->publishes([__DIR__ . '/../public' => public_path('manager')]);
        // $this->publishes([__DIR__ . '/../games' => public_path('manager')]);
        $this->publishes([__DIR__ . '/../assets' => public_path('assets')]);
        $this->publishes([__DIR__ . '/database/seeders/ManagerUsersSeeder.php' => database_path('seeders/ManagerUsersSeeder.php')]);
        include_once __DIR__ . '/Models/ManagerUser.php';
    }

    protected function configureMiddleware()
    {
        $kernel = $this->app->make(Kernel::class);
        $kernel->appendToMiddlewarePriority(PGVirtual\Manager\Http\Middleware\AuthMiddleware::class);
        $kernel->appendToMiddlewarePriority(PGVirtual\Manager\Http\Middleware\EnsureTokenIsValid::class);
    }
}
