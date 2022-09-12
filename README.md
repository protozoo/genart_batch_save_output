Basic web service to automate saving of generative-art outputs.

# Usage

## Server
1. Install dependencies with `npm install`

2. Run the server with `node index.js`

## Client
1. Add the client library:

    `<script src="http://localhost:3000/static/client.js"></script>`

2. Instantiate the ImageSaver class, passing a reference to the canvas element to be saved

    ```
    let canvas = document.querySelector("canvas");
    let imageSaver = new ImageSaver( canvas);
    ```

3. Call `saveImage( fileName )` as many times as needed (i.e. setInterval, setTimeout+refresh, etc...)

    ```
    imageSaver.saveImage( 
        window.fxhash, // file name, you can use fxhash's seed
        (response)=>{
            console.log( "All good! :)", response );
            // rebuild and save again, refresh+restart, etc...
        }, 
        (error)=>{
            console.log( "Oops :(", response );
        }, 
    );
    ```
