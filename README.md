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

I thought of adding a search feature, which I've done for other projects, but held off in order to make time for other commitments. I may incorporate this later.

When clicking the "download" button, the target file appears in a new tab instead of opening the download manager. I believe this may be an issue with Chrome, but I'll have an easier time testing in a live environment. 

## How to use
Use the Sign Up button at the top of the screen to create an account. Once you've registered a valid email address and password, you may log in and see the Home page. This is where all of your folders and uploaded files will be visible.  

Use the forms on the left side of the screen to upload a new file or create a new folder. Note that files can belong to 0, 1, or many folders. 

Select a folder to view all of its contained files. You can also rename or delete the folder. Note that deleting a folder does not delete the contained files.

Select a file to view its detail page. From here, you can download the file, change its folders, or delete it. 

## Credits
Database hosted by Neon.
File storage hosted by Cloudinary.
