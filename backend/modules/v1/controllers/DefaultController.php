<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\component\Controller;

/**
 * Default controller for the `V1` module
 */
class DefaultController extends Controller
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        return $this->redirect(['api/ping']);
    }
}
