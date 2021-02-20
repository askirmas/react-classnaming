```tsx
function CallKind() {
  console.log(
    this === globalThis
    ? "call"
    : Object.keys(this).length,
    arguments.length
  )
}

CallKind() // call 0
CallKind(1, 2) // call 2

new CallKind // 0, 0
new CallKind(1, 2) // 0, 2
CallKind.bind({a: 1})() // 1, 0
CallKind.bind({a: 1})(1, 2) // 1, 2

Simple(someClassNames) = {
  className: "abcabc",
  [Symbol.toPrimitive]: () => ""
}

// new Call - https://hackernoon.com/creating-callable-objects-in-javascript-d21l3te1
```

