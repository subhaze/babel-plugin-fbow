const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
// @no-fbow
var parent = document.createElement("div");
var p = document.createElement("p");
var p2 = document.createElement("p");
parent.prepend(p);
parent.prepend(p2);
`;

it("adds import for prepend once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
