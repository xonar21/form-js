export const form = {
  type: "default",
  components: [
    {
      type: "text",
      text: "text",
      key: "text",
    },
  ],
};

export const errors = [
  {
    instancePath: "/components/0/key",
    schemaPath: "#/properties/components/items/allOf/1/allOf/16/then/properties/key/false schema",
    keyword: "false schema",
    params: {},
    message: "boolean schema is false",
  },
  {
    instancePath: "/components/0",
    schemaPath: "#/properties/components/items/allOf/1/allOf/16/if",
    keyword: "if",
    params: { failingKeyword: "then" },
    message: 'must match "then" schema',
  },
];
