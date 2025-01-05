export const layout = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Router Test App</title>
    <style>
      ${require("fs").readFileSync("src/assets/styles/main.css", "utf8")}
    </style>
  </head>
  <body>
    ${content}
  </body>
</html>
`;
