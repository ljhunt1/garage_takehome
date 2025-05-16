### Notes
* Most of the scaffolding (eslint setup, prettier setup, nextjs, etc.) are copied from another project I worked on recently, for expediency
* Nextjs app. Pdfs are generated clientside using `react-pdf` npm package. Main button hits the Garage API and stores the result in state, allowing the page to render additional buttons which download or email the pdf
* Uses [MaterialUI](https://mui.com/material-ui/all-components/) for styled components

### Things I was not able to get to
* The email button doesn't work :( I am getting errors using the `react-pdf` package from within a nextjs server action. Seems related to this https://github.com/diegomura/react-pdf/issues/2350#issuecomment-1914234934
    * I can't send the email from the user's browser, so the choice is either: generate the pdf clientside and POST it to the server, which seems workable but would be more work, or I can try to generate the pdf serverside (using something like [pdfkit](https://pdfkit.org/))? But that means pivoting the existing pdf generation logic
* I'd prefer the styling on the email and download buttons to be nicer

### Local Setup
- Recommended: open in VSCode from the `.code-workspace` file and install the recommended plugins. This gets nice format on save, in-IDE linting, etc.
- Have node.js 22.9.0
- `npm install`
- `npm run dev` to run a local devserver, `npm run build` to build the app