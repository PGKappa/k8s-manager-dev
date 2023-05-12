<?php

namespace PGVirtual\Manager\Database\Factories;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'operator_id' => $this->faker->numberBetween(1, 10500),
            'user_id' => $this->faker->numberBetween(1, 10500),
            'time' => $this->faker->dateTime(),
            'timezone' => $this->faker->timezone(),
            'currency_id' => $this->faker->randomDigit(),
            'amount' => $this->faker->randomDigit(),
            'amount_won' => $this->faker->randomDigit(),
            'amount_refund' => $this->faker->randomDigit(),
            'ticketbody' => $this->faker->name(),
            'eventlist' => $this->faker->name(),
            'status' => $this->faker->numberBetween(0, 5),
            'statuschange_at' => $this->faker->dateTime(),
            'sync_status' => $this->faker->numberBetween(0, 5),
        ];
    }
}
