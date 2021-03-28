import "../public/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}


// mock ContextBridge api so storybook doesn't get mad.
window.api = {
  send: () => {},
  receive: () => {},
}