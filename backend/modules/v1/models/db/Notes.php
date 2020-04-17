<?php

namespace backend\modules\v1\models\db;

use Yii;

/**
 * This is the model class for table "notes".
 *
 * {@inheritdoc}
 */
class Notes extends \common\models\db\Notes
{
    public function fields()
    {
        $fields = [
            'id' => 'id',
            'title' => 'title',
            'description' => 'description',
            'create_at' => 'create_at',
            'favorite' => 'favorite',
        ];

        return $fields;
    }
}
