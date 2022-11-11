<?php

namespace App\Http\Controllers;

use App\Models\DoctorCategories;
use Illuminate\Http\Request;

class DoctorCategoriesController extends Controller
{
    public function index(){
        $categories = DoctorCategories::all();

        return['categories' => $categories];
    }
}
