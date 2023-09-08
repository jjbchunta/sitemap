# Getting an API Key
 This is the first thing you need to do before proceeding, as Google is the one who provides the interactive map.

 Follow the link below to find out how to do that and come back when you have one.

https://developers.google.com/maps/documentation/embed/get-api-key#console

When enabling APIs, make sure to get both the Maps JavaScript API and Places API.

# Source
 If you want to get a look at what the resulting map looks like, you can run the index.html file after cloning this repository.

With that being said, there are only two files of interest within the /src directory, that being:
    1.) app.js
    2.) finder.py

The app.js file is the JavaScript that initializes the map and adds the markers to the desired locations. This is the script you want to add to your website's files.

The Python file (.py) is not to be included within the website itself, as this is simply a script that crawls through your webpage and returns an array of the defined locations that you can paste into the app.js file.

Example output:
```javascript
var locations = [
    ['Alaska, Fairbanks', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/2022-DRC-flyer-Fairbanks.pdf', 1, 64.8400511, -147.7199757],
    ['Connecticut, Hartford', 0, 2, 41.7658043, -72.6733723],
    ['Florida, Miami', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/2022-DRC-Flyer-Miami-ADOM-2022.pdf', 3, 25.7616798, -80.1917902],
    ['Florida, St. Augustine', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/08/2022-Flyer-with-Rosary-Graphic.pdf', 4, 29.8921835, -81.3139313]
]
```

It would be expensive to crawl through the webpage every time that the site is loaded, which is why this is a script you would only ever run when you've added a new location.
For configutation, if you do want to use this, you will need to paste your API key into the api_key variable at the top of the script. (This is why you'd want Places API enabled)

! And yes, the Python file will take a few seconds to run, it's parsing JSON from several API calls for coordinates. !

# How to Implement
 There are only two things you need to change about the page.

1.) Paste the HTML tags below into the desired page.

```html
<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY_HERE]&callback=initMap&libraries=&v=weekly" defer></script>
<script src="[DIRECTORY]/app.js"></script>

<div id="gmp-map"></div>
```

I hear that you use Wordpress, so if Elementor has a code snipit widget, just pasting this tag into that block.
Alternatively, something that you can do if you don't want to inject HTML into the source page is download a plugin that allows you to write HTML to a shortcode, and you can just paste that shortcode into the desired location of the map.

Within the first script tag, there is a [YOUR_API_KEY_HERE] that you need to replace with the API key you set-up within the Cloud Console.
Secondly, there is the app.js file that you want to reference here in that second script tag.

2.) (Optional) Add an ID to the div tag containing all the locations.

Unless you'd prefer to manually get the coordinates of any locations you add, the way the Python file works is searching for a div tag with the id "Locations". It will then parse all the tags within it and scrap for links and text.

So, find that div tag and add the ID like you see below:
![HTML Tree Screenshot](/screenshot.png)

# Hanlding Errors
 If you right-click a page, within the tooltip menu that shows up, there is an option to "Inspect Element".

If you click that option, you will be brought to a developers console where you can see the HTML tree of your website. There is a "Console" tab on the top that you can navigate to which will show you any errors if the map doesn't initialy display.