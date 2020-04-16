<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\component\Controller;

class ApiController extends Controller
{

    public function actionPing()
    {
        return [
            'result' => 'pong',
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function verbs()
    {
        return [
            'ping' => ['POST'],
        ];
    }
}