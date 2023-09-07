import re
import os

locations = []

# Check every line of the HTML file
def preformFileSearch():
    foundContainer = 0
    divTagsFound = 0
    __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'index.html'), "r") as f:
        for line in f.readlines():
            # If the search hasn't found the container...
            if foundContainer == 0:
                # Read the lines to see if they contain the id
                id = re.findall("id=.locations.", line)
                if id:
                    print("Found container")
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
                    print(re.findall("<u>(.+)</u>", strippedLine)[0])
                elif strippedLine.startswith("<li>"):
                    # Location
                    if "<a" in strippedLine:
                        print("\t" + strippedLine)
                    else:
                        spanTag = re.findall("<li>(.+)</li>", strippedLine)[0]
                        try:
                            location = re.findall("<span.*>(.+)</span>.*", strippedLine)[0]
                            location = location.replace("<br>", "")
                            print("\t" + location)
                        except:
                            location = spanTag.replace("<br>", "")
                            print("\t" + spanTag)
                else:
                    # idk what were getting but nope not dealing with it lol
                    continue

preformFileSearch()
print("\n\n\n\n\n\n")