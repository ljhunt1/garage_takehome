### Notes
* Most of the scaffolding (eslint setup, prettier setup, nextjs, etc.) are copied from another project I worked on recently, for expediency
* Nextjs app. Pdfs are generated clientside using `react-pdf` npm package. Main button hits the Garage API and stores the result in state, allowing the page to render additional buttons which download or email the pdf
* Uses [MaterialUI](https://mui.com/material-ui/all-components/) for styled components

### Local Setup
- Recommended: open in VSCode from the `.code-workspace` file and install the recommended plugins. This gets nice format on save, in-IDE linting, etc.
- Have node.js 22.9.0
- `npm install`
- `npm run dev` to run a local devserver, `npm run build` to build the app