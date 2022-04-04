# Event Loop Phases

- timers - planned timers callbacks
- pending callbacks - system operations callbacks
- idle, prepare - internal usage
- poll - input/output events
- check - setImmediate handling
- close callback - 'close' events are called
