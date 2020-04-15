1) don't delte files folder

2) run
npm install
node server_pdf.js

3) When trying to convert to pdf file, I got an error telling me that LibreOffice is not installed.

Scenario:
OS: Windows 7 SP1 (x64)
LibreOffice Version: 6.2.5.2 (x64)
soffice.exe Path: 'C:/Program Files/LibreOffice/program/soffice.exe'

The current filter cannot find this path: (Line 497 of file "converter.js")
var _windowsDirnamePattern = /^LibreOffice \d+(?:\.\d+)?$/i;

I could correct it locally by changing it to:
var _windowsDirnamePattern = /^LibreOffice( \d+(?:\.\d+)?)?$/i;