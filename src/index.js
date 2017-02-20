if (module.hot && process.env.NODE_ENV !== 'production') {
    require('file-loader!../index.html');
    require('css-loader!../app.css');
}

document.write('Hello from JS file!')
