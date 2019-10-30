# Module: Image Slideshow
The `MMM-ImageSlideshow` module is designed to display images, one at a time on a fixed interval, from one or many directories. These images can be shown in order or at random, one directory at a time or all at time. The image heights and widths can be fixed or scaled and the images can be made to be shown in grayscale.

This fork has additional 'switches' offering alternate control over the displayed image.<br>
Notably:
- The image name and path can be displayed.<br>
- The image can be scaled down to fit within a region, whilst maintaining image aspect ratio (aka - best image size for display region).

## Dependencies / Requirements

This module requires no special dependencies. The only requirement is that the image directories path are fixed paths accessible to the Magic Mirror instance.

## Operation

This module will take in a list of directory paths, one or more, containing image files. The module will display those images in either alphabetical or random order, across either each path one at time or across all the paths at once. Once all the images have been shown, it will loop back and start again.

Extra configurations include setting the amount of time an image is shown for, rendering the images in grayscale, selecting which file extensions are valid, and using a fixed image height and/or width.


## Using the module
Note - Raspberry Pi focussed:
Use Git to download this extension to Magic Mirror. Make sure Git is installed on your system. In the command line/terminal, e.g. 'sudo apt install git'. Next, go to the modules directory of the your Magic Mirror e.g. 'cd /home/pi/MagicMirror/modules'. Run: git clone https://github.com/AdamMoses-GitHub/MMM-ImageSlideshow.git (master repository) or git clone https://github.com/OneOfTheInfiniteMonkeys/MMM-ImageSlideshow.git (for this repository)'.

The advantage of using Git is when there is an update, you can run 'git pull' and it will pull down all the updates. Magic Mirror can even let you know when there are updates.

When installed, to use this module. Add it to the modules array in the `config/config.js` file (RASPI path is /home/pi/MagicMirror/config/config.js) :
````javascript
modules: [
	{
		module: 'MMM-ImageSlideshow',
		position: 'middle_center',
		config: {
			imageStyleString: "object-fit: scale-down; width: 800px; height: 900px;", // best image scaling within sizes
		        PathStyleText: 'nameonly',                                                // display the image file name only
			imagePaths: ['modules/MMM-ImageSlideshow/exampleImages'],                 // relative path to image files
		}
	}	
]
````

A different folder may be used by changing the path held in the config.js file shown above. If required change the array parameter on line imagePaths. e.g. imagePaths: ['modules/MMM-ImageSlideshow/myimages01', 'modules/MMM-ImageSlideshow/myimages02']


Note - Raspberry Pi focussed:
e.g. the location on a raspbery pi is typically:
/home/pi/MagicMirror/config/config.js

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>	
		<tr>
			<td><code>imageStyleString</code></td>
			<td>A CSS string which is applied to the image to be displayed.<br>
				<br><b>Example:</b> <code>'imageStyleString: "object-fit: scale-down; width: 800px; height: 900px;",'</code>
				<br><b>Default value:</b> <code>Empty string (no effect)</code>
				<br>This value is <b>OPTIONAL</b><br>
			<br>Where '"object-fit: scale-down;' causes an image to scale within the defined dimensions
			<br>and width: 800px; height: 900px;", defines the size in px that the image will be fitted within, without distortion.
			<br>See CSS https://www.w3schools.com/css/css3_object-fit.asp for examples</td>
		</tr>
		<tr>
			<td><code>PathStyleText</code></td>
			<td>A string of either 'none', 'nameonly' or 'fullpath' to control the image path/name text content displayed.<br>
				<br><b>Example:</b> <code>'nameonly'</code>
				<br><b>Default value:</b> <code>'none'</code>
				<br>This value is <b>OPTIONAL</b><br>
			<br>Where 'nameonly' displays only the image file name, alternatively 'fullpath' shows the available image path and file name</td>
		</tr>
		<tr>
			<td><code>ImgTitleTextPos</code></td>
			<td>An integer value of 0 or 1 to control positioning of image path/name text.<br>
				<br><b>Example:</b> <code>0</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b><br>
			<br>Where 0 places the image path/name text above the image, 1 places the image path/name text below the image </td>
		</tr>
		<tr>
			<td><code>ImgTitleTextStyle</code></td>
			<td>A CSS text format string. See /home/pi/MagicMirror/css/main.css etc. Default value is 'bright small light'.<br>
				<br><b>Example:</b> <code>'bright medium light'</code>
				<br><b>Default value:</b> <code>'bright small light'</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>imagePaths</code></td>
			<td>Array value containing strings. Each string should be a path to a directory where image files can be found.<br>
				<br><b>Example:</b> <code>['modules/MMM-ImageSlideshow/example1'],</code>
				<br>This value is <b>REQUIRED</b>
			</td>
		</tr>		
		<tr>
			<td><code>slideshowSpeed</code></td>
			<td>Integer value, the length of time to show one image before switching to the next, in milliseconds.<br>
				<br><b>Example:</b> <code>6000</code>
				<br><b>Default value:</b> <code>10000</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>delayUntilRestart</code></td>
			<td>Integer value, the length of time to restart the slideshow after the last image has been shown, in milliseconds. The module will go blank will waits to restart. This value defaults to zero, meaning no delay until restarting.<br>
				<br><b>Example:</b> <code>6000</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>		
		<tr>
			<td><code>fixedImageWidth</code></td>
			<td>Integer value, sets a fixed pixel width for all the images to be shown. If set to 0, the image's actual width is used.<br>
				<br><b>Example:</b> <code>250</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>fixedImageHeight</code></td>
			<td>Integer value, sets a fixed pixel height for all the images to be shown. If set to 0, the image's actual height is used.<br>
				<br><b>Example:</b> <code>300</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>        
		<tr>
			<td><code>randomizeImageOrder</code></td>
			<td>Boolean value, if true will randomize the order of the images, if false will use an alphabetical sorting by filename.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>   
        <tr>
			<td><code>treatAllPathsAsOne</code></td>
			<td>Boolean value, if true will treat all the paths specified in <code>imagePaths</code> as one path. Otherwise, if false, images will only be shown from one path at a time in the order of <code>imagePaths</code>, until all the images in that path are exhausted, before continuing to the next path.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
        <tr>
			<td><code>makeImagesGrayscale</code></td>
			<td>Boolean value, if true images will be rendered in grayscale (i.e black and white) instead of color. If false they will be rendered as just they are without change.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr> 
        <tr>
			<td><code>validImageFileExtensions</code></td>
			<td>String value, a list of image file extensions, seperated by commas, that should be included. Files found without one of the extensions will be ignored.<br>
				<br><b>Example:</b> <code>'png,jpg'</code>
				<br><b>Default value:</b> <code>'bmp,jpg,gif,png'</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>         
    </tbody>
</table>
