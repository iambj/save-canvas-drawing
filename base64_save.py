# Quickly convert a base64 string to a png.

# Removes data at the beginning that the browser supplies if it is there. This allows the browser to just save
# the data how it normally would and on the backend, we can control how we want to process it.
# Eventually, we could make the file format changeable, however the browser is defaulting to png right now. 

# Reads a text file but could take an AJAX request.
import base64

# Read the text file of data as bytes. 
with open("img_data.txt", "r") as image_data:
    data = image_data.read()
    # remove the extra png data in the beginning and encode to bytes.
    cleaned_data = str.encode(data.replace("data:image/png;base64,", ""))

# Write the file as a png. (note the b flag)
with open("test_base64.jpg", 'wb') as fh:
    # Decode the bytes of base64 string and save.
    fh.write(base64.decodestring(cleaned_data))
    fh.close()