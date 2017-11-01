const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
var parent = document.createElement("div");
var p = document.createElement("p");
var p2 = document.createElement("p");
parent.append(p);
parent.append(p2);
`;

it("doesn't add append import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
		sourceType: "script",
	});
	expect(code).toMatchSnapshot();
});
