// TODO fetch the needed polyfils
// TODO gather the needed params such tag_based_key

// the the serve side rendered HTML
fetch(`/${hash}/html`)
.then(res => res.text())
.then(res => {

  // once we got the HTML
  // CSS wash pushed over H2, so create the link
  const link = document.createElement("link")
  link.rel = 'stylesheet'
  link.href = `/${hash}/css`
  document.head.appendChild(link)

  // once CSS linked, attach the SSR HTML to DOM
  const mountElement = document.getElementById('olapic_specific_widget')
  mountElement.innerHTML = res

  // now re-hydrate

  // fetch the state
  fetch(`/${hash}/state`)
  .then(res => res.json())
  .then(res => {

    // declare the state on a global var
    window.__OLAPIC_PRELOADED_STATE__ = res

    // the bundle should have been pushed alog the state,
    // append the script to re-hydrate
    const s = document.createElement('script')
    s.src = `/${hash}/app`
    s.defer = true
    s.async = true
    document.body.appendChild(s);
  })

})
