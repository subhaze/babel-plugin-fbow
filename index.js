const importMap = require("./importMap");

const MemberExpressionKeys = Object.keys(importMap.MemberExpression);
const NewExpressionKeys = Object.keys(importMap.NewExpression);

module.exports = function main({ types: t }) {
	const addedFills = [];
	function addImport(path, polyfillPath) {
		if (addedFills.includes(polyfillPath)) return;
		addedFills.push(polyfillPath);
		const importDec = t.importDeclaration([], t.stringLiteral(polyfillPath));

		importDec._blockHoist = 3; // eslint-disable-line
		const programPath = path.find(p => p.isProgram());
		programPath.unshiftContainer("body", importDec);
	}

	return {
		name: "for-better-or-worse",
		visitor: {
			MemberExpression(path, state) {
				if (state.file.opts.sourceType === "script") return;
				if (t.isIdentifier(path.node.property)) {
					if (MemberExpressionKeys.includes(path.node.property.name)) {
						addImport(
							path,
							importMap.MemberExpression[path.node.property.name],
						);
					}
				}
			},
			NewExpression(path, state) {
				if (state.file.opts.sourceType === "script") return;
				if (t.isIdentifier(path.node.callee)) {
					if (NewExpressionKeys.includes(path.node.callee.name)) {
						addImport(path, importMap.NewExpression.CustomEvent);
					}
				}
			},
		},
	};
};
