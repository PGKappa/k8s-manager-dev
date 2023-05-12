<?php

namespace PGVirtual\Manager\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
use PGVirtual\Core\Models\Operator;
use PGVirtual\Core\Models\Language;

class ManagerUser extends Authenticatable
{
    use HasFactory;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [];

    const LEVELS = [
        1 => 'root',
        2 => 'admin',
        3 => 'support',
        4 => 'analyst',
    ];

    private $LEVEL_1 = 'root';

    private $LEVEL_2 = 'admin';

    private $LEVEL_3 = 'support';

    private $LEVEL_4 = 'analyst';

    public function operator()
    {
        return $this->belongsTo("PGVirtual\Core\Models\Operator", 'operator_id', 'id');
    }

    public function language()
    {
        return $this->belongsTo('PGVirtual\Core\Models\Language', 'language_id', 'id');
    }

    /**
     * User Level access
     *
     * @param  ManagerUsers
     * @return options
     */
    public function getAccess()
    {
        $user = $this;
        $options = [];

        if ($user->level === $this->LEVEL_1) {
            /**
             * Tickets
             * - root -> god can see every ticket
             * User
             * - sub levels
             * - can see all users
             */
            $options['tickets'] = 'all';
            $options['subLevel'] = [$this->LEVEL_2,  $this->LEVEL_3,  $this->LEVEL_4];
            $options['users'] = 'all';
        }

        if ($user->level === $this->LEVEL_2) {
            //  linked to an operator can see tickets of users linked to his operator_id
            /**
             * Tickets
             * - linked to a operator can see tickets of users linked to his operator_id
             * User
             * - sublevels
             * - display/edit only users with lower level + same operator_id
             */
            $options['tickets'] = $user->operator_id;
            $options['subLevel'] = [$this->LEVEL_3,  $this->LEVEL_4];
            $options['users'] = $user->operator_id;
        }

        if ($user->level === $this->LEVEL_3) {
            /**
             * Tickets
             * - linked to a operator can see tickets of users linked to his operator_id
             * User
             * - sublevels
             * - display/edit only users with lower level + same operator_id
             */
            $options['tickets'] = $user->operator_id;
            $options['subLevel'] = [$this->LEVEL_4];
            $options['users'] = $user->operator_id;
        }

        if ($user->level === $this->LEVEL_4) {
            /**
             * Tickets
             * - analyst - ? need to see very ticket so he can analytic
             * - users  - ??
             */
            $options['subLevel'] = [];
            $options['tickets'] = $user->operator_id;
            $options['users'] = $user->operator_id;
        }

        return $options;
    }

    // deprecated
    // public function hasOperator()
    // {
    //     $user = $this;

    //     if ($user->level === $this->LEVEL_2 || $user->level === $this->LEVEL_3) {
    //         return $user->operator;
    //     }
    //     if ($user->level === $this->LEVEL_1 || $user->level === $this->LEVEL_4) {
    //         return true;
    //     }

    //     return false;
    // }

    // deprecated
    // public static function generateToken()
    // {
    //     return (string) Str::uuid();
    // }
    // deprecated
    // public static function userToken($user)
    // {
    //     $token = self::generateToken();

    //     $user->token = $token;
    //     $user->save();

    //     return $user;
    // }
}
