<?php
namespace MopConApi2018\App\Http;

class Middleware
{
    protected $container;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function __get($property)
    {
        if (property_exists($this->container, $property)) {
            return $this->container->{$property};
        }
    }

    public function __invoke($request, $response, $next)
    {
        $response->getBody()->write('{"message":"The requested resourse is ');
        $response = $this->httpResourceNotFound($request, $response, $next);
        $response->getBody()->write('"now":"' . date('Y-m-d H:i:s.u T') . '"}');
        return $response;
    }

    private function httpResourceNotFound($request, $response, $next)
    {
        $response = $response->withHeader('Content-type', 'application/json');
        $response->getBody()->write('404 Not Found. ",');
        return $response;
    }
}
