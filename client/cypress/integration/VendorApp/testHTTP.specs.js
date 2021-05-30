cy.intercept(
  {
    method: "GET", // Route all GET requests
    url: "/users/*", // that have a URL that matches '/users/*'
  },
  [] // and force the response to be: []
);
