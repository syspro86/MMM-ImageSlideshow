# Module: Image Slideshow
The `MMM-ImageSlideshow` module is designed to display images, one at a time on a fixed interval, from one or many directories. These images can be shown in order or at random, one directory at a time or all at time. The image heights and widths can be fixed, and the images can be made to be shown in grayscale.

## Dependencies / Requirements

This module requires no special dependencies. The only requirement is that the image directories you path to are fixed paths accessible to the Magic Mirror instance.

## Operation

This module will take in a list of directory paths, one or more, containing image files. The module will display those images in either alphabetical or random order, across either each path one at time or across all the paths at once. Once all the images have been shown, it will loop back and start again.

Extra configurations include setting the amount of time an image is shown for, rendering the images in grayscale, selecting which file extensions are valid, and using a fixed image height and/or width.


## Using the module
Note - Raspberry Pi focussed:
Use Git to download this extension to Magic Mirror. Make sure Git is installed on your system. In the command line/terminal, e.g. 'sudo apt install git'. Next, go to the modules directory of the your Magic Mirror e.g. 'cd /home/pi/MagicMirror/modules'. Run: 'git clone https://github.com/AdamMoses-GitHub/MMM-ImageSlideshow.git'.

The advantage of using Git is when there is an update, you can run 'git pull' and it will pull down all the updates. Magic Mirror can even let you know when there are updates.

When installed, to use this module. Add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-ImageSlideshow',
		position: 'bottom_left',
		config: {
			imagePaths: ['modules/MMM-ImageSlideshow/example1'],
		}
	}	
]
````

A different folder may be used by changing the path held in the config.js file shown above. If required change the array parameter on line imagePaths. e.g. imagePaths: ['modules/MMM-ImageSlideshow/myimages01', 'modules/MMM-ImageSlideshow/myimages02'],


Note - Raspberry Pi focussed:
e.g. the location on a raspbery pi is typically:
/home/pi/config/config.js

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
			<td><code>PathStyleText</code></td>
			<td>A string of either 'nameonly' or 'fullpath'.<br>
			<br>Where 'nameonly' displays only the image file name, where 'fullpath' shows the available image path and finel name</td>
		</tr>
		<tr>
			<td><code>ImgTitleTextPos</code></td>
			<td>An integer value of 0 or 1<br>
			<br>Where 0 places the text above the image, 1 places the text below the image </td>
		</tr>
		<tr>
			<td><code>ImgTitleTextStyle</code></td>
			<td>A CSS text format string. See /home/pi/MagicMirror/css/main.css etc. Default value is 'bright small light'. </td>
		</tr>

		<tr>
			<td><code>imagePaths</code></td>
			<td>Array value containing strings. Each string should be a path to a directory where image files can be found.<br>
				<br><b>Example:</b> <code>['modules/MMM-ImageSlideshow/example1']</code>
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
