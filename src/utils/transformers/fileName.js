export const transformerFileName = () => ({
  pre(node) {
    const raw = this.options.meta?.__raw?.split(" ");

    const metaMap = new Map();

    if (raw) {
      for (const item of raw) {
        const [key, value] = item.split("=");
        if (value !== undefined) metaMap.set(key, value.replace(/["'`]/g, ""));
      }
    }

    const file = metaMap.get("file");

    // A `file=` meta wins over the language, but both render the same way: a
    // label in the block's top-right corner. Anchoring it outside the block
    // would be clipped, since prose gives `pre` its own overflow.
    const lang = this.options.lang;

    if (!file && (!lang || lang === "text" || lang === "plaintext")) return;

    // File names keep their case; a bare language reads better capitalised.
    const label = file || lang.charAt(0).toUpperCase() + lang.slice(1);

    node.children.push({
      type: "element",
      tagName: "span",
      properties: { class: ["code-lang"], "aria-hidden": "true" },
      children: [{ type: "text", value: label }],
    });
  },
});
