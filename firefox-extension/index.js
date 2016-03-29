var pageMod = require("sdk/page-mod");
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var ss = require("sdk/simple-storage");
var tabs = require("sdk/tabs");

//inicializa storage y variable hideStory
if(typeof(ss.storage.hide) === 'undefined') {
     ss.storage.hide = 'hide';
   }
var hideStory = ss.storage.hide;

//Crea boton y panel
var button = ToggleButton({
  id: "ff-button",
  label: "Friend Feed",
  icon: {
    "16": "./icon_16.png",
    "32": "./icon_32.png",
    "64": "./icon_64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  height: 270,
  contentURL: self.data.url("preferences.html"),
  onHide: handleHide
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

//guarda preferencia desde preferences.js y emite valor guardado en storage a preferences.js
var worker = panel
worker.port.on('guardar', function (hide) {
  ss.storage.hide = hide;
  hideStory = ss.storage.hide
});

worker.port.emit('recupero', hideStory);

// Recarga la pagina
worker.port.on('recargar', function(){
  if (tabs.activeTab.url === "https://web.facebook.com/" || tabs.activeTab.url === "https://web.facebook.com/?sk=h_nor" || tabs.activeTab.url === "https://web.facebook.com/?sk=h_chr") {
    tabs.activeTab.reload()
  }
})

//emite valor guardado en hideStory a clearfeed.js cada vez que se carga la pagina
function startEmiting(worker) {
  worker.port.emit('recupero', hideStory);
}

// Create a page mod
var pageMods = pageMod.PageMod({
  include: "*.facebook.com",
  contentScriptFile: [self.data.url("mutation-summary.js"), self.data.url("clearfeed.js")],
  //contentScriptWhen: "ready",
  onAttach: startEmiting
});
