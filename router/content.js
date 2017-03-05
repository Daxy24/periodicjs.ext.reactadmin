'use strtict'

module.exports = function(resources) {
  const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;
  const ContentRouter = resources.express.Router();
  const assetController = resources.app.controller.native.asset;
  const helperController = resources.app.controller.extension.reactadmin.controller.helper;

  ContentRouter.use(helperController.approveOptionsRequest, ensureApiAuthenticated, helperController.fixCodeMirrorSubmit, helperController.fixFlattenedSubmit);
  // ContentRouter.use(ensureApiAuthenticated, resources.app.controller.native.account.router);

  Object.keys(resources.app.controller.native).forEach((nativeController) => {
    if (resources.app.controller.native[ nativeController ].router) {
      ContentRouter.use( resources.app.controller.native[ nativeController ].router);
    }
  });

  // ContentRouter.options('/assets', (req, res, next) => {
  //   console.log('in options route');
  //   res.sendStatus(200);
  //   res.send('ok');
  // });
  ContentRouter.post('/assetupload',
		assetController.multiupload,
		assetController.create_assets_from_files,
    (req, res) => {
      console.log('req.controllerData', req.controllerData);
      console.log('req.body', req.body);
      console.log('req.files', req.files);
      res.send({ result: 'success', data: req.controllerData, });
    });

  ContentRouter.get('/secure-asset/:id/:filename', assetController.loadAsset, assetController.decryptAsset);



  return ContentRouter;
};