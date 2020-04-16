<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%notes}}`.
 */
class m200416_104847_create_notes_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%notes}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string(250)->notNull(),
            'description' => $this->text(),
            //'create_at' => $this->timestamp()->notNull()->defaultValue(new \yii\db\Expression("NOW()")),
            /* mysql pgsql */
            'create_at' => $this->dateTime()->notNull()->defaultValue(new \yii\db\Expression("CURRENT_TIMESTAMP")),
            'favorite' => $this->boolean()->notNull()->defaultValue(false),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%notes}}');
    }
}
