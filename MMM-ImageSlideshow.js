/* global Module */

/* MMM-ImageSlideshow.js
 * 
 * Magic Mirror
 * Module: MMM-ImageSlideshow
 * 
 * Magic Mirror By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 * 
 * Module MMM-ImageSlideshow By Adam Moses http://adammoses.com
 * MIT Licensed.
 *
 * Modified by:  OneOfTheInfiniteMonkeys
 * Date: 27 Jul 2019 17:55
 */
 
Module.register("MMM-ImageSlideshow", {
	// Default module config.
	defaults: {
	// Style of the path string to be displayed - "nameonly" or "fullpath or "none" - default ="nameonly"
	PathStyleText : "none",
        // position of text 0 = top, 1 = bottom - all other values ignored - default = 0
        ImgTitleTextPos: 0,
	// format of image name text as per HTML definition - default = "bright small light", 
	ImgTitleTextStyle: "bright small light",
        // an array of strings, each is a path to a directory with images
        imagePaths: ['modules/MMM-ImageSlideshow/exampleImages'],
        // the speed at which to switch between images, in millisecondsy
		slideshowSpeed: 10 * 1000,
        // if zero do nothing, otherwise set width to a pixel value
        fixedImageWidth: 0,
        // if zero do nothing, otherwise set height to a pixel value        
        fixedImageHeight: 0,
        // if true randomize image order, otherwise do alphabetical
        randomizeImageOrder: false,
        // if true combine all images in all the paths
        // if false each path with be viewed seperately in the order listed
        treatAllPathsAsOne: false,
        // if true, all images will be made grayscale, otherwise as they are
        makeImagesGrayscale: false,
        // list of valid file extensions, seperated by commas
        validImageFileExtensions: 'bmp,jpg,gif,png',
		// a delay timer after all images have been shown, to wait to restart (in ms)
		delayUntilRestart: 0,
	},
    // load function
	start: function () {
        // add identifier to the config
        this.config.identifier = this.identifier;
        // ensure file extensions are lower case
        this.config.validImageFileExtensions = this.config.validImageFileExtensions.toLowerCase();
        // set no error
		this.errorMessage = null;
        if (this.config.imagePaths.length == 0) {
            this.errorMessage = "MMM-ImageSlideshow: Missing required parameter."
        }
        else {
            // create an empty image list
            this.imageList = [];
            // set beginning image index to -1, as it will auto increment on start
            this.imageIndex = -1;
            // ask helper function to get the image list
            this.sendSocketNotification('IMAGESLIDESHOW_REGISTER_CONFIG', this.config);
			// do one update time to clear the html
			this.updateDom();
			// set a blank timer
			this.interval = null;
        }
	},
	// Define required scripts.
	getStyles: function() {
        // the css contains the make grayscale code
		return ["imageslideshow.css"];
	},    
	// the socket handler
	socketNotificationReceived: function(notification, payload) {
		// if an update was received
		if (notification === "IMAGESLIDESHOW_FILELIST") {
			// check this is for this module based on the woeid
			if (payload.identifier === this.identifier)
			{
				// set the image list
				this.imageList = payload.imageList;
                // if image list actually contains images
                // set loaded flag to true and update dom
                if (this.imageList.length > 0) {
                    this.loaded = true;
                    this.updateDom();
					// set the timer schedule to the slideshow speed			
					var self = this;
					this.interval = setInterval(function() {
						self.updateDom();
						}, this.config.slideshowSpeed);					
                }
			}
		}
    },    
	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
        // if an error, say so (currently no errors can occur)
        if (this.errorMessage != null) {
            wrapper.innerHTML = this.errorMessage;
        }
        // if no errors
        else {
            // if the image list has been loaded
            if (this.loaded === true) {
				// if was delayed until restart, reset index reset timer
				if (this.imageIndex == -2) {
					this.imageIndex = -1;
					clearInterval(this.interval);
					var self = this;
					this.interval = setInterval(function() {
						self.updateDom(0);
						}, this.config.slideshowSpeed);						
				}				
                // iterate the image list index
                this.imageIndex += 1;
				// set flag to show stuff
				var showSomething = true;
                // if exceeded the size of the list, go back to zero
                if (this.imageIndex == this.imageList.length) {
					// if delay after last image, set to wait
					if (this.config.delayUntilRestart > 0) {
						this.imageIndex = -2;
						wrapper.innerHTML = "&nbsp;";
						showSomething = false;
						clearInterval(this.interval);
						var self = this;
						this.interval = setInterval(function() {
							self.updateDom(0);
							}, this.config.delayUntilRestart);									
					}
					// if not reset index
					else
						this.imageIndex = 0;
				}
				if (showSomething) {
					// create text of image name that will be displayed from the stored list of image names held in array this.imageList[]
					var MMImgTitleText = document.createElement("div");
					// set text style from the parameter that might be passed to the routine
					MMImgTitleText.className = "MM-ImageSlideshow-title " + this.config.ImgTitleTextStyle;
					// if config path style parameter is set "none", "nameonly" or "fullpath" - Note in effect only "nameonly" is verified in this version
					if (this.config.PathStyleText == "nameonly") {
						// in case image name only
						MMImgTitleText.innerHTML = encodeURI(this.imageList[this.imageIndex]).substr(encodeURI(this.imageList[this.imageIndex]).lastIndexOf('/') + 1, encodeURI(this.imageList[this.imageIndex]).length - encodeURI(this.imageList[this.imageIndex]).lastIndexOf('/') ) ;
					  }
					else {
						// in case path and image name - note relative path as per MM-ImageSlideshow specifications
						MMImgTitleText.innerHTML = encodeURI(this.imageList[this.imageIndex]);
					  }
			
					// if config position is set to 0 i.e. top then show path and name above image - Note - in effect only 0 is verified in this version
                                        if ( (this.config.PathStyleText != "none") & (this.config.ImgTitleTextPos == 0) ){
 						wrapper.appendChild(MMImgTitleText);
					  }


					// create the image dom bit
					var image = document.createElement("img");
					// if set to make grayscale, flag the class set in the .css file
					if (this.config.makeImagesGrayscale)
						image.className = "desaturate";
					// create an empty string
					var styleString = '';
					// if width or height or non-zero, add them to the style string
					if (this.config.fixedImageWidth != 0)
						styleString += 'width:' + this.config.fixedImageWidth + 'px;';
					if (this.config.fixedImageHeight != 0)
						styleString += 'height:' + this.config.fixedImageHeight + 'px;';
					// if style string has antyhing, set it
					if (styleString != '')
						image.style = styleString;
					// set the image location
					image.src = encodeURI(this.imageList[this.imageIndex]);
					// add the image to the dom
					wrapper.appendChild(image);
					

					// if config position is set to non 0 i.e. bottom, then show path and or name text below image, as determined previously
                                        if ( (this.config.PathStyleText != "none") & (this.config.ImgTitleTextPos != 0) ) {
 						wrapper.appendChild(MMImgTitleText);
					}
					

				}
            }
            else {
                // if no data loaded yet, empty html
                wrapper.innerHTML = "&nbsp;";
            }
        }
        // return the dom
		return wrapper;
	}
});
