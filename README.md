# XML builder classes for form content

## Description
For a Node.js application to convert the content of user-submitted forms into one of three XML formats. The XML fields are pre-defined, same for the form fields, which requires mapping form data to the corresponding xml field.

Since all three XML formats basically only differ in the name of their fields, i.e. the mapping function that needs to run, a class-based approach with inheritance suggests itself. 
