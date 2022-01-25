beforeEach(() => {
	cy.task("resetDb");
});

// Wrap tests in a describe to run together

describe("homepage tests", () => {
	it("can find homepage", () => {
		cy.visit("/");
	});

	it("can find title on home page", () => {
		cy.visit("/");
		cy.get("h1").contains("hello world");
	});
});
