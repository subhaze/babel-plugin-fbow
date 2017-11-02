const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
// @no-fbow
var parent = document.createElement("div");
var child = document.createElement("p");
parent.appendChild(child);
var span = document.createElement("span");

child.replaceWith(span);
span.replaceWith(child);
`;

it("adds import for replaceWith once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
