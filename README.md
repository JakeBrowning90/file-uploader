# File Uploader

## Overview
This app is a demonstration file storage service, modeled after Google Drive.
Once users have registered with an email and password, they may upload and download files, as well as create folders to categorize their files. 
Users may only see their own uploaded files.

## Technologies
The app is built using Node.js, Express, and Prisma ORM. 
User authentication uses Passport.js, the database is hosted on Neon, and cloud storage is hosted by Cloudinary.

## Challenges/To-dos
The primary challenge of this project was incorporating Prisma after months of using raw SQL in other projects. This meant multiple holdups while trying to figure out the particulars of Prisma queries, especially when Joins were involved like when querying a file and also getting its folders.

When clicking the "download" button, the target file appears in a new tab instead of opening the download manager. I believe this may be an issue with Chrome, but I'll have an easier time testing in a live environment. 

I'd like to give the app a more responsive/mobile friendly design, but have held off until I have more time to polish the style.

## How to use
Use the Sign Up button at the top of the screen to create an account, or log into the guest account.

### Guest email: guestuser@gmail.com 
### Password: fileapp

Once you've registered a valid email address and password, you may log in and see the Home page. This is where all of your folders and uploaded files will be visible.  

Use the forms on the left side of the screen to upload a new file or create a new folder. Note that files can belong to 0, 1, or many folders. 

Select a folder to view all of its contained files. You can also click the arrow icon next to the folder name to rename or delete the folder. Note that deleting a folder does not delete the contained files.

Select a file to view its detail page. From here, you can download the file or navigate to any of its folders. You can also click the arrow next to the file name to edit the file title and its folders, or delete the file from the database. 

## Credits
Database hosted by Neon.
File storage hosted by Cloudinary.
Icons from Google Fonts.
