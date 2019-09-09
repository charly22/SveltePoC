performance.mark("begin")
import Viz from './Viz.svelte';

performance.mark('pre-render')
new Viz({
	target: document.body,
	hydrate: true,
	props: JSON.parse(atob(window.__OLAPIC_PRELOADED_STATE__))
});
performance.mark("end")

// comment this out for TTBI test
performance.measure("total", 'begin', 'end');
window.perf.push(parseFloat(performance.getEntriesByType("measure")[0].duration)*100)
performance.clearMarks();
performance.clearMeasures();
