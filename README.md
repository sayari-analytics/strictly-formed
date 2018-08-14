# Strictly Formed

Statically typed forms for typescript

# API

Form `value` props are typechecked according to their relevant types, as are the arguments passed to their handler callbacks.  In addition, where relevant, optional `onSubmit` and `onClear` handlers are bound to their respective `enter` and `esc` keys.

**StringInput**

```typescript
type Props = {
  value: string | undefined
  className?: string
  placeholder?: string
  onChange: (value: string | undefined) => void
  onSubmit?: (value: string | undefined) => void
  onClear?: () => void
}

// EX
<StringInput
  className="string-input"
  value={}
  onChange={handleChange}
  onSubmit={submitString}
>
```


**NumberInput**

```typescript
type Props = {
  value: number | undefined
  className?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  onChange: (value: number | undefined) => void
  onSubmit?: (value: number | undefined) => void
  onClear?: () => void
}

// EX
<NumberInput
  value={10}
  min={0}
  onChange={handleChange}
>
```


**SelectInput**

```typescript
type Props<Option> = {
  value: string | undefined
  options: Option[]
  className?: string
  placeholder?: string
  nullable?: boolean
  onChange: (value: Option | undefined) => void
}

// EX 
<Select<'one' | 'two' | 'three'>
  value={kind}
  options={['one', 'two', 'three']}
  onChange={handleChange}
/>
```


### Install

```bash
npm install strictly-formed
```

### License

[ISC](https://opensource.org/licenses/ISC)
