module.exports = {
  curly: "error",
  "lines-around-comment": [
    "error",
    {
      allowBlockStart: true,
      allowObjectStart: true,
      allowArrayStart: true
    }
  ],
  "max-len": [
    "error",
    {
      code: 100,
      comments: 80,
      ignoreUrls: true
    }
  ],
  "no-tabs": ["error", { allowIndentationTabs: true }],
  "no-unexpected-multiline": "error",
  quotes: [
    "error",
    "double",
    { avoidEscape: true, allowTemplateLiterals: false }
  ]
};
