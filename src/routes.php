<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PGVirtual\Core\Models\Language;
use PGVirtual\Core\Models\Operator;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get(
    '/manager',
    [PGVirtual\Manager\Controllers\FrontendController::class, 'showApp']
);

Route::get(
    '/manager/{all}',
    [PGVirtual\Manager\Controllers\FrontendController::class, 'showApp']
)->where('all', '^.*')->name('backoffice');

Route::group(['middleware' => [
    'web',
]], function () {
    Route::post('/api/mui/manager/login', [PGVirtual\Manager\Controllers\Auth\AuthenticatedSessionController::class, 'store'])
        // ->middleware(['auth:manager'])
        ->middleware('guest')
        ->name('login');

    Route::post('/api/mui/manager/logout', [PGVirtual\Manager\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
        ->middleware('auth:manager')
        ->name('logout');

    Route::get('/api/mui/manager/user', function (Request $request) {
        $user = $request->user('manager');

        if ($user) {
            $locale = Language::findOrFail($user->language_id)->name;
            $operator = Operator::where('id', $user->operator_id)->first();

            return [
                'username' => $user->username,
                'level' => $user->level,
                'locale' => $locale,
                'id' => $user->id,
                'operator' => $operator ? $operator->name : '',

            ];
        }

        return response()->noContent();
    })->middleware('auth:manager');
});

Route::group(['middleware' => [
    'web',
    'auth:manager',
]], function () {
    Route::prefix('api/mui/manager')->group(function () {
        // Reports/Accounting/Tickets
        Route::get('/tickets', [PGVirtual\Manager\Controllers\ReportController::class, 'index'])->name('manager-reports');
        Route::get('/tickets/{id}', [PGVirtual\Manager\Controllers\ReportController::class, 'show'])->name('manager-reports.show');
        Route::get('/autocomplete/shops', [PGVirtual\Manager\Controllers\ReportController::class, 'filterSearch'])->name('manager-reports.shops');

        // users
        Route::get('/users', [PGVirtual\Manager\Controllers\UserController::class, 'index'])->name('manager-users');
        Route::post('/users/create', [PGVirtual\Manager\Controllers\UserController::class, 'create'])->name('manager-users.store');
        Route::get('/users/{id}', [PGVirtual\Manager\Controllers\UserController::class, 'show'])->name('manager-users.show');
        Route::post('/users/{id}', [PGVirtual\Manager\Controllers\UserController::class, 'update'])->name('manager-users.update');
        Route::delete('/users/{id}', [PGVirtual\Manager\Controllers\UserController::class, 'destroy'])->name('manager-users.destroy');

        // exports
        Route::get('/export', [PGVirtual\Manager\Controllers\ExportController::class, 'getReportCSV'])->name('manager-export.reports');

        // viewers
        Route::get('/viewers', [PGVirtual\Manager\Controllers\ViewerController::class, 'index'])->name('manager-viewers');
        Route::post('/viewers/create', [PGVirtual\Manager\Controllers\ViewerController::class, 'store'])->name('manager-viewers.store');
        Route::get('/viewers/create', [PGVirtual\Manager\Controllers\ViewerController::class, 'create'])->name('manager-viewers.create');
        Route::get('/viewers/{id}', [PGVirtual\Manager\Controllers\ViewerController::class, 'show'])->name('manager-viewers.show');
        Route::post('/viewers/{id}', [PGVirtual\Manager\Controllers\ViewerController::class, 'update'])->name('manager-viewers.update');
        Route::delete('/viewers/{id}', [PGVirtual\Manager\Controllers\ViewerController::class, 'destroy'])->name('manager-viewers.destroy');
    });
});
