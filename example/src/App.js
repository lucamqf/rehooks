import React from 'react'

import { useMyHook } from 'rehooks'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
