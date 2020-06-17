const {validateRequest} = require('../../utils/validators');

module.exports = (router, check, app, restrictedAreaRoutesMethods) => {

    /**
     * ALL ROUTES FOR SIGNALEMENTS
     */
    router.post('/signalements/channel/:id', validateRequest('create signalement'), app.oauth.authorise(), restrictedAreaRoutesMethods.newSignalement);
    router.get('/signalements/all', app.oauth.authorise(), restrictedAreaRoutesMethods.getSignalements);
    router.get('/signalements/channel/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.getSignalementsByChannelID);
    router.put('/signalement/update/:id', validateRequest('update signalement'), app.oauth.authorise(), restrictedAreaRoutesMethods.updateSignalement);
    router.delete('/signalements/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.deleteSignalement);

    /**
     * ALL ROUTES FOR CHANNELS
     */
    router.get('/channels/all', app.oauth.authorise(), restrictedAreaRoutesMethods.getChannels);
    router.get('/channels/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.getOneChannel);
    router.get('/channels/stream/all', app.oauth.authorise(), restrictedAreaRoutesMethods.getStreamChannel);
    router.get('/channels/banish/all', app.oauth.authorise(), restrictedAreaRoutesMethods.getBanishChannels);
    router.put('/channels/update/:id', validateRequest('update channel'), app.oauth.authorise(), restrictedAreaRoutesMethods.updateChannel);
    router.put('/channels/banish/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.banishChannel);
    router.put('/channels/unbanish/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.unbanChannel);
    router.put('/channels/listener/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.removeChannelListener);
    router.delete('/channels/delete/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.deleteChannel);

    /**
     * ALL ROUTES FOR RADIOS
     */
    router.post('/radios', validateRequest('add new radio'), app.oauth.authorise(), restrictedAreaRoutesMethods.addRadio);
    router.get('/radios/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.getOneRadio);
    router.put('/radios/update/:id', validateRequest('update radio'), app.oauth.authorise(), restrictedAreaRoutesMethods.updateOneRadio);
    router.delete('/radios/delete/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.deleteOneRadio);

    /**
     * ALL ROUTES FOR USERS
     */
    router.post('/users/create', validateRequest('create user'), app.oauth.authorise(), restrictedAreaRoutesMethods.createNewUser);
    router.get('/user/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.getOneUser);
    router.get('/users', app.oauth.authorise(), restrictedAreaRoutesMethods.getUsers);
    router.get('/users/logged', app.oauth.authorise(), restrictedAreaRoutesMethods.getUserWithOAuth);
    router.get('/users/active', app.oauth.authorise(), restrictedAreaRoutesMethods.getActiveUser);
    router.get('/users/inactive', app.oauth.authorise(), restrictedAreaRoutesMethods.getInactiveUser);
    router.put('/users/:id', validateRequest('update user'), app.oauth.authorise(), restrictedAreaRoutesMethods.updateUser);
    router.put('/users/admin/:id', validateRequest('update user with role'), app.oauth.authorise(), restrictedAreaRoutesMethods.updateUserWithRole);
    router.put('/users/password/:id', validateRequest('update password'), app.oauth.authorise(), restrictedAreaRoutesMethods.updateUserPassword);
    router.put('/users/set/inactive/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.setInactiveUser);
    router.delete('/users/delete/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.deleteUser);

    /**
     * ALL ROUTES FOR STREAMS
     */
    router.get('/stream/record/:channel_id', restrictedAreaRoutesMethods.recordStream);
    router.get('/stream/stop', restrictedAreaRoutesMethods.stopStream);
    router.get('/stream/generate/:channel_id', restrictedAreaRoutesMethods.getFirstStream);

    /**
     * ALL ROUTES FOR STATS
     */
    router.get('/stats/users', app.oauth.authorise(), restrictedAreaRoutesMethods.costUsers);
    router.get('/stats/users/active', app.oauth.authorise(), restrictedAreaRoutesMethods.costActiveUsers);
    router.get('/stats/users/inactive', app.oauth.authorise(), restrictedAreaRoutesMethods.costInactiveUsers);
    router.get('/stats/subscribers', app.oauth.authorise(), restrictedAreaRoutesMethods.costSubscribe);
    router.get('/stats/listen', app.oauth.authorise(), restrictedAreaRoutesMethods.costListen);
    router.get('/stats/listen/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.costListenForUser);
    router.get('/stats/all/listen/streams', app.oauth.authorise(), restrictedAreaRoutesMethods.costStreamsListen);
    router.get('/stats/all/listen/radios', app.oauth.authorise(), restrictedAreaRoutesMethods.costRadiosListen);
    router.get('/stats/channels/active', app.oauth.authorise(), restrictedAreaRoutesMethods.costActiveChannels);
    router.get('/stats/channels/inactive', app.oauth.authorise(), restrictedAreaRoutesMethods.costInactiveChannels);
    router.get('/stats/channels/banish', app.oauth.authorise(), restrictedAreaRoutesMethods.costBanishChannels);
    router.get('/stats/radios', app.oauth.authorise(), restrictedAreaRoutesMethods.costRadios);
    router.get('/stats/stream', app.oauth.authorise(), restrictedAreaRoutesMethods.costCreatedStream);
    router.get('/stats/stream/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.costCreatedStreamForUser);
    router.get('/stats/stream/plan', app.oauth.authorise(), restrictedAreaRoutesMethods.costPlan);
    router.get('/stats/stream/plan/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.costPlanStreamForUser);
    router.get('/stats/fav/:id', app.oauth.authorise(), restrictedAreaRoutesMethods.costFavoriteForUser);
    router.get('/stats/signalements', app.oauth.authorise(), restrictedAreaRoutesMethods.costSignalements);
    router.get('/stats/signalements/:channel_id', app.oauth.authorise(), restrictedAreaRoutesMethods.costSignalementsForUser);

    /**
     * ALL ROUTES FOR STRIPE
     */
    router.get('/subscribe/subscriptions', app.oauth.authorise(), restrictedAreaRoutesMethods.getAllSubscriptions);
    router.get('/subscribe/check/:user_id', app.oauth.authorise(), restrictedAreaRoutesMethods.checkIfUserIsSubscribe);
    router.post('/subscribe/payment', validateRequest('subscribe payment'), app.oauth.authorise(), restrictedAreaRoutesMethods.doPayment);

    /*
    * ALL ROUTES FOR FAVORITES
    */
    router.post('/radio/favorite/:user_id', validateRequest('add into favorite'), app.oauth.authorise(), restrictedAreaRoutesMethods.addRadioInFavorite);
    router.get('/radio/favorite/:user_id', validateRequest('add into favorite'), app.oauth.authorise(), restrictedAreaRoutesMethods.getFavoriteRadio);
    router.delete('/radio/favorite/:user_id', validateRequest('add into favorite'), app.oauth.authorise(), restrictedAreaRoutesMethods.deleteFavoriteRadio);

    return router

};
