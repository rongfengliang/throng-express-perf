# perf with throng 


## command

```code
perf record -e cycles:u -g -- node --perf-basic-prof app.js
```

## view flamegraph

> with flamescope