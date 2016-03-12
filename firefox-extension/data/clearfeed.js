var hideStoryPreference;

//recupera el valor guardado en el addon
self.port.on('recupero', function(guardado) {
  hideStoryPreference = guardado;
});

function hideStory(el) {
	if(hideStoryPreference) {
		el.style.display = "none";
	} else {
		el.style.opacity = .4;
	}
}

var observer = new MutationSummary({
  callback: clearfeed,
  queries: [{ element: '._4-u2', }]
});

function clearfeed(summaries) {
  var stories = summaries[0];
  stories.added.forEach(function(story) {
  	if(story.querySelector('._1qbu')) {
  		  hideStory(story);
  		}
  });
}
