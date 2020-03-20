/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
    render() {
        return <div>Hello Webpackl！当前环境：{ENV}</div>;
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById('root'),
);

require('./index.css');

require('./index.less');

const img = document.getElementById('first-img');

img.src = require('./resource/1.png');

const button = document.createElement('button');

button.textContent = '点击';

button.addEventListener('click', () => {
    import('./hello').then((event) => {
        event.default.sayHello();
    });
});

document.body.appendChild(button);
