var hideStoryPreference;

//recupera el valor guardado en el addon
self.port.on('recupero', function(guardado) {
  hideStoryPreference = guardado;
});

$('body').on('DOMNodeInserted', '._5pcb', function(event) {
	clearAddedFeed(event.originalEvent);
});

clearExistingFeed();

function clearExistingFeed() {
	var elements = document.querySelectorAll('._1qbu');
  [].forEach.call(elements, function(element) {
		var storyElement = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    hideStory(storyElement);
	});
}

function clearAddedFeed(event) {
	var storyElement = event.target;
	if(isElement(storyElement) && storyElement.classList.contains('_4-u2')) {
		if(storyElement.querySelector('._1qbu')) {
			hideStory(storyElement);
		}
	}
}

function hideStory(el) {
	if(hideStoryPreference) {
		el.style.display = "none";
	} else {
		el.style.opacity = .4;
	}
}

function isElement(obj) {
	return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
