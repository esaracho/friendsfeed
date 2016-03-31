//Crea estilos para los post desvanecidos
var style = document.createElement('style');
var t = document.createTextNode(".desvanece {opacity: 0.2;} .desvanece:hover {opacity: initial;}");
style.appendChild(t);
document.head.appendChild(style);

//recupera el valor guardado en el addon
self.port.on('recupero', function(guardado) {
  hideStoryPreference = guardado;
});

function hideStory(el) {
	if(hideStoryPreference === 'hide') {
		el.style.display = "none";
	} else {
    el.classList.add("desvanece");
	}
}

var observer = new MutationSummary({
  callback: clearfeed,
  queries: [{ element: '._4-u2', }]
});

function clearfeed(summaries) {
  var stories = summaries[0];
  stories.added.forEach(function(story) {
    if (hideStoryPreference === 'hide' || hideStoryPreference === 'fade') {
      if(story.querySelector('._1qbu')) {
  		  hideStory(story);
  		}
    }
  });
}
