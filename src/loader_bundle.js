// TODO fetch the needed polyfils
// TODO gather the needed params such tag_based_key

// Load CSS
const style = document.createElement('style')
style.type = 'text/css';
style.appendChild(document.createTextNode(`${css}`));
document.head.appendChild(style)

// Mount HTML
const mountElement = document.getElementById('olapic_specific_widget')
mountElement.innerHTML = `${html}`

// Set state on global variable
window.__OLAPIC_PRELOADED_STATE__ = JSON.parse(atob('${state}'))

// Re-Hydrate
const s = document.createElement('script')
s.src = '/${hash}/app'
s.defer = true
s.async = true
document.body.appendChild(s);
