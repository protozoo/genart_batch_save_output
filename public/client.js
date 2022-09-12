/*
    How to use:
    let canvas = document.querySelector("canvas");
    let imageSaver = new ImageSaver( canvas );

    // Then call saveImage() once or multiple times as needed 
    // (i.e. inside a setInterval, setTimeout+refresh, etc...)
    imageSaver.saveImage( window.fxhash );
*/

class ImageSaver{
    constructor( canvasElement, apiBaseUrl="http://localhost:3000/api/image/save" ){
        this.canvasElement = canvasElement;
        this.apiBaseUrl = apiBaseUrl;
    }
    /*
        const hash = window.fxhash;
        this.saveImage( hash, metadata, this.canvasElement );
    */
    saveImage( fileName, onSuccess, onError  ) {
        var imageData = this.canvasElement.toDataURL('image/png');
        fetch(
            this.apiBaseUrl, 
            { 
                method: 'POST', 
                headers: { "content-type": "application/json" }, 
                body: JSON.stringify(
                    { 
                        filename: fileName, 
                        imagedata: imageData 
                    }
                ) 
            }
        ).then( response => {
            response.json()
            .then( responseJson => {
                //console.log( "saveImage response: ", responseJson );
                onSuccess( responseJson)
            });
        } )
        .catch(function (error) {
            //console.log( "saveImage Error: ", error);
            onError( error );
          });
      }
}
