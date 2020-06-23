![](https://img.shields.io/npm/v/save-js?style=for-the-badge)
![test](https://github.com/securisec/save-js/workflows/test/badge.svg)

# save-js

This reposity contains the JS/TS library for **Save!**

## Install
```
npm i @securisec/save-js
```

## Usage
```js
import { Save } from 'save-js'

const s = new Save('http://url-to-save-server', {username: 'username', password: 'password'})

s.search.tools({query: 'awesome'})
    .then(res => console.log(res.data))
    .catch(console.log)
```
