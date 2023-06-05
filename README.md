# TestTaskRedRift
Create a Blazor Server application that allows the user to enter a story in the format of a novel, and automatically converts every character name in the text into a clickable object with its own color (chip). Clicking on the chip should show a pop-up with the character name, which can be edited by the user. The edited name should be reflected in all character chips in the text.

Requirements:

The application should be developed using C# Asp.Net Core Blazor Server.

The application should have a single razor page with a text editor control.

Text editor must always load the last story edited by the user. Use any relational database to store and extract the edited text.

The user should be able to type a story in the text editor control. Each character name should start from a new line and end with a colon (e.g. "Clara:").

Every character name in the text editor control should be automatically converted into a clickable chip with its own color.

Clicking on a character chip should show a pop-up with the character name, which can be edited by the user.

Editing the character name should update all character chips in the text editor control.

The color of each character chip should be consistent throughout the text editor control.

The solution should be simple and well-structured, with an emphasis on code style and maintainability.

The solution should be prepared for future expansion, but without over-complicated decorators and abstractions.

Deliverables:

Source code for the application, including all necessary files.

Instructions for how to build and run the application.

A short description of the approach taken to solve the task, including any trade-offs made and areas for improvement.

Note: The applicant should demonstrate their ability to design and implement a full-stack application that meets the above requirements, and provide a solution that is easy to understand and maintain. The focus should be on delivering a working solution with clean and well-organized code, rather than on incorporating advanced features or technologies.
# How to use it
1. Clone repository
2. Go to cloned folder
3. Start terminal in opened folder
4. Write ```docker compose up``` command
5. Open localhost:2023
