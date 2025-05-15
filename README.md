### Notes
* Most of the scaffolding (eslint setup, prettier setup, nextjs, etc.) are copied from another project I worked on recently, for expediency
* Nextjs app. All the "talk to the Garage site" stuff happens clientside (parsing url, splitting out UUID, hitting Garage server). All the PDF stuff ("generate a pdf and save it to disk server-side", "serve existing pdf") happens serverside
* Uses [MaterialUI](https://mui.com/material-ui/all-components/) for styled components

### Local Setup
- Recommended: open in VSCode from the `.code-workspace` file and install the recommended plugins. This gets nice format on save, in-IDE linting, etc.
- Have node.js 22.9.0
- `npm install`
- `npm run dev` to run a local devserver, `npm run build` to build the app