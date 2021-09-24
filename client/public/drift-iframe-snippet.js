/** Snippet for the iframe. Initializes the inner Drift iframe and acts as a communcation layer for the parent page. */
window.drift=window.drift||function(){(drift.q=drift.q||[]).push(arguments)};

// rebroadcast drift widget API events to parent page
drift('on', 'iframeResize', function (data) {
  window.parent.postMessage({ type: 'driftIframeResize', data }, '*')
})

window.addEventListener('message', function (event) {
  if (event.source !== window.parent) {
    return
  }

  var message = event.data
  
  // set initial context, put widget in "iframeMode", load widget
  if (message && message.type === 'driftSetContext') {
    drift('setContext', message.data)
    drift('config', { iframeMode: true })
    drift('page')
    drift.init(process.env.DRIFT_ID) // TODO your Drift embed ID goes here
  }
  
  // acknowledge iframe resize / reposition is complete
  if (message && message.type === 'driftAcknowledgeIframeResize') {
    drift('acknowledgeIframeResize')
  }
})

// indicate iframe is ready to receive context
window.parent.postMessage({ type: 'driftIframeReady' }, '*')