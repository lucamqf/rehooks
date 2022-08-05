# rehooks

> Awesome React Hooks!

[![NPM](https://img.shields.io/npm/v/rehooks.svg)](https://www.npmjs.com/package/rehooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rehooks
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'rehooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [lucamqf](https://github.com/lucamqf)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
