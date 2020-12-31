# perf with throng 


## command

```code
perf record -e cycles:u -g -- node --perf-basic-prof --perf-prof-unwinding-info app.js
```

## view flamegraph

> with flamescope