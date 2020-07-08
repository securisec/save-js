# save-js
<p align="center">
    <img src="https://raw.githubusercontent.com/securisec/save-py/master/logo.png" width="50%">
</p>


![](https://img.shields.io/npm/v/@securisec/save-js)
![test](https://github.com/securisec/save-js/workflows/test/badge.svg)

[![](https://img.shields.io/static/v1?style=for-the-badge&logo=read-the-docs&message=docs&color=blue&label=save-js)](https://securisec.github.io/save-js/)

This reposity contains the JS/TS library for **Save!**

## Install
```
npm i @securisec/save-js
```

## Usage
```js
import { Save } from 'save-js'

const s = new Save('http://url-to-save-server', {username: 'username', password: 'password'})

s.toolsSearch({query: 'awesome'})
    .then(res => console.log(res.data))
    .catch(console.log)
```
