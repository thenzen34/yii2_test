<?php

namespace common\models\db\query;

/**
 * This is the ActiveQuery class for [[\common\models\db\Notes]].
 *
 * @see \common\models\db\Notes
 */
class NotesQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \common\models\db\Notes[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \common\models\db\Notes|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
