const importMap = require("./importMap");
const importMapKeys = Object.keys(importMap);

module.exports = function ({ types: t }) {
  const addedFills = [];
  function addImport(path, polyfillPath) {
    if (addedFills.includes(polyfillPath)) return;
    addedFills.push(polyfillPath);
    const importDec = t.importDeclaration(
      [],
      t.stringLiteral(polyfillPath),
    );

    importDec._blockHoist = 3;
    const programPath = path.find(path => path.isProgram());
    programPath.unshiftContainer("body", importDec);
  }

  return {
    name: "for-better-or-worse",
    visitor: {
      MemberExpression: function (path, state) {
        if (state.file.opts.sourceType === "script") return;
        if (t.isIdentifier(path.node.property)) {
          if(importMapKeys.includes(path.node.property.name)) {
            addImport(path, importMap[path.node.property.name]);
          }
        }
      },
      NewExpression: function(path, state) {
        if (state.file.opts.sourceType === "script") return;
        if(t.isIdentifier(path.node.callee)){
          switch (path.node.callee.name) {
            case "CustomEvent":
              addImport(path, importMap.CustomEvent)
              break;
          
            default:
              break;
          }
        }
      }
    }
  };
};