const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
const a = document.querySelector("a");
const div = document.querySelector("div");
a.matches("div");
div.matches("p");
`;

it("doesn't add matches import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
		sourceType: "script",
	});
	expect(code).toMatchSnapshot();
});
