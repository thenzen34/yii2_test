<?php

namespace common\models\db;

use Yii;

/**
 * This is the model class for table "notes".
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $create_at
 * @property bool $favorite
 */
class Notes extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'notes';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title'], 'required'],
            [['description'], 'string'],
            [['create_at'], 'safe'],
            [['favorite'], 'boolean'],
            [['title'], 'string', 'max' => 250],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'description' => 'Description',
            'create_at' => 'Create At',
            'favorite' => 'Favorite',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\db\query\NotesQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\db\query\NotesQuery(get_called_class());
    }
}
