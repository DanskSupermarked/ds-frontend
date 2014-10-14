# `ds.utils.validation`

Helper functions for validating strings.

In browser:

```html
<script src="scripts/libs/ds-frontend/scripts/utils/validation.js"></script>
<script>
    ds.utils.validation;
</script>
```

With browserify:

```js
var validation = require('ds-frontend/scripts/utils/validation');
```

- [`#.email(input)`](#emailinput)
- [`#.not(input, needle)`](#notinput-needle)
- [`#.required(input)`](#requiredinput)
- [`#.phone(input)`](#phoneinput)

## `#.email(input)`

Checks if `input` is a valid e-mail.

| Name | Type | Description |
| --- | --- | --- |
| `input` | string | String to check whether it is a valid email |

### Return

`boolean`: Is `input` a valid email

### Example

```js
ds.utils.validation.email('test@example.com'); // => true
ds.utils.validation.email('test-example.com'); // => false
```

## `#.not(input, needle)`

Checks if `input` is different from `needle`.

| Name | Type | Description |
| --- | --- | --- |
| `input` | string | String to check for |
| `needle` | string | String to check against |

### Return

`boolean`: Is `input` different from `needle`

### Example

```js
ds.utils.validation.not('test', 'example'); // => true
ds.utils.validation.email('test', 'test'); // => false
```

## `#.required(input)`

Checks if `input` is not an empty string.

| Name | Type | Description |
| --- | --- | --- |
| `input` | string | String to check for |

### Return

`boolean`: Is `input` not an empty string

### Example

```js
ds.utils.validation.required('test'); // => true
ds.utils.validation.required(''); // => false
```

## `#.phone(input)`

Checks if `input` is a valid phone number

| Name | Type | Description |
| --- | --- | --- |
| `input` | string | String to check for |

### Return

`boolean`: Is `input` a valid phone number

### Example

```js
ds.utils.validation.phone('12345678'); // => true
ds.utils.validation.phone('+45 12345678'); // => true
ds.utils.validation.phone('+45 12 34 56 78'); // => true
ds.utils.validation.phone('45 + 12345678'); // => false
ds.utils.validation.phone('not valid'); // => false
```
