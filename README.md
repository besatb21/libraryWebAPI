# libraryWebAPI

## How to use it:


###  FRONTEND

Run the following( after cloning and assuming you have not moved into the frontend dir.):

    cd .\frontend\ (  just press shift as u start typing f.. )

    npm i (to install the required dependencies)

    npm start (to run the app)


### BACKEND

    cd .\backend\ 

    dotnet restore

    dotnet run 

### DB

In this project I have used the *MS SQL*.
Should you be using another db, all you have to do is change the connection string in the [Program.cs](./backend/Program.cs) file.

    dotnet ef database update 


### Users 
---
Users are stored in two tables in backend, *User* table and *Authors* table. 
The first page we see when opening the webapp, is the login page.
Since there is no user, I would suggest (strongly recommended) using **Swagger** to add the user,which should have the role of Admin. 
[The admin (and any other entitiy) can be added straight from the db.] 

_Every user added by the admin will have username: name+name, password: "hello"+name ._

Access swagger: *localhost:5006/swagger*

This user will be later used to logIn and add other authors from the UI.

DESICLAIMERS:

- a wwwroot/images folder must be created, I did not upload mine, since it contains images already, so I specified in the gitignore.
-   I am aware that there is a discrepancy between the styling used in the book_add_update component and the styling used in the rest of the app. 
This is because, I am used to Bootstrap for projects which I do not know the framework beforehand. As I got the hang of it, I used MUI more and more.
- I have not hashed the password
-   Everything can be CRUD-ed, except the image, we can upload the image to the server, and also retrieve it , but I could not change the image inside the PUT request. 
- the **controllers** are automatically generated using __dotnet aspnet-codegenerator__, (hence not all of them are used), and also I have added some middleware for the PATCH which I do not completely understand. PATCH wasnt used either.
- when using the *dotnet cli* to create the project I used the  __--no-https__ option
- **I did not implement testing , or even deployement.**

To develop the program I used VSCode IDE (tmi).

I used React(latest version in my knowledge) and .net 6.
