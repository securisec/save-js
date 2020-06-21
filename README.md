![](https://img.shields.io/npm/v/save-js?style=for-the-badge)

# save-js

This reposity contains the JS/TS library for **Save!**

## Install
```
npm i save-js
```

## Usage
```js
import { Save } from 'save-js'

const s = new Save('http://url-to-save-server', {username: 'username', password: 'password'})

s.search.tools({query: 'awesome'})
    .then(res => console.log(res.data))
    .catch(console.log)
```
