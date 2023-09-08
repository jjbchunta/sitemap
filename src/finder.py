import requests
import re
import os
from array import *

api_key = "AIzaSyBwNAT1Ak6P62S441r-W_Mm4CTmwsi0LAc"

# Check every line of the HTML file
locations = []
def preformFileSearch():

    # Local config variables
    foundContainer = 0
    divTagsFound = 0
    currentState = ""
    currentLocationCount = 1
    global locations

    __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'index.html'), "r") as f:
        for line in f.readlines():
            # If the search hasn't found the container...
            if foundContainer == 0:
                # Read the lines to see if they contain the id
                id = re.findall("id=.locations.", line)
                if id:
                    foundContainer = 1
            # If the search has found the container...
            else:
                # Read the <p> and <li> tags until you find a closing div tag
                strippedLine = line.strip()
                divSearch = re.findall(".{1}div", strippedLine)
                if len(divSearch) > 0:
                    for div in divSearch:
                        if div[0] == '<':
                            divTagsFound += 1
                        elif div[0] == '/':
                            if divTagsFound <= 0:
                                # We've reached the end of the container
                                return
                            else:
                                divTagsFound -= 1
                        print(divTagsFound)
                
                # Extract information
                if strippedLine.startswith("<ul>") or strippedLine.startswith("</ul>"):
                    # List tags, which aren't important here
                    continue
                elif strippedLine.startswith("<p>"):
                    # State
                    currentState = re.findall("<u>(.+)</u>", strippedLine)[0]
                    continue
                elif strippedLine.startswith("<li>"):
                    # Location
                    if "<a" in strippedLine:
                        # Element with Link
                        locationString = re.findall("<li>(.+)</li>", strippedLine)[0]
                        if "<br>" in locationString:
                            locationString = locationString.replace("<br>", "")
                        url = re.findall('href="(.+?)"', strippedLine)[0]
                        # The location text is within a span tag
                        if "<span" in locationString:
                            locationString = duplicateTagCheck(locationString, "span")
                        # The location text is within an a tag
                        else:
                            locationString = duplicateTagCheck(locationString, "a")
                        # The odd case where a </u> tag shows up at the end of a location
                        if "</u>" in locationString:
                            locationString = locationString.replace("</u>", "")
                            
                        locationData = [currentState + ", " + locationString, url, currentLocationCount, 0.0, 0.0]
                        locations.append(locationData)
                        currentLocationCount += 1
                    else:
                        # Element without Link
                        locationString = re.findall("<li>(.+)</li>", strippedLine)[0]
                        if "<br>" in locationString:
                            locationString = locationString.replace("<br>", "")
                        if "<span" in locationString:
                            locationString = duplicateTagCheck(locationString, "span")
                        
                        locationData = [currentState + ", " + locationString, 0, currentLocationCount, 0.0, 0.0]
                        locations.append(locationData)
                        currentLocationCount += 1
                else:
                    # nothing should come through here but just incase
                    continue

# Check for the odd case where there is more than one tag type
def duplicateTagCheck(line, tag):
    if len(re.findall("</"+tag+">", line)) > 1:
        line = re.findall("<"+tag+".*>(.+)</"+tag+"><"+tag+".*>.*</"+tag+">", line)[0]
    else:
        line = re.findall("<"+tag+".*>(.+)</"+tag+">", line)[0]
    return line

# Location / Latitude / Longitude / Link
preformFileSearch()

url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

i = 0
for locationData in locations:
    fullUrlRequest = url + 'query=' + locations[i][0] + '&key=' + api_key
    response = requests.get(fullUrlRequest)
    i += 1

    # Step 2: Check if the request was successful
    if response.status_code == 200:
        # Step 3: Parse the JSON output
        data = response.json()

        # Step 4: Extract latitude and longitude values
        # Assuming 'data' contains the results from the API response
        for result in data.get('results', []):
            latitude = result.get('geometry', {}).get('location', {}).get('lat')
            longitude = result.get('geometry', {}).get('location', {}).get('lng')
            
            if latitude and longitude:
                locationData[3] = latitude
                locationData[4] = longitude
            else:
                print("Latitude and Longitude not found for this result")
    else:
        print(f"Failed to retrieve data. HTTP Status code: {response.status_code}")

print("var locations = [")
for locationData in locations:
    print("\t" + str(locationData) + ",")
print("]")