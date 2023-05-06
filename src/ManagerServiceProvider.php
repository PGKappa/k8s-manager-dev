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
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');       
        // publishing manager bundle 
        $this->publishes([__DIR__ . '/../public' => public_path('manager')]);        
        // publishing ticketdetails icons
        $this->publishes([__DIR__ . '/../assets/icons' => public_path('assets/icons')]);
        $this->publishes([__DIR__ . '/../assets/games' => public_path('manager/games')]);
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
