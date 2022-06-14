<?php

namespace App\Http\Controllers\Year2022;

use App\Http\Controllers\BaseAppHomeController;
use App\Http\Controllers\ApiTrait;

class AppHomeController extends BaseAppHomeController
{
    use ApiTrait;

    protected $year = 2022;
}
