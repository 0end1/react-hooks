# react-Localstorage

React Localstorage gives you simple hooks to work with your localstorage. Here is some example code:

```jsx
import React from 'react'
import useLocalStorage from './index'
const App = () => {
  const [firstName, setFirstName, removeFirstName] = useLocalStorage('firstName', 'John')
  const [lastName, setLastName, removeLastName] = useLocalStorage('lastName', 'Doe')

  // You can update localStorage data via setFirstName('John') or removeFirstName()

  return (
    <h1>Demo</h1>
    { firstName && lastName && (
      <p>
        Hello {firstName} {lastName}
      </p>
    )}
  )
}
```