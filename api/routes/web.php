<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function ($router) {
    $router->group(['prefix' => '2019'], function ($router) {
        $router->group(['prefix' => 'facebook'], function ($router) {
            $router->get('posts', 'FacebookController@getPosts');
        });
        $router->group(['namespace' => 'Year2019'], function () use ($router) {
            $router->get('initial', 'InitialController@index');
            $router->group(['prefix' => 'community'], function ($router) {
                $router->get('/', 'CommunityController@index');
                $router->get('/organizer/{id}', 'CommunityController@getOrganizer');
                $router->get('/participant/{id}', 'CommunityController@getParticipant');
                $router->get('/images/{name}', 'CommunityController@imagesView');
            });
            $router->group(['prefix' => 'volunteer'], function ($router) {
                $router->get('/', 'VolunteerController@index');
                $router->get('/{id}', 'VolunteerController@show');
                $router->get('/images/{name}', 'VolunteerController@imagesView');
            });
            $router->group(['prefix' => 'sponsor'], function ($router) {
                $router->get('', 'SponsorController@index');
                $router->get('images/{name}', 'SponsorController@imagesView');
            });
            // Speaker
            $router->group(['prefix' => 'speaker'], function ($router) {
                $router->get('', 'SpeakerController@index');
                $router->get('tags', 'SpeakerController@getTags');
                $router->get('{id}', 'SpeakerController@show');
                $router->get('images/{platform}/{name}', 'SpeakerController@imagesView');
            });
            $router->group(['prefix' => 'unconf'], function ($router) {
                $router->get('/', 'UnconfController@index');
                $router->get('/list', 'UnconfController@getUnconfList');
                $router->get('/{id}', 'UnconfController@show');
            });
            $router->group(['prefix' => 'news'], function ($router) {
                $router->get('', 'NewsController@index');
                $router->get('{id}', 'NewsController@show');
            });
            $router->group(['prefix' => 'session'], function ($router) {
                $router->get('/', 'SessionController@index');
                $router->get('/list', 'SessionController@getSessionList');
                $router->get('/{id}', 'SessionController@show');
            });
            $router->group(['prefix' => 'home'], function ($router) {
                $router->get('/', 'AppHomeController@index');
                $router->get('/images/{name}', 'AppHomeController@show');
            });
            $router->group(['prefix' => 'board'], function ($router) {
                $router->get('/{room}', 'BoardController@index');
                $router->get('images/{type}/{name}', 'BoardController@imagesView');
            });
        });
    });
    $router->group(['prefix' => '2020'], function ($router) {
        $router->group(['prefix' => 'facebook'], function ($router) {
            $router->get('posts', 'FacebookController@getPosts');
        });
        $router->group(['namespace' => 'Year2020'], function () use ($router) {
            $router->get('initial', 'InitialController@index');
            $router->group(['prefix' => 'speaker'], function ($router) {
                $router->get('', 'SpeakerController@index');
                $router->get('tags', 'SpeakerController@getTags');
                $router->get('{id}', 'SpeakerController@show');
                $router->get('images/{platform}/{name}', 'SpeakerController@imagesView');
            });
            $router->group(['prefix' => 'volunteer'], function ($router) {
                $router->get('/', 'VolunteerController@index');
                $router->get('/{id}', 'VolunteerController@show');
                $router->get('/images/{name}', 'VolunteerController@imagesView');
            });
            $router->group(['prefix' => 'community'], function ($router) {
                $router->get('/', 'CommunityController@index');
                $router->get('/organizer/{id}', 'CommunityController@getOrganizer');
                $router->get('/participant/{id}', 'CommunityController@getParticipant');
                $router->get('/images/{name}', 'CommunityController@imagesView');
            });
            $router->group(['prefix' => 'session'], function ($router) {
                $router->get('/', 'SessionController@index');
                $router->get('/list', 'SessionController@getSessionList');
                $router->get('/{id}', 'SessionController@show');
            });
            $router->group(['prefix' => 'sponsor'], function ($router) {
                $router->get('', 'SponsorController@index');
                $router->get('images/{name}', 'SponsorController@imagesView');
            });
            $router->group(['prefix' => 'unconf'], function ($router) {
                $router->get('/', 'UnconfController@index');
                $router->get('/list', 'UnconfController@getUnconfList');
                $router->get('/{id}', 'UnconfController@show');
            });
            $router->group(['prefix' => 'news'], function ($router) {
                $router->get('', 'NewsController@index');
                $router->get('{id}', 'NewsController@show');
            });
            $router->group(['prefix' => 'home'], function ($router) {
                $router->get('/', 'AppHomeController@index');
                $router->get('/images/{name}', 'AppHomeController@show');
            });
            $router->group(['prefix' => 'board'], function ($router) {
                $router->get('/{room}', 'BoardController@index');
                $router->get('images/{type}/{name}', 'BoardController@imagesView');
            });
        });
    });
    $router->group(['prefix' => '2022'], function ($router) {
        $router->group(['prefix' => 'facebook'], function ($router) {
            $router->get('posts', 'FacebookController@getPosts');
        });
        $router->group(['namespace' => 'Year2022'], function () use ($router) {
            $router->get('initial', 'InitialController@index');
            $router->group(['prefix' => 'speaker'], function ($router) {
                $router->get('', 'SpeakerController@index');
                $router->get('tags', 'SpeakerController@getTags');
                $router->get('{id}', 'SpeakerController@show');
                $router->get('images/{platform}/{name}', 'SpeakerController@imagesView');
            });
            $router->group(['prefix' => 'volunteer'], function ($router) {
                $router->get('/', 'VolunteerController@index');
                $router->get('/{id}', 'VolunteerController@show');
                $router->get('/images/{name}', 'VolunteerController@imagesView');
            });
            $router->group(['prefix' => 'community'], function ($router) {
                $router->get('/', 'CommunityController@index');
                $router->get('/organizer/{id}', 'CommunityController@getOrganizer');
                $router->get('/participant/{id}', 'CommunityController@getParticipant');
                $router->get('/images/{name}', 'CommunityController@imagesView');
            });
            $router->group(['prefix' => 'session'], function ($router) {
                $router->get('/', 'SessionController@index');
                $router->get('/list', 'SessionController@getSessionList');
                $router->get('/{id}', 'SessionController@show');
            });
            $router->group(['prefix' => 'sponsor'], function ($router) {
                $router->get('', 'SponsorController@index');
                $router->get('images/{name}', 'SponsorController@imagesView');
            });
            $router->group(['prefix' => 'unconf'], function ($router) {
                $router->get('/', 'UnconfController@index');
                $router->get('/list', 'UnconfController@getUnconfList');
                $router->get('/{id}', 'UnconfController@show');
            });
            $router->group(['prefix' => 'news'], function ($router) {
                $router->get('', 'NewsController@index');
                $router->get('{id}', 'NewsController@show');
            });
            $router->group(['prefix' => 'home'], function ($router) {
                $router->get('/', 'AppHomeController@index');
                $router->get('/images/{name}', 'AppHomeController@show');
            });
            $router->group(['prefix' => 'board'], function ($router) {
                $router->get('/{room}', 'BoardController@index');
                $router->get('images/{type}/{name}', 'BoardController@imagesView');
            });
        });
    });
});
