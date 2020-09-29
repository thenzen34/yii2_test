<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\component\Controller;

class Select2Controller extends Controller
{

    public function actionSearch1()
    {
        $i = 1;
        $res = [];
        while ($i < 10) {
            $res[] = [
                'id' => $i,
                'text' => "text1 => {$i}",
            ];
            $i++;
        }
        return [
            'results' => $res
        ];
    }

    public function actionSearch2()
    {
        $i = 1;
        $res = [];
        while ($i < 10) {
            $res[] = [
                'id' => $i,
                'text' => "text2 => {$i}",
            ];
            $i++;
        }
        return [
            'results' => $res
        ];
    }

    public function actionSearch3()
    {
        $i = 1;
        $res = [];
        while ($i < 10) {
            $res[] = [
                'id' => $i,
                'text' => "text3 => {$i}",
            ];
            $i++;
        }
        return [
            'results' => $res
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