- Falsy argument
```typescript
classNaming(false && {MyApp___bad})
```

- Multiple arguments
```typescript
classNaming({Btn}, {Btn__disabled: false})
```

- Omitting in multiple
```typescript
classNaming({Btn_Float}, {
  //@ts-expect-error
  Btn_Float: true
})
```

- Omitting in falsy multiple
```typescript
classNaming(useFloat & {Btn_Float}, {
  //@ts-expect-error
  Btn_Float: useFloat
})
```
