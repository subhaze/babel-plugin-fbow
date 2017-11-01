const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
var parent = document.createElement("div");
var child = document.createElement("p");
parent.appendChild(child);
var span = document.createElement("span");

child.replaceWith(span);
span.replaceWith(child);
`;

it("doesn't add replaceWith import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
		sourceType: "script",
	});
	expect(code).toMatchSnapshot();
});
