<?php

namespace PGVirtual\Manager\Traits;

trait FormatUtils
{
    public static function money($number, $options = ['locale' => 'it-IT', 'currency' => 'EUR'])
    {
        if ($options['locale'] === 'it-IT' && $options['currency'] === 'EUR') {
            return  number_format($number, 2, '.', '');
            // '€ ' .
        }

        return false;
    }
}
