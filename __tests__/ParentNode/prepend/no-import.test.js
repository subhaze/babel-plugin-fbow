const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
var parent = document.createElement("div");
var p = document.createElement("p");
var p2 = document.createElement("p");
parent.prepend(p);
parent.prepend(p2);
`;

it("doesn't add prepend import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
		sourceType: "script",
	});
	expect(code).toMatchSnapshot();
});
