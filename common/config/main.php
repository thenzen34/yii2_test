<?php

use yii\caching\FileCache;
use yii\helpers\ArrayHelper;

$db = require __DIR__ . '/db.php';
$dbLocal = require __DIR__ . '/db-local.php';

$config = [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
        '@root'  => dirname(__DIR__) . '../..',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => FileCache::class,
        ],
    ],
];

return ArrayHelper::merge($config, $db, $dbLocal);
