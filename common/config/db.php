<?php

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'sqlite:@root/data/test.db',
            'charset' => 'UTF-8',
            'emulatePrepare' => true,
            'enableSchemaCache' => true,
            'schemaCacheDuration' => 3600,
            'attributes' => [
                // use a smaller connection timeout
                PDO::ATTR_TIMEOUT => 1,
            ],
        ],      
        
    ],
];