<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\db\Notes;
use backend\modules\v1\models\searches\NotesSearch;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;

class NotesController extends ActiveController
{
    public $modelClass = Notes::class;

    /**
     * @inheritdoc
     */
    public function actions() {
        return ArrayHelper::merge(parent::actions(), [
            'index' => [
                // Добавляем подготовку провайдера для Index
                'prepareDataProvider' => [$this, 'prepareDataProvider'],
            ],
        ]);
    }

    /**
     * @return \yii\data\ActiveDataProvider
     */
    public function prepareDataProvider() {
        $searchModel = new NotesSearch();
        return $searchModel->search(\Yii::$app->request->get());
    }
}
