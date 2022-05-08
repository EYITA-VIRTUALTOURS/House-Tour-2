(function(){
    var script = {
 "mouseWheelEnabled": true,
 "verticalAlign": "top",
 "minHeight": 20,
 "id": "rootPlayer",
 "paddingLeft": 0,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "desktopMipmappingEnabled": false,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850",
  "this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272",
  "this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38",
  "this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9"
 ],
 "minWidth": 20,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "start": "this.init()",
 "mobileMipmappingEnabled": false,
 "defaultVRPointer": "laser",
 "scripts": {
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "existsKey": function(key){  return key in window; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "unregisterKey": function(key){  delete window[key]; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "registerKey": function(key, value){  window[key] = value; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "height": "100%",
 "layout": "absolute",
 "paddingTop": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Player",
 "overflow": "visible",
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 116.32,
   "backwardYaw": -58.53,
   "distance": 1,
   "panorama": "this.panorama_7629C40B_7CDE_0928_41C6_B79403268518"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -71.97,
   "backwardYaw": -31.28,
   "distance": 1,
   "panorama": "this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 30.65,
   "backwardYaw": -12.31,
   "distance": 1,
   "panorama": "this.panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -156.89,
   "backwardYaw": 0.1,
   "distance": 1,
   "panorama": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 166.31,
   "backwardYaw": 0.1,
   "distance": 1,
   "panorama": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171",
 "thumbnailUrl": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_t.jpg",
 "label": "IMG_20220427_150649_00_417",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A5F75AF1_84E6_DF3B_41C6_727459A4F035",
  "this.overlay_9ADFB628_84E6_5729_41CE_2A6179260CEB",
  "this.overlay_9AAB0B6D_84E6_FD28_41D5_F193844264D8",
  "this.overlay_9B9ADF09_84E6_76E8_41B6_997DF64C2BA6",
  "this.overlay_9B2D5ABD_84E5_DF28_41D8_E39C6FB3D659",
  "this.overlay_A41DD7B0_84E2_D539_41B9_94A0D910D68E",
  "this.overlay_A47386C1_84E2_3758_418E_9AC75D3A2E16",
  "this.overlay_A6726ED9_84E2_376B_4187_7130EEF32DA0",
  "this.overlay_AE70F086_85A6_EBD9_41D9_C383465DB593"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 27.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B52CE10B_AB5D_ABC3_41C7_4C3E1220EB81"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_96E8752A_8621_9CF1_41C8_03FE930044CD",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 167.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB1C5F67_AB5D_B643_41D9_B8B0A5178AAC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 150.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4F76F14_AB5D_B7C5_41E1_7B6DAD29E5FC"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "end": "if(this.existsKey('visibility_HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850')){ if(this.getKey('visibility_HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850')) { this.setComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, true, -1, this.effect_96E99529_8621_9CF3_41DF_B92316F46A63, 'showEffect', false); } else { this.setComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, false, -1, this.effect_B5087144_AB5D_AA46_41C7_F703FBA90F4C, 'hideEffect', false); } }; this.unregisterKey('visibility_HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850'); this.setComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, false, -1, this.effect_96E8552A_8621_9CF1_41B7_FDCB858F7B39, 'hideEffect', false); this.setComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, false, -1, this.effect_96E8752A_8621_9CF1_41C8_03FE930044CD, 'hideEffect', false); this.setComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, false, -1, this.effect_94792025_8621_B4F3_41D2_4644C5C3D699, 'hideEffect', false)",
   "camera": "this.panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_camera",
   "begin": "this.registerKey('visibility_HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850', this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850.get('visible')); this.setEndToItemIndex(this.mainPlayList, 0, 1); this.keepComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, false); this.setComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, true, -1, this.effect_96E99529_8621_9CF3_41DF_B92316F46A63, 'showEffect', false)",
   "media": "this.panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, false, -1, this.effect_96E8052B_8621_9CF7_41C3_6A17230404D8, 'hideEffect', false); if(this.existsKey('visibility_HTMLText_88309725_8621_BCF0_41C4_00FB79205272')){ if(this.getKey('visibility_HTMLText_88309725_8621_BCF0_41C4_00FB79205272')) { this.setComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, true, -1, this.effect_96E8252B_8621_9CF7_41CF_782A6484B07A, 'showEffect', false); } else { this.setComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, false, -1, this.effect_B5080144_AB5D_AA46_41D1_D8F2CC17241D, 'hideEffect', false); } }; this.unregisterKey('visibility_HTMLText_88309725_8621_BCF0_41C4_00FB79205272'); this.setComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, false, -1, this.effect_96E9452B_8621_9CF7_41D7_1DD6C30E7946, 'hideEffect', false); this.setComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, false, -1, this.effect_94795025_8621_B4F3_41DA_18CD0176D8A4, 'hideEffect', false)",
   "camera": "this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_camera",
   "begin": "this.registerKey('visibility_HTMLText_88309725_8621_BCF0_41C4_00FB79205272', this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272.get('visible')); this.setEndToItemIndex(this.mainPlayList, 1, 2); this.keepComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, false); this.setComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, true, -1, this.effect_96E8252B_8621_9CF7_41CF_782A6484B07A, 'showEffect', false)",
   "media": "this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.setComponentVisibility(this.HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850, false, -1, this.effect_96E9652B_8621_9CF7_41CF_83CC8142D538, 'hideEffect', false); this.setComponentVisibility(this.HTMLText_88309725_8621_BCF0_41C4_00FB79205272, false, -1, this.effect_96E9152B_8621_9CF7_41C3_7A32D67A0270, 'hideEffect', false); if(this.existsKey('visibility_HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38')){ if(this.getKey('visibility_HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38')) { this.setComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, true, -1, this.effect_96E9052B_8621_9CF7_41D5_46FCB6AA68AD, 'showEffect', false); } else { this.setComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, false, -1, this.effect_B5082144_AB5D_AA46_41E0_1F7D02DE94F8, 'hideEffect', false); } }; this.unregisterKey('visibility_HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38'); if(this.existsKey('visibility_HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9')){ if(this.getKey('visibility_HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9')) { this.setComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, true, -1, this.effect_94791025_8621_B4F3_41D0_A25469F2F5BF, 'showEffect', false); } else { this.setComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, false, -1, this.effect_B509D144_AB5D_AA46_41BE_9AEE4DA00BC5, 'hideEffect', false); } }; this.unregisterKey('visibility_HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9')",
   "camera": "this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_camera",
   "begin": "this.registerKey('visibility_HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9', this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9.get('visible')); this.registerKey('visibility_HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38', this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38.get('visible')); this.setEndToItemIndex(this.mainPlayList, 2, 3); this.keepComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, false); this.setComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, true, -1, this.effect_96E9052B_8621_9CF7_41D5_46FCB6AA68AD, 'showEffect', false); this.keepComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, false); this.setComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, true, -1, this.effect_94791025_8621_B4F3_41D0_A25469F2F5BF, 'showEffect', false)",
   "media": "this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.keepComponentVisibility(this.HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38, true); this.keepComponentVisibility(this.HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9, true)"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_762906BE_7CDE_0968_41D3_F6E0E6573209",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7629C40B_7CDE_0928_41C6_B79403268518_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_7629C40B_7CDE_0928_41C6_B79403268518",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_7630CA36_7CDE_1978_41BA_E17595FEA539",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_76312F84_7CDE_1718_41B9_69B0B566735B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 0)",
   "media": "this.panorama_76312F84_7CDE_1718_41B9_69B0B566735B",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_94791025_8621_B4F3_41D0_A25469F2F5BF",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 148.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB792F85_AB5D_B6C7_41DD_35E7A95E68C1"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 73.36,
   "backwardYaw": 39.69,
   "distance": 1,
   "panorama": "this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 156.01,
   "backwardYaw": -13.91,
   "distance": 1,
   "panorama": "this.panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -161.54,
   "backwardYaw": -13.91,
   "distance": 1,
   "panorama": "this.panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E",
 "thumbnailUrl": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_t.jpg",
 "label": "IMG_20220427_142743_00_401",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_91ABF78F_83BE_5DC8_41D9_3AEDF2A98CA9",
  "this.overlay_90151EEF_83BE_4F49_41C8_ACBB1FD8AC3C",
  "this.overlay_95CA6CED_8462_FB2B_41C3_9C2903BD29D8",
  "this.overlay_964B3F27_8462_56D8_41DC_03A4EBF1CE24",
  "this.overlay_97EA4AD7_846E_3F78_41D7_C2D2F8EC6320"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_camera"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_94795025_8621_B4F3_41DA_18CD0176D8A4",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76312F84_7CDE_1718_41B9_69B0B566735B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 24.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4B32EBB_AB5D_B6C3_41D2_BCDE88A9A41A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 12.94,
   "backwardYaw": 127.75,
   "distance": 1,
   "panorama": "this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 141.56,
   "backwardYaw": -62.06,
   "distance": 1,
   "panorama": "this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -152.87,
   "backwardYaw": -62.06,
   "distance": 1,
   "panorama": "this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372",
 "thumbnailUrl": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_t.jpg",
 "label": "IMG_20220427_143324_00_403",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_97F3F06D_8466_2B28_41DA_A94107FADE16",
  "this.overlay_90B4731D_8466_2EE8_41AC_2013864C0485",
  "this.overlay_911478D2_8462_3B78_41D7_C26D7FE933DC",
  "this.overlay_91682705_8462_76D8_41BC_A6B794F74F44",
  "this.overlay_90E18FF4_8463_D538_41AF_F6D9DFB7F7D3"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -140.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B680906A_AB5D_AA4D_41E0_78ABA2FA9A38"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BA32600A_AB5D_A9C2_41AA_EED5B97AD622"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4EB4F00_AB5D_B7BD_41D8_6B3F9CCEE627"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -79.39,
   "backwardYaw": 148.72,
   "distance": 1,
   "panorama": "this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -4.77,
   "backwardYaw": -117.95,
   "distance": 1,
   "panorama": "this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE",
 "thumbnailUrl": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_t.jpg",
 "label": "IMG_20220427_151201_00_423",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A0F820CD_8466_2B68_41CE_4505F99BD7CF",
  "this.overlay_A06C4703_8466_56D8_41D0_61CA62DD6A37",
  "this.overlay_A127989D_8466_DBEB_41B7_71F4B6B200BC",
  "this.overlay_A162E0BB_8462_2B2F_41C5_544B3D69AE94"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_96E8552A_8621_9CF1_41B7_FDCB858F7B39",
 "easing": "cubic_in_out"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_B5082144_AB5D_AA46_41E0_1F7D02DE94F8",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 108.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBFFCFD4_AB5D_B645_41CF_CC7C9F3330F6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_camera"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_96E9452B_8621_9CF7_41D7_1DD6C30E7946",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B69F4074_AB5D_AA45_41CA_621E9DF0946D"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 56.52,
   "backwardYaw": -155.76,
   "distance": 1,
   "panorama": "this.panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -117.95,
   "backwardYaw": -4.77,
   "distance": 1,
   "panorama": "this.panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5",
 "thumbnailUrl": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_t.jpg",
 "label": "IMG_20220427_151353_00_424",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A1BDEBEC_8462_FD29_41BB_8490217FFE69",
  "this.overlay_A3F40884_8462_5BD8_41C6_734D87095919",
  "this.overlay_AC33D6F9_8462_372B_41DC_7B09B8D6B688",
  "this.overlay_AD76E674_8462_3738_41D4_C3BF9F0FF687"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 150.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4CDAF1F_AB5D_B7C3_41DA_B51C108BE140"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4BA3EA6_AB5D_B6C5_41E2_F1A18EFB4F11"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.31,
   "backwardYaw": 9.3,
   "distance": 1,
   "panorama": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 138.93,
   "backwardYaw": -19.47,
   "distance": 1,
   "panorama": "this.panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -166.94,
   "backwardYaw": -19.47,
   "distance": 1,
   "panorama": "this.panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -12.18,
   "backwardYaw": 90.94,
   "distance": 1,
   "panorama": "this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133",
 "thumbnailUrl": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_t.jpg",
 "label": "IMG_20220427_143549_00_405",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_92E56CBD_84A5_DB28_41D7_80D73A046184",
  "this.overlay_93BAF63A_84A2_5729_41DB_6D975A3D49C5",
  "this.overlay_93409F74_84A2_5539_41D0_E7F588B892C8",
  "this.overlay_9C1FB154_84A2_2D79_41D8_5D1CD308CD68",
  "this.overlay_9C17E814_84A2_7AF8_41D0_255F1BAD2CAD",
  "this.overlay_9C67856E_84AD_F529_41CA_F1C30A41F674",
  "this.overlay_9D3B70C7_84A6_2B67_41D3_4F5DFD1981EF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.76,
  "pitch": 1.02
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -123.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB215F49_AB5D_B64F_41CF_946F113F7DD9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6C5F0E4_AB5D_AA45_41D4_3A6BAA6C6A27"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.09,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B698007F_AB5D_AA43_41E3_65B83357C3BC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 167.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB49BF8F_AB5D_B6C3_41D0_33955F1C5CF1"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_96E9052B_8621_9CF7_41D5_46FCB6AA68AD",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6E770A8_AB5D_AACD_41C0_35ADD35F5511"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -93.33,
   "backwardYaw": -101.24,
   "distance": 1,
   "panorama": "this.panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -29.74,
   "backwardYaw": 168.19,
   "distance": 1,
   "panorama": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 9.3,
   "backwardYaw": 89.31,
   "distance": 1,
   "panorama": "this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 85.04,
   "backwardYaw": 83.78,
   "distance": 1,
   "panorama": "this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6",
 "thumbnailUrl": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_t.jpg",
 "label": "IMG_20220427_150025_00_411",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9C2B6D44_84A6_F558_41B3_9AE230AD0D91",
  "this.overlay_9C91FBD7_84A6_3D67_41BE_39A6F64681AA",
  "this.overlay_9CC3FF0A_84A6_56E9_41C3_BED20503ADC0",
  "this.overlay_9D7835F4_84A6_5538_41CD_A2510ECCDDF0",
  "this.overlay_9D14E27B_84A2_2F2F_41D0_7234A84A9D5F",
  "this.overlay_9D089CCF_84A2_5B67_41C4_22EC1F3FE6DB",
  "this.overlay_A6F5E4CF_8462_2B68_41D0_950F107272A3",
  "this.overlay_A0AD9752_8462_5579_41E0_68281D815870"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6EED093_AB5D_AAC3_41AF_D57ACA24DCA5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6F760C6_AB5D_AA45_41C8_B25E719992A0"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -100.36,
   "backwardYaw": -128.25,
   "distance": 1,
   "panorama": "this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D",
 "thumbnailUrl": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_t.jpg",
 "label": "IMG_20220427_144921_00_409",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9CAEC46C_84A2_2B29_41BE_B5A55914362E",
  "this.overlay_9DEFE4AC_84A3_EB29_41DB_12A54226BFA9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 39.69,
   "backwardYaw": 73.36,
   "distance": 1,
   "panorama": "this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 127.75,
   "backwardYaw": 12.94,
   "distance": 1,
   "panorama": "this.panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928",
 "thumbnailUrl": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_t.jpg",
 "label": "IMG_20220427_142958_00_402",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_97ACB91D_8462_DAE8_41CC_1BF912D5F92A",
  "this.overlay_908D4DA8_8463_F528_4169_2E1D93671AEC",
  "this.overlay_91D74B1E_8462_FEE8_41B6_68A2806D6020",
  "this.overlay_914C8E09_8466_56E8_41BA_45CE3065A5BB"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -19.47,
   "backwardYaw": 138.93,
   "distance": 1,
   "panorama": "this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF",
 "thumbnailUrl": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_t.jpg",
 "label": "IMG_20220427_144000_00_406",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_93D7CAFD_84AE_DF2B_41C7_C233987E095C",
  "this.overlay_9D29D8C0_84AF_DB58_41CA_3431D071FF48"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B526D115_AB5D_ABC7_41E3_335825649A79"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -31.28,
   "backwardYaw": -71.97,
   "distance": 1,
   "panorama": "this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -152.62,
   "backwardYaw": 18.97,
   "distance": 1,
   "panorama": "this.panorama_7630CA36_7CDE_1978_41BA_E17595FEA539"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 148.72,
   "backwardYaw": -79.39,
   "distance": 1,
   "panorama": "this.panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -93.33,
   "backwardYaw": -23.74,
   "distance": 1,
   "panorama": "this.panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E",
 "thumbnailUrl": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_t.jpg",
 "label": "IMG_20220427_150939_00_420",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A66E937D_8466_2D2B_41DF_3C413EF85228",
  "this.overlay_A672338A_8466_6DE8_41C9_18C0B56BB0AA",
  "this.overlay_A64A361C_8462_D6E8_41CA_255C88CB54C6",
  "this.overlay_A7058B38_8462_5D28_41AD_550D96DCD790",
  "this.overlay_A0A0600C_8462_2AE8_41DF_7E446AF3B7C0",
  "this.overlay_A01272E7_8462_EF58_41B2_59D2C25923ED",
  "this.overlay_A0D4563D_8462_5728_41D1_2759392FF994",
  "this.overlay_A7673397_8462_6DF8_41CA_F78565224453"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB651F7B_AB5D_B643_41CF_5160C8F057A8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6FDB0BC_AB5D_AAC5_41DC_3EB9BB365D71"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B49CFEE5_AB5D_B647_41CD_B80903E25972"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -38.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB09AF5D_AB5D_B647_41D0_6C637BD62EBA"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_76312F84_7CDE_1718_41B9_69B0B566735B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 159.78,
   "backwardYaw": 5.65,
   "distance": 1,
   "panorama": "this.panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD",
 "thumbnailUrl": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_t.jpg",
 "label": "IMG_20220427_151510_00_426",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A2E9E0D6_859E_6B78_41D8_C1584EC0FD9D",
  "this.overlay_A38413AB_859D_ED2F_41D3_15DAF2FDD385",
  "this.overlay_A36757F9_85A2_552B_41D5_34FC51703FA9",
  "this.overlay_AE97ABC9_85A3_DD6B_41BF_A660A18D5429"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 167.31,
   "backwardYaw": -78.01,
   "distance": 1,
   "panorama": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C",
 "thumbnailUrl": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_t.jpg",
 "label": "IMG_20220427_150521_00_416",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_98FD7279_84E2_6F2B_41DC_671690FCF6FF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6E150B2_AB5D_AADD_4197_5A13568728AA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -23.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4A42E91_AB5D_B6DF_41BF_34A2839B6813"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 83.78,
   "backwardYaw": 85.04,
   "distance": 1,
   "panorama": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -102,
   "backwardYaw": -35.8,
   "distance": 1,
   "panorama": "this.panorama_762906BE_7CDE_0968_41D3_F6E0E6573209"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -34.42,
   "backwardYaw": -62.05,
   "distance": 1,
   "panorama": "this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C",
 "thumbnailUrl": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_t.jpg",
 "label": "IMG_20220427_144727_00_407",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9E47F6DC_84A6_3769_4154_0622AACD704E",
  "this.overlay_996180BA_84A6_2B29_41DC_2C092B9B925E",
  "this.overlay_9FA4A76B_84A6_352F_41C9_404290943D42",
  "this.overlay_9823714D_84A5_ED6B_41D5_4A8691D6F18C",
  "this.overlay_99887C32_84A2_5B38_41CB_698011A39072",
  "this.overlay_980F32D4_84A2_6F79_41AF_5849FBB77D0D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B495CEF6_AB5D_B645_41AA_5EE7E5DCDC12"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -167.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4AC9E7B_AB5D_B643_41D0_919D1EF98A98"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -96.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6F040D1_AB5D_AA5F_41D4_57A11F1C86EC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.1,
   "backwardYaw": -156.89,
   "distance": 1,
   "panorama": "this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 168.19,
   "backwardYaw": -29.74,
   "distance": 1,
   "panorama": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -164.93,
   "backwardYaw": -29.74,
   "distance": 1,
   "panorama": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -78.01,
   "backwardYaw": 167.31,
   "distance": 1,
   "panorama": "this.panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 54.42,
   "backwardYaw": -96.34,
   "distance": 1,
   "panorama": "this.panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_763F07F3_7CDE_36F8_4199_64C559C28160",
 "thumbnailUrl": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_t.jpg",
 "label": "IMG_20220427_150342_00_414",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9EC7A439_84E2_2B2B_41C6_C5402310AECE",
  "this.overlay_982F1829_84ED_DB28_41D4_0C8C6488841D",
  "this.overlay_98EC7FB0_84EE_5539_41D6_EFEBB98DC354",
  "this.overlay_9FE0F521_84EE_2ADB_41B4_149A101280AB",
  "this.overlay_9FE11249_84EE_2F6B_41DA_9FA4E17D9E37",
  "this.overlay_994B6B7C_84EE_3D28_4197_76819B4ED5BA",
  "this.overlay_980220D7_84EE_6B78_41D6_F24ACE2511B0",
  "this.overlay_9A2E8CFD_84E2_DB28_41D8_3697E0A5F5EF",
  "this.overlay_9AF1FC42_84E2_5B59_41D1_F30FBE05B92C"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -101.24,
   "backwardYaw": -93.33,
   "distance": 1,
   "panorama": "this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA",
 "thumbnailUrl": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_t.jpg",
 "label": "IMG_20220427_150053_00_412",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9E3D9D42_84E2_3558_41D1_59224A2AFC0B",
  "this.overlay_AD14CAB8_85A6_3F28_41D2_B661202F984D"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 18.97,
   "backwardYaw": -152.62,
   "distance": 1,
   "panorama": "this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7630CA36_7CDE_1978_41BA_E17595FEA539",
 "thumbnailUrl": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_t.jpg",
 "label": "IMG_20220427_151021_00_421",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A72CB925_8462_FADB_41D1_8C898C5C3261",
  "this.overlay_A7412373_8462_6D38_41D1_67A7DCEC5612"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBABFFA3_AB5D_B6C3_418F_AB3C62D4A719"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 101.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B5089143_AB5D_AA42_419C_E0C258584519"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B684C060_AB5D_AA7D_41DC_9E7A7C435BA4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BA239FFC_AB5D_B645_41D1_33D75D37B717"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_B509D144_AB5D_AA46_41BE_9AEE4DA00BC5",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 53.01,
   "backwardYaw": -92.95,
   "distance": 1,
   "panorama": "this.panorama_762906BE_7CDE_0968_41D3_F6E0E6573209"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -128.25,
   "backwardYaw": -100.36,
   "distance": 1,
   "panorama": "this.panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -62.05,
   "backwardYaw": -34.42,
   "distance": 1,
   "panorama": "this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7",
 "thumbnailUrl": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_t.jpg",
 "label": "IMG_20220427_144849_00_408",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9DDC0397_84A2_EDE7_41DF_F608C5DCFF16",
  "this.overlay_9D723414_84A2_6AF9_41BE_C46ECAA39083",
  "this.overlay_9C930234_84BE_6F38_41D2_26519FBB1D2E",
  "this.overlay_9DA7BAFF_84BE_DF28_41C9_D535CED7ED46",
  "this.overlay_9EA57D18_84E6_3AE9_4172_BF84EA4AC9C0",
  "this.overlay_98CE1149_84E6_6D6B_41E0_3FF1F138D7D7"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6CA70DA_AB5D_AA4D_41C4_5427EBF2C314"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -58.53,
   "backwardYaw": 116.32,
   "distance": 1,
   "panorama": "this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7629C40B_7CDE_0928_41C6_B79403268518",
 "thumbnailUrl": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_t.jpg",
 "label": "IMG_20220427_150852_00_419",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6981793_847E_55F8_41A9_E60466561DD1",
  "this.overlay_A7DA92EB_8466_EF2F_41D5_2428D02E1567"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -125.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6EB409D_AB5D_AAC7_41D4_39D0CE086985"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_96E99529_8621_9CF3_41DF_B92316F46A63",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.23,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4893ED0_AB5D_B65D_41D4_1BECD9DE58B1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 87.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBBD4FAD_AB5D_B6C7_41D1_CECF3A443BBF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7629C40B_7CDE_0928_41C6_B79403268518_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB5B6F9A_AB5D_B6CD_41E1_CFDDCC20C3E1"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_94792025_8621_B4F3_41D2_4644C5C3D699",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 51.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B5305138_AB5D_ABCD_41D6_BC30B747FE5A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -126.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6941089_AB5D_AACF_41A6_A85351582C2B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -12.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4C0EF28_AB5D_B7CD_41D2_B6E6239FAA7D"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_96E9652B_8621_9CF7_41CF_83CC8142D538",
 "easing": "cubic_in_out"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_96E9152B_8621_9CF7_41C3_7A32D67A0270",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -63.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBEFFFCA_AB5D_B642_41AA_6FE0C67BB973"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -155.76,
   "backwardYaw": 56.52,
   "distance": 1,
   "panorama": "this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 166.31,
   "backwardYaw": 56.52,
   "distance": 1,
   "panorama": "this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 5.65,
   "backwardYaw": 159.78,
   "distance": 1,
   "panorama": "this.panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD",
 "thumbnailUrl": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_t.jpg",
 "label": "IMG_20220427_151432_00_425",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A17DD8FB_859D_DB28_41D3_F9E82BDB0205",
  "this.overlay_AC0D87D7_859E_F578_41D8_BE9E208B6699",
  "this.overlay_AD90D8BB_859E_DB2F_41D8_1E8851B8E9FC",
  "this.overlay_A20DF624_859E_56D8_4197_B149085F4345",
  "this.overlay_A384F814_85A2_5AF8_41C3_B0B12A220BAF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 145.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB9DFFC1_AB5D_B6BF_41AC_66659A577E3E"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -23.74,
   "backwardYaw": -93.33,
   "distance": 1,
   "panorama": "this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75",
 "thumbnailUrl": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_t.jpg",
 "label": "IMG_20220427_151055_00_422",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A743A7B5_8465_D538_41D2_81DD4C4245B7",
  "this.overlay_A2C96E39_8466_572B_41CA_30467D2C16C4"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -106.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4566E63_AB5D_B642_41A0_5E41C869C2C3"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_96E8052B_8621_9CF7_41C3_6A17230404D8",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -123.48,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB2DFF3E_AB5D_B7C2_41D3_55ADD7B06CF3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBF1BFDE_AB5D_B645_419B_44C0012FBEBA"
},
{
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.66,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4D79F34_AB5D_B7C5_41C5_592C4455ABBC"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_B5080144_AB5D_AA46_41D1_D8F2CC17241D",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.11,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4E04F0A_AB5D_B7CD_419C_9CADC6D7DB18"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBD03FF2_AB5D_B65D_41B5_95C90D993B6C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 100.61,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BBC03FE8_AB5D_B64D_41D0_37F92F8126CF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B536D12A_AB5D_ABCD_41D8_78E09AF82ED3"
},
{
 "class": "FadeInEffect",
 "duration": 1000,
 "id": "effect_96E8252B_8621_9CF7_41CF_782A6484B07A",
 "easing": "cubic_in_out"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6DED0EE_AB5D_AA45_41D1_17A88AEE589E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6D56101_AB5D_ABBF_41A7_D22EA2B85D24"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B521611F_AB5D_ABC3_41DD_8B287C9B303C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 79.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB8DFFB7_AB5D_B6C3_41DC_C1EF5E13C734"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_763F07F3_7CDE_36F8_4199_64C559C28160_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB344F53_AB5D_B643_4191_4E42270C0323"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -12.31,
   "backwardYaw": 30.65,
   "distance": 1,
   "panorama": "this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5",
 "thumbnailUrl": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_t.jpg",
 "label": "IMG_20220427_150806_00_418",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A57E4F4F_847E_7568_41C8_614016E3EF1F",
  "this.overlay_A676C9D1_8466_DD7B_41DC_03D16B3C8498"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.06,
   "backwardYaw": 141.56,
   "distance": 1,
   "panorama": "this.panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 90.94,
   "backwardYaw": -12.18,
   "distance": 1,
   "panorama": "this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7634C662_7CDE_091B_41B4_423AEBE388D6",
 "thumbnailUrl": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_t.jpg",
 "label": "IMG_20220427_143433_00_404",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_91D85A9D_84A3_DFE8_41D8_3D72D31E01D4",
  "this.overlay_93BD0279_84A2_EF2B_41DE_C1126F4D4D79",
  "this.overlay_92D7C08D_84A6_2BE8_41DC_DB1BC9A2D83E",
  "this.overlay_9300822B_84A6_2F28_41BB_54E42D63684B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_BB11CF71_AB5D_B65F_41DF_F2231EC21459"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B6D860F8_AB5D_AA4D_41D4_04DA31D7CC70"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -92.95,
   "backwardYaw": 53.01,
   "distance": 1,
   "panorama": "this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -35.8,
   "backwardYaw": -102,
   "distance": 1,
   "panorama": "this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762906BE_7CDE_0968_41D3_F6E0E6573209",
 "thumbnailUrl": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_t.jpg",
 "label": "IMG_20220427_145604_00_410",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9D773314_84BE_2EF8_41D2_37A733F088C0",
  "this.overlay_9DE5CA43_84BE_7F5F_41B1_EA164F361155",
  "this.overlay_9E63C0F9_84BE_EB2B_41B2_4AEC075F87D0",
  "this.overlay_9ECA910C_84BE_2AE8_41DF_13E246D01389"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -96.34,
   "backwardYaw": 54.42,
   "distance": 1,
   "panorama": "this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310",
 "thumbnailUrl": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_t.jpg",
 "label": "IMG_20220427_150409_00_415",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_98128EF1_84E2_573B_417C_43F3A8FB8EB6"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -13.91,
   "backwardYaw": 156.01,
   "distance": 1,
   "panorama": "this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0",
 "thumbnailUrl": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_t.jpg",
 "label": "IMG_20220427_142559_00_400",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8F54ACCE_83A2_534B_41E0_440053DE9394",
  "this.overlay_8D8849F2_83A2_7558_41D0_78BC28178ACE"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76312F84_7CDE_1718_41B9_69B0B566735B",
 "thumbnailUrl": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_t.jpg",
 "label": "IMG_20220427_151540_00_427",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3CC0AF4_85A2_3F39_41C5_B7FE1B1B7774",
  "this.overlay_AD4C4FD8_85A5_F569_4186_CF20D019BD96",
  "this.overlay_AC6FBEF8_85A6_5729_41C9_17B6AC12A2B0",
  "this.overlay_AF88CC2B_85BD_FB2F_41C4_A86C7A1F6514",
  "this.overlay_AE524381_85BE_EDDB_41D9_5B55F1F2838C"
 ]
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_B5087144_AB5D_AA46_41C7_F703FBA90F4C",
 "easing": "cubic_in_out"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "paddingLeft": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "left": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.5,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipFontSize": 13,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "shadow": false,
 "progressBarBorderSize": 0,
 "height": "100%",
 "progressBarBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "class": "ViewerArea",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "minHeight": 50,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "paddingBottom": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": true,
 "minHeight": 1,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "bottom": "0.11%",
 "contentOpaque": false,
 "height": 90,
 "shadow": false,
 "scrollBarMargin": 2,
 "horizontalAlign": "right",
 "verticalAlign": "middle",
 "gap": 3,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "data": {
  "name": "-button set container"
 },
 "overflow": "scroll",
 "paddingRight": 30,
 "paddingBottom": 0
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "left": "0%",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "gap": 10,
 "layout": "absolute",
 "backgroundOpacity": 0.6,
 "paddingTop": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "data": {
  "name": "---INFO photo"
 },
 "overflow": "scroll",
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:59px;\"><B>Entrance</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:30px;\"><B>Front door</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:30px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "minHeight": 1,
 "id": "HTMLText_886BC3EA_8621_9B71_41C2_0212CA86F850",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "left": "2.53%",
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.3%",
 "width": "25.271%",
 "scrollBarMargin": 2,
 "height": "16.108%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText1580"
 },
 "paddingRight": 10,
 "paddingBottom": 10
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:40px;\"><B>Compound</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:40px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:40px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "minHeight": 1,
 "id": "HTMLText_88309725_8621_BCF0_41C4_00FB79205272",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "left": "2.53%",
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.3%",
 "width": "25.271%",
 "scrollBarMargin": 2,
 "height": "17.73%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText1580"
 },
 "paddingRight": 10,
 "paddingBottom": 10
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:40px;\"><B>Compound</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:40px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:40px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "minHeight": 1,
 "id": "HTMLText_88A65C82_862F_8DB0_41D6_5DD605A41C38",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "left": "2.53%",
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.3%",
 "width": "25.271%",
 "scrollBarMargin": 2,
 "height": "17.73%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText1580"
 },
 "paddingRight": 10,
 "paddingBottom": 10
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:40px;\"><B>Compound</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:40px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:40px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "minHeight": 1,
 "id": "HTMLText_947DE04A_8621_B4B1_41BF_DC110FAB97D9",
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 3,
 "left": "2.53%",
 "scrollBarVisible": "rollOver",
 "borderColor": "#000000",
 "top": "5.3%",
 "width": "25.271%",
 "scrollBarMargin": 2,
 "height": "17.73%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText1580"
 },
 "paddingRight": 10,
 "paddingBottom": 10
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E, this.camera_BB792F85_AB5D_B6C7_41DD_35E7A95E68C1); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A5F75AF1_84E6_DF3B_41C6_727459A4F035",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_0_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5, this.camera_BB49BF8F_AB5D_B6C3_41D0_33955F1C5CF1); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9ADFB628_84E6_5729_41CE_2A6179260CEB",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_1_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_1_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_1_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.56,
   "image": "this.AnimatedImageResource_A5CCA717_849E_D6F8_41CE_E389F40F61E4",
   "pitch": 12.98,
   "yaw": 121.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9AAB0B6D_84E6_FD28_41D5_F193844264D8",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 10.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 121.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_2_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 12.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7629C40B_7CDE_0928_41C6_B79403268518, this.camera_BB651F7B_AB5D_B643_41CF_5160C8F057A8); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9B9ADF09_84E6_76E8_41B6_997DF64C2BA6",
 "maps": [
  {
   "hfov": 39.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_3_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 71,
      "height": 200
     }
    ]
   },
   "pitch": 6.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.05,
   "image": "this.AnimatedImageResource_A5CB2717_849E_D6F8_41CF_EAA51AB46CDF",
   "pitch": 21.02,
   "yaw": 33.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9B2D5ABD_84E5_DF28_41D8_E39C6FB3D659",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 11.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_4_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 21.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160, this.camera_BB5B6F9A_AB5D_B6CD_41E1_CFDDCC20C3E1); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A41DD7B0_84E2_D539_41B9_94A0D910D68E",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_5_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_5_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_5_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_5_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160, this.camera_BBABFFA3_AB5D_B6C3_418F_AB3C62D4A719); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A47386C1_84E2_3758_418E_9AC75D3A2E16",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_6_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_6_2_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_6_3_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.32,
   "image": "this.AnimatedImageResource_A5CA4718_849E_D6E8_41D6_E3FF1DC1A7D9",
   "pitch": 19.52,
   "yaw": 172.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A6726ED9_84E2_376B_4187_7130EEF32DA0",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_7_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 19.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.33,
   "image": "this.AnimatedImageResource_B740729F_85BE_2FE7_41C2_ABC8AB16BB49",
   "pitch": -27.45,
   "yaw": -74.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AE70F086_85A6_EBD9_41D9_C383465DB593",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 19.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_8_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -27.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0, this.camera_B69F4074_AB5D_AA45_41CA_621E9DF0946D); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_91ABF78F_83BE_5DC8_41D9_3AEDF2A98CA9",
 "maps": [
  {
   "hfov": 49.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 169,
      "height": 200
     }
    ]
   },
   "pitch": 2.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0, this.camera_B698007F_AB5D_AA43_41E3_65B83357C3BC); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_90151EEF_83BE_4F49_41C8_ACBB1FD8AC3C",
 "maps": [
  {
   "hfov": 36.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -161.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 105,
      "height": 200
     }
    ]
   },
   "pitch": 0.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928, this.camera_B680906A_AB5D_AA4D_41E0_78ABA2FA9A38); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_95CA6CED_8462_FB2B_41C3_9C2903BD29D8",
 "maps": [
  {
   "hfov": 106.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 125
     }
    ]
   },
   "pitch": 11.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.33,
   "image": "this.AnimatedImageResource_9CC263FE_846E_2D29_41C7_D2BB2EF40E9E",
   "pitch": -13,
   "yaw": 96.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_964B3F27_8462_56D8_41DC_03A4EBF1CE24",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.42,
   "image": "this.AnimatedImageResource_9CC223FF_846E_2D27_41D7_1778990B6414",
   "pitch": 9.17,
   "yaw": 173,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_97EA4AD7_846E_3F78_41D7_C2D2F8EC6320",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 6.42,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 9.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928, this.camera_B49CFEE5_AB5D_B647_41CD_B80903E25972); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_97F3F06D_8466_2B28_41DA_A94107FADE16",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_0_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_0_3_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_0_4_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_0_5_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.09,
   "image": "this.AnimatedImageResource_934110E7_8462_EB27_41DB_316ED13C26EA",
   "pitch": -29.33,
   "yaw": 2.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_90B4731D_8466_2EE8_41AC_2013864C0485",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 20.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -29.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6, this.camera_B495CEF6_AB5D_B645_41AA_5EE7E5DCDC12); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_911478D2_8462_3B78_41D7_C26D7FE933DC",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_2_1_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_2_2_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_2_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_2_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6, this.camera_B4EB4F00_AB5D_B7BD_41D8_6B3F9CCEE627); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_91682705_8462_76D8_41BC_A6B794F74F44",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_3_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_3_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_3_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_3_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.29,
   "image": "this.AnimatedImageResource_934050E7_8462_EB27_41DA_90C47C2B36AD",
   "pitch": 17.51,
   "yaw": 142.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_90E18FF4_8463_D538_41AF_F6D9DFB7F7D3",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 11.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_4_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 17.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E, this.camera_B526D115_AB5D_ABC7_41E3_335825649A79); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A0F820CD_8466_2B68_41CE_4505F99BD7CF",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_0_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.16,
   "image": "this.AnimatedImageResource_ACC7E3E5_85A2_6D5B_41DB_CA908C4086EA",
   "pitch": -27.82,
   "yaw": -88.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A06C4703_8466_56D8_41D0_61CA62DD6A37",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 18.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -27.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5, this.camera_B521611F_AB5D_ABC3_41DD_8B287C9B303C); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A127989D_8466_DBEB_41B7_71F4B6B200BC",
 "maps": [
  {
   "hfov": 63.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_2_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 95,
      "height": 200
     }
    ]
   },
   "pitch": 8.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.76,
   "image": "this.AnimatedImageResource_ACC033E6_85A2_6D59_41D9_A3C8CB2EDAEF",
   "pitch": -19.41,
   "yaw": -6.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A162E0BB_8462_2B2F_41C5_544B3D69AE94",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_3_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -19.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD, this.camera_B4B32EBB_AB5D_B6C3_41D2_BCDE88A9A41A); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A1BDEBEC_8462_FD29_41BB_8490217FFE69",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_0_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.24,
   "image": "this.AnimatedImageResource_ACC073E7_85A2_6D27_41DE_1716B388A261",
   "pitch": -19.28,
   "yaw": -123.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A3F40884_8462_5BD8_41C6_734D87095919",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 17.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -19.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.04,
   "image": "this.AnimatedImageResource_ACC053E7_85A2_6D27_41CA_15044D6D2767",
   "pitch": -28.58,
   "yaw": 56.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AC33D6F9_8462_372B_41DC_7B09B8D6B688",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.04,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_2_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -28.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE, this.camera_B4893ED0_AB5D_B65D_41D4_1BECD9DE58B1); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_AD76E674_8462_3738_41D4_C3BF9F0FF687",
 "maps": [
  {
   "hfov": 59.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_3_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 94,
      "height": 200
     }
    ]
   },
   "pitch": 12.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7634C662_7CDE_091B_41B4_423AEBE388D6, this.camera_B6D860F8_AB5D_AA4D_41D4_04DA31D7CC70); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_92E56CBD_84A5_DB28_41D7_80D73A046184",
 "maps": [
  {
   "hfov": 111.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -12.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 146
     }
    ]
   },
   "pitch": 9.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.65,
   "image": "this.AnimatedImageResource_9E24A574_84A6_F538_41E0_3558EAC223E5",
   "pitch": -29.89,
   "yaw": 147.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_93BAF63A_84A2_5729_41DB_6D975A3D49C5",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 147.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -29.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF, this.camera_B6C5F0E4_AB5D_AA45_41D4_3A6BAA6C6A27); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_93409F74_84A2_5539_41D0_E7F588B892C8",
 "maps": [
  {
   "hfov": 88.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 139,
      "height": 200
     }
    ]
   },
   "pitch": 6.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF, this.camera_B6DED0EE_AB5D_AA45_41D1_17A88AEE589E); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9C1FB154_84A2_2D79_41D8_5D1CD308CD68",
 "maps": [
  {
   "hfov": 27.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 56,
      "height": 200
     }
    ]
   },
   "pitch": 5.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6, this.camera_B6CA70DA_AB5D_AA4D_41C4_5427EBF2C314); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9C17E814_84A2_7AF8_41D0_255F1BAD2CAD",
 "maps": [
  {
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 40,
      "height": 200
     }
    ]
   },
   "pitch": 0.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.54,
   "image": "this.AnimatedImageResource_9F69AA82_84A2_5FD9_419C_C7986CB312B5",
   "pitch": 4.82,
   "yaw": 91.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9C67856E_84AD_F529_41CA_F1C30A41F674",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.92,
   "image": "this.AnimatedImageResource_9E255575_84A6_F538_41B6_D281428458AF",
   "pitch": -16.86,
   "yaw": -41.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9D3B70C7_84A6_2B67_41D3_4F5DFD1981EF",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 10.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -41.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -16.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA, this.camera_B6E150B2_AB5D_AADD_4197_5A13568728AA); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9C2B6D44_84A6_F558_41B3_9AE230AD0D91",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_0_1_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_0_2_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_0_3_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.58,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 201,
      "height": 231
     }
    ]
   },
   "pitch": 14.31,
   "yaw": -80.82
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9C91FBD7_84A6_3D67_41BE_39A6F64681AA",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 11.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": 14.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C, this.camera_B6F040D1_AB5D_AA5F_41D4_57A11F1C86EC); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9CC3FF0A_84A6_56E9_41C3_BED20503ADC0",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_2_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_2_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_2_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133, this.camera_B6F760C6_AB5D_AA45_41C8_B25E719992A0); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9D7835F4_84A6_5538_41CD_A2510ECCDDF0",
 "maps": [
  {
   "hfov": 23.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 200
     }
    ]
   },
   "pitch": -2.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.76,
   "image": "this.AnimatedImageResource_A082D2A7_8462_2F27_41CD_7277576456DF",
   "pitch": 6.7,
   "yaw": 5.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9D14E27B_84A2_2F2F_41D0_7234A84A9D5F",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 10.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 6.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.64,
   "image": "this.AnimatedImageResource_9F6C1A8A_84A2_5FE9_41A1_45CC5279C438",
   "pitch": 10.47,
   "yaw": 98.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9D089CCF_84A2_5B67_41C4_22EC1F3FE6DB",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 11.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 98.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_5_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 10.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160, this.camera_B6FDB0BC_AB5D_AAC5_41DC_3EB9BB365D71); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A6F5E4CF_8462_2B68_41D0_950F107272A3",
 "maps": [
  {
   "hfov": 43.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -29.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_6_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 47,
      "height": 200
     }
    ]
   },
   "pitch": 0.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.34,
   "image": "this.AnimatedImageResource_A09D82A7_8462_2F27_41CC_8FDCDC310360",
   "pitch": -34.79,
   "yaw": -38.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A0AD9752_8462_5579_41E0_68281D815870",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 15.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -38.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -34.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7, this.camera_B5305138_AB5D_ABCD_41D6_BC30B747FE5A); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 38.59,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 536,
      "height": 2048
     }
    ]
   },
   "pitch": 0.94,
   "yaw": -100.36
  }
 ],
 "id": "overlay_9CAEC46C_84A2_2B29_41BE_B5A55914362E",
 "maps": [
  {
   "hfov": 38.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 52,
      "height": 200
     }
    ]
   },
   "pitch": 0.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.36,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 193,
      "height": 235
     }
    ]
   },
   "pitch": 7.4,
   "yaw": -98.91
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9DEFE4AC_84A3_EB29_41DB_12A54226BFA9",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 11.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": 7.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E, this.camera_B4566E63_AB5D_B642_41A0_5E41C869C2C3); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_97ACB91D_8462_DAE8_41CC_1BF912D5F92A",
 "maps": [
  {
   "hfov": 78.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 39.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 199,
      "height": 168
     }
    ]
   },
   "pitch": 8.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.77,
   "image": "this.AnimatedImageResource_934620E6_8462_EB59_41DF_5E8ABA5D2199",
   "pitch": -13.15,
   "yaw": 56.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_908D4DA8_8463_F528_4169_2E1D93671AEC",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 14.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -13.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372, this.camera_B4AC9E7B_AB5D_B643_41D0_919D1EF98A98); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_91D74B1E_8462_FEE8_41B6_68A2806D6020",
 "maps": [
  {
   "hfov": 97.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 178
     }
    ]
   },
   "pitch": 10.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.41,
   "image": "this.AnimatedImageResource_9346B0E6_8462_EB59_417E_9F39AEBA03B8",
   "pitch": 12.31,
   "yaw": 129.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_914C8E09_8466_56E8_41BA_45CE3065A5BB",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 6.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 129.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 12.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133, this.camera_B4BA3EA6_AB5D_B6C5_41E2_F1A18EFB4F11); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_93D7CAFD_84AE_DF2B_41C7_C233987E095C",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0_HS_0_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.13,
   "image": "this.AnimatedImageResource_9F680A84_84A2_5FD8_41D3_CF5815E52169",
   "pitch": -22.92,
   "yaw": -5.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9D29D8C0_84AF_DB58_41CA_3431D071FF48",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -22.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171, this.camera_BBFFCFD4_AB5D_B645_41CF_CC7C9F3330F6); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A66E937D_8466_2D2B_41DF_3C413EF85228",
 "maps": [
  {
   "hfov": 77.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -31.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 96,
      "height": 200
     }
    ]
   },
   "pitch": 7.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.22,
   "image": "this.AnimatedImageResource_B7F0B1A6_85A2_6DD8_4198_17AD912ADB59",
   "pitch": -25.81,
   "yaw": -32.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A672338A_8466_6DE8_41C9_18C0B56BB0AA",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -32.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75, this.camera_BBD03FF2_AB5D_B65D_41B5_95C90D993B6C); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A64A361C_8462_D6E8_41CA_255C88CB54C6",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_2_1_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_2_2_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_2_3_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.7,
   "image": "this.AnimatedImageResource_B7F111A8_85A2_6D28_41C2_434A93F7204F",
   "pitch": 24.79,
   "yaw": -96.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A7058B38_8462_5D28_41AD_550D96DCD790",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_3_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 24.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7630CA36_7CDE_1978_41BA_E17595FEA539, this.camera_BBF1BFDE_AB5D_B645_419B_44C0012FBEBA); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A0A0600C_8462_2AE8_41DF_7E446AF3B7C0",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_4_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_4_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_4_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_4_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.66,
   "image": "this.AnimatedImageResource_B7F1F1AA_85A2_6D28_419A_177C2F0DCF46",
   "pitch": 25.29,
   "yaw": -153.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A01272E7_8462_EF58_41B2_59D2C25923ED",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -153.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_5_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 25.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE, this.camera_BBC03FE8_AB5D_B64D_41D0_37F92F8126CF); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A0D4563D_8462_5728_41D1_2759392FF994",
 "maps": [
  {
   "hfov": 69.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 148.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_6_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 100,
      "height": 200
     }
    ]
   },
   "pitch": 12.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.19,
   "image": "this.AnimatedImageResource_B7F271AB_85A2_6D28_41DA_738BF123D97B",
   "pitch": -22.04,
   "yaw": 134.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A7673397_8462_6DF8_41CA_F78565224453",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 20.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_7_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -22.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD, this.camera_B6D56101_AB5D_ABBF_41A7_D22EA2B85D24); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A2E9E0D6_859E_6B78_41D8_C1584EC0FD9D",
 "maps": [
  {
   "hfov": 46.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 84,
      "height": 200
     }
    ]
   },
   "pitch": 13.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.37,
   "image": "this.AnimatedImageResource_ACC123EB_85A2_6D2F_41A2_A3CE156A7BEF",
   "pitch": -15.1,
   "yaw": 162.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A38413AB_859D_ED2F_41D3_15DAF2FDD385",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 12.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 162.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -15.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A36757F9_85A2_552B_41D5_34FC51703FA9",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_2_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_2_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_2_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.25,
   "image": "this.AnimatedImageResource_AAD7213F_85AE_6D27_41E0_7CF2A984DBF8",
   "pitch": -25.57,
   "yaw": -69.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AE97ABC9_85A3_DD6B_41BF_A660A18D5429",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 18.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -69.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_3_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -25.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160, this.camera_B5089143_AB5D_AA42_419C_E0C258584519); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_98FD7279_84E2_6F2B_41DC_671690FCF6FF",
 "maps": [
  {
   "hfov": 21.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 167.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 64,
      "height": 200
     }
    ]
   },
   "pitch": 1.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6, this.camera_BA239FFC_AB5D_B645_41D1_33D75D37B717); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9E47F6DC_84A6_3769_4154_0622AACD704E",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_0_1_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_0_2_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_0_3_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.57,
   "image": "this.AnimatedImageResource_9800A6E0_84A2_7758_41D7_652AB623F46C",
   "pitch": 12.23,
   "yaw": 77.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_996180BA_84A6_2B29_41DC_2C092B9B925E",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 11.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 12.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.82,
   "image": "this.AnimatedImageResource_A5D456FF_849E_D728_41E0_5C3AF64B2BC8",
   "pitch": -27.07,
   "yaw": -47.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9FA4A76B_84A6_352F_41C9_404290943D42",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 15.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -27.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.41,
   "image": "this.AnimatedImageResource_980326E0_84A2_7759_41CE_EB4017F15BEB",
   "pitch": -22.55,
   "yaw": -115.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9823714D_84A5_ED6B_41D5_4A8691D6F18C",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_3_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -22.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7, this.camera_B684C060_AB5D_AA7D_41DC_9E7A7C435BA4); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_99887C32_84A2_5B38_41CB_698011A39072",
 "maps": [
  {
   "hfov": 68.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 142,
      "height": 200
     }
    ]
   },
   "pitch": 6.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762906BE_7CDE_0968_41D3_F6E0E6573209, this.camera_BA32600A_AB5D_A9C2_41AA_EED5B97AD622); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_980F32D4_84A2_6F79_41AF_5849FBB77D0D",
 "maps": [
  {
   "hfov": 61.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -102,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_5_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 140,
      "height": 200
     }
    ]
   },
   "pitch": 7.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6, this.camera_B4F76F14_AB5D_B7C5_41E1_7B6DAD29E5FC); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9EC7A439_84E2_2B2B_41C6_C5402310AECE",
 "maps": [
  {
   "hfov": 24.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 60,
      "height": 199
     }
    ]
   },
   "pitch": 5.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6, this.camera_B4CDAF1F_AB5D_B7C3_41DA_B51C108BE140); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_982F1829_84ED_DB28_41D4_0C8C6488841D",
 "maps": [
  {
   "hfov": 37.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 44,
      "height": 200
     }
    ]
   },
   "pitch": 12.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.07,
   "image": "this.AnimatedImageResource_A5CFD70D_849E_D6E8_41D5_B16D9C54A81F",
   "pitch": -27.54,
   "yaw": 166.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_98EC7FB0_84EE_5539_41D6_EFEBB98DC354",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 11.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -27.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762A70AB_7CDE_0968_41A8_6421BDA0882C, this.camera_B4C0EF28_AB5D_B7CD_41D2_B6E6239FAA7D); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9FE0F521_84EE_2ADB_41B4_149A101280AB",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_3_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_3_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_3_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310, this.camera_B4D79F34_AB5D_B7C5_41C5_592C4455ABBC); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9FE11249_84EE_2F6B_41DA_9FA4E17D9E37",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_4_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_4_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_4_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.22,
   "image": "this.AnimatedImageResource_A5CEF70D_849E_D6EB_417A_FC9C76CC840E",
   "pitch": 20.07,
   "yaw": 70.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_994B6B7C_84EE_3D28_4197_76819B4ED5BA",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 9.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_5_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 20.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.14,
   "image": "this.AnimatedImageResource_A5CE970E_849E_D6E9_41CF_F0FB3AC3BD75",
   "pitch": 21.42,
   "yaw": -91.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_980220D7_84EE_6B78_41D6_F24ACE2511B0",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 9.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_6_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 21.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171, this.camera_B4E04F0A_AB5D_B7CD_419C_9CADC6D7DB18); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9A2E8CFD_84E2_DB28_41D8_3697E0A5F5EF",
 "maps": [
  {
   "hfov": 30.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_7_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 82,
      "height": 200
     }
    ]
   },
   "pitch": 3.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_A5CD170E_849E_D6E2_41DD_30EAB28DABFE",
   "pitch": -4.9,
   "yaw": 0.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9AF1FC42_84E2_5B59_41D1_F30FBE05B92C",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 4.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_8_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6, this.camera_B536D12A_AB5D_ABCD_41D8_78E09AF82ED3); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9E3D9D42_84E2_3558_41D1_59224A2AFC0B",
 "maps": [
  {
   "hfov": 25.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -101.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 54,
      "height": 200
     }
    ]
   },
   "pitch": 1.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.63,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 95,
      "height": 145
     }
    ]
   },
   "pitch": 7.06,
   "yaw": -100.87
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AD14CAB8_85A6_3F28_41D2_B661202F984D",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 5.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76287CE9_7CDE_1AE8_41DA_BF6F02FF34EA_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 24
     }
    ]
   },
   "pitch": 7.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E, this.camera_B52CE10B_AB5D_ABC3_41C7_4C3E1220EB81); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A72CB925_8462_FADB_41D1_8C898C5C3261",
 "maps": [
  {
   "hfov": 73.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 92,
      "height": 200
     }
    ]
   },
   "pitch": 3.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.3,
   "image": "this.AnimatedImageResource_B7F2D1AD_85A2_6D28_41C5_E3FEE7C50B26",
   "pitch": 13.86,
   "yaw": 30.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A7412373_8462_6D38_41D1_67A7DCEC5612",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 9.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 13.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.65,
   "image": "this.AnimatedImageResource_9F68BA84_84A2_5FD8_41DB_CF6A4A09771F",
   "pitch": -25.56,
   "yaw": -56.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9DDC0397_84A2_EDE7_41DF_F608C5DCFF16",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 19.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -25.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C, this.camera_BB9DFFC1_AB5D_B6BF_41AC_66659A577E3E); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9D723414_84A2_6AF9_41BE_C46ECAA39083",
 "maps": [
  {
   "hfov": 58.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 111,
      "height": 200
     }
    ]
   },
   "pitch": 8.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762906BE_7CDE_0968_41D3_F6E0E6573209, this.camera_BBBD4FAD_AB5D_B6C7_41D1_CECF3A443BBF); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9C930234_84BE_6F38_41D2_26519FBB1D2E",
 "maps": [
  {
   "hfov": 110.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 53.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 192
     }
    ]
   },
   "pitch": 9.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.69,
   "image": "this.AnimatedImageResource_9F6B1A85_84A2_5FDB_41C9_9374E0DEF119",
   "pitch": -25.31,
   "yaw": 31.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9DA7BAFF_84BE_DF28_41C9_D535CED7ED46",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 19.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -25.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.54,
   "image": "this.AnimatedImageResource_A5D39702_849E_D6D8_41D9_0EF4621B5133",
   "pitch": 4.94,
   "yaw": -127.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9EA57D18_84E6_3AE9_4172_BF84EA4AC9C0",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -127.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76297C6A_7CDE_19E8_41D9_3FC6A6387C3D, this.camera_BB8DFFB7_AB5D_B6C3_41DC_C1EF5E13C734); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_98CE1149_84E6_6D6B_41E0_3FF1F138D7D7",
 "maps": [
  {
   "hfov": 33.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -128.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_5_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 66,
      "height": 200
     }
    ]
   },
   "pitch": 3.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171, this.camera_BBEFFFCA_AB5D_B642_41AA_6FE0C67BB973); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A6981793_847E_55F8_41A9_E60466561DD1",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0_HS_0_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.69,
   "image": "this.AnimatedImageResource_B7F031A5_85A2_6DD8_41B0_62D508133BFA",
   "pitch": 16.12,
   "yaw": -77.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A7DA92EB_8466_EF2F_41D5_2428D02E1567",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 9.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0_HS_2_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 16.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5, this.camera_BB2DFF3E_AB5D_B7C2_41D3_55ADD7B06CF3); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A17DD8FB_859D_DB28_41D3_F9E82BDB0205",
 "maps": [
  {
   "hfov": 53.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -155.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 56,
      "height": 200
     }
    ]
   },
   "pitch": 5.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.07,
   "image": "this.AnimatedImageResource_ACC093E9_85A2_6D2B_41DB_2B8029CFBF9E",
   "pitch": -23.43,
   "yaw": 3.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AC0D87D7_859E_F578_41D8_BE9E208B6699",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 19.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -23.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.96,
   "image": "this.AnimatedImageResource_ACC0F3E9_85A2_6D2B_41BB_F6FC72E19EC3",
   "pitch": -24.18,
   "yaw": -169.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AD90D8BB_859E_DB2F_41D8_1E8851B8E9FC",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 18.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -24.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD, this.camera_BB344F53_AB5D_B643_4191_4E42270C0323); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A20DF624_859E_56D8_4197_B149085F4345",
 "maps": [
  {
   "hfov": 64.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 78,
      "height": 200
     }
    ]
   },
   "pitch": 8.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5, this.camera_BB215F49_AB5D_B64F_41CF_946F113F7DD9); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A384F814_85A2_5AF8_41C3_B0B12A220BAF",
 "maps": [
  {
   "hfov": 26.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 200
     }
    ]
   },
   "pitch": 1.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E, this.camera_B6E770A8_AB5D_AACD_41C0_35ADD35F5511); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A743A7B5_8465_D538_41D2_81DD4C4245B7",
 "maps": [
  {
   "hfov": 64.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 88,
      "height": 200
     }
    ]
   },
   "pitch": 2.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.85,
   "image": "this.AnimatedImageResource_B7F361AE_85A2_6D28_41D1_03444DCCB493",
   "pitch": 12.86,
   "yaw": -35.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A2C96E39_8466_572B_41CA_30467D2C16C4",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 12.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171, this.camera_BB11CF71_AB5D_B65F_41DF_F2231EC21459); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A57E4F4F_847E_7568_41C8_614016E3EF1F",
 "maps": [
  {
   "hfov": 44.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -12.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 79,
      "height": 200
     }
    ]
   },
   "pitch": 3.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.56,
   "image": "this.AnimatedImageResource_B7F761A3_85A2_6DD8_41DC_5B8FD7633AA4",
   "pitch": 8.89,
   "yaw": -4.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A676C9D1_8466_DD7B_41DC_03D16B3C8498",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 5.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 8.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372, this.camera_BB09AF5D_AB5D_B647_41D0_6C637BD62EBA); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_91D85A9D_84A3_DFE8_41D8_3D72D31E01D4",
 "maps": [
  {
   "hfov": 112.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 144
     }
    ]
   },
   "pitch": 6.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.81,
   "image": "this.AnimatedImageResource_9F67FA7F_84A2_5F28_41DB_4B251512F192",
   "pitch": 5.21,
   "yaw": -69.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_93BD0279_84A2_EF2B_41DE_C1126F4D4D79",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 4.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -69.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133, this.camera_BB1C5F67_AB5D_B643_41D9_B8B0A5178AAC); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_92D7C08D_84A6_2BE8_41DC_DB1BC9A2D83E",
 "maps": [
  {
   "hfov": 129.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 144
     }
    ]
   },
   "pitch": 8.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.16,
   "image": "this.AnimatedImageResource_9F667A7F_84A2_5F28_41C9_649BFD2D3A15",
   "pitch": -22.67,
   "yaw": 105.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9300822B_84A6_2F28_41BB_54E42D63684B",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 105.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -22.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7, this.camera_B6941089_AB5D_AACF_41A6_A85351582C2B); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9D773314_84BE_2EF8_41D2_37A733F088C0",
 "maps": [
  {
   "hfov": 53.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -92.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 133,
      "height": 200
     }
    ]
   },
   "pitch": 5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C, this.camera_B6EED093_AB5D_AAC3_41AF_D57ACA24DCA5); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_9DE5CA43_84BE_7F5F_41B1_EA164F361155",
 "maps": [
  {
   "hfov": 43.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 107,
      "height": 200
     }
    ]
   },
   "pitch": 10.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.58,
   "image": "this.AnimatedImageResource_9F6A6A87_84A2_5FE7_41D6_0C7B9B389823",
   "pitch": -24.81,
   "yaw": -95.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9E63C0F9_84BE_EB2B_41B2_4AEC075F87D0",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 16.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -95.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -24.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.02,
   "image": "this.AnimatedImageResource_9F6A9A88_84A2_5FE9_41D2_3DBF312D4FF3",
   "pitch": -21.29,
   "yaw": -29.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9ECA910C_84BE_2AE8_41DF_13E246D01389",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 17.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -29.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -21.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_763F07F3_7CDE_36F8_4199_64C559C28160, this.camera_B6EB409D_AB5D_AAC7_41D4_39D0CE086985); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_98128EF1_84E2_573B_417C_43F3A8FB8EB6",
 "maps": [
  {
   "hfov": 36.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_762B4465_7CDE_0918_41D0_00DEFA3BA310_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 86,
      "height": 200
     }
    ]
   },
   "pitch": 0.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E, this.camera_B4A42E91_AB5D_B6DF_41BF_34A2839B6813); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_8F54ACCE_83A2_534B_41E0_440053DE9394",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0_HS_0_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0_HS_0_3_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.26,
   "image": "this.AnimatedImageResource_915656C0_846E_3758_41D6_00BC5E186395",
   "pitch": 5.56,
   "yaw": -0.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_8D8849F2_83A2_7558_41D0_78BC28178ACE",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 5.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_A3CC0AF4_85A2_3F39_41C5_B7FE1B1B7774",
 "maps": [
  {
   "hfov": 37.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 116,
      "height": 200
     }
    ]
   },
   "pitch": -0.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_AD4C4FD8_85A5_F569_4186_CF20D019BD96",
 "maps": [
  {
   "hfov": 39.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 87,
      "height": 200
     }
    ]
   },
   "pitch": 4.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.94,
   "image": "this.AnimatedImageResource_B756C2B5_85BE_2F3B_41D3_6FF5A1CE35F9",
   "pitch": -12.94,
   "yaw": 113.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AC6FBEF8_85A6_5729_41C9_17B6AC12A2B0",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 14.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -12.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "id": "overlay_AF88CC2B_85BD_FB2F_41C4_A86C7A1F6514",
 "maps": [
  {
   "hfov": 41.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 105,
      "height": 200
     }
    ]
   },
   "pitch": 6.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.43,
   "image": "this.AnimatedImageResource_B756B2B7_85BE_2F27_41A9_0BF73C03202A",
   "pitch": -19.72,
   "yaw": 167.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AE524381_85BE_EDDB_41D9_5B55F1F2838C",
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 14.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 167.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -19.72
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "minHeight": 1,
 "maxWidth": 101,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "width": 44,
 "minWidth": 1,
 "borderSize": 0,
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "mode": "push",
 "height": 44,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "paddingTop": 0,
 "maxHeight": 101,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "cursor": "hand",
 "class": "IconButton",
 "data": {
  "name": "IconButton Info"
 }
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "left": "15%",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "shadowHorizontalLength": 0,
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "shadowBlurRadius": 25,
 "gap": 0,
 "layout": "horizontal",
 "shadowOpacity": 0.3,
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "scroll",
 "paddingRight": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "minHeight": 1,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "left": "15%",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "top": "10%",
 "bottom": "80%",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "shadow": false,
 "scrollBarMargin": 2,
 "verticalAlign": "top",
 "gap": 10,
 "layout": "vertical",
 "paddingTop": 20,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "paddingRight": 20,
 "paddingBottom": 0
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CCA717_849E_D6F8_41CE_E389F40F61E4",
 "levels": [
  {
   "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CB2717_849E_D6F8_41CF_EAA51AB46CDF",
 "levels": [
  {
   "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CA4718_849E_D6E8_41D6_E3FF1DC1A7D9",
 "levels": [
  {
   "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B740729F_85BE_2FE7_41C2_ABC8AB16BB49",
 "levels": [
  {
   "url": "media/panorama_76290BCD_7CDE_7F28_41C9_2BBFBF7B5171_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9CC263FE_846E_2D29_41C7_D2BB2EF40E9E",
 "levels": [
  {
   "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9CC223FF_846E_2D27_41D7_1778990B6414",
 "levels": [
  {
   "url": "media/panorama_7623042D_7CDE_0968_41B8_BDEDD69F649E_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_934110E7_8462_EB27_41DB_316ED13C26EA",
 "levels": [
  {
   "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_934050E7_8462_EB27_41DA_90C47C2B36AD",
 "levels": [
  {
   "url": "media/panorama_763CBB0D_7CDE_1F28_41D3_0AF41D05E372_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC7E3E5_85A2_6D5B_41DB_CA908C4086EA",
 "levels": [
  {
   "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC033E6_85A2_6D59_41D9_A3C8CB2EDAEF",
 "levels": [
  {
   "url": "media/panorama_762F4154_7CDE_0B3F_41D6_F22B3F84CAAE_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC073E7_85A2_6D27_41DE_1716B388A261",
 "levels": [
  {
   "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC053E7_85A2_6D27_41CA_15044D6D2767",
 "levels": [
  {
   "url": "media/panorama_76363E9B_7CDE_1928_41DA_3C2DA3DE7CD5_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9E24A574_84A6_F538_41E0_3558EAC223E5",
 "levels": [
  {
   "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F69AA82_84A2_5FD9_419C_C7986CB312B5",
 "levels": [
  {
   "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9E255575_84A6_F538_41B6_D281428458AF",
 "levels": [
  {
   "url": "media/panorama_7634E14C_7CDE_0B28_41A4_06DA99FC0133_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A082D2A7_8462_2F27_41CD_7277576456DF",
 "levels": [
  {
   "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F6C1A8A_84A2_5FE9_41A1_45CC5279C438",
 "levels": [
  {
   "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A09D82A7_8462_2F27_41CC_8FDCDC310360",
 "levels": [
  {
   "url": "media/panorama_762821A2_7CDE_0B1B_41D0_68E636DC12F6_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_934620E6_8462_EB59_41DF_5E8ABA5D2199",
 "levels": [
  {
   "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9346B0E6_8462_EB59_417E_9F39AEBA03B8",
 "levels": [
  {
   "url": "media/panorama_76322F9F_7CDE_3727_41D0_5AE1EDEFC928_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F680A84_84A2_5FD8_41D3_CF5815E52169",
 "levels": [
  {
   "url": "media/panorama_76342BE9_7CDE_1EE8_41DA_ECA7894EDCEF_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F0B1A6_85A2_6DD8_4198_17AD912ADB59",
 "levels": [
  {
   "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F111A8_85A2_6D28_41C2_434A93F7204F",
 "levels": [
  {
   "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F1F1AA_85A2_6D28_419A_177C2F0DCF46",
 "levels": [
  {
   "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F271AB_85A2_6D28_41DA_738BF123D97B",
 "levels": [
  {
   "url": "media/panorama_76283F6C_7CDE_37E8_41C0_9BA8EDF56F1E_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC123EB_85A2_6D2F_41A2_A3CE156A7BEF",
 "levels": [
  {
   "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_AAD7213F_85AE_6D27_41E0_7CF2A984DBF8",
 "levels": [
  {
   "url": "media/panorama_7633C4A0_7CDE_0919_41CB_37A9FDA15ADD_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9800A6E0_84A2_7758_41D7_652AB623F46C",
 "levels": [
  {
   "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5D456FF_849E_D728_41E0_5C3AF64B2BC8",
 "levels": [
  {
   "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_980326E0_84A2_7759_41CE_EB4017F15BEB",
 "levels": [
  {
   "url": "media/panorama_7636E6C2_7CDE_091B_41AC_E8D493734C1C_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CFD70D_849E_D6E8_41D5_B16D9C54A81F",
 "levels": [
  {
   "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CEF70D_849E_D6EB_417A_FC9C76CC840E",
 "levels": [
  {
   "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CE970E_849E_D6E9_41CF_F0FB3AC3BD75",
 "levels": [
  {
   "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5CD170E_849E_D6E2_41DD_30EAB28DABFE",
 "levels": [
  {
   "url": "media/panorama_763F07F3_7CDE_36F8_4199_64C559C28160_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F2D1AD_85A2_6D28_41C5_E3FEE7C50B26",
 "levels": [
  {
   "url": "media/panorama_7630CA36_7CDE_1978_41BA_E17595FEA539_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F68BA84_84A2_5FD8_41DB_CF6A4A09771F",
 "levels": [
  {
   "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F6B1A85_84A2_5FDB_41C9_9374E0DEF119",
 "levels": [
  {
   "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A5D39702_849E_D6D8_41D9_0EF4621B5133",
 "levels": [
  {
   "url": "media/panorama_762A317D_7CDE_0BE8_41B9_DBB24B95D6E7_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F031A5_85A2_6DD8_41B0_62D508133BFA",
 "levels": [
  {
   "url": "media/panorama_7629C40B_7CDE_0928_41C6_B79403268518_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC093E9_85A2_6D2B_41DB_2B8029CFBF9E",
 "levels": [
  {
   "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_ACC0F3E9_85A2_6D2B_41BB_F6FC72E19EC3",
 "levels": [
  {
   "url": "media/panorama_7633A93B_7CDE_3B69_41BF_E2BB6A36F7BD_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F361AE_85A2_6D28_41D1_03444DCCB493",
 "levels": [
  {
   "url": "media/panorama_762925DC_7CDE_0B2F_41D3_A36EC0D54B75_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B7F761A3_85A2_6DD8_41DC_5B8FD7633AA4",
 "levels": [
  {
   "url": "media/panorama_763358F8_7CDE_1AE8_41D4_B6A07EDF18F5_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F67FA7F_84A2_5F28_41DB_4B251512F192",
 "levels": [
  {
   "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F667A7F_84A2_5F28_41C9_649BFD2D3A15",
 "levels": [
  {
   "url": "media/panorama_7634C662_7CDE_091B_41B4_423AEBE388D6_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F6A6A87_84A2_5FE7_41D6_0C7B9B389823",
 "levels": [
  {
   "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9F6A9A88_84A2_5FE9_41D2_3DBF312D4FF3",
 "levels": [
  {
   "url": "media/panorama_762906BE_7CDE_0968_41D3_F6E0E6573209_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_915656C0_846E_3758_41D6_00BC5E186395",
 "levels": [
  {
   "url": "media/panorama_77C14B8B_7CDE_FF29_4182_FA33F971D5D0_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B756C2B5_85BE_2F3B_41D3_6FF5A1CE35F9",
 "levels": [
  {
   "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_B756B2B7_85BE_2F27_41A9_0BF73C03202A",
 "levels": [
  {
   "url": "media/panorama_76312F84_7CDE_1718_41B9_69B0B566735B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "verticalAlign": "middle",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "width": "85%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "horizontalAlign": "center",
 "gap": 10,
 "height": "100%",
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "-left"
 }
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "width": 8,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "shadow": false,
 "horizontalAlign": "left",
 "gap": 10,
 "height": "100%",
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "orange line"
 }
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "paddingLeft": 50,
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "minWidth": 460,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "width": "50%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "horizontalAlign": "left",
 "gap": 0,
 "height": "100%",
 "layout": "vertical",
 "paddingTop": 20,
 "backgroundOpacity": 1,
 "paddingRight": 50,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "visible",
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "minHeight": 50,
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "width": "25%",
 "mode": "push",
 "horizontalAlign": "center",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "height": "75%",
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "paddingTop": 0,
 "maxHeight": 60,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "backgroundOpacity": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "paddingRight": 0,
 "class": "IconButton"
},
{
 "propagateClick": false,
 "minHeight": 1,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "left": "0%",
 "width": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.png",
 "top": "0%",
 "horizontalAlign": "center",
 "shadow": false,
 "height": "100%",
 "verticalAlign": "middle",
 "paddingTop": 0,
 "maxHeight": 1000,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "photo"
 },
 "paddingRight": 0,
 "class": "Image"
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 0,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "horizontalAlign": "right",
 "layout": "horizontal",
 "paddingTop": 20,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 }
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 520,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F"
 ],
 "minWidth": 100,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "horizontalAlign": "left",
 "gap": 10,
 "height": "74.286%",
 "layout": "vertical",
 "paddingTop": 0,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "scroll",
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 }
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "width": 370,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "horizontalAlign": "left",
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Container",
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 }
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff9900;font-size:2.05vh;font-family:'Montserrat SemiBold';\">Hose Info</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.05vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.19vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat Medium';\"><B>223 meter square compund</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat Medium';\"><B>170 meter square house area</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat Medium';\"><B>3 bedroom 2 bathroom </B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat Medium';\"><B>2 service room</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat Medium';\"><B>1 traditional kitchen </B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat Medium';\"><B>1 service bathroom</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.19vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff9900;font-size:1.95vh;font-family:'Montserrat SemiBold';\"><B>Kitchen material</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat SemiBold';\"><B>Acrylic </B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.41vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.95vh;font-family:'Montserrat SemiBold';\"><B>Marbel</B></SPAN></SPAN></DIV></div>",
 "minHeight": 1,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "paddingLeft": 10,
 "scrollBarColor": "#F7931E",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "82.041%",
 "shadow": false,
 "paddingTop": 21,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10,
 "paddingRight": 10,
 "paddingBottom": 20
}],
 "paddingBottom": 0,
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
