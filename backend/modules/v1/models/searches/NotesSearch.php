<?php

namespace backend\modules\v1\models\searches;

use backend\modules\v1\models\db\Notes;
use Yii;
use yii\data\ActiveDataProvider;

/**
 * This is the model class for table "notes".
 *
 * {@inheritdoc}
 */
class NotesSearch extends Notes
{
    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params) {
        $this->load($params) || $this->load($params, '');

        $query = Notes::find();

        return new ActiveDataProvider([
            'query' => $query,
            'sort' => [
                'attributes' => [
                    'default' => [
                        'asc' => ['create_at' => SORT_ASC],
                        'desc' => ['create_at' => SORT_DESC],
                    ],
                    'favorite' => 'favorite',
                    'create_at' => 'create_at',
                ],
                'defaultOrder' => ['default' => SORT_DESC],
            ]
        ]);
    }
}
